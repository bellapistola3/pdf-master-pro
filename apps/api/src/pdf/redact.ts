import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';
import { runBinary } from '../services/exec';
import { config } from '../config';

export interface RedactionBox {
  pageIndex: number; // 0-indexed
  /** Box in fractions of the page (0-1), so it's independent of render DPI. */
  xFrac: number;
  yFracFromTop: number;
  wFrac: number;
  hFrac: number;
}

/**
 * Real redaction: pages containing a redaction are rasterized to an image,
 * a solid black box is composited over the sensitive region, and the image
 * replaces the page. Because the page becomes a flattened image, the
 * underlying text is gone — this is not a cosmetic overlay that leaves
 * copy-pasteable text underneath (the failure mode of naive "black rectangle"
 * redaction tools).
 *
 * Pages with no redaction boxes are copied through unchanged (vector, not
 * rasterized), so quality/searchability is preserved elsewhere in the doc.
 */
export async function redactPdf(input: Buffer, boxes: RedactionBox[]): Promise<Buffer> {
  const dpi = 200;
  const src = await PDFDocument.load(input);
  const pageCount = src.getPageCount();

  const boxesByPage = new Map<number, RedactionBox[]>();
  for (const b of boxes) {
    if (!boxesByPage.has(b.pageIndex)) boxesByPage.set(b.pageIndex, []);
    boxesByPage.get(b.pageIndex)!.push(b);
  }

  const out = await PDFDocument.create();

  for (let i = 0; i < pageCount; i++) {
    const pageBoxes = boxesByPage.get(i);
    if (!pageBoxes || pageBoxes.length === 0) {
      const [copied] = await out.copyPages(src, [i]);
      out.addPage(copied);
      continue;
    }

    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'redact-'));
    try {
      const singlePage = await PDFDocument.create();
      const [p] = await singlePage.copyPages(src, [i]);
      singlePage.addPage(p);
      const singlePath = path.join(tmpDir, 'page.pdf');
      await fs.writeFile(singlePath, await singlePage.save());

      const prefix = path.join(tmpDir, 'rendered');
      await runBinary(config.binaries.pdftoppm, ['-png', '-r', String(dpi), singlePath, prefix], {
        timeoutMs: 60_000,
      });
      const rendered = (await fs.readdir(tmpDir)).find((f) => f.startsWith('rendered') && f.endsWith('.png'))!;
      const imgPath = path.join(tmpDir, rendered);
      const meta = await sharp(imgPath).metadata();
      const w = meta.width!, h = meta.height!;

      const overlays = pageBoxes.map((b) => ({
        input: {
          create: {
            width: Math.max(1, Math.round(b.wFrac * w)),
            height: Math.max(1, Math.round(b.hFrac * h)),
            channels: 4 as const,
            background: { r: 0, g: 0, b: 0, alpha: 1 },
          },
        },
        left: Math.round(b.xFrac * w),
        top: Math.round(b.yFracFromTop * h),
      }));

      const flattenedPng = await sharp(imgPath).composite(overlays).png().toBuffer();
      const embedded = await out.embedPng(flattenedPng);
      const pageSize = src.getPage(i).getSize();
      const newPage = out.addPage([pageSize.width, pageSize.height]);
      newPage.drawImage(embedded, { x: 0, y: 0, width: pageSize.width, height: pageSize.height });
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  }

  return Buffer.from(await out.save());
}
