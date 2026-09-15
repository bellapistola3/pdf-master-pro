import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
import { runBinary } from '../services/exec';
import { config } from '../config';

export type OcrLanguage = 'eng' | 'bul' | 'bul+eng';

/**
 * OCRs a PDF (or a plain image) and returns a searchable PDF with an
 * invisible text layer over the original page images, using Poppler
 * (rasterization) + Tesseract (--- real OCR engine, not a stub).
 *
 * Requires the `bul`/`eng` tesseract-ocr language packs to be installed
 * in the Docker image — see Dockerfile.
 */
export async function ocrToPdf(
  input: Buffer,
  opts: { language: OcrLanguage; sourceIsImage?: boolean; imageExt?: string }
): Promise<Buffer> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ocr-'));
  const pageImages: string[] = [];

  try {
    if (opts.sourceIsImage) {
      const imgPath = path.join(tmpDir, `page.${opts.imageExt ?? 'png'}`);
      await fs.writeFile(imgPath, input);
      pageImages.push(imgPath);
    } else {
      const inPath = path.join(tmpDir, 'in.pdf');
      await fs.writeFile(inPath, input);
      const prefix = path.join(tmpDir, 'page');
      await runBinary(config.binaries.pdftoppm, ['-png', '-r', '300', inPath, prefix], {
        timeoutMs: 180_000,
      });
      const files = (await fs.readdir(tmpDir))
        .filter((f) => f.startsWith('page') && f.endsWith('.png'))
        .sort();
      pageImages.push(...files.map((f) => path.join(tmpDir, f)));
    }

    if (pageImages.length === 0) throw new Error('No pages could be rasterized for OCR');

    const perPagePdfPaths: string[] = [];
    for (const imgPath of pageImages) {
      const outBase = imgPath.replace(/\.\w+$/, '-ocr');
      await runBinary(config.binaries.tesseract, [imgPath, outBase, '-l', opts.language, 'pdf'], {
        timeoutMs: 120_000,
      });
      perPagePdfPaths.push(`${outBase}.pdf`);
    }

    const merged = await PDFDocument.create();
    for (const p of perPagePdfPaths) {
      const bytes = await fs.readFile(p);
      const src = await PDFDocument.load(bytes);
      const copied = await merged.copyPages(src, src.getPageIndices());
      copied.forEach((pg) => merged.addPage(pg));
    }

    return Buffer.from(await merged.save());
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
}

/** Convenience: OCR then extract just the plain text (for the "export to TXT" option). */
export async function ocrToText(input: Buffer, opts: { language: OcrLanguage }): Promise<string> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ocr-txt-'));
  try {
    const inPath = path.join(tmpDir, 'in.pdf');
    await fs.writeFile(inPath, input);
    const prefix = path.join(tmpDir, 'page');
    await runBinary(config.binaries.pdftoppm, ['-png', '-r', '300', inPath, prefix], { timeoutMs: 180_000 });
    const files = (await fs.readdir(tmpDir)).filter((f) => f.endsWith('.png')).sort();

    let fullText = '';
    for (const f of files) {
      const imgPath = path.join(tmpDir, f);
      const outBase = imgPath.replace(/\.png$/, '');
      await runBinary(config.binaries.tesseract, [imgPath, outBase, '-l', opts.language], {
        timeoutMs: 120_000,
      });
      fullText += (await fs.readFile(`${outBase}.txt`, 'utf-8')) + '\f';
    }
    return fullText;
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
}
