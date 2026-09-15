import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { getJob } from '../services/jobStore';
import { AuthedRequest } from '../middleware/auth';
import { assertInsideStorage } from '../services/storage';

export const jobsRouter = Router();

jobsRouter.get('/:id', (req: AuthedRequest, res) => {
  const job = getJob(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  // Only the owner (or an anonymous caller matching the original anonymousId) can view it.
  const owner = job.userId ?? job.anonymousId;
  const caller = req.userId ?? req.anonymousId;
  if (owner && owner !== caller) return res.status(403).json({ error: 'Not authorized to view this job' });

  res.json({
    jobId: job.id,
    status: job.status,
    toolType: job.toolType,
    errorMessage: job.errorMessage,
    createdAt: job.createdAt,
    completedAt: job.completedAt,
    expiresAt: job.expiresAt,
    downloadUrl: job.status === 'completed' ? `/api/jobs/${job.id}/download` : null,
  });
});

jobsRouter.get('/:id/download', (req: AuthedRequest, res) => {
  const job = getJob(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  const owner = job.userId ?? job.anonymousId;
  const caller = req.userId ?? req.anonymousId;
  if (owner && owner !== caller) return res.status(403).json({ error: 'Not authorized to download this job' });

  if (job.status !== 'completed') return res.status(409).json({ error: `Job is ${job.status}, not ready for download` });
  if (new Date(job.expiresAt) < new Date()) return res.status(410).json({ error: 'This file has expired and was deleted' });
  if (job.outputFiles.length === 0) return res.status(500).json({ error: 'No output files recorded for this job' });

  // Single-file jobs stream directly; multi-file jobs already produced a .zip in outputFiles[0].
  const filePath = job.outputFiles[0];
  try {
    assertInsideStorage(filePath);
  } catch {
    return res.status(500).json({ error: 'Invalid file path' });
  }
  if (!fs.existsSync(filePath)) return res.status(410).json({ error: 'File no longer available' });

  res.download(filePath, path.basename(filePath).replace(/^[a-zA-Z0-9_-]+-/, ''));
});
