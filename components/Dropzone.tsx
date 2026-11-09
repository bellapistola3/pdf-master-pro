'use client';

import React, { useRef, useState } from 'react';
import { FileUp, Lock, ShieldCheck, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { verifyPdfMagicBytes } from '@/lib/pdfEngine';

interface DropzoneProps {
  onFileSelected: (file: File) => void;
  isProcessing?: boolean;
}

export default function Dropzone({ onFileSelected, isProcessing = false }: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateAndSelectFile = async (file: File | undefined) => {
    if (!file) return;
    setErrorMsg(null);

    const isPdf =
      file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      setErrorMsg('Security Alert: Please select a valid PDF document (.pdf).');
      return;
    }

    try {
      const headerSlice = await file.slice(0, 1024).arrayBuffer();
      if (!verifyPdfMagicBytes(headerSlice)) {
        setErrorMsg(
          'Security Alert: This file does not have a valid %PDF binary signature and was blocked.'
        );
        return;
      }
    } catch {
      // Allow fallback to main engine check if slice fails
    }

    onFileSelected(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isProcessing) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (isProcessing) return;

    const droppedFile = e.dataTransfer.files?.[0];
    validateAndSelectFile(droppedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    validateAndSelectFile(selectedFile);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div id="converter-dropzone" className="mx-auto w-full">
      {/* Wide Double-Framed Card Container */}
      <div className="rounded-[28px] border border-slate-200/90 bg-white p-4 shadow-2xl shadow-indigo-950/10 sm:p-6">
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 px-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Instant Local RAM PDF Studio
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Zero Cloud Wait • Magic-Byte Verified • Unlimited Pages</span>
          </span>
        </div>

        {/* Inner Dashed Dropzone Container */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Dropzone to select or drag and drop a PDF file"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !isProcessing) {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`group relative cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all duration-200 sm:px-14 sm:py-14 ${
            isDragging
              ? 'scale-[1.005] border-indigo-600 bg-indigo-50/90 shadow-inner'
              : 'border-indigo-300 bg-gradient-to-b from-slate-50/90 to-indigo-50/30 hover:border-indigo-500 hover:bg-indigo-50/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {/* Multi-Layered Custom Vector Illustration */}
          <div className="mx-auto mb-5 flex h-24 w-28 items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <svg
              viewBox="0 0 120 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full drop-shadow-md"
              aria-hidden="true"
            >
              <circle cx="60" cy="48" r="42" fill="#EEF2FF" />
              <rect
                x="22"
                y="22"
                width="38"
                height="50"
                rx="6"
                transform="rotate(-10 22 22)"
                fill="#E0E7FF"
                stroke="#818CF8"
                strokeWidth="1.5"
              />
              <rect
                x="62"
                y="18"
                width="38"
                height="50"
                rx="6"
                transform="rotate(10 62 18)"
                fill="#FEF3C7"
                stroke="#F59E0B"
                strokeWidth="1.5"
              />
              <rect
                x="38"
                y="12"
                width="44"
                height="58"
                rx="7"
                fill="#FFFFFF"
                stroke="#4F46E5"
                strokeWidth="2.2"
              />
              <rect x="45" y="20" width="22" height="10" rx="3" fill="#4F46E5" />
              <text
                x="48.5"
                y="27.5"
                fill="#FFFFFF"
                fontSize="7"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                PDF
              </text>
              <line x1="45" y1="37" x2="75" y2="37" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="45" y1="44" x2="71" y2="44" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="45" y1="51" x2="65" y2="51" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="60" cy="68" r="16" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="3" />
              <path
                d="M60 74V62M60 62L55 67M60 62L65 67"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="18" r="2.5" fill="#F59E0B" />
              <circle cx="96" cy="24" r="3" fill="#4F46E5" />
              <circle cx="92" cy="68" r="2.5" fill="#10B981" />
            </svg>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Drop PDF files here
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm font-medium text-slate-600 sm:text-base">
            Convert to <strong className="text-slate-900">High-Res JPG (ZIP)</strong>,{' '}
            <strong className="text-slate-900">Editable Word (.DOC)</strong>, or{' '}
            <strong className="text-slate-900">Plain Text (.TXT)</strong> in seconds
          </p>

          {/* "────── OR ──────" Divider */}
          <div className="mx-auto my-6 flex max-w-sm items-center justify-center gap-4">
            <span className="h-px flex-1 bg-slate-300/80" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              OR
            </span>
            <span className="h-px flex-1 bg-slate-300/80" />
          </div>

          {/* Primary CTA Button */}
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!isProcessing) fileInputRef.current?.click();
              }}
              disabled={isProcessing}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-9 py-4 text-base font-extrabold text-white shadow-lg shadow-indigo-600/30 transition hover:from-indigo-700 hover:to-violet-700 active:scale-[0.99] sm:w-auto"
            >
              <FileUp className="h-5 w-5" />
              <span>Select PDF File</span>
            </button>
          </div>

          {/* Security & Trust Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 text-xs font-bold text-slate-700">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200/90">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              No Cloud Uploads (100% RAM)
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200/90">
              <Lock className="h-4 w-4 text-indigo-600" />
              256-Bit SSL & GDPR Ready
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200/90">
              <CheckCircle2 className="h-4 w-4 text-amber-500" />
              100% Free • No Email or Card
            </span>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
