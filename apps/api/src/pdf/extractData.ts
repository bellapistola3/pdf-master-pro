import { extractText } from './textExtract';

export interface ExtractedData {
  emails: string[];
  phones: string[];
  dates: string[];
  amounts: string[];
  possibleNames: string[];
  /** Table-like rows heuristically detected (lines with 2+ column gaps under -layout mode). */
  tableRows: string[][];
}

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_RE = /(?:\+\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?){2,5}\d{2,4}/g;
const DATE_RE = /\b(\d{1,2}[./-]\d{1,2}[./-]\d{2,4}|\d{4}-\d{2}-\d{2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4})\b/gi;
const AMOUNT_RE = /(?:[$€£]|\bBGN\b|\bUSD\b|\bEUR\b)\s?\d{1,3}(?:[,.\s]\d{3})*(?:[.,]\d{2})?\b/g;
// Heuristic: two capitalized words in a row (very approximate — not real NER).
const NAME_RE = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;

function dedupe(arr: string[]): string[] {
  return Array.from(new Set(arr.map((s) => s.trim()))).filter(Boolean);
}

export async function extractDataFromPdf(pdfBuffer: Buffer): Promise<ExtractedData> {
  const plainText = await extractText(pdfBuffer);
  const layoutText = await extractText(pdfBuffer, { layout: true });

  const tableRows = layoutText
    .split('\n')
    .filter((line) => /\s{3,}/.test(line.trim()))
    .map((line) => line.trim().split(/\s{3,}/));

  return {
    emails: dedupe(plainText.match(EMAIL_RE) ?? []),
    phones: dedupe((plainText.match(PHONE_RE) ?? []).filter((p) => p.replace(/\D/g, '').length >= 7)),
    dates: dedupe(plainText.match(DATE_RE) ?? []),
    amounts: dedupe(plainText.match(AMOUNT_RE) ?? []),
    possibleNames: dedupe(plainText.match(NAME_RE) ?? []).slice(0, 200),
    tableRows: tableRows.slice(0, 500),
  };
}
