import { Router } from 'express';
import fs from 'fs/promises';
import { upload, enforcePlanFileSize } from '../middleware/upload';
import { AuthedRequest, requireAuth } from '../middleware/auth';
import { enforceDailyQuota } from '../middleware/quota';
import { runJob } from '../services/jobHelpers';

import { ocrToPdf, ocrToText, OcrLanguage } from '../pdf/ocr';
import { redactPdf, RedactionBox } from '../pdf/redact';
import { comparePdfs } from '../pdf/compare';
import { extractDataFromPdf } from '../pdf/extractData';
import { pdfToBasicDocx } from '../pdf/pdfToDocx';
import { extractText } from '../pdf/textExtract';
import { completeChat, retrieveRelevantChunks } from '../services/llmAdapter';

export const toolsAdvancedRouter = Router();

// ---- OCR (real: Poppler rasterize + Tesseract) ----
toolsAdvancedRouter.post('/ocr', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF or image file' });
  const language = (req.body.language as OcrLanguage) || 'bul+eng';
  const isImage = req.file.mimetype.startsWith('image/');
  const wantsTxt = req.body.exportAs === 'txt';

  const job = await runJob(req, 'ocr', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    if (wantsTxt) {
      const text = await ocrToText(buf, { language });
      return [{ name: 'ocr-result.txt', buffer: Buffer.from(text, 'utf-8') }];
    }
    const out = await ocrToPdf(buf, {
      language,
      sourceIsImage: isImage,
      imageExt: req.file!.originalname.split('.').pop(),
    });
    return [{ name: 'searchable.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

// ---- Redact (real: rasterize + black-box flatten, not cosmetic overlay) ----
toolsAdvancedRouter.post('/redact', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  let boxes: RedactionBox[];
  try {
    boxes = JSON.parse(req.body.boxes);
  } catch {
    return res.status(400).json({ error: '"boxes" must be JSON: [{ pageIndex, xFrac, yFracFromTop, wFrac, hFrac }]' });
  }

  const job = await runJob(req, 'redact', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const out = await redactPdf(buf, boxes);
    return [{ name: 'redacted.pdf', buffer: out }];
  });
  res.json(jobResponse(job));
});

// ---- Compare (real: pdftotext + line diff) ----
toolsAdvancedRouter.post(
  '/compare',
  upload.fields([{ name: 'fileA', maxCount: 1 }, { name: 'fileB', maxCount: 1 }]),
  enforcePlanFileSize,
  enforceDailyQuota,
  async (req: AuthedRequest, res) => {
    const files = req.files as { [field: string]: Express.Multer.File[] };
    const a = files?.fileA?.[0];
    const b = files?.fileB?.[0];
    if (!a || !b) return res.status(400).json({ error: 'Upload both fileA and fileB' });

    try {
      const [bufA, bufB] = await Promise.all([fs.readFile(a.path), fs.readFile(b.path)]);
      const result = await comparePdfs(bufA, bufB);
      res.json({ status: 'completed', result });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ---- Extract data (real: regex over pdftotext) ----
toolsAdvancedRouter.post('/extract-data', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  try {
    const buf = await fs.readFile(req.file.path);
    const data = await extractDataFromPdf(buf);
    res.json({ status: 'completed', data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---- PDF to Word (real but basic: text-only reflow, explicit layout caveat) ----
toolsAdvancedRouter.post('/pdf-to-word', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  const job = await runJob(req, 'pdf-to-word', [req.file.path], async () => {
    const buf = await fs.readFile(req.file!.path);
    const out = await pdfToBasicDocx(buf);
    return [{ name: 'converted.docx', buffer: out }];
  });
  res.json({
    ...jobResponse(job),
    notice: 'Basic conversion: text content only. Complex layouts, tables, and images are not reconstructed.',
  });
});

// ---- AI Summary (real, requires LLM_PROVIDER + LLM_API_KEY configured) ----
toolsAdvancedRouter.post('/ai-summary', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF file' });
  try {
    const buf = await fs.readFile(req.file.path);
    const text = await extractText(buf);
    const truncated = text.slice(0, 40_000); // keep prompt bounded
    const reply = await completeChat([
      {
        role: 'system',
        content:
          'You summarize documents. Respond in the same language as the document. Return: a 2-3 sentence summary, ' +
          'a bullet list of key points, key topics as tags, and (if it reads as a business document) suggested next steps.',
      },
      { role: 'user', content: truncated },
    ]);
    res.json({ status: 'completed', summary: reply });
  } catch (err: any) {
    res.status(err.message.includes('not configured') ? 501 : 500).json({ error: err.message });
  }
});

// ---- Chat with PDF (real, simple keyword retrieval + LLM adapter) ----
toolsAdvancedRouter.post('/chat-pdf', upload.single('file'), enforcePlanFileSize, enforceDailyQuota, async (req: AuthedRequest, res) => {
  if (!req.file && !req.body.cachedText) return res.status(400).json({ error: 'Upload a PDF file (or pass cachedText from a prior call)' });
  if (!req.body.question) return res.status(400).json({ error: '"question" is required' });

  try {
    const text = req.file ? await extractText(await fs.readFile(req.file.path)) : req.body.cachedText;
    const relevant = retrieveRelevantChunks(text, req.body.question);
    const reply = await completeChat([
      {
        role: 'system',
        content:
          'Answer the user question using ONLY the provided document excerpts. If the answer is not in the ' +
          'excerpts, say so clearly rather than guessing.',
      },
      { role: 'user', content: `Document excerpts:\n${relevant.join('\n---\n')}\n\nQuestion: ${req.body.question}` },
    ]);
    res.json({ status: 'completed', answer: reply, cachedText: text });
  } catch (err: any) {
    res.status(err.message.includes('not configured') ? 501 : 500).json({ error: err.message });
  }
});

// ---- Honest stubs: require LibreOffice / Puppeteer binaries not bundled in this MVP build ----
const notYetImplemented = (toolName: string, requirement: string) => (req: AuthedRequest, res: any) => {
  res.status(501).json({
    error: `${toolName} is architected (route + job pipeline exist) but not enabled in this MVP build.`,
    requirement,
    howToEnable: 'See README.md → "Advanced tools roadmap" for the Docker service needed to turn this on.',
  });
};

toolsAdvancedRouter.post('/word-to-pdf', upload.single('file'), notYetImplemented('Word to PDF', 'LibreOffice headless'));
toolsAdvancedRouter.post('/ppt-to-pdf', upload.single('file'), notYetImplemented('PowerPoint to PDF', 'LibreOffice headless'));
toolsAdvancedRouter.post('/excel-to-pdf', upload.single('file'), notYetImplemented('Excel to PDF', 'LibreOffice headless'));
toolsAdvancedRouter.post('/html-to-pdf', notYetImplemented('HTML to PDF', 'Puppeteer/Playwright + Chromium'));
toolsAdvancedRouter.post('/pdf-to-excel', upload.single('file'), notYetImplemented('PDF to Excel', 'Table-detection model (e.g. Camelot/Tabula) or LLM-assisted extraction'));
toolsAdvancedRouter.post('/pdf-to-ppt', upload.single('file'), notYetImplemented('PDF to PowerPoint', 'Layout-reconstruction pipeline'));

function jobResponse(job: any) {
  return {
    jobId: job.id,
    status: job.status,
    errorMessage: job.errorMessage,
    expiresAt: job.expiresAt,
    downloadUrl: job.status === 'completed' ? `/api/jobs/${job.id}/download` : null,
  };
}
