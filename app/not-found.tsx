import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600">
          <FileQuestion className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          404 — Page Not Found
        </h1>
        <p className="mt-3 max-w-md text-sm text-slate-600 sm:text-base">
          The page you are looking for on <strong>PDFDaVinci.com</strong> does not exist or has been
          moved. Choose one of our local RAM PDF converters below:
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All-in-One PDF Converter</span>
          </Link>
          <Link
            href="/pdf-to-jpg"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
          >
            PDF to JPG
          </Link>
          <Link
            href="/pdf-to-word"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
          >
            PDF to Word
          </Link>
          <Link
            href="/pdf-to-text"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
          >
            PDF to Text
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
