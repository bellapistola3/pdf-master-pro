import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';
import { uploadsDir } from '../services/storage';
import { config } from '../config';
import { AuthedRequest } from './auth';

const ALLOWED_MIME = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

function maxSizeBytesFor(req: AuthedRequest): number {
  const mb = req.plan === 'free' ? config.maxFileSizeMbFree : config.maxFileSizeMbPro;
  return mb * 1024 * 1024;
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    // Never trust the client's filename for the on-disk name — prevents path traversal
    // and collisions. The original name is preserved only in metadata/response.
    const ext = path.extname(file.originalname).toLowerCase().replace(/[^a-z0-9.]/g, '');
    cb(null, `${nanoid()}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: config.maxFileSizeMbPro * 1024 * 1024, files: 50 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
    const maxBytes = maxSizeBytesFor(req as AuthedRequest);
    // Per-plan size is enforced again after multer (which uses a global ceiling above)
    // because multer's limits run before req.plan is always resolved for some routes.
    (req as any)._maxBytesForPlan = maxBytes;
    cb(null, true);
  },
});

export function enforcePlanFileSize(req: AuthedRequest, res: any, next: any) {
  const maxBytes = maxSizeBytesFor(req);
  let files: Express.Multer.File[] = [];
  if (Array.isArray(req.files)) {
    files = req.files;
  } else if (req.files && typeof req.files === 'object') {
    files = Object.values(req.files).flat() as Express.Multer.File[];
  } else if (req.file) {
    files = [req.file];
  }
  for (const f of files) {
    if (f.size > maxBytes) {
      return res.status(413).json({
        error: `File "${f.originalname}" exceeds the ${req.plan} plan limit of ${maxBytes / (1024 * 1024)}MB`,
      });
    }
  }
  next();
}
