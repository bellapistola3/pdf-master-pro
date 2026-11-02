'use client';

import React, { useState } from 'react';
import {
  Archive,
  Check,
  Copy,
  Download,
  FileImage,
  FileText,
  FileType2,
  Loader2,
  Sparkles,
  ZoomIn,
} from 'lucide-react';
import type { ConversionFormat } from '@/lib/seoConfig';
import {
  createWordDocBlob,
  type PdfDocumentMeta,
  type ProcessingProgress,
  type RenderedPage,
} from '@/lib/pdfEngine';
import {
  generateImagesZipBlob,
  triggerBrowserDownload,
  triggerDataUrlDownload,
} from '@/lib/zipHelper';

interface ConversionPanelsProps {
  activeFormat: ConversionFormat;
  meta: PdfDocumentMeta | null;
  pages: RenderedPage[];
  fullText: string;
  isProcessing: boolean;
  progress: ProcessingProgress | null;
}

export default function ConversionPanels({
  activeFormat,
  meta,
  pages,
  fullText,
  isProcessing,
  progress,
}: ConversionPanelsProps) {
  const [isZipping, setIsZipping] = useState(false);
  const [includeTextInZip, setIncludeTextInZip] = useState(true);
  const [includeImagesInWord, setIncludeImagesInWord] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [editableText, setEditableText] = useState<string | null>(null);
  const [selectedZoomPage, setSelectedZoomPage] = useState<RenderedPage | null>(null);

  const currentText = editableText !== null ? editableText : fullText;

  if (isProcessing && progress) {
    return (
      <div className="mx-auto my-8 w-full max-w-4xl rounded-3xl border border-indigo-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900">{progress.statusText}</h3>
        <p className="mt-1 text-sm text-slate-500">
          Processing via Mozilla PDF.js Web Worker directly inside your browser RAM...
        </p>

        <div className="mx-auto mt-6 h-4 w-full max-w-xl overflow-hidden rounded-full bg-slate-100 p-0.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-200"
            style={{ width: `${Math.max(8, progress.percentage)}%` }}
          />
        </div>
        <div className="mt-2 text-xs font-bold text-indigo-700">
          Page {progress.currentPage} of {progress.totalPages} ({progress.percentage}%)
        </div>
      </div>
    );
  }

  if (!meta || pages.length === 0) {
    return null;
  }

  const baseFileName = meta.fileName.replace(/\.pdf$/i, '') || 'pdfdavinci-document';

  const handleDownloadAllZip = async () => {
    try {
      setIsZipping(true);
      const zipBlob = await generateImagesZipBlob(meta.fileName, pages, includeTextInZip);
      triggerBrowserDownload(zipBlob, `${baseFileName}-jpg-archive.zip`);
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadSingleJpg = (page: RenderedPage) => {
    const padded = String(page.pageNumber).padStart(3, '0');
    triggerDataUrlDownload(page.dataUrl, `${baseFileName}-page-${padded}.jpg`);
  };

  const handleDownloadWordDoc = () => {
    const docBlob = createWordDocBlob(meta.fileName, pages, includeImagesInWord);
    triggerBrowserDownload(docBlob, `${baseFileName}.doc`);
  };

  const handleDownloadTxt = () => {
    const txtBlob = new Blob([currentText], { type: 'text/plain;charset=utf-8' });
    triggerBrowserDownload(txtBlob, `${baseFileName}.txt`);
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(currentText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const wordCount = currentText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="mx-auto w-full">
      {/* PANEL 1: PDF TO JPG (ZIP) */}
      {activeFormat === 'jpg' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-6 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                <FileImage className="h-3.5 w-3.5" />
                Ready to Download • 2.0x HiDPI JPG Rasterization
              </div>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                Converted {pages.length} High-Resolution JPG {pages.length === 1 ? 'Page' : 'Pages'}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Download all images at once in an organized <strong>.ZIP archive</strong> or save
                individual pages from the grid below.
              </p>

              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={includeTextInZip}
                  onChange={(e) => setIncludeTextInZip(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Include a bonus extracted plain-text file (.txt) inside the ZIP archive</span>
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDownloadAllZip}
                disabled={isZipping}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-indigo-600 px-7 py-4 text-base font-extrabold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-60"
              >
                {isZipping ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Packaging ZIP...</span>
                  </>
                ) : (
                  <>
                    <Archive className="h-5 w-5" />
                    <span>Download All as .ZIP ({pages.length} JPGs)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {pages.map((page) => (
              <div
                key={page.pageNumber}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-3 transition hover:border-indigo-300 hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-600">
                    <span className="rounded-md bg-white px-2 py-0.5 shadow-sm ring-1 ring-slate-200">
                      Page {page.pageNumber}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {page.width} × {page.height} px
                    </span>
                  </div>

                  <div className="relative aspect-[1/1.35] w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={page.dataUrl}
                      alt={`Preview of page ${page.pageNumber}`}
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadSingleJpg(page)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-indigo-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download .JPG</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedZoomPage(page)}
                    title="Zoom Page"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PANEL 2: PDF TO WORD (.DOC) */}
      {activeFormat === 'word' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-6 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                <FileType2 className="h-3.5 w-3.5" />
                Microsoft Word (.DOC) Generator • Full UTF-8 Support
              </div>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                Editable Word Document Ready ({pages.length} {pages.length === 1 ? 'Page' : 'Pages'})
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Paragraphs and page breaks are reconstructed locally in RAM. Opens directly in
                Microsoft Word, Google Docs, and LibreOffice.
              </p>

              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={includeImagesInWord}
                  onChange={(e) => setIncludeImagesInWord(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  Embed high-resolution visual page snapshots inside the Word document (ideal for
                  scanned PDFs & complex tables)
                </span>
              </label>
            </div>

            <div>
              <button
                type="button"
                onClick={handleDownloadWordDoc}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-blue-600 px-7 py-4 text-base font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-[0.99] sm:w-auto"
              >
                <Download className="h-5 w-5" />
                <span>Download as Word (.DOC)</span>
              </button>
            </div>
          </div>

          {/* Structured Word Preview */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Reconstructed Page & Paragraph Preview:</span>
              <span>Word Count: {wordCount}</span>
            </div>

            <div className="max-h-[420px] space-y-4 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
              {pages.map((page) => (
                <div
                  key={page.pageNumber}
                  className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2 text-xs font-bold text-slate-400">
                    <span>PAGE {page.pageNumber}</span>
                    <span>Word Section Break</span>
                  </div>
                  <div className="whitespace-pre-line font-sans text-sm leading-relaxed text-slate-800">
                    {page.textContent ||
                      '[No vector text layer found on this page. Check the option above to embed high-resolution page snapshots inside the Word document.]'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PANEL 3: PDF TO TEXT (.TXT) */}
      {activeFormat === 'text' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-6 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                <FileText className="h-3.5 w-3.5" />
                Clean UTF-8 Plain Text Extraction
              </div>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                Extracted Text from All {pages.length} {pages.length === 1 ? 'Page' : 'Pages'}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Edit the extracted text directly in the box below, copy it with 1 click, or save it
                as a standard <strong>.TXT</strong> file.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyText}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-extrabold text-slate-800 transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                {copiedText ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-indigo-600" />
                    <span>Copy Full Text</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadTxt}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
              >
                <Download className="h-4 w-4" />
                <span>Download .TXT File</span>
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-500">
            <div className="flex items-center gap-4">
              <span>Pages: {pages.length}</span>
              <span>•</span>
              <span>Words: {wordCount}</span>
              <span>•</span>
              <span>Characters: {currentText.length}</span>
            </div>
            <span className="text-indigo-600">Interactive Editor (you can edit before saving)</span>
          </div>

          <textarea
            aria-label="Extracted text from PDF document"
            value={currentText}
            onChange={(e) => setEditableText(e.target.value)}
            rows={15}
            className="mt-2.5 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm"
          />
        </div>
      )}

      {/* PANEL 4: INTERACTIVE PAGE GALLERY */}
      {activeFormat === 'gallery' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                <Sparkles className="h-3.5 w-3.5" />
                Side-by-Side Page Inspector
              </div>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                Visual Page Gallery & Extracted Text Inspector
              </h3>
            </div>

            <button
              type="button"
              onClick={handleDownloadAllZip}
              disabled={isZipping}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-violet-700"
            >
              <Archive className="h-4 w-4" />
              <span>Download All Pages (.ZIP)</span>
            </button>
          </div>

          <div className="space-y-6">
            {pages.map((page) => (
              <div
                key={page.pageNumber}
                className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 lg:grid-cols-12"
              >
                <div className="lg:col-span-5">
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={page.dataUrl}
                      alt={`Page ${page.pageNumber}`}
                      className="mx-auto max-h-[360px] w-auto object-contain"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
                        Page {page.pageNumber} of {pages.length}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        Resolution: {page.width} × {page.height} px
                      </span>
                    </div>

                    <h4 className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Extracted Text on Page {page.pageNumber}:
                    </h4>
                    <pre className="mt-1.5 max-h-[220px] overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-3.5 font-sans text-xs leading-relaxed text-slate-700">
                      {page.textContent || '[No embedded text layer on this page]'}
                    </pre>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleDownloadSingleJpg(page)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Page {page.pageNumber} (.JPG)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedZoomPage(page)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                      <span>Full-Screen Preview</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full-Screen Zoom Modal */}
      {selectedZoomPage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedZoomPage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white p-4 shadow-2xl sm:p-6"
          >
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-base font-extrabold text-slate-900">
                  Page {selectedZoomPage.pageNumber} ({selectedZoomPage.width} ×{' '}
                  {selectedZoomPage.height} px)
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadSingleJpg(selectedZoomPage)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download .JPG</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedZoomPage(null)}
                  className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="max-h-[75vh] overflow-auto rounded-2xl bg-slate-100 p-4 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedZoomPage.dataUrl}
                alt={`Full-screen preview of page ${selectedZoomPage.pageNumber}`}
                className="mx-auto max-w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
