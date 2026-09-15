import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { findUserById } from '../services/userStore';

export interface AuthedRequest extends Request {
  userId?: string;
  anonymousId?: string;
  plan?: 'free' | 'pro' | 'business';
}

/**
 * Attaches userId (if a valid JWT is present) or anonymousId (from header) to the request.
 * Plan is re-read from the user store on every request — NOT trusted from the JWT — so a
 * Stripe webhook that upgrades someone's plan takes effect on their very next call.
 * Never blocks the request.
 */
export function identify(req: AuthedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    try {
      const token = authHeader.slice('Bearer '.length);
      const payload = jwt.verify(token, config.jwtSecret) as { sub: string };
      const user = findUserById(payload.sub);
      if (user) {
        req.userId = user.id;
        req.plan = user.plan;
        return next();
      }
      // Token valid but user no longer exists (e.g. deleted) — fall through to anonymous.
    } catch {
      // Invalid/expired token — fall through to anonymous.
    }
  }
  req.anonymousId = (req.headers['x-anonymous-id'] as string) || req.ip || 'unknown';
  req.plan = 'free';
  next();
}

/** Blocks the request unless a valid JWT identified a real user. */
export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  if (!req.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}
