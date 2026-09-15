import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { config } from './config';
import { identify } from './middleware/auth';
import { toolsRouter } from './routes/tools';
import { toolsAdvancedRouter } from './routes/toolsAdvanced';
import { jobsRouter } from './routes/jobs';
import { authRouter } from './routes/auth';
import { billingRouter } from './routes/billing';
import { startCleanupWorker } from './workers/cleanup';

const app = express();

app.set('trust proxy', 1); // required for correct client IPs / rate limiting behind Render/Fly/Vercel/any reverse proxy

app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin === '*' ? true : config.corsOrigin.split(','),
    credentials: true,
  })
);
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

// Stripe webhook needs the raw body for signature verification, so it's
// mounted BEFORE the JSON body parser with its own raw handling.
app.use('/api/billing/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Global rate limit — generous, since per-tool/per-plan quotas are enforced separately.
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please slow down.' },
  })
);

app.use(identify);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use('/api/auth', authRouter);
app.use('/api/billing', billingRouter);
app.use('/api/tools', toolsRouter);
app.use('/api/tools', toolsAdvancedRouter);
app.use('/api/jobs', jobsRouter);

// Central error handler — never leaks stack traces to clients.
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
});

const server = app.listen(config.port, () => {
  console.log(`PDF Master Pro API listening on port ${config.port} (${config.nodeEnv})`);
  startCleanupWorker();
});

// Graceful shutdown — important on Render/Fly/Railway, which send SIGTERM
// before restarting/redeploying a container and expect it to exit cleanly.
function shutdown(signal: string) {
  console.log(`[server] received ${signal}, shutting down gracefully...`);
  server.close(() => {
    console.log('[server] closed all connections, exiting.');
    process.exit(0);
  });
  // Force-exit if connections don't close within 10s.
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
