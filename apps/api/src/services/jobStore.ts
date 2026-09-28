import fs from 'fs';
import path from 'path';
import { config } from '../config';
import { pool, usingDatabase } from './db';

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

// ---------------------------------------------------------------------------
// JSON-file fallback (used only when DATABASE_URL is not set). See db.ts.
// ---------------------------------------------------------------------------
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

function rowToJob(row: any): Job {
  return {
    id: row.id,
    userId: row.user_id,
    anonymousId: row.anonymous_id,
    toolType: row.tool_type,
    status: row.status,
    inputFiles: row.input_files ?? [],
    outputFiles: row.output_files ?? [],
    errorMessage: row.error_message,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    completedAt: row.completed_at instanceof Date ? row.completed_at.toISOString() : row.completed_at,
    expiresAt: row.expires_at instanceof Date ? row.expires_at.toISOString() : row.expires_at,
  };
}

export async function createJob(job: Job): Promise<Job> {
  if (usingDatabase) {
    await pool!.query(
      `INSERT INTO jobs (id, user_id, anonymous_id, tool_type, status, input_files, output_files, error_message, created_at, completed_at, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        job.id,
        job.userId,
        job.anonymousId,
        job.toolType,
        job.status,
        JSON.stringify(job.inputFiles),
        JSON.stringify(job.outputFiles),
        job.errorMessage,
        job.createdAt,
        job.completedAt,
        job.expiresAt,
      ]
    );
    return job;
  }

  const all = loadAll();
  all[job.id] = job;
  persist(all);
  return job;
}

export async function getJob(id: string): Promise<Job | null> {
  if (usingDatabase) {
    const { rows } = await pool!.query('SELECT * FROM jobs WHERE id = $1', [id]);
    return rows[0] ? rowToJob(rows[0]) : null;
  }
  const all = loadAll();
  return all[id] ?? null;
}

export async function updateJob(id: string, patch: Partial<Job>): Promise<Job | null> {
  if (usingDatabase) {
    const colMap: Record<string, string> = {
      status: 'status',
      inputFiles: 'input_files',
      outputFiles: 'output_files',
      errorMessage: 'error_message',
      completedAt: 'completed_at',
      expiresAt: 'expires_at',
    };
    const fields: string[] = [];
    const values: any[] = [];
    let i = 1;
    for (const [key, col] of Object.entries(colMap)) {
      if (key in patch) {
        const val = (patch as any)[key];
        fields.push(`${col} = $${i++}`);
        values.push(key === 'inputFiles' || key === 'outputFiles' ? JSON.stringify(val) : val);
      }
    }
    if (fields.length === 0) return getJob(id);
    values.push(id);
    const { rows } = await pool!.query(`UPDATE jobs SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`, values);
    return rows[0] ? rowToJob(rows[0]) : null;
  }

  const all = loadAll();
  const existing = all[id];
  if (!existing) return null;
  const updated = { ...existing, ...patch };
  all[id] = updated;
  persist(all);
  return updated;
}

export async function listJobsForUser(userId: string): Promise<Job[]> {
  if (usingDatabase) {
    const { rows } = await pool!.query('SELECT * FROM jobs WHERE user_id = $1', [userId]);
    return rows.map(rowToJob);
  }
  const all = loadAll();
  return Object.values(all).filter((j) => j.userId === userId);
}

export async function listAllJobs(): Promise<Job[]> {
  if (usingDatabase) {
    const { rows } = await pool!.query('SELECT * FROM jobs');
    return rows.map(rowToJob);
  }
  return Object.values(loadAll());
}

export async function deleteJob(id: string): Promise<void> {
  if (usingDatabase) {
    await pool!.query('DELETE FROM jobs WHERE id = $1', [id]);
    return;
  }
  const all = loadAll();
  delete all[id];
  persist(all);
}
