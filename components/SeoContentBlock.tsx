import React from 'react';
import Link from 'next/link';
import { CheckCircle2, HelpCircle, ListOrdered, ShieldCheck, Sparkles } from 'lucide-react';
import type { PageSeoData } from '@/lib/seoConfig';
import AdBanner from './ads/AdBanner';

interface SeoContentBlockProps {
  pageData: PageSeoData;
}

export default function SeoContentBlock({ pageData }: SeoContentBlockProps) {
  return (
    <article className="mx-auto mt-14 max-w-5xl px-4 sm:px-6">
      {/* SECTION 1: Step-by-Step HowTo Guide */}
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pageData.howToSteps.map((step, index) => (
            <div
              key={step.name}
              id={`step-${index + 1}`}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6"
            >
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-base font-extrabold text-white shadow-sm">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{step.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </div>
              <div className="mt-4 border-t border-slate-200/60 pt-3 text-xs font-semibold text-emerald-700">
                ✓ 100% Local In-Memory Execution
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SLOT C (In-Article AdSense): Between HowTo instructions and deep SEO content / FAQs */}
      <AdBanner slotId="3344556677" variant="in-article" />

      {/* SECTION 2: In-Depth SEO Articles & Technical Advantages */}
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

      {/* SECTION 3: Frequently Asked Questions (FAQPage) */}
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

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs font-semibold text-emerald-900">
          <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
          <span>
            PDFDaVinci (pdfdavinci.com) Privacy Guarantee: All PDF documents are processed strictly
            inside your local browser memory and are never transmitted over the internet.
          </span>
        </div>
      </section>
    </article>
  );
}
