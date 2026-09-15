import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { createUser, findUserByEmail, findUserById, hashPassword } from '../services/userStore';

export const authRouter = Router();

/**
 * JWTs only carry the user id (`sub`) — NOT the plan. The plan is looked up
 * fresh from the user store on every request (see middleware/auth.ts). This
 * means a Stripe webhook upgrading someone's plan takes effect on their very
 * next API call, without needing to force a re-login / token refresh.
 */

authRouter.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 8) {
    return res.status(400).json({ error: 'email and password (min 8 chars) are required' });
  }
  if (findUserByEmail(email)) {
    return res.status(409).json({ error: 'An account with this email already exists' });
  }
  const user = createUser(email, password);
  const token = jwt.sign({ sub: user.id }, config.jwtSecret, { expiresIn: '30d' });
  res.status(201).json({ token, user: { id: user.id, email: user.email, plan: user.plan } });
});

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email || '');
  if (!user || hashPassword(password || '', user.salt) !== user.passwordHash) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ sub: user.id }, config.jwtSecret, { expiresIn: '30d' });
  res.json({ token, user: { id: user.id, email: user.email, plan: user.plan } });
});

authRouter.get('/me', (req: any, res) => {
  // Requires identify() middleware (mounted globally in server.ts) to have run.
  if (!req.userId) return res.status(401).json({ error: 'Authentication required' });
  const user = findUserById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, email: user.email, plan: user.plan });
});

authRouter.post('/forgot-password', (_req, res) => {
  // MVP: acknowledges the request without leaking whether the email exists.
  // PRODUCTION: send a signed, time-limited reset link via a transactional
  // email provider (Postmark/SES/Resend) — see docs/DATABASE.md notes.
  res.json({ message: 'If an account exists for this email, a reset link has been sent.' });
});
