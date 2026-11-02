'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
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
import {
  AlertTriangle,
  Check,
  ChevronRight,
  Cpu,
  FileUp,
  Home,
  Laptop,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';

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
  const [showFloatingUploadBar, setShowFloatingUploadBar] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 560) {
        setShowFloatingUploadBar(true);
      } else {
        setShowFloatingUploadBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToConverter = () => {
    const el = document.getElementById('converter-dropzone');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const hasLoadedFile = Boolean(meta && pages.length > 0);

  // Uniform 4 feature cards with identical 1-line title + 1-line subtitle structure
  const uniformHeroFeatures = [
    {
      title: '100% Free Forever',
      subtitle: 'No credit card or trial trap',
      icon: Check,
      iconBg:
        'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20',
    },
    {
      title: '100% Local RAM Mode',
      subtitle: 'Files never leave your device',
      icon: ShieldCheck,
      iconBg:
        'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/20',
    },
    {
      title: '2.0x HiDPI Quality',
      subtitle: 'Preserves original layout & fonts',
      icon: Sparkles,
      iconBg:
        'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20',
    },
    {
      title: 'Works on All Devices',
      subtitle: 'Windows, Mac, iOS & Android',
      icon: Laptop,
      iconBg:
        'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-600/20',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100/70 text-slate-900">
      <Header hasLoadedFile={hasLoadedFile} onResetFile={handleResetFile} />

      <main className="flex-1 pb-20">
        {/* Full-Width Hero Header Section */}
        <section className="mx-auto w-full max-w-[1440px] px-4 pt-8 text-center sm:px-8 sm:pt-10 lg:px-12">
          {/* Subpage Breadcrumb Navigation */}
          {pageData.slug !== '/' && (
            <nav
              aria-label="Breadcrumb"
              className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-600"
            >
              <Link href="/" className="inline-flex items-center gap-1 hover:text-indigo-600">
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-bold text-indigo-700">{pageData.breadcrumbLabel}</span>
            </nav>
          )}

          {/* Top Trust & Rating Pill */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-extrabold text-indigo-800 shadow-sm">
              <Cpu className="h-3.5 w-3.5 text-indigo-600" />
              <span>{pageData.badgeText}</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-extrabold text-emerald-900 shadow-sm">
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
              </div>
              <span>4.9 / 5</span>
              <span className="font-semibold text-emerald-700">(2,840+ Verified Users)</span>
            </div>
          </div>

          <h1 className="mx-auto mt-5 max-w-5xl text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-[54px] lg:leading-[1.12]">
            {pageData.h1}
          </h1>

          {/* Styled, High-Contrast Lead Subtitle Container */}
          <div className="mx-auto mt-5 max-w-4xl rounded-2xl border border-slate-200/80 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-sm">
            <p className="text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
              {pageData.heroSubtitle}
            </p>
          </div>

          {/* 4 Perfectly Aligned, Equal-Height Feature Cards */}
          <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {uniformHeroFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="group flex h-full items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${feat.iconBg}`}
                  >
                    <Icon className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-extrabold text-slate-900">
                      {feat.title}
                    </div>
                    <div className="truncate text-xs font-medium text-slate-500">
                      {feat.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Full-Width Converter Workspace Section */}
        <section
          aria-label="PDF Converter Workspace"
          className="mx-auto mt-8 w-full max-w-[1440px] px-4 sm:px-8 lg:px-12"
        >
          {errorMessage && (
            <div
              role="alert"
              className="mx-auto mb-6 flex w-full items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800 shadow-sm"
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

        {/* Full-Width SEO Content Block */}
        <SeoContentBlock pageData={pageData} />
      </main>

      {/* Floating Sticky Bottom Quick-Upload Bar on Scroll (Desktop) */}
      {showFloatingUploadBar && !hasLoadedFile && (
        <div className="fixed bottom-4 left-4 right-4 z-30 mx-auto hidden max-w-4xl items-center justify-between rounded-2xl border border-indigo-500/40 bg-slate-950/95 px-6 py-3.5 text-white shadow-2xl backdrop-blur-md md:flex">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-black text-amber-300">
              PDF
            </div>
            <div>
              <p className="text-sm font-extrabold text-white">
                Ready to convert your PDF file in local RAM?
              </p>
              <p className="text-xs text-slate-300">
                100% Free • Zero Cloud Uploads • Instant JPG, Word & Text Export
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToConverter}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-md transition hover:from-amber-300 hover:to-amber-400"
          >
            <FileUp className="h-4 w-4" />
            <span>Upload PDF Now ↑</span>
          </button>
        </div>
      )}

      <Footer />

      {/* SLOT D (Mobile Sticky Footer): High-viewability mobile banner */}
      <StickyBottomAd slotId="4455667788" />
    </div>
  );
}
