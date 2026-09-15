import { Router } from 'express';
import fs from 'fs/promises';
import archiver from 'archiver';
import { upload, enforcePlanFileSize } from '../middleware/upload';
import { AuthedRequest } from '../middleware/auth';
import { enforceDailyQuota } from '../middleware/quota';
import { runJob } from '../services/jobHelpers';
import { getJob } from '../services/jobStore';
import { readFileBuffer } from '../services/storage';

import { mergePdfs } from '../pdf/merge';
import { splitPdf, removePages, extractPages, organizePages, rotatePdf, OrganizeOp } from '../pdf/pageOps';
import { addTextWatermark, addImageWatermark, addPageNumbers, Position } from '../pdf/watermark';
import { signPdf } from '../pdf/sign';
import { imagesToPdf, pdfToImages, PageSize, Orientation, Margin } from '../pdf/images';
import { compressPdf, protectPdf, unlockPdf, repairPdf, convertToPdfA, CompressionLevel } from '../pdf/security';

export const toolsRouter = Router();

// ---- Organize: merge ----
toolsRouter.post(
  '/merge',
  upload.array('files', 30),
  enforcePlanFileSize,
  enforceDailyQuota,
  async (req: AuthedRequest, res) => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length < 2) return res.status(400).json({ error: 'Upload at least 2 PDF files' });

    const job = await runJob(req, 'merge', files.map((f) => f.path), async () => {
      const buffers = await Promise.all(files.map((f) => fs.readFile(f.path)));
      const merged = await mergePdfs(buffers);
      return [{ name: 'merged.pdf', buffer: merged }];
    });
    res.json(jobResponse(job));
  }
);

// ---- Organize: split ----
toolsRouter.post('/split', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  const mode = (req.body.mode as 'all' | 'ranges') || 'all';
  const ranges = req.body.ranges as string | undefined;

  const job = await runJob(req, 'split', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const parts = await splitPdf(buf, mode, ranges);
    return parts;
  });
  res.json(jobResponse(job));
});

