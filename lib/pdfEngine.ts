'use client';

export interface RenderedPage {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
  textContent: string;
}

export interface PdfDocumentMeta {
  fileName: string;
  fileSize: number;
  pageCount: number;
}

export interface ProcessingProgress {
  currentPage: number;
  totalPages: number;
  percentage: number;
  statusText: string;
}

let pdfjsLibPromise: Promise<typeof import('pdfjs-dist')> | null = null;

async function getPdfJs() {
  if (typeof window === 'undefined') {
    throw new Error('PDF.js can only run in a browser environment (Client-Side).');
  }

  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist').then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
      return pdfjs;
    });
  }

  return pdfjsLibPromise;
}

/**
 * Sanitizes any user-supplied filename to prevent path traversal, Zip-Slip, or XSS injection
 */
export function sanitizeFileName(rawName: string): string {
  const cleaned = rawName
    .replace(/[/\\?%*:|"<>]/g, '-')
    .replace(/\.\.+/g, '.')
    .replace(/[\x00-\x1f\x80-\x9f]/g, '')
    .trim();
  return cleaned.length > 0 ? cleaned.slice(0, 120) : 'pdfdavinci-document.pdf';
}

/**
 * Verifies authentic PDF Magic Bytes (%PDF-) within the first 1024 bytes of the file buffer
 */
export function verifyPdfMagicBytes(buffer: ArrayBuffer): boolean {
  const headerBytes = new Uint8Array(buffer, 0, Math.min(buffer.byteLength, 1024));
  // %PDF- in ASCII is [0x25, 0x50, 0x44, 0x46, 0x2D]
  for (let i = 0; i <= headerBytes.length - 5; i++) {
    if (
      headerBytes[i] === 0x25 &&
      headerBytes[i + 1] === 0x50 &&
      headerBytes[i + 2] === 0x44 &&
      headerBytes[i + 3] === 0x46 &&
      headerBytes[i + 4] === 0x2d
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Loads a PDF file into browser RAM and returns the PDF document instance
 */
export async function loadPdfFromRam(file: File) {
  const pdfjs = await getPdfJs();
  const arrayBuffer = await file.arrayBuffer();

  if (!verifyPdfMagicBytes(arrayBuffer)) {
    throw new Error(
      'Security check failed: The selected file does not contain a valid %PDF header signature.'
    );
  }

  const typedArray = new Uint8Array(arrayBuffer);

  const loadingTask = pdfjs.getDocument({
    data: typedArray,
    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
    isEvalSupported: false,
    enableXfa: false,
  });

  const pdfDoc = await loadingTask.promise;
  return pdfDoc;
}

/**
 * Extracts structured text from a PDF page preserving line breaks by Y coordinates
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function extractStructuredPageText(page: any): Promise<string> {
  const textContent = await page.getTextContent();
  const items = textContent.items as Array<{
    str?: string;
    transform?: number[];
    hasEOL?: boolean;
  }>;

  if (!items || items.length === 0) {
    return '';
  }

  const lines: string[] = [];
  let currentLine = '';
  let lastY: number | null = null;

  for (const item of items) {
    const str = item.str ?? '';
    const y = item.transform ? Math.round(item.transform[5]) : null;

    if (lastY !== null && y !== null && Math.abs(y - lastY) > 6) {
      if (currentLine.trim().length > 0) {
        lines.push(currentLine.trim());
      }
      currentLine = str;
    } else {
      if (currentLine.length > 0 && !currentLine.endsWith(' ') && !str.startsWith(' ')) {
        currentLine += ' ';
      }
      currentLine += str;
    }

    if (item.hasEOL) {
      if (currentLine.trim().length > 0) {
        lines.push(currentLine.trim());
      }
      currentLine = '';
      lastY = null;
    } else {
      lastY = y;
    }
  }

  if (currentLine.trim().length > 0) {
    lines.push(currentLine.trim());
  }

  return lines.join('\n');
}

/**
 * Processes all pages of the PDF document locally in RAM via HTML5 Canvas + Text Extraction
 */
export async function processPdfInRam(
  file: File,
  scale: number = 2.0,
  jpegQuality: number = 0.92,
  onProgress?: (progress: ProcessingProgress) => void
): Promise<{
  meta: PdfDocumentMeta;
  pages: RenderedPage[];
  fullText: string;
}> {
  const pdfDoc = await loadPdfFromRam(file);
  const totalPages = pdfDoc.numPages;
  const renderedPages: RenderedPage[] = [];

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    if (onProgress) {
      onProgress({
        currentPage: pageNum,
        totalPages,
        percentage: Math.round(((pageNum - 1) / totalPages) * 100),
        statusText: `Rendering page ${pageNum} of ${totalPages} in local RAM...`,
      });
    }

    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { alpha: false });

    if (!context) {
      throw new Error('Browser could not initialize 2D Canvas context.');
    }

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    // Pure white background for clean JPEG export
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    const dataUrl = canvas.toDataURL('image/jpeg', jpegQuality);
    const pageText = await extractStructuredPageText(page);

    renderedPages.push({
      pageNumber: pageNum,
      dataUrl,
      width: canvas.width,
      height: canvas.height,
      textContent: pageText,
    });

    canvas.width = 0;
    canvas.height = 0;
  }

  if (onProgress) {
    onProgress({
      currentPage: totalPages,
      totalPages,
      percentage: 100,
      statusText: 'Local RAM processing completed!',
    });
  }

  const fullText = renderedPages
    .map(
      (p) =>
        `==================== PAGE ${p.pageNumber} / ${totalPages} ====================\n\n${
          p.textContent || '[No embedded text layer detected on this page]'
        }`
    )
    .join('\n\n\n');

  return {
    meta: {
      fileName: sanitizeFileName(file.name),
      fileSize: file.size,
      pageCount: totalPages,
    },
    pages: renderedPages,
    fullText,
  };
}

/**
 * Generates a Microsoft Word (.doc) compatible document with UTF-8 encoding and page breaks
 */
export function createWordDocBlob(
  fileName: string,
  pages: RenderedPage[],
  includePageImages: boolean = false
): Blob {
  const cleanTitle = fileName.replace(/\.pdf$/i, '');

  const escapeHtml = (unsafe: string) =>
    unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const pagesHtml = pages
    .map((page, idx) => {
      const paragraphs = (page.textContent || '')
        .split('\n')
        .filter((line) => line.trim().length > 0)
        .map(
          (line) =>
            `<p style="margin: 0 0 10pt 0; line-height: 1.45; font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; color: #1e293b;">${escapeHtml(
              line
            )}</p>`
        )
        .join('\n');

      const fallbackNotice =
        !paragraphs && !includePageImages
          ? `<p style="color: #64748b; font-style: italic;">[Page ${page.pageNumber}: No vector text layer detected — enable visual page embedding above or use PDF to JPG mode.]</p>`
          : '';

      const imageBlock = includePageImages
        ? `<div style="margin: 12pt 0; text-align: center;"><img src="${page.dataUrl}" width="560" style="max-width: 100%; height: auto; border: 1px solid #e2e8f0;" alt="Page ${page.pageNumber}" /></div>`
          : '';

      const pageBreak =
        idx < pages.length - 1
          ? '<br clear="all" style="page-break-before: always; mso-break-type: section-break;" />'
          : '';

      return `
        <div class="pdf-page-section">
          <p style="margin: 0 0 12pt 0; padding-bottom: 4pt; border-bottom: 1px solid #cbd5e1; font-size: 9pt; color: #64748b; font-family: 'Arial', sans-serif;">
            <strong>${escapeHtml(cleanTitle)}</strong> — Page ${page.pageNumber} of ${pages.length} (Generated locally with PDFDaVinci.com)
          </p>
          ${paragraphs}
          ${fallbackNotice}
          ${imageBlock}
        </div>
        ${pageBreak}
      `;
    })
    .join('\n');

  const wordDocumentHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(cleanTitle)}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: 21cm 29.7cm;
      margin: 2cm 2cm 2cm 2cm;
    }
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      color: #0f172a;
    }
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`;

  return new Blob(['\ufeff', wordDocumentHtml], {
    type: 'application/msword;charset=utf-8',
  });
}

/**
 * Generates a valid 2-page demonstration PDF file directly in RAM
 */
export function generateDemoPdfFileInRam(): File {
  const page1Lines = [
    'PDFDaVinci.com - Official Client-Side RAM Demo Document',
    '100% Local Browser PDF Processing (Zero Server Uploads)',
    '------------------------------------------------------------',
    'Page 1 of 2: Executive Overview & Security Architecture',
    'This demonstration PDF file was synthesized directly in your browser RAM.',
    'You can convert this document right now into:',
    '1. High-Resolution JPG Images (packed automatically in a .ZIP archive)',
    '2. Editable Microsoft Word (.doc) file with preserved paragraphs',
    '3. Clean Plain Text (.txt) with instant clipboard copy',
    '4. Interactive Page Gallery with individual page inspection',
    '------------------------------------------------------------',
    'Privacy Guarantee: Your confidential files never leave your device.',
  ];

  const page2Lines = [
    'PDFDaVinci.com - Technical Benchmark & Performance Sheet',
    'Page 2 of 2: Core Web Vitals & Web Worker Engine',
    '------------------------------------------------------------',
    'Engine: Mozilla PDF.js Web Worker + HTML5 2D Canvas Supersampling',
    'Compression: JSZip In-Memory Archive Stream (Zero Backend Latency)',
    'Resolution: 2.0x HiDPI Rasterization for crisp typography',
    'Security: Full GDPR Compliance - Local RAM execution only',
    '------------------------------------------------------------',
    'Thank you for testing PDFDaVinci (https://pdfdavinci.com)!',
  ];

  const escapePdfText = (text: string) =>
    text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

  const buildContentStream = (lines: string[], headerBannerColor: string) => {
    const ops: string[] = [];
    ops.push(`${headerBannerColor} rg`);
    ops.push('40 735 515 38 re f');
    ops.push('0.78 0.82 0.88 RG');
    ops.push('1 w');
    ops.push('40 60 515 713 re S');

    ops.push('BT');
    ops.push('/F1 14 Tf');
    ops.push('1 1 1 rg');
    ops.push(`54 749 Td (${escapePdfText(lines[0])}) Tj`);
    ops.push('ET');

    ops.push('BT');
    ops.push('/F1 11 Tf');
    ops.push('0.12 0.16 0.23 rg');
    let y = 700;
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      ops.push(`1 0 0 1 54 ${y} Tm (${escapePdfText(line)}) Tj`);
      y -= 26;
    }
    ops.push('ET');

    return ops.join('\n');
  };

  const stream1 = buildContentStream(page1Lines, '0.31 0.27 0.90');
  const stream2 = buildContentStream(page2Lines, '0.06 0.46 0.43');

  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 7 0 R >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    `6 0 obj\n<< /Length ${stream1.length} >>\nstream\n${stream1}\nendstream\nendobj\n`,
    `7 0 obj\n<< /Length ${stream2.length} >>\nstream\n${stream2}\nendstream\nendobj\n`,
  ];

  let pdfContent = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (const obj of objects) {
    offsets.push(pdfContent.length);
    pdfContent += obj;
  }

  const xrefStart = pdfContent.length;
  pdfContent += `xref\n0 ${objects.length + 1}\n`;
  pdfContent += '0000000000 65535 f \n';

  for (let i = 1; i <= objects.length; i++) {
    const offsetStr = String(offsets[i]).padStart(10, '0');
    pdfContent += `${offsetStr} 00000 n \n`;
  }

  pdfContent += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  const encoder = new TextEncoder();
  const bytes = encoder.encode(pdfContent);
  const blob = new Blob([bytes], { type: 'application/pdf' });

  return new File([blob], 'PDFDaVinci-Demo-Showcase.pdf', {
    type: 'application/pdf',
    lastModified: Date.now(),
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}
