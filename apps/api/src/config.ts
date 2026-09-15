import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

function bool(v: string | undefined, def: boolean): boolean {
  if (v === undefined) return def;
  return v === 'true' || v === '1';
}

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-insecure-secret-change-me',
  storageDir: process.env.STORAGE_DIR || path.resolve(__dirname, '../../storage'),
  maxFileSizeMbFree: parseInt(process.env.MAX_FILE_SIZE_MB_FREE || '25', 10),
  maxFileSizeMbPro: parseInt(process.env.MAX_FILE_SIZE_MB_PRO || '500', 10),
  freeJobExpiryHours: parseInt(process.env.FREE_JOB_EXPIRY_HOURS || '2', 10),
  proJobExpiryHours: parseInt(process.env.PRO_JOB_EXPIRY_HOURS || '24', 10),
  freeDailyOps: parseInt(process.env.FREE_DAILY_OPS || '5', 10),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:8080',
  s3: {
    enabled: bool(process.env.S3_ENABLED, false),
    endpoint: process.env.S3_ENDPOINT || '',
    bucket: process.env.S3_BUCKET || '',
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    region: process.env.S3_REGION || 'auto',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    priceIdPro: process.env.STRIPE_PRICE_ID_PRO || '',
    priceIdBusiness: process.env.STRIPE_PRICE_ID_BUSINESS || '',
  },
  llm: {
    provider: process.env.LLM_PROVIDER || 'none', // 'openai' | 'anthropic' | 'gemini' | 'none'
    apiKey: process.env.LLM_API_KEY || '',
  },
  binaries: {
    qpdf: process.env.QPDF_PATH || 'qpdf',
    gs: process.env.GS_PATH || 'gs',
    pdftoppm: process.env.PDFTOPPM_PATH || 'pdftoppm',
    pdftocairo: process.env.PDFTOCAIRO_PATH || 'pdftocairo',
    tesseract: process.env.TESSERACT_PATH || 'tesseract',
    libreoffice: process.env.LIBREOFFICE_PATH || 'soffice',
  },
};
