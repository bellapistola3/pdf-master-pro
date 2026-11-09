import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ArrowRight,
  FileImage,
  FileText,
  FileType2,
  Home,
  Layers,
  ShieldCheck,
} from 'lucide-react';

const quickTools = [
  {
    href: '/',
    title: 'All-in-One PDF Converter',
    subtitle: 'Full multi-format local RAM studio',
    icon: Layers,
    iconBg: 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white',
  },
  {
    href: '/pdf-to-jpg/',
    title: 'PDF to High-Res JPG (ZIP)',
    subtitle: '2.0x HiDPI / 300 DPI batch image export',
    icon: FileImage,
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white',
  },
  {
    href: '/pdf-to-word/',
    title: 'PDF to Editable Word (.DOC)',
    subtitle: 'Structured paragraphs & section breaks',
    icon: FileType2,
    iconBg: 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white',
  },
  {
    href: '/pdf-to-text/',
    title: 'Extract PDF to Text (.TXT)',
    subtitle: 'Clean UTF-8 text with live word counter',
    icon: FileText,
    iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white',
  },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-8 lg:px-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-extrabold text-indigo-700">
          <ShieldCheck className="h-4 w-4" />
          <span>404 • Page Not Found on PDFDaVinci.com</span>
        </div>

        <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Looking for our Free Local RAM PDF Converter?
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          The page address you entered doesn’t exist or may have moved. Choose one of our 100% free,
          zero-upload client-side PDF conversion studios below to convert your document immediately:
        </p>

        <div className="mt-8 grid w-full max-w-5xl grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
          {quickTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg"
              >
                <div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-md ${tool.iconBg}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-4 text-base font-extrabold text-slate-900 group-hover:text-indigo-600">
                    {tool.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">{tool.subtitle}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-extrabold text-indigo-600">
                  <span>Open Tool</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-500"
        >
          <Home className="h-4 w-4" />
          <span>Return to PDFDaVinci Home Studio</span>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