// ---- Organize: remove pages ----
toolsRouter.post('/remove-pages', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  if (!req.body.pages) return res.status(400).json({ error: '"pages" (e.g. "2,4-6") is required' });

  const job = await runJob(req, 'remove-pages', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const out = await removePages(buf, req.body.pages);
    return [{ name: 'removed-pages.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

// ---- Organize: extract pages ----
toolsRouter.post('/extract-pages', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  if (!req.body.pages) return res.status(400).json({ error: '"pages" (e.g. "2,4-6") is required' });

  const job = await runJob(req, 'extract-pages', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const out = await extractPages(buf, req.body.pages);
    return [{ name: 'extracted-pages.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

// ---- Organize: reorder/rotate/delete via visual sorter ----
toolsRouter.post('/organize', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  let order: OrganizeOp[];
  try {
    order = JSON.parse(req.body.order);
  } catch {
    return res.status(400).json({ error: '"order" must be a JSON array of { originalIndex, rotateDegrees?, deleted? }' });
  }

  const job = await runJob(req, 'organize', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const out = await organizePages(buf, order);
    return [{ name: 'organized.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

// ---- Edit: rotate ----
toolsRouter.post('/rotate', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  const angle = parseInt(req.body.angle, 10);
  if (![90, 180, 270].includes(angle)) return res.status(400).json({ error: 'angle must be 90, 180, or 270' });

  const job = await runJob(req, 'rotate', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const out = await rotatePdf(buf, angle as 90 | 180 | 270, req.body.pages);
    return [{ name: 'rotated.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

// ---- Edit: page numbers ----
toolsRouter.post('/page-numbers', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  const position = (req.body.position as Position) || 'bottom-center';

  const job = await runJob(req, 'page-numbers', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const out = await addPageNumbers(buf, {
      position,
      startPage: req.body.startPage ? parseInt(req.body.startPage, 10) : undefined,
      startNumber: req.body.startNumber ? parseInt(req.body.startNumber, 10) : undefined,
      format: req.body.format,
    });
    return [{ name: 'numbered.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

// ---- Edit: watermark (text or image) ----
toolsRouter.post(
  '/watermark',
  upload.fields([{ name: 'file', maxCount: 1 }, { name: 'watermarkImage', maxCount: 1 }]),
  enforcePlanFileSize,
  enforceDailyQuota,
  async (req: AuthedRequest, res) => {
    const files = req.files as { [field: string]: Express.Multer.File[] };
    const pdfFile = files?.file?.[0];
    if (!pdfFile) return res.status(400).json({ error: 'Upload a PDF file' });
    const position = (req.body.position as Position) || 'center';

    const job = await runJob(req, 'watermark', [pdfFile.path], async () => {
      const buf = await fs.readFile(pdfFile.path);
      let out: Buffer;
      if (files?.watermarkImage?.[0]) {
        const imgFile = files.watermarkImage[0];
        const imgBuf = await fs.readFile(imgFile.path);
        out = await addImageWatermark(buf, {
          imageBuffer: imgBuf,
          imageType: imgFile.mimetype.includes('png') ? 'png' : 'jpg',
          opacity: req.body.opacity ? parseFloat(req.body.opacity) : undefined,
          scale: req.body.scale ? parseFloat(req.body.scale) : undefined,
          position,
        });
      } else {
        if (!req.body.text) throw new Error('Provide either "text" or a watermarkImage file');
        out = await addTextWatermark(buf, {
          text: req.body.text,
          opacity: req.body.opacity ? parseFloat(req.body.opacity) : undefined,
          rotationDegrees: req.body.rotation ? parseFloat(req.body.rotation) : undefined,
          fontSizePt: req.body.fontSize ? parseFloat(req.body.fontSize) : undefined,
          colorHex: req.body.color,
          position,
        });
      }
      return [{ name: 'watermarked.pdf', buffer: out }];
    });
    res.json(jobResponse(job));
  }
);

// ---- Optimize: compress ----
toolsRouter.post('/compress', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  const level = (req.body.level as CompressionLevel) || 'medium';

  const originalSize = req.file.size;
  const job = await runJob(req, 'compress', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const { buffer } = await compressPdf(buf, level);
    return [{ name: 'compressed.pdf', buffer }];
  });
  const compressedSize = job.status === 'completed' ? require('fs').statSync(job.outputFiles[0]).size : null;
  res.json({ ...jobResponse(job), originalSize, compressedSize });
});

// ---- Optimize: repair ----
toolsRouter.post('/repair', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  const job = await runJob(req, 'repair', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const out = await repairPdf(buf);
    return [{ name: 'repaired.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

// ---- Convert: images to PDF ----
toolsRouter.post('/images-to-pdf', upload.array('images', 50), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) return res.status(400).json({ error: 'Upload at least one image' });

  const job = await runJob(req, 'images-to-pdf', files.map((f) => f.path), async () => {
    const images = await Promise.all(
      files.map(async (f) => ({ buffer: await fs.readFile(f.path), mime: f.mimetype }))
    );
    const out = await imagesToPdf({
      images,
      pageSize: (req.body.pageSize as PageSize) || 'A4',
      orientation: (req.body.orientation as Orientation) || 'portrait',
      margin: (req.body.margin as Margin) || 'small',
    });
    return [{ name: 'images.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

// ---- Convert: PDF to JPG (zips if multiple pages) ----
toolsRouter.post('/pdf-to-jpg', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });

  const job = await runJob(req, 'pdf-to-jpg', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const images = await pdfToImages({ pdfBuffer: buf, pages: req.body.pages, format: 'jpg' });
    if (images.length === 1) return images;
    const zipBuffer = await zipFiles(images);
    return [{ name: 'pages.zip', buffer: zipBuffer }];
  });
  res.json(jobResponse(job));
});

// ---- Security: protect ----
toolsRouter.post('/protect', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  if (!req.body.password) return res.status(400).json({ error: '"password" is required' });

  const job = await runJob(req, 'protect', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const out = await protectPdf(buf, {
      userPassword: req.body.password,
      ownerPassword: req.body.ownerPassword,
      allowPrinting: req.body.allowPrinting !== 'false',
      allowCopying: req.body.allowCopying !== 'false',
    });
    return [{ name: 'protected.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

// ---- Security: unlock (requires known password) ----
toolsRouter.post('/unlock', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  if (!req.body.password) return res.status(400).json({ error: '"password" is required' });

  const job = await runJob(req, 'unlock', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const out = await unlockPdf(buf, req.body.password);
    return [{ name: 'unlocked.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

// ---- Security: visual signature ----
toolsRouter.post(
  '/sign',
  upload.fields([{ name: 'file', maxCount: 1 }, { name: 'signatureImage', maxCount: 1 }]),
  enforcePlanFileSize,
  enforceDailyQuota,
  async (req: AuthedRequest, res) => {
    const files = req.files as { [field: string]: Express.Multer.File[] };
    const pdfFile = files?.file?.[0];
    if (!pdfFile) return res.status(400).json({ error: 'Upload a PDF file' });

    const job = await runJob(req, 'sign', [pdfFile.path], async () => {
      const buf = await fs.readFile(pdfFile.path);
      const common = {
        pageIndex: parseInt(req.body.pageIndex ?? '0', 10),
        x: parseFloat(req.body.x ?? '50'),
        y: parseFloat(req.body.y ?? '50'),
        widthPt: parseFloat(req.body.width ?? '160'),
        heightPt: parseFloat(req.body.height ?? '60'),
      };
      let out: Buffer;
      if (files?.signatureImage?.[0]) {
        const imgFile = files.signatureImage[0];
        out = await signPdf(buf, {
          ...common,
          mode: 'image',
          imageBuffer: await fs.readFile(imgFile.path),
          imageType: imgFile.mimetype.includes('png') ? 'png' : 'jpg',
        });
      } else {
        if (!req.body.text) throw new Error('Provide either a signatureImage or typed "text"');
        out = await signPdf(buf, { ...common, mode: 'text', text: req.body.text });
      }
      return [{ name: 'signed.pdf', buffer: out }];
    });
    res.json(jobResponse(job));
  }
);

// ---- Convert: PDF to PDF/A ----
toolsRouter.post('/pdf-to-pdfa', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  const job = await runJob(req, 'pdf-to-pdfa', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const out = await convertToPdfA(buf);
    return [{ name: 'archival.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

function jobResponse(job: ReturnType<typeof getJob> extends null ? never : any) {
  return {
    jobId: job.id,
    status: job.status,
    errorMessage: job.errorMessage,
    expiresAt: job.expiresAt,
    downloadUrl: job.status === 'completed' ? `/api/jobs/${job.id}/download` : null,
  };
}

async function zipFiles(files: { name: string; buffer: Buffer }[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const chunks: Buffer[] = [];
    archive.on('data', (c) => chunks.push(c));
    archive.on('end', () => resolve(Buffer.concat(chunks)));
    archive.on('error', reject);
    for (const f of files) archive.append(f.buffer, { name: f.name });
    archive.finalize();
  });
}
