'use client';

import React from 'react';
import { CheckCircle2, Cpu, FileText, HardDrive, Layers, Trash2 } from 'lucide-react';
import { formatFileSize, type PdfDocumentMeta } from '@/lib/pdfEngine';

interface FileCardProps {
  meta: PdfDocumentMeta;
  onRemoveFile: () => void;
}

export default function FileCard({ meta, onRemoveFile }: FileCardProps) {
  return (
    <div className="mx-auto mb-8 w-full max-w-5xl rounded-2xl border-2 border-indigo-100 bg-white p-5 shadow-md sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
            <FileText className="h-7 w-7" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Loaded in Browser RAM
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                <Cpu className="h-3.5 w-3.5" />
                Web Worker Ready
              </span>
            </div>

            <h2
              title={meta.fileName}
              className="mt-1.5 break-all text-lg font-extrabold text-slate-900 sm:text-xl"
            >
              {meta.fileName}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 sm:text-sm">
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <Layers className="h-4 w-4 text-indigo-600" />
                Pages: <strong>{meta.pageCount}</strong>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <HardDrive className="h-4 w-4 text-indigo-600" />
                Size: <strong>{formatFileSize(meta.fileSize)}</strong>
              </span>
              <span>•</span>
              <span className="text-emerald-700">🔒 Local Processing (0 Bytes Uploaded)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onRemoveFile}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear RAM / New PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
