'use client';

import JSZip from 'jszip';
import { sanitizeFileName, type RenderedPage } from './pdfEngine';

/**
 * Packages all rendered pages from RAM into a compressed .ZIP archive
 */
export async function generateImagesZipBlob(
  originalFileName: string,
  pages: RenderedPage[],
  includeExtractedTextFile: boolean = true
): Promise<Blob> {
  const zip = new JSZip();
  const safeOriginal = sanitizeFileName(originalFileName);
  const baseName = safeOriginal.replace(/\.pdf$/i, '') || 'pdfdavinci-document';
  const imagesFolder = zip.folder(`${baseName}-images`);

  if (!imagesFolder) {
    throw new Error('Failed to initialize in-memory ZIP folder.');
  }

  for (const page of pages) {
    const base64Data = page.dataUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    const paddedPageNum = String(page.pageNumber).padStart(3, '0');
    imagesFolder.file(`${baseName}-page-${paddedPageNum}.jpg`, base64Data, {
      base64: true,
    });
  }

  if (includeExtractedTextFile) {
    const combinedText = pages
      .map(
        (p) =>
          `--- PAGE ${p.pageNumber} ---\n${
            p.textContent || '[No embedded text layer detected on this page]'
          }`
      )
      .join('\n\n');

    zip.file(
      `${baseName}-extracted-text.txt`,
      `Document: ${originalFileName}\nConverted locally via: https://pdfdavinci.com (100% Client-Side RAM)\nTotal Pages: ${pages.length}\n\n${combinedText}`
    );
  }

  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  return zipBlob;
}

/**
 * Triggers a browser download of a Blob object without reloading the page
 */
export function triggerBrowserDownload(blob: Blob, downloadFileName: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = downloadFileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 3000);
}

/**
 * Triggers a direct download of a DataURL (e.g., individual JPG page)
 */
export function triggerDataUrlDownload(dataUrl: string, downloadFileName: string): void {
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = downloadFileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
