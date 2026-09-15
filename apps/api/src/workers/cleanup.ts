import fs from 'fs/promises';
import { listAllJobs, updateJob, deleteJob } from '../services/jobStore';
import { uploadsDir, outputsDir } from '../services/storage';

const CHECK_INTERVAL_MS = 5 * 60 * 1000; // every 5 minutes

async function cleanupOnce() {
  const now = Date.now();
  const jobs = listAllJobs();

  for (const job of jobs) {
    if (job.status !== 'expired' && new Date(job.expiresAt).getTime() < now) {
      for (const file of [...job.inputFiles, ...job.outputFiles]) {
        await fs.unlink(file).catch(() => {});
      }
      updateJob(job.id, { status: 'expired' });
    }
    // Once expired for a further 24h, drop the job record entirely.
    if (job.status === 'expired' && now - new Date(job.expiresAt).getTime() > 24 * 60 * 60 * 1000) {
      deleteJob(job.id);
    }
  }

  // Orphan sweep: any file on disk older than the longest possible retention
  // (Pro expiry) that isn't referenced by any live job gets removed too.
  const referenced = new Set(jobs.flatMap((j) => [...j.inputFiles, ...j.outputFiles]));
  for (const dir of [uploadsDir, outputsDir]) {
    const entries = await fs.readdir(dir).catch(() => []);
    for (const entry of entries) {
      const full = `${dir}/${entry}`;
      if (referenced.has(full)) continue;
      const stat = await fs.stat(full).catch(() => null);
      if (stat && now - stat.mtimeMs > 26 * 60 * 60 * 1000) {
        await fs.unlink(full).catch(() => {});
      }
    }
  }
}

export function startCleanupWorker() {
  cleanupOnce().catch((e) => console.error('[cleanup] initial run failed:', e));
  setInterval(() => {
    cleanupOnce().catch((e) => console.error('[cleanup] run failed:', e));
  }, CHECK_INTERVAL_MS);
  console.log('[cleanup] worker started, interval =', CHECK_INTERVAL_MS, 'ms');
}
