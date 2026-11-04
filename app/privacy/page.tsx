import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, ArrowLeft, Mail } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy, GDPR & Google AdSense Cookie Disclosure',
  description:
    'Read the Privacy Policy for PDFDaVinci (pdfdavinci.com). 100% local in-browser RAM PDF processing with zero file uploads, plus full GDPR, CCPA, and Google AdSense cookie transparency.',
  alternates: {
    canonical: `${SITE_URL}/privacy/`,
  },
  openGraph: {
    title: `Privacy & GDPR Policy | ${SITE_NAME}`,
    description:
      'Zero-Server Privacy Guarantee: Your PDF files are processed 100% locally in your browser RAM and never leave your device.',
    url: `${SITE_URL}/privacy/`,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-banner.svg`,
        width: 1200,
        height: 630,
        alt: `Privacy & GDPR Policy | ${SITE_NAME}`,
      },
    ],
  },
};

export default function PrivacyPage() {
  const privacySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Privacy Policy & GDPR Disclosure | ${SITE_NAME}`,
    url: `${SITE_URL}/privacy/`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
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
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-extrabold text-emerald-800">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            GDPR, CCPA & Google Publisher Compliant • Updated November 2026
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Privacy Policy & Zero-Upload Data Guarantee
          </h1>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-slate-600 sm:text-base">
            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                1. Zero Server Uploads — 100% Local Browser RAM Processing
              </h2>
              <p className="mt-2">
                At <strong>PDFDaVinci</strong> (
                <a href="https://pdfdavinci.com" className="text-indigo-600 underline">
                  https://pdfdavinci.com
                </a>
                ), your document privacy is guaranteed by architecture, not just policy. When you
                select or drag and drop a PDF file into our converter,{' '}
                <strong>the file is never uploaded to our servers or any third-party cloud</strong>.
                All rendering (PDF to JPG), document synthesis (PDF to Word .doc), and text
                extraction (PDF to .txt) happen exclusively inside your own device’s volatile memory
                (RAM) via client-side Web Workers. When you close your browser tab, your browser’s
                garbage collector permanently erases the memory.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                2. Personal Data & Registration
              </h2>
              <p className="mt-2">
                We do not require user accounts, email addresses, names, phone numbers, or payment
                information to use PDFDaVinci. We never collect or store personal identity profiles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                3. Google AdSense & Cookies Disclosure
              </h2>
              <p className="mt-2">
                To keep PDFDaVinci 100% free without subscription fees, we display non-intrusive
                advertisements served by <strong>Google AdSense</strong>:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Third-party vendors, including Google, use cookies (such as the DoubleClick DART
                  cookie) to serve ads based on a user’s prior visits to this website or other
                  websites on the internet.
                </li>
                <li>
                  Google’s use of advertising cookies enables it and its partners to serve ads to
                  users based on their visit to <strong>pdfdavinci.com</strong> and/or other sites
                  on the Internet.
                </li>
                <li>
                  Users may opt out of personalized advertising by visiting{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-indigo-600 underline"
                  >
                    Google Ads Settings
                  </a>{' '}
                  or by visiting{' '}
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-indigo-600 underline"
                  >
                    www.aboutads.info
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                4. GDPR (European Economic Area) & CCPA (California) Rights
              </h2>
              <p className="mt-2">
                Because PDFDaVinci never collects, transmits, or stores your PDF files on any
                server, there is zero personal document data stored on our infrastructure to access,
                port, or delete. For cookie consent preferences relating to advertising in the
                EU/EEA, UK, and California, you can manage or revoke consent at any time through
                your browser settings or Google’s ad privacy controls.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                5. HTTPS Encryption & Security
              </h2>
              <p className="mt-2">
                All static application code delivered from <strong>https://pdfdavinci.com</strong>{' '}
                is served over 256-bit TLS/SSL HTTPS encryption with strict Content-Security-Policy
                headers (`upgrade-insecure-requests`), Magic-Byte PDF header verification, and
                disabled script evaluation, ensuring that the client-side scripts running in your
                browser are authentic and tamper-proof.
              </p>
            </section>

            <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
              <h2 className="text-xl font-extrabold text-slate-900">
                6. Data Protection & Privacy Contact
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                For any GDPR, CCPA, privacy, or security inquiries, please contact our team at our
                official domain email addresses:
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
