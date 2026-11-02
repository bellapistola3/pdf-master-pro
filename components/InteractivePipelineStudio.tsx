'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Copy,
  FileCheck2,
  FileImage,
  FileText,
  FileType2,
  FileUp,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

type StudioTab = 'jpg' | 'word' | 'text' | 'gallery';

export default function InteractivePipelineStudio() {
  const [activeTab, setActiveTab] = useState<StudioTab>('jpg');
  const [dpiMode, setDpiMode] = useState<'150' | '300'>('300');
  const [wordMode, setWordMode] = useState<'text' | 'hybrid'>('text');
  const [copiedSample, setCopiedSample] = useState(false);

  const handleTriggerUpload = () => {
    const fileInput = document.querySelector<HTMLInputElement>(
      '#converter-dropzone input[type="file"]'
    );
    const dropzoneEl = document.getElementById('converter-dropzone');
    if (dropzoneEl) {
      dropzoneEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (fileInput) {
      setTimeout(() => {
        fileInput.click();
      }, 350);
    }
  };

  const handleCopySample = async () => {
    const sample =
      'EXECUTIVE AGREEMENT (2026)\nProcessed 100% locally in volatile browser RAM via PDFDaVinci.com.\nZero cloud uploads. 256-Bit SSL & GDPR Verified.';
    try {
      await navigator.clipboard.writeText(sample);
      setCopiedSample(true);
      setTimeout(() => setCopiedSample(false), 2000);
    } catch {
      setCopiedSample(true);
      setTimeout(() => setCopiedSample(false), 2000);
    }
  };

  const tabs: Array<{
    id: StudioTab;
    label: string;
    badge: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    activeClass: string;
  }> = [
    {
      id: 'jpg',
      label: 'PDF to JPG',
      badge: '300 DPI ZIP',
      href: '/pdf-to-jpg',
      icon: FileImage,
      activeClass:
        'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/25',
    },
    {
      id: 'word',
      label: 'PDF to Word',
      badge: 'Editable .DOC',
      href: '/pdf-to-word',
      icon: FileType2,
      activeClass:
        'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/25',
    },
    {
      id: 'text',
      label: 'PDF to Text',
      badge: 'Clean .TXT',
      href: '/pdf-to-text',
      icon: FileText,
      activeClass:
        'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/25',
    },
    {
      id: 'gallery',
      label: 'Page Inspector',
      badge: 'HiDPI Zoom',
      href: '/',
      icon: Layers,
      activeClass:
        'border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-600/25',
    },
  ];

  const currentTabObj = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-indigo-200/90 bg-gradient-to-br from-white via-indigo-50/35 to-slate-50 shadow-xl shadow-indigo-950/5 lg:col-span-5">
      {/* Top Interactive Window Header Bar */}
      <div>
        <div className="flex items-center justify-between border-b border-indigo-100 bg-white/90 px-5 py-3.5 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-1.5 text-xs font-extrabold tracking-tight text-slate-800">
              Interactive Studio Preview
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Sandboxed RAM
          </span>
        </div>

        {/* Interactive Format Switcher Tabs */}
        <div className="px-5 pt-5">
          <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <span>Click a format below to preview live output:</span>
            <span className="text-indigo-600">Interactive</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isSelected
                      ? tab.activeClass
                      : 'border-slate-200/90 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isSelected ? 'text-white' : 'text-indigo-600'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-extrabold">{tab.label}</div>
                    <div
                      className={`truncate text-[10px] font-semibold ${
                        isSelected ? 'text-white/85' : 'text-slate-400'
                      }`}
                    >
                      {tab.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Preview Canvas */}
        <div className="px-5 py-4">
          <div className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
            {/* Source File Indicator */}
            <div className="mb-3.5 flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">
                    Input: Confidential_Report.pdf
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">
                    Verified %PDF Header • 0 Bytes Uploaded
                  </div>
                </div>
              </div>
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700">
                Local RAM
              </span>
            </div>

            {/* TAB 1: JPG PREVIEW */}
            {activeTab === 'jpg' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800">
                    Output: High-Resolution .JPG + .ZIP
                  </span>
                  <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                    <button
                      type="button"
                      onClick={() => setDpiMode('150')}
                      className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold transition ${
                        dpiMode === '150'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      150 DPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setDpiMode('300')}
                      className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold transition ${
                        dpiMode === '300'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      300 DPI HiDPI
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-2.5">
                    <div className="mb-1.5 flex items-center justify-between text-[10px] font-bold text-indigo-700">
                      <span>Page_001.jpg</span>
                      <span>{dpiMode === '300' ? '2480×3508' : '1240×1754'}</span>
                    </div>
                    <div className="space-y-1.5 rounded-lg border border-slate-200/80 bg-white p-2">
                      <div className="h-2 w-2/3 rounded bg-indigo-600/80" />
                      <div className="h-1.5 w-full rounded bg-slate-200" />
                      <div className="h-1.5 w-5/6 rounded bg-slate-200" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-2.5">
                    <div className="mb-1.5 flex items-center justify-between text-[10px] font-bold text-indigo-700">
                      <span>Page_002.jpg</span>
                      <span>{dpiMode === '300' ? '2480×3508' : '1240×1754'}</span>
                    </div>
                    <div className="space-y-1.5 rounded-lg border border-slate-200/80 bg-white p-2">
                      <div className="h-2 w-1/2 rounded bg-violet-600/80" />
                      <div className="h-1.5 w-full rounded bg-slate-200" />
                      <div className="h-1.5 w-4/5 rounded bg-slate-200" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: WORD PREVIEW */}
            {activeTab === 'word' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800">
                    Output: Editable Microsoft Word (.DOC)
                  </span>
                  <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                    <button
                      type="button"
                      onClick={() => setWordMode('text')}
                      className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold transition ${
                        wordMode === 'text'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Editable Text
                    </button>
                    <button
                      type="button"
                      onClick={() => setWordMode('hybrid')}
                      className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold transition ${
                        wordMode === 'hybrid'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      + Page Images
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3">
                  <div className="mb-1.5 flex items-center justify-between text-[10px] font-bold text-blue-700">
                    <span>Confidential_Report.doc</span>
                    <span>MS Word & Google Docs</span>
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-white p-2.5 text-xs text-slate-700">
                    <p className="font-bold text-slate-900">
                      1. Executive Summary & Financial Overview
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                      {wordMode === 'text'
                        ? 'Paragraphs, headings, and section breaks are reconstructed with full UTF-8 encoding for instant editing.'
                        : 'Includes both editable UTF-8 paragraphs and embedded high-resolution visual snapshots for complex tables.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TEXT PREVIEW */}
            {activeTab === 'text' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800">
                    Output: Clean UTF-8 Plain Text (.TXT)
                  </span>
                  <button
                    type="button"
                    onClick={handleCopySample}
                    className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    {copiedSample ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Sample</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-slate-900 p-3 font-mono text-[11px] leading-relaxed text-emerald-300">
                  <div>=== PAGE 1 / 2 (UTF-8) ===</div>
                  <div className="text-slate-200">
                    Extracted coordinate-sorted lines ready for instant copy, search, or .TXT
                    archive download.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: GALLERY PREVIEW */}
            {activeTab === 'gallery' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800">
                    Output: Side-by-Side Page & Text Inspector
                  </span>
                  <span className="rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-extrabold text-violet-700">
                    Full-Screen Zoom
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-2.5 rounded-xl border border-violet-100 bg-violet-50/40 p-2.5">
                  <div className="col-span-5 rounded-lg border border-slate-200 bg-white p-2 text-center">
                    <div className="text-[10px] font-extrabold text-violet-700">Visual Canvas</div>
                    <div className="mt-1 h-9 rounded bg-violet-100/70" />
                  </div>
                  <div className="col-span-7 rounded-lg border border-slate-200 bg-white p-2">
                    <div className="text-[10px] font-extrabold text-slate-700">
                      Page Text Inspector
                    </div>
                    <p className="mt-1 text-[10px] leading-snug text-slate-500">
                      Inspect every page visually alongside its extracted text and download single
                      pages.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Interactive CTA & Security Verification Footer */}
      <div className="border-t border-indigo-100 bg-white/90 px-5 py-4">
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={handleTriggerUpload}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-xs font-extrabold text-white shadow-md shadow-indigo-600/20 transition hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <FileUp className="h-4 w-4" />
            <span>Select PDF to Convert Now</span>
          </button>

          <Link
            href={currentTabObj.href}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-extrabold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span>Open {currentTabObj.label}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-[11px] font-bold text-slate-500">
          <span className="inline-flex items-center gap-1 text-emerald-700">
            <Lock className="h-3 w-3" />
            Magic-Byte PDF Check
          </span>
          <span className="inline-flex items-center gap-1 text-indigo-700">
            <Sparkles className="h-3 w-3" />
            XSS & Eval Disabled
          </span>
          <span className="text-slate-600">✓ 100% Client-Side</span>
        </div>
      </div>
    </div>
  );
}
