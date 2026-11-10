import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Scale, ArrowLeft, Mail } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'Terms of Service & Acceptable Use Policy',
  description:
    'Read the official Terms of Service for PDFDaVinci (pdfdavinci.com). 100% free client-side RAM PDF conversion for personal and commercial use.',
  alternates: {
    canonical: `${SITE_URL}/terms/`,
  },
  openGraph: {
    title: `Terms of Service | ${SITE_NAME}`,
    description:
      'Official Terms of Use for PDFDaVinci.com — free local in-browser PDF conversion utility.',
    url: `${SITE_URL}/terms/`,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-banner.svg`,
        width: 1200,
        height: 630,
        alt: `Terms of Service | ${SITE_NAME}`,
      },
    ],
  },
};

export default function TermsPage() {
  const termsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Terms of Service & Rules of Use | ${SITE_NAME}`,
    url: `${SITE_URL}/terms/`,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to PDF Converter</span>
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-extrabold text-indigo-700">
            <Scale className="h-4 w-4" />
            Legal Agreement • Last Updated: November 2026
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Terms of Service & Rules of Use
          </h1>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-slate-600 sm:text-base">
            <section>
              <h2 className="text-xl font-extrabold text-slate-900">1. Acceptance of Terms</h2>
              <p className="mt-2">
                By accessing and using <strong>PDFDaVinci</strong> (
                <a href="https://pdfdavinci.com" className="text-indigo-600 underline">
                  https://pdfdavinci.com
                </a>
                ), you agree to comply with and be bound by these Terms of Service. If you do not
                agree with any part of these terms, please discontinue use of the website
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                2. Description of Client-Side RAM Service
              </h2>
              <p className="mt-2">
                PDFDaVinci provides a client-side web application that converts PDF files into JPG
                images (ZIP), editable Microsoft Word (.doc) documents, and plain text (.txt) files.
                All document parsing, rendering, and archiving execute{' '}
                <strong>100% locally inside your web browser’s volatile memory (RAM)</strong> using
                JavaScript, HTML5 Canvas, and Web Workers. PDFDaVinci does not upload, receive,
                store, or host user files on any backend server.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                3. Document Ownership & Copyright
              </h2>
              <p className="mt-2">
                You retain{' '}
                <strong>100% ownership, copyright, and intellectual property rights</strong> in all
                documents you open and convert using PDFDaVinci. Because your files never leave your
                device, PDFDaVinci never acquires any license, right, or access to your content. You
                are solely responsible for ensuring you have the legal right to process and convert
                the files you load into your browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                4. Free Personal & Commercial Use
              </h2>
              <p className="mt-2">
                PDFDaVinci is provided free of charge for both personal and commercial document
                workflows. You may not attempt to reverse-engineer, scrape, overload, or
                redistribute our website’s proprietary interface code as a competing commercial
                service without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                5. Disclaimer of Warranties (&ldquo;As-Is&rdquo;)
              </h2>
              <p className="mt-2">
                The tools on PDFDaVinci.com are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS
                AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied.
                While our 2.0x HiDPI rendering and coordinate-aware text parsers are engineered for
                maximum accuracy, complex or corrupted PDF files may vary in output formatting
                depending on your browser and hardware environment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                6. Limitation of Liability
              </h2>
              <p className="mt-2">
                In no event shall PDFDaVinci or its developers be liable for any direct, indirect,
                incidental, or consequential damages arising out of the use or inability to use our
                client-side conversion tools. Always keep a backup of your original PDF files on
                your device.
              </p>
            </section>

            <section className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6">
              <h2 className="text-xl font-extrabold text-slate-900">
                7. Official Contact & Legal Inquiries
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                For questions regarding these Terms of Service, corporate inquiries, or technical
                support, please contact us directly at our official email addresses:
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-extrabold">
                <a
                  href="mailto:office@pdfdavinci.com"
                  className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-indigo-700 shadow-sm transition hover:bg-indigo-50"
                >
                  <Mail className="h-4 w-4" />
                  <span>office@pdfdavinci.com</span>
                </a>
                <a
                  href="mailto:support@pdfdavinci.com"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-emerald-700 shadow-sm transition hover:bg-emerald-50"
                >
                  <Mail className="h-4 w-4" />
                  <span>support@pdfdavinci.com</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
