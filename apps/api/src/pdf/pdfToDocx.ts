import { Document, Packer, Paragraph } from 'docx';
import { extractText } from './textExtract';

/**
 * BASIC PDF → Word conversion: extracts text (via Poppler) and lays it out
 * as paragraphs in a real .docx file. This intentionally does NOT attempt to
 * reconstruct complex layouts, embedded images, or multi-column flows —
 * for documents like that, warn the user that layout will differ from the
 * source (per product spec section D.16).
 */
export async function pdfToBasicDocx(pdfBuffer: Buffer): Promise<Buffer> {
  const text = await extractText(pdfBuffer);
  const pages = text.split('\f');

  const paragraphs: Paragraph[] = [];
  pages.forEach((pageText, pageIdx) => {
    const lines = pageText.split('\n');
    for (const line of lines) {
      paragraphs.push(new Paragraph(line));
    }
    if (pageIdx < pages.length - 1) {
      paragraphs.push(new Paragraph({ text: '', pageBreakBefore: true }));
    }
  });

  const doc = new Document({ sections: [{ children: paragraphs }] });
  return Packer.toBuffer(doc);
}
