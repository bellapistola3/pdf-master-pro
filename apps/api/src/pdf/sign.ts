import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export interface SignatureOptions {
  pageIndex: number; // 0-indexed page to place signature on
  x: number; // PDF coordinate (points) from left
  y: number; // PDF coordinate (points) from bottom
  widthPt: number;
  heightPt: number;
  /** Either a drawn/uploaded signature image, or typed text rendered in a script-like font. */
  mode: 'image' | 'text';
  imageBuffer?: Buffer;
  imageType?: 'png' | 'jpg';
  text?: string;
}

/**
 * Places a VISUAL signature (image or styled text) onto a PDF page.
 * This is explicitly NOT a qualified/cryptographic electronic signature —
 * it does not use PKI, timestamping, or certificate chains. Callers must
 * present it to end users as a visual signature only.
 */
export async function signPdf(input: Buffer, opts: SignatureOptions): Promise<Buffer> {
  const doc = await PDFDocument.load(input);
  const pages = doc.getPages();
  if (opts.pageIndex < 0 || opts.pageIndex >= pages.length) {
    throw new Error(`pageIndex ${opts.pageIndex} out of range`);
  }
  const page = pages[opts.pageIndex];

  if (opts.mode === 'image') {
    if (!opts.imageBuffer || !opts.imageType) {
      throw new Error('imageBuffer and imageType are required for image signatures');
    }
    const img = opts.imageType === 'png'
      ? await doc.embedPng(opts.imageBuffer)
      : await doc.embedJpg(opts.imageBuffer);
    page.drawImage(img, { x: opts.x, y: opts.y, width: opts.widthPt, height: opts.heightPt });
  } else {
    if (!opts.text) throw new Error('text is required for text-mode signatures');
    const font = await doc.embedFont(StandardFonts.HelveticaOblique);
    const fontSize = Math.min(opts.heightPt * 0.7, 36);
    page.drawText(opts.text, {
      x: opts.x,
      y: opts.y + (opts.heightPt - fontSize) / 2,
      size: fontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });
  }

  return Buffer.from(await doc.save());
}
