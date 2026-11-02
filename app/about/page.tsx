import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Award, CheckCircle2, Cpu, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'About Us — 100% Client-Side RAM PDF Architecture',
  description:
    'Learn about PDFDaVinci (pdfdavinci.com), our mission to provide 100% free, client-side in-browser PDF conversion tools with zero cloud uploads and full GDPR privacy.',
  alternates: {
    canonical: `${SITE_URL}/about/`,
  },
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description:
      'Discover how PDFDaVinci processes PDF files into high-resolution JPG, Word (.doc), and Text (.txt) 100% locally inside your browser RAM.',
    url: `${SITE_URL}/about/`,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE_NAME}`,
    url: `${SITE_URL}/about/`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description:
        'Next-generation 100% client-side PDF converter processing PDF to JPG, Word (.doc), and Text (.txt) locally inside browser RAM with zero server uploads.',
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Header />

      <main className="mx-auto max-w-4xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to PDF Converter</span>
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-extrabold text-indigo-700">
            <Award className="h-4 w-4" />
            About PDFDaVinci.com
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Reinventing Online PDF Conversion with 100% Local RAM Privacy
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Welcome to <strong>PDFDaVinci</strong> (<a href="https://pdfdavinci.com" className="text-indigo-600 underline">https://pdfdavinci.com</a>). We built PDFDaVinci with a single, uncompromising engineering mission: to give individuals, students, legal professionals, healthcare workers, and businesses a studio-grade PDF converter that <strong>never uploads confidential documents to a remote server</strong> and <strong>never traps users in deceptive paid subscriptions</strong>.
          </p>

          <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Lock className="mb-2 h-6 w-6 text-emerald-600" />
              <h2 className="text-base font-extrabold text-slate-900">Zero Cloud Uploads</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Every byte of your PDF stays inside your device’s volatile memory (RAM). Nothing is ever transmitted over the network.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Cpu className="mb-2 h-6 w-6 text-indigo-600" />
              <h2 className="text-base font-extrabold text-slate-900">Web Worker Speed</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Powered by Mozilla PDF.js, HTML5 2D Canvas supersampling, and JSZip for instant multi-core browser execution.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <ShieldCheck className="mb-2 h-6 w-6 text-amber-500" />
              <h2 className="text-base font-extrabold text-slate-900">100% Free Forever</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                No $0.50 trial traps, no credit card forms, no email gatekeepers, and no watermarks on your exported files.
              </p>
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-extrabold text-slate-900">
            Why We Built a Zero-Server PDF Studio
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            For over a decade, online PDF utilities operated on an outdated cloud-upload model: you upload a private tax return, legal contract, or medical record to an unknown third-party server, wait in a processing queue, and then get hit with a paywall when you try to download your file.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Modern web browsers are now powerful enough to run full vector rasterization and coordinate-aware text parsing locally. By combining <strong>Mozilla’s PDF.js Web Worker engine</strong> with <strong>2.0x HiDPI HTML5 Canvas rendering</strong>, PDFDaVinci turns your own browser into a private, hardware-accelerated document workstation.
          </p>

          <h2 className="mt-8 text-2xl font-extrabold text-slate-900">
            Our Core Capabilities
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <strong>PDF to High-Resolution JPG (ZIP):</strong> 2x supersampled JPEG rendering with one-click batch ZIP archiving or individual page downloads.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <strong>PDF to Editable Word (.DOC):</strong> Coordinate-based paragraph reconstruction compatible with Microsoft Word, Google Docs, and LibreOffice.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <strong>PDF to Clean Plain Text (.TXT):</strong> Instant UTF-8 text extraction with a live in-browser editor, word/character counters, and one-click clipboard copy.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <strong>Interactive Page Gallery:</strong> Side-by-side visual page inspection and full-screen zoom preview.
              </span>
            </li>
          </ul>

          <div className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-6">
            <h3 className="text-base font-extrabold text-slate-900">
              Contact & Transparency
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
              Have feedback, feature suggestions, or security inquiries? Review our{' '}
              <Link href="/privacy" className="font-bold text-indigo-600 underline">
                Privacy & GDPR Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="font-bold text-indigo-600 underline">
                Terms of Service
              </Link>
              , or start converting your files right away on our{' '}
              <Link href="/" className="font-bold text-indigo-600 underline">
                Home Workspace
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
