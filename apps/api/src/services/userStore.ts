import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { nanoid } from 'nanoid';
import { config } from '../config';
import { pool, usingDatabase } from './db';

export type Plan = 'free' | 'pro' | 'business';

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  plan: Plan;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// JSON-file fallback (used only when DATABASE_URL is not set — local dev, or
// before Postgres is configured). NOT safe for production on a host without
// a persistent disk: see docs/DATABASE.md.
// ---------------------------------------------------------------------------
const USERS_FILE = path.join(config.storageDir, 'users.json');

function loadAll(): StoredUser[] {
  if (!fs.existsSync(USERS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function persist(users: StoredUser[]) {
  fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function rowToUser(row: any): StoredUser {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    salt: row.salt,
    plan: row.plan,
    stripeCustomerId: row.stripe_customer_id,
    stripeSubscriptionId: row.stripe_subscription_id,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at,
  };
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  if (usingDatabase) {
    const { rows } = await pool!.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
    return rows[0] ? rowToUser(rows[0]) : null;
  }
  return loadAll().find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  if (usingDatabase) {
    const { rows } = await pool!.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] ? rowToUser(rows[0]) : null;
  }
  return loadAll().find((u) => u.id === id) ?? null;
}

export async function findUserByStripeCustomerId(customerId: string): Promise<StoredUser | null> {
  if (usingDatabase) {
    const { rows } = await pool!.query('SELECT * FROM users WHERE stripe_customer_id = $1', [customerId]);
    return rows[0] ? rowToUser(rows[0]) : null;
  }
  return loadAll().find((u) => u.stripeCustomerId === customerId) ?? null;
}

export async function createUser(email: string, password: string): Promise<StoredUser> {
  const salt = nanoid(16);
  const passwordHash = hashPassword(password, salt);
  const now = new Date().toISOString();
  const user: StoredUser = {
    id: nanoid(),
    email,
    passwordHash,
    salt,
    plan: 'free',
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    createdAt: now,
    updatedAt: now,
  };

  if (usingDatabase) {
    await pool!.query(
      `INSERT INTO users (id, email, password_hash, salt, plan, stripe_customer_id, stripe_subscription_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [user.id, user.email, user.passwordHash, user.salt, user.plan, user.stripeCustomerId, user.stripeSubscriptionId, user.createdAt, user.updatedAt]
    );
    return user;
  }

  const users = loadAll();
  users.push(user);
  persist(users);
  return user;
}

export async function updateUser(id: string, patch: Partial<StoredUser>): Promise<StoredUser | null> {
  const updatedAt = new Date().toISOString();

  if (usingDatabase) {
    const fields: string[] = [];
    const values: any[] = [];
    let i = 1;
    const colMap: Record<string, string> = {
      email: 'email',
      passwordHash: 'password_hash',
      salt: 'salt',
      plan: 'plan',
      stripeCustomerId: 'stripe_customer_id',
      stripeSubscriptionId: 'stripe_subscription_id',
    };
    for (const [key, col] of Object.entries(colMap)) {
      if (key in patch) {
        fields.push(`${col} = $${i++}`);
        values.push((patch as any)[key]);
      }
    }
    fields.push(`updated_at = $${i++}`);
    values.push(updatedAt);
    values.push(id);
    const { rows } = await pool!.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`,
      values
    );
    return rows[0] ? rowToUser(rows[0]) : null;
  }

  const users = loadAll();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...patch, updatedAt };
  persist(users);
  return users[idx];
}
