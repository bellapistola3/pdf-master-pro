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
    <article className="mx-auto mt-12 w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
      {/* SECTION 1: 2-Column "How It Works" with 100% Equal-Height Stretched Alignment */}
      <section
        aria-labelledby="howto-heading"
        className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10"
      >
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-extrabold text-indigo-700">
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

        {/* items-stretch guarantees Left Dark Card and Right 3-Step Stack share exact top & bottom edges */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left Column: Full-Height Stretched Visual RAM Pipeline Card */}
          <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-900 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 text-white shadow-xl sm:p-8 lg:col-span-5">
            <div className="flex items-center justify-between border-b border-indigo-800/70 pb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                ⚡ In-Memory RAM Pipeline
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-extrabold text-emerald-300">
                0 Bytes Uploaded
              </span>
            </div>

            <div className="my-6 space-y-5">
              {/* Source PDF Box */}
              <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-sm font-black text-slate-950 shadow-md">
                    PDF
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-white">Your Local PDF File</p>
                    <p className="text-xs text-indigo-200">
                      Parsed directly inside browser volatile RAM
                    </p>
                  </div>
                </div>
                <Lock className="h-5 w-5 shrink-0 text-emerald-400" />
              </div>

              {/* Arrow Indicator */}
              <div className="flex items-center justify-center gap-2 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                <span>↓ Mozilla PDF.js Web Worker Engine ↓</span>
              </div>

              {/* 3 Output Formats Grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-indigo-400/30 bg-indigo-900/50 p-3.5">
                  <FileImage className="mx-auto mb-1.5 h-6 w-6 text-amber-300" />
                  <p className="text-xs font-extrabold text-white">.JPG / .ZIP</p>
                  <p className="mt-0.5 text-[11px] text-indigo-200">2.0x HiDPI</p>
                </div>
                <div className="rounded-xl border border-indigo-400/30 bg-indigo-900/50 p-3.5">
                  <FileType2 className="mx-auto mb-1.5 h-6 w-6 text-cyan-300" />
                  <p className="text-xs font-extrabold text-white">.DOC Word</p>
                  <p className="mt-0.5 text-[11px] text-indigo-200">Editable</p>
                </div>
                <div className="rounded-xl border border-indigo-400/30 bg-indigo-900/50 p-3.5">
                  <FileText className="mx-auto mb-1.5 h-6 w-6 text-emerald-300" />
                  <p className="text-xs font-extrabold text-white">.TXT File</p>
                  <p className="mt-0.5 text-[11px] text-indigo-200">Clean UTF-8</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-indigo-800/70 pt-4 text-xs text-indigo-200">
              <span>Hardware-Accelerated 2D Canvas</span>
              <span className="font-bold text-emerald-300">✓ 100% Client-Side</span>
            </div>
          </div>

          {/* Right Column: 3 Equal-Flex Steps Aligned Top-to-Bottom with Left Card */}
          <div className="flex h-full flex-col justify-between gap-4 lg:col-span-7">
            {pageData.howToSteps.map((step, index) => (
              <div
                key={step.name}
                id={`step-${index + 1}`}
                className="flex flex-1 items-center gap-5 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 transition hover:border-indigo-300 hover:bg-white hover:shadow-md sm:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-black text-white shadow-md shadow-indigo-600/25">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                    {step.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Social Proof / User Reviews ("What Our Users Are Saying") */}
      <section
        aria-labelledby="reviews-heading"
        className="mt-10 rounded-3xl border border-slate-200/90 bg-slate-100/80 p-6 shadow-sm sm:p-10"
      >
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-extrabold text-emerald-800">
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

          <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex items-center gap-0.5 text-emerald-600">
              <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
            </div>
            <span className="text-sm font-extrabold text-slate-900">4.9 / 5</span>
            <span className="text-xs font-medium text-slate-500">(2,840+ Ratings)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pageData.reviews.map((rev) => (
            <div
              key={rev.title}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                  </div>
                  <span className="text-xs font-bold text-emerald-700">{rev.date}</span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900">{rev.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-sm font-extrabold text-slate-900">{rev.author}</p>
                <p className="text-xs text-slate-500">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SLOT C (In-Article AdSense): Between Reviews and Security Banner */}
      <AdBanner slotId="3344556677" variant="in-article" />

      {/* SECTION 3: Wide, Spacious Zero-Server Security Compliance Banner (Fixed Layout!) */}
      <section
        aria-label="Security & Privacy Certifications"
        className="mt-10 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-6 text-white shadow-xl sm:p-10"
      >
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3.5 py-1 text-xs font-extrabold text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            Zero-Server Privacy Architecture
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Your Confidential Files Never Leave Your Device
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
            Unlike cloud PDF converters that store your documents for 48 hours on external servers,
            PDFDaVinci processes 100% of your files locally inside your browser’s volatile RAM.
            Closing your tab immediately purges all memory.
          </p>
        </div>

        {/* 4 Wide, Spacious Horizontal Security Cards — Zero Cramping or Text Wrapping */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">256-Bit SSL</div>
              <div className="text-xs font-medium text-slate-300">HTTPS Encrypted</div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">100% Local RAM</div>
              <div className="text-xs font-medium text-slate-300">Zero Cloud Uploads</div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">GDPR & CCPA</div>
              <div className="text-xs font-medium text-slate-300">Full Privacy Compliance</div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">100% Free Forever</div>
              <div className="text-xs font-medium text-slate-300">No Credit Card Needed</div>
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
              <ul className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 text-sm font-medium text-slate-700"
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
          <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/"
              className="rounded-xl bg-white p-4 text-xs font-extrabold text-slate-800 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-indigo-400"
            >
              ⚡ All-in-One PDF Converter →
            </Link>
            <Link
              href="/pdf-to-jpg"
              className="rounded-xl bg-white p-4 text-xs font-extrabold text-slate-800 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-indigo-400"
            >
              🖼️ High-Res PDF to JPG (ZIP) →
            </Link>
            <Link
              href="/pdf-to-word"
              className="rounded-xl bg-white p-4 text-xs font-extrabold text-slate-800 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-indigo-400"
            >
              📝 Editable PDF to Word (.DOC) →
            </Link>
            <Link
              href="/pdf-to-text"
              className="rounded-xl bg-white p-4 text-xs font-extrabold text-slate-800 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-indigo-400"
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

      {/* SECTION 6: About Us & Terms of Use E-E-A-T Block */}
      <section
        aria-labelledby="about-terms-heading"
        className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2"
      >
        <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
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

        <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
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
