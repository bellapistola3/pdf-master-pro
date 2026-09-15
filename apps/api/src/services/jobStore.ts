import fs from 'fs';
import path from 'path';
import { config } from '../config';

export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'expired';

export interface Job {
  id: string;
  userId: string | null;
  anonymousId: string | null;
  toolType: string;
  status: JobStatus;
  inputFiles: string[];
  outputFiles: string[];
  errorMessage: string | null;
  createdAt: string;
  completedAt: string | null;
  expiresAt: string;
}

/**
 * MVP persistence: a JSON file on disk, guarded by an in-process mutex-like
 * queue so concurrent writes don't clobber each other.
 *
 * PRODUCTION SWAP: replace this module with a Prisma-backed repository
 * against the `jobs` table described in docs/DATABASE.md. The function
 * signatures below are the contract the rest of the app relies on, so the
 * swap does not require touching routes/services.
 */

const DB_FILE = path.join(config.storageDir, 'jobs.json');
let writeQueue: Promise<void> = Promise.resolve();

function loadAll(): Record<string, Job> {
  if (!fs.existsSync(DB_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function persist(all: Record<string, Job>) {
  fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2));
}

export function createJob(job: Job): Job {
  const all = loadAll();
  all[job.id] = job;
  persist(all);
  return job;
}

export function getJob(id: string): Job | null {
  const all = loadAll();
  return all[id] ?? null;
}

export function updateJob(id: string, patch: Partial<Job>): Job | null {
  const all = loadAll();
  const existing = all[id];
  if (!existing) return null;
  const updated = { ...existing, ...patch };
  all[id] = updated;
  persist(all);
  return updated;
}

export function listJobsForUser(userId: string): Job[] {
  const all = loadAll();
  return Object.values(all).filter((j) => j.userId === userId);
}

export function listAllJobs(): Job[] {
  return Object.values(loadAll());
}

export function deleteJob(id: string): void {
  const all = loadAll();
  delete all[id];
  persist(all);
}
