'use client';

import React, { useState, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import Dropzone from './Dropzone';
import FileCard from './FileCard';
import FormatSelector from './FormatSelector';
import ConversionPanels from './ConversionPanels';
import SeoContentBlock from './SeoContentBlock';
import AdBanner from './ads/AdBanner';
import StickyBottomAd from './ads/StickyBottomAd';
import type { ConversionFormat, PageSeoData } from '@/lib/seoConfig';
import {
  processPdfInRam,
  type PdfDocumentMeta,
  type ProcessingProgress,
  type RenderedPage,
} from '@/lib/pdfEngine';
import { AlertTriangle } from 'lucide-react';

interface PdfConverterWorkspaceProps {
  pageData: PageSeoData;
}

export default function PdfConverterWorkspace({ pageData }: PdfConverterWorkspaceProps) {
  const [activeFormat, setActiveFormat] = useState<ConversionFormat>(pageData.defaultFormat);
  const [meta, setMeta] = useState<PdfDocumentMeta | null>(null);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [fullText, setFullText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<ProcessingProgress | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelected = useCallback(async (file: File) => {
    setErrorMessage(null);
    setIsProcessing(true);
    setProgress({
      currentPage: 0,
      totalPages: 1,
      percentage: 5,
      statusText: 'Initializing local in-browser RAM PDF engine...',
    });

    try {
      const result = await processPdfInRam(file, 2.0, 0.92, (prog) => {
        setProgress(prog);
      });

      setMeta(result.meta);
      setPages(result.pages);
      setFullText(result.fullText);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while reading the PDF file locally.';
      setErrorMessage(
        `Failed to parse PDF document: ${message}. Please verify that the file is not password-protected or corrupted.`
      );
      setMeta(null);
      setPages([]);
      setFullText('');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleResetFile = useCallback(() => {
    setMeta(null);
    setPages([]);
    setFullText('');
    setProgress(null);
    setErrorMessage(null);
  }, []);

  const hasLoadedFile = Boolean(meta && pages.length > 0);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100/70 text-slate-900">
      <Header hasLoadedFile={hasLoadedFile} onResetFile={handleResetFile} />

      <main className="flex-1 pb-16">
        {/* Hero Header Section */}
        <section className="mx-auto max-w-5xl px-4 pt-8 text-center sm:px-6 sm:pt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-4 py-1.5 text-xs font-bold text-indigo-800 shadow-sm">
            <span>{pageData.badgeText}</span>
          </div>

          <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15]">
            {pageData.h1}
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {pageData.heroSubtitle}
          </p>
        </section>

        {/* Converter Workspace Section */}
        <section aria-label="PDF Converter Workspace" className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
          {errorMessage && (
            <div
              role="alert"
              className="mx-auto mb-6 flex max-w-4xl items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800 shadow-sm"
            >
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div className="flex-1">
                <p className="font-bold">Document Processing Error</p>
                <p className="mt-0.5 text-xs text-red-700">{errorMessage}</p>
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="rounded-lg bg-red-100 px-2.5 py-1 text-xs font-bold text-red-800 hover:bg-red-200"
              >
                Dismiss
              </button>
            </div>
          )}

          {!hasLoadedFile && !isProcessing && (
            <Dropzone onFileSelected={handleFileSelected} isProcessing={isProcessing} />
          )}

          {hasLoadedFile && meta && (
            <>
              <FileCard meta={meta} onRemoveFile={handleResetFile} />
              <FormatSelector
                activeFormat={activeFormat}
                onSelectFormat={setActiveFormat}
                pageCount={meta.pageCount}
              />
            </>
          )}

          {/* SLOT A (Mid-Tool): Below converter controls and above download results */}
          <AdBanner slotId="1122334455" variant="leaderboard" />

          {/* Conversion Results, Progress Bar & Download Actions */}
          <ConversionPanels
            activeFormat={activeFormat}
            meta={meta}
            pages={pages}
            fullText={fullText}
            isProcessing={isProcessing}
            progress={progress}
          />
        </section>

        {/* SLOT B (Below Tool): Large rectangle/leaderboard banner right before SEO article */}
        <AdBanner slotId="2233445566" variant="rectangle" />

        {/* Long-Form SEO Content Block with HowTo, Technical Guide, In-Article Ad (Slot C), and FAQs */}
        <SeoContentBlock pageData={pageData} />
      </main>

      <Footer />

      {/* SLOT D (Mobile Sticky Footer): High-viewability mobile banner */}
      <StickyBottomAd slotId="4455667788" />
    </div>
  );
}
