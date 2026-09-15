import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { nanoid } from 'nanoid';
import { config } from '../config';

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

/**
 * MVP persistence: JSON file on disk (same pattern as jobStore.ts).
 * See docs/DATABASE.md for the Postgres/Prisma swap — the function
 * signatures below are the contract a repository needs to implement.
 */
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

export function findUserByEmail(email: string): StoredUser | null {
  return loadAll().find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function findUserById(id: string): StoredUser | null {
  return loadAll().find((u) => u.id === id) ?? null;
}

export function findUserByStripeCustomerId(customerId: string): StoredUser | null {
  return loadAll().find((u) => u.stripeCustomerId === customerId) ?? null;
}

export function createUser(email: string, password: string): StoredUser {
  const users = loadAll();
  const salt = nanoid(16);
  const user: StoredUser = {
    id: nanoid(),
    email,
    passwordHash: hashPassword(password, salt),
    salt,
    plan: 'free',
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(user);
  persist(users);
  return user;
}

export function updateUser(id: string, patch: Partial<StoredUser>): StoredUser | null {
  const users = loadAll();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...patch, updatedAt: new Date().toISOString() };
  persist(users);
  return users[idx];
}
