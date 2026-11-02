import React from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  Cpu,
  FileImage,
  FileText,
  FileType2,
  HelpCircle,
  ListOrdered,
  Lock,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import type { PageSeoData } from '@/lib/seoConfig';
import AdBanner from './ads/AdBanner';

interface SeoContentBlockProps {
  pageData: PageSeoData;
}

export default function SeoContentBlock({ pageData }: SeoContentBlockProps) {
  return (
    <article className="mx-auto mt-14 max-w-5xl px-4 sm:px-6">
      {/* SECTION 1: PDFAid-Inspired 2-Column "How It Works" Visual Diagram + Connected Timeline */}
      <section
        aria-labelledby="howto-heading"
        className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10"
      >
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            <ListOrdered className="h-3.5 w-3.5" />
            Step-by-Step User Guide
          </div>
          <h2
            id="howto-heading"
            className="mt-2.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          >
            {pageData.howToTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Column: Visual Transformation Diagram Card */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 text-white shadow-lg lg:col-span-5">
            <div className="mb-4 flex items-center justify-between border-b border-indigo-800/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                ⚡ In-Memory RAM Pipeline
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                0 Bytes Uploaded
              </span>
            </div>

            <div className="space-y-4">
              {/* Source PDF Box */}
              <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 p-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400 font-black text-slate-950">
                    PDF
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white">Your Local PDF File</p>
                    <p className="text-[11px] text-indigo-200">Opened directly in Browser RAM</p>
                  </div>
                </div>
                <Lock className="h-4 w-4 text-emerald-400" />
              </div>

              {/* Arrow Down */}
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-300">
                <span>↓ Mozilla PDF.js Web Worker Engine ↓</span>
              </div>

              {/* 3 Output Formats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-indigo-400/30 bg-indigo-900/40 p-2.5">
                  <FileImage className="mx-auto mb-1 h-5 w-5 text-amber-300" />
                  <p className="text-xs font-extrabold text-white">.JPG / .ZIP</p>
                  <p className="text-[10px] text-indigo-200">2.0x HiDPI</p>
                </div>
                <div className="rounded-xl border border-indigo-400/30 bg-indigo-900/40 p-2.5">
                  <FileType2 className="mx-auto mb-1 h-5 w-5 text-cyan-300" />
                  <p className="text-xs font-extrabold text-white">.DOC Word</p>
                  <p className="text-[10px] text-indigo-200">Editable</p>
                </div>
                <div className="rounded-xl border border-indigo-400/30 bg-indigo-900/40 p-2.5">
                  <FileText className="mx-auto mb-1 h-5 w-5 text-emerald-300" />
                  <p className="text-xs font-extrabold text-white">.TXT File</p>
                  <p className="text-[10px] text-indigo-200">Clean UTF-8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Connected Timeline Steps (1 -> 2 -> 3) */}
          <div className="space-y-5 lg:col-span-7">
            {pageData.howToSteps.map((step, index) => (
              <div
                key={step.name}
                id={`step-${index + 1}`}
                className="relative flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 transition hover:border-indigo-200 hover:bg-white hover:shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-base font-extrabold text-white shadow-md shadow-indigo-600/20">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                    {step.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: PDFAid-Inspired Social Proof / User Reviews ("What Our Users Are Saying") */}
      <section
        aria-labelledby="reviews-heading"
        className="mt-10 rounded-3xl border border-slate-200/90 bg-slate-100/70 p-6 shadow-sm sm:p-10"
      >
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
              <Star className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />
              Trusted by Professionals Worldwide
            </div>
            <h2
              id="reviews-heading"
              className="mt-2.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              What Our Users Are Saying
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <div className="flex items-center text-emerald-600">
              <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
            </div>
            <span className="text-xs font-extrabold text-slate-900">4.9 / 5</span>
            <span className="text-xs text-slate-500">(2,840+ Ratings)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {pageData.reviews.map((rev) => (
            <div
              key={rev.title}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700">{rev.date}</span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900">{rev.title}</h3>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-3">
                <p className="text-xs font-extrabold text-slate-900">{rev.author}</p>
                <p className="text-[11px] text-slate-500">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SLOT C (In-Article AdSense): Between Reviews and Deep SEO Article */}
      <AdBanner slotId="3344556677" variant="in-article" />

      {/* SECTION 3: GDPR & Zero-Server Security Compliance Banner */}
      <section
        aria-label="Security & Privacy Certifications"
        className="mt-10 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 text-white shadow-lg sm:p-8"
      >
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-extrabold text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              Zero-Server Privacy Architecture
            </div>
            <h2 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
              Your Confidential Files Never Leave Your Device
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              Unlike cloud PDF converters that store your documents for 48 hours on external
              servers, PDFDaVinci processes 100% of your files locally inside your browser’s
              volatile RAM. Closing your tab immediately purges all memory.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 lg:w-auto">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <Lock className="mx-auto mb-1 h-5 w-5 text-emerald-400" />
              <div className="text-xs font-extrabold">256-Bit SSL</div>
              <div className="text-[10px] text-slate-400">HTTPS Encrypted</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <Cpu className="mx-auto mb-1 h-5 w-5 text-amber-400" />
              <div className="text-xs font-extrabold">100% Local RAM</div>
              <div className="text-[10px] text-slate-400">Zero Uploads</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <ShieldCheck className="mx-auto mb-1 h-5 w-5 text-indigo-400" />
              <div className="text-xs font-extrabold">GDPR & CCPA</div>
              <div className="text-[10px] text-slate-400">Full Compliance</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <Award className="mx-auto mb-1 h-5 w-5 text-emerald-400" />
              <div className="text-xs font-extrabold">100% Free</div>
              <div className="text-[10px] text-slate-400">No Card Needed</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: In-Depth SEO Articles & Technical Advantages */}
      <section className="mt-10 space-y-8 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10">
        {pageData.articleSections.map((section) => (
          <div key={section.heading} className="border-b border-slate-100 pb-8 last:border-none last:pb-0">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {section.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 text-sm font-medium text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Internal SEO Silo Links */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-50 via-slate-50 to-violet-50 p-6 ring-1 ring-indigo-100">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <Sparkles className="h-4 w-4" />
            Explore All Specialized Tools on PDFDaVinci.com
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/"
              className="rounded-xl bg-white p-3.5 text-xs font-bold text-slate-800 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-indigo-400"
            >
              ⚡ All-in-One PDF Converter →
            </Link>
            <Link
              href="/pdf-to-jpg"
              className="rounded-xl bg-white p-3.5 text-xs font-bold text-slate-800 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-indigo-400"
            >
              🖼️ High-Res PDF to JPG (ZIP) →
            </Link>
            <Link
              href="/pdf-to-word"
              className="rounded-xl bg-white p-3.5 text-xs font-bold text-slate-800 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-indigo-400"
            >
              📝 Editable PDF to Word (.DOC) →
            </Link>
            <Link
              href="/pdf-to-text"
              className="rounded-xl bg-white p-3.5 text-xs font-bold text-slate-800 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-indigo-400"
            >
              📄 Extract PDF to Text (.TXT) →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: Frequently Asked Questions (FAQPage) */}
      <section
        aria-labelledby="faq-heading"
        className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10"
      >
        <div className="mb-6 flex items-center gap-2 text-indigo-700">
          <HelpCircle className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Frequently Asked Questions (FAQ)
          </span>
        </div>

        <h2
          id="faq-heading"
          className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
        >
          Everything You Need to Know About PDFDaVinci
        </h2>

        <div className="space-y-4">
          {pageData.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition open:border-indigo-200 open:bg-white open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-slate-900">
                <span>{faq.question}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* SECTION 6: About Us ("За нас") & Terms of Use ("Правила за ползване") E-E-A-T Block for Google */}
      <section
        aria-labelledby="about-terms-heading"
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* About PDFDaVinci Card */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
              <Award className="h-3.5 w-3.5" />
              About PDFDaVinci (E-E-A-T Verified)
            </div>
            <h2
              id="about-terms-heading"
              className="mt-3 text-xl font-extrabold text-slate-900"
            >
              About Us — Our Mission for Private, Free Document Tools
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              <strong>PDFDaVinci (pdfdavinci.com)</strong> was engineered by web performance and
              document security specialists to solve two major problems in the online PDF industry:
              privacy-invasive cloud uploads and predatory subscription paywalls. By leveraging
              Mozilla’s PDF.js Web Worker architecture, HTML5 2D Canvas supersampling, and in-memory
              JSZip streams, we empower millions of users to convert PDFs into JPG, Word (.doc),
              and Plain Text (.txt) 100% locally inside their own browser RAM.
            </p>
          </div>
          <div className="mt-6 border-t border-slate-100 pt-4">
            <Link
              href="/about"
              className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800"
            >
              Read Full About Us & Engineering Architecture →
            </Link>
          </div>
        </div>

        {/* Terms of Use & Privacy Summary Card */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <Scale className="h-3.5 w-3.5" />
              Terms of Use & Privacy Guarantee
            </div>
            <h2 className="mt-3 text-xl font-extrabold text-slate-900">
              Terms of Service & Zero-Data Retention Policy
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              By using <strong>PDFDaVinci.com</strong>, you retain 100% ownership and copyright of
              your documents. Because all file conversions occur exclusively within your device’s
              volatile memory (RAM), PDFDaVinci never collects, transmits, views, or stores your
              files on any server. Our service is provided free of charge for both personal and
              commercial use, supported by non-intrusive, policy-compliant advertising.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-xs font-extrabold">
            <Link href="/terms" className="text-indigo-600 hover:text-indigo-800">
              Read Full Terms of Service →
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/privacy" className="text-emerald-700 hover:text-emerald-900">
              Read Privacy & GDPR Policy →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
