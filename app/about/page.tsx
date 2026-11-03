import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Award,
  CheckCircle2,
  Cpu,
  Lock,
  Mail,
  ShieldCheck,
  ArrowLeft,
  Building2,
} from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'About Us — 100% Client-Side RAM PDF Architecture & Contact',
  description:
    'Learn about PDFDaVinci (pdfdavinci.com), our mission to provide 100% free, client-side in-browser PDF conversion tools with zero cloud uploads. Contact us at office@pdfdavinci.com or support@pdfdavinci.com.',
  alternates: {
    canonical: `${SITE_URL}/about/`,
  },
  openGraph: {
    title: `About Us & Official Contact | ${SITE_NAME}`,
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
      email: 'office@pdfdavinci.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          email: 'support@pdfdavinci.com',
          contactType: 'customer support',
          availableLanguage: ['English'],
        },
        {
          '@type': 'ContactPoint',
          email: 'office@pdfdavinci.com',
          contactType: 'corporate & legal inquiries',
          availableLanguage: ['English'],
        },
      ],
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
            <Award className="h-4 w-4" />
            About PDFDaVinci.com
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Reinventing Online PDF Conversion with 100% Local RAM Privacy
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Welcome to <strong>PDFDaVinci</strong> (
            <a href="https://pdfdavinci.com" className="text-indigo-600 underline">
              https://pdfdavinci.com
            </a>
            ). We built PDFDaVinci with a single, uncompromising engineering mission: to give
            individuals, students, legal professionals, healthcare workers, and businesses a
            studio-grade PDF converter that{' '}
            <strong>never uploads confidential documents to a remote server</strong> and{' '}
            <strong>never traps users in deceptive paid subscriptions</strong>.
          </p>

          <div className="my-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <Lock className="mb-2.5 h-6 w-6 text-emerald-600" />
              <h2 className="text-base font-extrabold text-slate-900">Zero Cloud Uploads</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Every byte of your PDF stays inside your device’s volatile memory (RAM). Nothing is
                ever transmitted over the network.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <Cpu className="mb-2.5 h-6 w-6 text-indigo-600" />
              <h2 className="text-base font-extrabold text-slate-900">Web Worker Speed</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Powered by Mozilla PDF.js, HTML5 2D Canvas supersampling, and JSZip for instant
                multi-core browser execution.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <ShieldCheck className="mb-2.5 h-6 w-6 text-amber-500" />
              <h2 className="text-base font-extrabold text-slate-900">100% Free Forever</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                No $0.50 trial traps, no credit card forms, no email gatekeepers, and no watermarks
                on your exported files.
              </p>
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-extrabold text-slate-900">
            Why We Built a Zero-Server PDF Studio
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            For over a decade, online PDF utilities operated on an outdated cloud-upload model: you
            upload a private tax return, legal contract, or medical record to an unknown third-party
            server, wait in a processing queue, and then get hit with a paywall when you try to
            download your file.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Modern web browsers are now powerful enough to run full vector rasterization and
            coordinate-aware text parsing locally. By combining{' '}
            <strong>Mozilla’s PDF.js Web Worker engine</strong> with{' '}
            <strong>2.0x HiDPI HTML5 Canvas rendering</strong>, PDFDaVinci turns your own browser
            into a private, hardware-accelerated document workstation.
          </p>

          <h2 className="mt-8 text-2xl font-extrabold text-slate-900">Our Core Capabilities</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3.5 text-sm text-slate-700 sm:grid-cols-2">
            <li className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <strong>PDF to High-Resolution JPG (ZIP):</strong> 2x supersampled JPEG rendering
                with one-click batch ZIP archiving or individual page downloads.
              </span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <strong>PDF to Editable Word (.DOC):</strong> Coordinate-based paragraph
                reconstruction compatible with Microsoft Word, Google Docs, and LibreOffice.
              </span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <strong>PDF to Clean Plain Text (.TXT):</strong> Instant UTF-8 text extraction with
                a live in-browser editor, word/character counters, and one-click clipboard copy.
              </span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <strong>Interactive Page Gallery:</strong> Side-by-side visual page inspection and
                full-screen zoom preview.
              </span>
            </li>
          </ul>

          {/* Official Contact & Support Channels */}
          <div className="mt-10 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/60 p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Official Contact & Support Channels
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Have a technical question, business inquiry, or feedback? Reach out directly to our
              team at our official domain email addresses below:
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <a
                href="mailto:office@pdfdavinci.com"
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-400 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/20">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                    Head Office, Legal & Partnerships
                  </div>
                  <div className="mt-1 text-base font-black text-slate-900 group-hover:text-indigo-600">
                    office@pdfdavinci.com
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    For corporate inquiries, press, advertising partnerships, and legal notices.
                  </p>
                </div>
              </a>

              <a
                href="mailto:support@pdfdavinci.com"
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                    Technical Support & User Help
                  </div>
                  <div className="mt-1 text-base font-black text-slate-900 group-hover:text-emerald-700">
                    support@pdfdavinci.com
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    For conversion assistance, feature requests, bug reports, and security feedback.
                  </p>
                </div>
              </a>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-slate-600">
              You can also review our{' '}
              <Link href="/privacy" className="font-bold text-indigo-600 underline">
                Privacy & GDPR Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="font-bold text-indigo-600 underline">
                Terms of Service
              </Link>
              , or return to the{' '}
              <Link href="/" className="font-bold text-indigo-600 underline">
                Home PDF Converter Workspace
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
