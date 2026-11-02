'use client';

import JSZip from 'jszip';
import type { RenderedPage } from './pdfEngine';

/**
 * Пакетира всички рендирани страници от RAM паметта в компресиран .ZIP архив
 */
export async function generateImagesZipBlob(
  originalFileName: string,
  pages: RenderedPage[],
  includeExtractedTextFile: boolean = true
): Promise<Blob> {
  const zip = new JSZip();
  const baseName = originalFileName.replace(/\.pdf$/i, '') || 'pdfdavinci-document';
  const imagesFolder = zip.folder(`${baseName}-images`);

  if (!imagesFolder) {
    throw new Error('Неуспешно инициализиране на ZIP директория в паметта.');
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
          `--- СТРАНИЦА ${p.pageNumber} ---\n${
            p.textContent || '[Няма открит текстов слой на тази страница]'
          }`
      )
      .join('\n\n');

    zip.file(
      `${baseName}-extracted-text.txt`,
      `Документ: ${originalFileName}\nКонвертирано локално чрез: https://pdfdavinci.com (100% Client-Side RAM)\nБрой страници: ${pages.length}\n\n${combinedText}`
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
 * Задейства браузърно сваляне на Blob обект без презареждане на страницата
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
 * Задейства директно сваляне на DataURL (например индивидуална JPG страница)
 */
export function triggerDataUrlDownload(dataUrl: string, downloadFileName: string): void {
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = downloadFileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
