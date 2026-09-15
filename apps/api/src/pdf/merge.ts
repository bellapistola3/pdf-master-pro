import { PDFDocument } from 'pdf-lib';

/** Merges multiple PDF buffers, in the given order, into a single PDF buffer. */
export async function mergePdfs(buffers: Buffer[]): Promise<Buffer> {
  if (buffers.length < 2) {
    throw new Error('At least two PDF files are required to merge');
  }
  const merged = await PDFDocument.create();

  for (const buf of buffers) {
    const src = await PDFDocument.load(buf, { ignoreEncryption: false });
    const pageIndices = src.getPageIndices();
    const copiedPages = await merged.copyPages(src, pageIndices);
    copiedPages.forEach((p) => merged.addPage(p));
  }

  const bytes = await merged.save();
  return Buffer.from(bytes);
}
