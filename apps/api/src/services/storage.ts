import fs from 'fs/promises';
import fssync from 'fs';
import path from 'path';
import { config } from '../config';

/**
 * Storage abstraction.
 *
 * DEV/DEFAULT: local disk under STORAGE_DIR.
 * PRODUCTION: set S3_ENABLED=true and fill in S3_* env vars, then swap the
 * implementation below for an S3-compatible client (e.g. @aws-sdk/client-s3).
 * The interface (put/get/remove/exists) is intentionally storage-agnostic so
 * that swap is a single-file change — see docs/STORAGE.md.
 */

function ensureDir(dir: string) {
  if (!fssync.existsSync(dir)) fssync.mkdirSync(dir, { recursive: true });
}

export const uploadsDir = path.join(config.storageDir, 'uploads');
export const outputsDir = path.join(config.storageDir, 'outputs');

ensureDir(uploadsDir);
ensureDir(outputsDir);

export async function saveBuffer(dir: string, filename: string, data: Buffer): Promise<string> {
  const full = path.join(dir, filename);
  await fs.writeFile(full, data);
  return full;
}

export async function readFileBuffer(fullPath: string): Promise<Buffer> {
  assertInsideStorage(fullPath);
  return fs.readFile(fullPath);
}

export async function removeFile(fullPath: string): Promise<void> {
  try {
    assertInsideStorage(fullPath);
    await fs.unlink(fullPath);
  } catch {
    /* already gone — fine */
  }
}

/** Prevents path traversal: every file access must resolve inside STORAGE_DIR. */
export function assertInsideStorage(fullPath: string) {
  const resolved = path.resolve(fullPath);
  const root = path.resolve(config.storageDir);
  if (!resolved.startsWith(root + path.sep) && resolved !== root) {
    throw new Error('Path traversal blocked: file outside storage root');
  }
}

export async function listExpired(dir: string, maxAgeMs: number): Promise<string[]> {
  const entries = await fs.readdir(dir);
  const now = Date.now();
  const expired: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = await fs.stat(full).catch(() => null);
    if (stat && now - stat.mtimeMs > maxAgeMs) {
      expired.push(full);
    }
  }
  return expired;
}
