import { Response, NextFunction } from 'express';
import { AuthedRequest } from './auth';
import { config } from '../config';
import { listAllJobs } from '../services/jobStore';

/**
 * MVP quota check: counts today's completed/queued jobs for this identity.
 * PRODUCTION: replace with a `usage_limits` table + atomic counter (see
 * docs/DATABASE.md) to avoid the O(n) scan below at scale.
 */
export function enforceDailyQuota(req: AuthedRequest, res: Response, next: NextFunction) {
  if (req.plan !== 'free') return next();

  const identity = req.userId ?? req.anonymousId ?? 'unknown';
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const jobsToday = listAllJobs().filter((j) => {
    const owner = j.userId ?? j.anonymousId;
    return owner === identity && new Date(j.createdAt) >= startOfDay;
  });

  if (jobsToday.length >= config.freeDailyOps) {
    return res.status(429).json({
      error: `Free plan limit reached (${config.freeDailyOps} operations/day). Upgrade to Pro for higher limits.`,
    });
  }
  next();
}
