'use client';

import React, { useRef, useState } from 'react';
import { FileUp, Lock, ShieldCheck, UploadCloud, AlertCircle } from 'lucide-react';
import DemoFileButton from './DemoFileButton';

interface DropzoneProps {
  onFileSelected: (file: File) => void;
  isProcessing?: boolean;
}

export default function Dropzone({ onFileSelected, isProcessing = false }: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateAndSelectFile = (file: File | undefined) => {
    if (!file) return;
    setErrorMsg(null);

    const isPdf =
      file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      setErrorMsg('Please select a valid PDF document (.pdf).');
      return;
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
    <div className="mx-auto w-full max-w-4xl">
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
        className={`group relative cursor-pointer rounded-3xl border-2 border-dashed p-8 text-center transition-all duration-200 sm:p-12 ${
          isDragging
            ? 'scale-[1.01] border-indigo-600 bg-indigo-50/90 shadow-xl shadow-indigo-500/10'
            : 'border-indigo-400 bg-slate-50 hover:border-indigo-600 hover:bg-indigo-50/40 hover:shadow-lg'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* High-contrast icon badge */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-transform duration-200 group-hover:scale-105">
          <UploadCloud className="h-10 w-10" />
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Drop Your PDF File Here or Click to Browse
        </h2>

        <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-600 sm:text-base">
          Conversion runs <strong className="text-slate-900">100% locally in your browser RAM</strong>. Zero server uploads, no file size limits, and total privacy.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!isProcessing) fileInputRef.current?.click();
            }}
            disabled={isProcessing}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-7 py-3.5 text-base font-bold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-700 active:scale-[0.99] sm:w-auto"
          >
            <FileUp className="h-5 w-5" />
            <span>Select PDF File</span>
          </button>

          <DemoFileButton onSelectDemoFile={onFileSelected} disabled={isProcessing} />
        </div>

        {/* Security & Trust Pills */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200/80">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            No Cloud Uploads
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200/80">
            <Lock className="h-3.5 w-3.5 text-indigo-600" />
            Zero-Server RAM Architecture
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200/80">
            100% Free • No Email Required
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
  );
}
