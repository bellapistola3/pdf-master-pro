import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';

export type Position =
  | 'bottom-right' | 'bottom-left' | 'bottom-center'
  | 'top-right' | 'top-left' | 'top-center'
  | 'center';

export interface TextWatermarkOptions {
  text: string;
  opacity?: number; // 0-1
  rotationDegrees?: number;
  fontSizePt?: number;
  colorHex?: string; // e.g. "#FF0000"
  position?: Position;
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return rgb(((bigint >> 16) & 255) / 255, ((bigint >> 8) & 255) / 255, (bigint & 255) / 255);
}

function positionToXY(pos: Position, pageW: number, pageH: number, textW: number, textH: number, margin = 36) {
  switch (pos) {
    case 'bottom-right': return { x: pageW - textW - margin, y: margin };
    case 'bottom-left': return { x: margin, y: margin };
    case 'bottom-center': return { x: (pageW - textW) / 2, y: margin };
    case 'top-right': return { x: pageW - textW - margin, y: pageH - textH - margin };
    case 'top-left': return { x: margin, y: pageH - textH - margin };
    case 'top-center': return { x: (pageW - textW) / 2, y: pageH - textH - margin };
    case 'center':
    default:
      return { x: (pageW - textW) / 2, y: (pageH - textH) / 2 };
  }
}

export async function addTextWatermark(input: Buffer, opts: TextWatermarkOptions): Promise<Buffer> {
  const doc = await PDFDocument.load(input);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const size = opts.fontSizePt ?? 48;
  const color = opts.colorHex ? hexToRgb(opts.colorHex) : rgb(0.6, 0.6, 0.6);
  const opacity = opts.opacity ?? 0.35;
  const rotation = opts.rotationDegrees ?? 45;

  for (const page of doc.getPages()) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(opts.text, size);
    const textHeight = font.heightAtSize(size);
    const { x, y } = positionToXY(opts.position ?? 'center', width, height, textWidth, textHeight);
    page.drawText(opts.text, {
      x, y, size, font, color, opacity, rotate: degrees(rotation),
    });
  }
  return Buffer.from(await doc.save());
}

export interface ImageWatermarkOptions {
  imageBuffer: Buffer;
  imageType: 'png' | 'jpg';
  opacity?: number;
  scale?: number; // fraction of page width, e.g. 0.3
  position?: Position;
}

export async function addImageWatermark(input: Buffer, opts: ImageWatermarkOptions): Promise<Buffer> {
  const doc = await PDFDocument.load(input);
  const img = opts.imageType === 'png'
    ? await doc.embedPng(opts.imageBuffer)
    : await doc.embedJpg(opts.imageBuffer);

  const scale = opts.scale ?? 0.3;
  for (const page of doc.getPages()) {
    const { width, height } = page.getSize();
    const imgW = width * scale;
    const ratio = img.height / img.width;
    const imgH = imgW * ratio;
    const { x, y } = positionToXY(opts.position ?? 'center', width, height, imgW, imgH);
    page.drawImage(img, { x, y, width: imgW, height: imgH, opacity: opts.opacity ?? 0.5 });
  }
  return Buffer.from(await doc.save());
}

export interface PageNumberOptions {
  position: Position;
  startPage?: number; // 1-indexed page to start numbering on
  startNumber?: number; // first number to display
  fontSizePt?: number;
  format?: string; // e.g. "Page {n} of {total}" — {n} and {total} get substituted
}

export async function addPageNumbers(input: Buffer, opts: PageNumberOptions): Promise<Buffer> {
  const doc = await PDFDocument.load(input);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();
  const total = pages.length;
  const startPage = opts.startPage ?? 1;
  const startNumber = opts.startNumber ?? 1;
  const size = opts.fontSizePt ?? 11;
  const format = opts.format ?? '{n} / {total}';

  pages.forEach((page, i) => {
    const pageNo = i + 1;
    if (pageNo < startPage) return;
    const displayNumber = startNumber + (pageNo - startPage);
    const text = format.replace('{n}', String(displayNumber)).replace('{total}', String(total));
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, size);
    const textHeight = font.heightAtSize(size);
    const { x, y } = positionToXY(opts.position, width, height, textWidth, textHeight, 24);
    page.drawText(text, { x, y, size, font, color: rgb(0.2, 0.2, 0.2) });
  });

  return Buffer.from(await doc.save());
}
