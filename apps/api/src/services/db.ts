import { Pool } from 'pg';
import { config } from '../config';

/**
 * Postgres connection pool. Only created when DATABASE_URL is set — when it
 * isn't, userStore.ts / jobStore.ts fall back to the original JSON-file
 * persistence (fine for local dev, not fine for a production deploy on a
 * host without a persistent disk, e.g. Render's free plan).
 */
export const pool = config.databaseUrl
  ? new Pool({
      connectionString: config.databaseUrl,
      // Most managed Postgres providers (Neon, Render, Supabase) require SSL
      // and use certs not in Node's default trust store — this is the
      // standard relaxed setting recommended by all three for app servers.
      ssl: { rejectUnauthorized: false },
    })
  : null;

export const usingDatabase = !!pool;

let initialized: Promise<void> | null = null;

/** Creates the users/jobs tables if they don't exist yet. Safe to call every boot. */
export function initDb(): Promise<void> {
  if (!pool) return Promise.resolve();
  if (initialized) return initialized;
  initialized = (async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        plan TEXT NOT NULL DEFAULT 'free',
        stripe_customer_id TEXT,
        stripe_subscription_id TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS users_email_lower_idx ON users (LOWER(email));`);
    await pool.query(`CREATE INDEX IF NOT EXISTS users_stripe_customer_idx ON users (stripe_customer_id);`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        anonymous_id TEXT,
        tool_type TEXT NOT NULL,
        status TEXT NOT NULL,
        input_files JSONB NOT NULL DEFAULT '[]',
        output_files JSONB NOT NULL DEFAULT '[]',
        error_message TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        completed_at TIMESTAMPTZ,
        expires_at TIMESTAMPTZ NOT NULL
      );
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS jobs_owner_idx ON jobs (user_id, anonymous_id, created_at);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS jobs_expires_idx ON jobs (status, expires_at);`);

    console.log('[db] Postgres connected and schema ready.');
  })();
  return initialized;
}
