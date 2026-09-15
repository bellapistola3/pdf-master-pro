import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { runBinary, ToolExecutionError } from '../services/exec';
import { config } from '../config';

export type CompressionLevel = 'low' | 'medium' | 'high';

const GS_SETTINGS: Record<CompressionLevel, string> = {
  low: '/prepress',   // best quality, least compression
  medium: '/ebook',
  high: '/screen',    // smallest size
};

export async function compressPdf(
  input: Buffer,
  level: CompressionLevel
): Promise<{ buffer: Buffer; originalSize: number; compressedSize: number }> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-compress-'));
  const inPath = path.join(tmpDir, 'in.pdf');
  const outPath = path.join(tmpDir, 'out.pdf');
  await fs.writeFile(inPath, input);

  await runBinary(config.binaries.gs, [
    '-sDEVICE=pdfwrite',
    '-dCompatibilityLevel=1.4',
    `-dPDFSETTINGS=${GS_SETTINGS[level]}`,
    '-dNOPAUSE', '-dQUIET', '-dBATCH',
    `-sOutputFile=${outPath}`,
    inPath,
  ], { timeoutMs: 180_000 });

  const buffer = await fs.readFile(outPath);
  await fs.rm(tmpDir, { recursive: true, force: true });
  return { buffer, originalSize: input.length, compressedSize: buffer.length };
}

/** Adds password protection and permission restrictions using qpdf. */
export async function protectPdf(
  input: Buffer,
  opts: { userPassword: string; ownerPassword?: string; allowPrinting?: boolean; allowCopying?: boolean }
): Promise<Buffer> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-protect-'));
  const inPath = path.join(tmpDir, 'in.pdf');
  const outPath = path.join(tmpDir, 'out.pdf');
  await fs.writeFile(inPath, input);

  const owner = opts.ownerPassword || opts.userPassword;
  const args = [
    '--encrypt', opts.userPassword, owner, '256',
    `--print=${opts.allowPrinting === false ? 'none' : 'full'}`,
    `--extract=${opts.allowCopying === false ? 'n' : 'y'}`,
    '--',
    inPath, outPath,
  ];

  await runBinary(config.binaries.qpdf, args, { timeoutMs: 60_000 });
  const buffer = await fs.readFile(outPath);
  await fs.rm(tmpDir, { recursive: true, force: true });
  return buffer;
}

/** Removes password protection — requires the correct password to be supplied by the user. */
export async function unlockPdf(input: Buffer, password: string): Promise<Buffer> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-unlock-'));
  const inPath = path.join(tmpDir, 'in.pdf');
  const outPath = path.join(tmpDir, 'out.pdf');
  await fs.writeFile(inPath, input);

  try {
    await runBinary(config.binaries.qpdf, [`--password=${password}`, '--decrypt', inPath, outPath], {
      timeoutMs: 60_000,
    });
  } catch (e) {
    await fs.rm(tmpDir, { recursive: true, force: true });
    if (e instanceof ToolExecutionError) {
      throw new Error('Incorrect password, or file could not be decrypted');
    }
    throw e;
  }

  const buffer = await fs.readFile(outPath);
  await fs.rm(tmpDir, { recursive: true, force: true });
  return buffer;
}

/**
 * Attempts to repair a damaged/malformed PDF by round-tripping it through
 * qpdf (which rebuilds the xref table and object streams). If qpdf can't
 * parse it at all, we surface a clear, human-readable error rather than a
 * silently corrupt output.
 */
export async function repairPdf(input: Buffer): Promise<Buffer> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-repair-'));
  const inPath = path.join(tmpDir, 'in.pdf');
  const outPath = path.join(tmpDir, 'out.pdf');
  await fs.writeFile(inPath, input);

  try {
    await runBinary(config.binaries.qpdf, [inPath, outPath], { timeoutMs: 60_000 });
  } catch (e) {
    await fs.rm(tmpDir, { recursive: true, force: true });
    throw new Error(
      'This PDF is too badly damaged to repair automatically. Common causes: truncated download, ' +
        'non-PDF content saved with a .pdf extension, or corrupted storage media.'
    );
  }

  const buffer = await fs.readFile(outPath);
  await fs.rm(tmpDir, { recursive: true, force: true });
  return buffer;
}

/** Converts to PDF/A (archival format) using Ghostscript's PDF/A output intent. */
export async function convertToPdfA(input: Buffer): Promise<Buffer> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-a-'));
  const inPath = path.join(tmpDir, 'in.pdf');
  const outPath = path.join(tmpDir, 'out.pdf');
  await fs.writeFile(inPath, input);

  try {
    await runBinary(config.binaries.gs, [
      '-dPDFA=2', '-dBATCH', '-dNOPAUSE', '-dQUIET',
      '-sColorConversionStrategy=UseDeviceIndependentColor',
      '-sDEVICE=pdfwrite', '-dPDFACompatibilityPolicy=1',
      `-sOutputFile=${outPath}`, inPath,
    ], { timeoutMs: 180_000 });
  } catch (e) {
    await fs.rm(tmpDir, { recursive: true, force: true });
    throw new Error('PDF/A conversion failed — the source file may use unsupported fonts or color profiles.');
  }

  const buffer = await fs.readFile(outPath);
  await fs.rm(tmpDir, { recursive: true, force: true });
  return buffer;
}
