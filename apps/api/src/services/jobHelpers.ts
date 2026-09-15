import { nanoid } from 'nanoid';
import path from 'path';
import { createJob, updateJob, Job } from './jobStore';
import { outputsDir, saveBuffer } from './storage';
import { config } from '../config';
import { AuthedRequest } from '../middleware/auth';

export function expiryFor(plan: string | undefined): Date {
  const hours = plan === 'free' || !plan ? config.freeJobExpiryHours : config.proJobExpiryHours;
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

/**
 * Runs `work` (the actual PDF tool call) inside a tracked Job record.
 * On success, each output buffer is saved to disk and the job is marked completed.
 * On failure, the job is marked failed with a human-readable error message.
 */
export async function runJob(
  req: AuthedRequest,
  toolType: string,
  inputFileNames: string[],
  work: () => Promise<{ name: string; buffer: Buffer }[]>
): Promise<Job> {
  const id = nanoid();
  const job = createJob({
    id,
    userId: req.userId ?? null,
    anonymousId: req.anonymousId ?? null,
    toolType,
    status: 'processing',
    inputFiles: inputFileNames,
    outputFiles: [],
    errorMessage: null,
    createdAt: new Date().toISOString(),
    completedAt: null,
    expiresAt: expiryFor(req.plan).toISOString(),
  });

  try {
    const results = await work();
    const outputPaths: string[] = [];
    for (const r of results) {
      const safeName = `${id}-${r.name}`.replace(/[^a-zA-Z0-9._-]/g, '_');
      const fullPath = await saveBuffer(outputsDir, safeName, r.buffer);
      outputPaths.push(fullPath);
    }
    return updateJob(id, {
      status: 'completed',
      outputFiles: outputPaths,
      completedAt: new Date().toISOString(),
    })!;
  } catch (err: any) {
    return updateJob(id, {
      status: 'failed',
      errorMessage: err?.message || 'Unknown processing error',
      completedAt: new Date().toISOString(),
    })!;
  }
}
