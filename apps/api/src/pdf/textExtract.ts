import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { runBinary } from '../services/exec';
import { config } from '../config';

/** Extracts plain text from a PDF using Poppler's pdftotext (-layout preserves rough column layout). */
export async function extractText(pdfBuffer: Buffer, opts: { layout?: boolean } = {}): Promise<string> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-text-'));
  const inPath = path.join(tmpDir, 'in.pdf');
  const outPath = path.join(tmpDir, 'out.txt');
  await fs.writeFile(inPath, pdfBuffer);

  const args = opts.layout ? ['-layout', inPath, outPath] : [inPath, outPath];
  await runBinary('pdftotext', args, { timeoutMs: 60_000 });

  const text = await fs.readFile(outPath, 'utf-8');
  await fs.rm(tmpDir, { recursive: true, force: true });
  return text;
}
