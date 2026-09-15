import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { runBinary } from '../services/exec';
import { config } from '../config';

export type PageSize = 'A4' | 'Letter' | 'Auto';
export type Orientation = 'portrait' | 'landscape';
export type Margin = 'none' | 'small' | 'medium';

const PAGE_SIZES_PT: Record<Exclude<PageSize, 'Auto'>, [number, number]> = {
  A4: [595.28, 841.89],
  Letter: [612, 792],
};

const MARGIN_PT: Record<Margin, number> = { none: 0, small: 18, medium: 36 };

export interface ImagesToPdfOptions {
  images: { buffer: Buffer; mime: string }[]; // already in desired order
  pageSize: PageSize;
  orientation: Orientation;
  margin: Margin;
}

export async function imagesToPdf(opts: ImagesToPdfOptions): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const marginPt = MARGIN_PT[opts.margin];

  for (const { buffer, mime } of opts.images) {
    // Normalize to PNG so we never depend on the source's exact encoding.
    const normalized = await sharp(buffer).rotate().png().toBuffer();
    const meta = await sharp(normalized).metadata();
    const embedded = await doc.embedPng(normalized);

    let pageW: number, pageH: number;
    if (opts.pageSize === 'Auto') {
      pageW = (meta.width ?? embedded.width) + marginPt * 2;
      pageH = (meta.height ?? embedded.height) + marginPt * 2;
    } else {
      const [w, h] = PAGE_SIZES_PT[opts.pageSize];
      [pageW, pageH] = opts.orientation === 'landscape' ? [h, w] : [w, h];
    }

    const page = doc.addPage([pageW, pageH]);
    const availW = pageW - marginPt * 2;
    const availH = pageH - marginPt * 2;
    const scale = Math.min(availW / embedded.width, availH / embedded.height, 1);
    const drawW = embedded.width * scale;
    const drawH = embedded.height * scale;
    page.drawImage(embedded, {
      x: (pageW - drawW) / 2,
      y: (pageH - drawH) / 2,
      width: drawW,
      height: drawH,
    });
  }

  return Buffer.from(await doc.save());
}

export interface PdfToImagesOptions {
  pdfBuffer: Buffer;
  pages?: string; // e.g. "1-3,5" — if omitted, all pages
  dpi?: number;
  format?: 'jpg' | 'png';
}

/** Renders PDF pages to raster images using Poppler's pdftoppm (real rasterization, not a stub). */
export async function pdfToImages(opts: PdfToImagesOptions): Promise<{ name: string; buffer: Buffer }[]> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf2img-'));
  const inputPath = path.join(tmpDir, 'input.pdf');
  await fs.writeFile(inputPath, opts.pdfBuffer);
  const outPrefix = path.join(tmpDir, 'page');
  const fmt = opts.format ?? 'jpg';
  const dpi = opts.dpi ?? 150;

  const args = [fmt === 'jpg' ? '-jpeg' : '-png', '-r', String(dpi)];
  if (opts.pages) {
    const nums = opts.pages.split(',').flatMap((seg) => {
      const m = seg.trim().match(/^(\d+)(?:-(\d+))?$/);
      if (!m) return [];
      const start = parseInt(m[1], 10);
      const end = m[2] ? parseInt(m[2], 10) : start;
      return [start, end];
    });
    if (nums.length >= 2) {
      args.push('-f', String(Math.min(...nums)), '-l', String(Math.max(...nums)));
    }
  }
  args.push(inputPath, outPrefix);

  await runBinary(config.binaries.pdftoppm, args, { timeoutMs: 180_000 });

  const files = (await fs.readdir(tmpDir)).filter((f) => f.startsWith('page') && f !== 'input.pdf').sort();
  const results: { name: string; buffer: Buffer }[] = [];
  for (const f of files) {
    results.push({ name: f, buffer: await fs.readFile(path.join(tmpDir, f)) });
  }
  await fs.rm(tmpDir, { recursive: true, force: true });
  return results;
}
