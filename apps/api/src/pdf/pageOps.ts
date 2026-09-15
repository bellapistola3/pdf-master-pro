import { PDFDocument, degrees } from 'pdf-lib';

/** Parses a range string like "1-3,5,8-10" (1-indexed, inclusive) into a sorted list of 0-indexed page numbers. */
export function parsePageRanges(spec: string, pageCount: number): number[] {
  const indices = new Set<number>();
  const parts = spec.split(',').map((p) => p.trim()).filter(Boolean);
  for (const part of parts) {
    const m = part.match(/^(\d+)(?:-(\d+))?$/);
    if (!m) throw new Error(`Invalid page range segment: "${part}"`);
    const start = parseInt(m[1], 10);
    const end = m[2] ? parseInt(m[2], 10) : start;
    if (start < 1 || end < start) throw new Error(`Invalid page range: "${part}"`);
    for (let i = start; i <= end; i++) {
      if (i > pageCount) throw new Error(`Page ${i} is out of range (document has ${pageCount} pages)`);
      indices.add(i - 1);
    }
  }
  return Array.from(indices).sort((a, b) => a - b);
}

/** Splits a PDF into one buffer per requested range/page. Each output is its own PDF. */
export async function splitPdf(
  input: Buffer,
  mode: 'all' | 'ranges',
  ranges?: string
): Promise<{ name: string; buffer: Buffer }[]> {
  const src = await PDFDocument.load(input);
  const pageCount = src.getPageCount();
  const outputs: { name: string; buffer: Buffer }[] = [];

  if (mode === 'all') {
    for (let i = 0; i < pageCount; i++) {
      const doc = await PDFDocument.create();
      const [page] = await doc.copyPages(src, [i]);
      doc.addPage(page);
      outputs.push({ name: `page-${i + 1}.pdf`, buffer: Buffer.from(await doc.save()) });
    }
    return outputs;
  }

  if (!ranges) throw new Error('ranges is required when mode is "ranges"');
  const groups = ranges.split(';').map((g) => g.trim()).filter(Boolean);
  for (const group of groups) {
    const indices = parsePageRanges(group, pageCount);
    const doc = await PDFDocument.create();
    const copied = await doc.copyPages(src, indices);
    copied.forEach((p) => doc.addPage(p));
    outputs.push({ name: `pages-${group.replace(/[^0-9-]/g, '_')}.pdf`, buffer: Buffer.from(await doc.save()) });
  }
  return outputs;
}

/** Removes the given 1-indexed pages, returns the remaining PDF. */
export async function removePages(input: Buffer, pagesToRemove: string): Promise<Buffer> {
  const src = await PDFDocument.load(input);
  const pageCount = src.getPageCount();
  const removeSet = new Set(parsePageRanges(pagesToRemove, pageCount));
  const keep = src.getPageIndices().filter((i) => !removeSet.has(i));
  if (keep.length === 0) throw new Error('Cannot remove all pages from the document');

  const doc = await PDFDocument.create();
  const copied = await doc.copyPages(src, keep);
  copied.forEach((p) => doc.addPage(p));
  return Buffer.from(await doc.save());
}

/** Extracts only the given 1-indexed pages into a new PDF. */
export async function extractPages(input: Buffer, pagesToExtract: string): Promise<Buffer> {
  const src = await PDFDocument.load(input);
  const indices = parsePageRanges(pagesToExtract, src.getPageCount());
  if (indices.length === 0) throw new Error('No pages selected for extraction');

  const doc = await PDFDocument.create();
  const copied = await doc.copyPages(src, indices);
  copied.forEach((p) => doc.addPage(p));
  return Buffer.from(await doc.save());
}

export interface OrganizeOp {
  originalIndex: number; // 0-indexed page in the source doc
  rotateDegrees?: 0 | 90 | 180 | 270;
  deleted?: boolean;
}

/**
 * Rebuilds the document according to a full ordered list of page operations.
 * `order` is the new page order (array of OrganizeOp); pages marked deleted are skipped.
 */
export async function organizePages(input: Buffer, order: OrganizeOp[]): Promise<Buffer> {
  const src = await PDFDocument.load(input);
  const pageCount = src.getPageCount();
  const kept = order.filter((op) => !op.deleted);
  if (kept.length === 0) throw new Error('Resulting document would have zero pages');
  for (const op of kept) {
    if (op.originalIndex < 0 || op.originalIndex >= pageCount) {
      throw new Error(`originalIndex ${op.originalIndex} out of range`);
    }
  }

  const doc = await PDFDocument.create();
  const copied = await doc.copyPages(src, kept.map((op) => op.originalIndex));
  copied.forEach((page, i) => {
    const rot = kept[i].rotateDegrees;
    if (rot) page.setRotation(degrees(rot));
    doc.addPage(page);
  });
  return Buffer.from(await doc.save());
}

/** Rotates all pages, or a subset, by a fixed angle (90/180/270). */
export async function rotatePdf(
  input: Buffer,
  angle: 90 | 180 | 270,
  pageSpec?: string
): Promise<Buffer> {
  const doc = await PDFDocument.load(input);
  const pageCount = doc.getPageCount();
  const targets = pageSpec ? new Set(parsePageRanges(pageSpec, pageCount)) : null;

  doc.getPages().forEach((page, i) => {
    if (targets && !targets.has(i)) return;
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + angle) % 360));
  });

  return Buffer.from(await doc.save());
}
