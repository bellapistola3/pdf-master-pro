import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Cpu,
  FileImage,
  FileText,
  FileType2,
  HelpCircle,
  Layers,
  ListOrdered,
  Lock,
  Mail,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import type { PageSeoData } from '@/lib/seoConfig';
import AdBanner from './ads/AdBanner';
import InteractivePipelineStudio from './InteractivePipelineStudio';

interface SeoContentBlockProps {
  pageData: PageSeoData;
}

const specializedToolCards = [
  {
    href: '/',
    badge: 'ALL-IN-ONE STUDIO',
    title: 'All-in-One PDF Converter',
    description:
      'Switch seamlessly between JPG, Word, Text, and Page Inspector in one unified workspace.',
    icon: Layers,
    iconStyle:
      'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25',
    badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    hoverBorder: 'hover:border-indigo-400',
  },
  {
    href: '/pdf-to-jpg',
    badge: '300 DPI RASTER',
    title: 'PDF to High-Res JPG (ZIP)',
    description:
      'Render every PDF page at 2.0x Retina resolution and download all images in a single ZIP archive.',
    icon: FileImage,
    iconStyle:
      'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25',
    badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200/80',
    hoverBorder: 'hover:border-amber-400',
  },
  {
    href: '/pdf-to-word',
    badge: 'EDITABLE .DOC',
    title: 'PDF to Editable Word (.DOC)',
    description:
      'Reconstruct paragraphs, headings, and page breaks for Microsoft Word, Google Docs & LibreOffice.',
    icon: FileType2,
    iconStyle:
      'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-600/25',
    badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200/80',
    hoverBorder: 'hover:border-blue-400',
  },
  {
    href: '/pdf-to-text',
    badge: 'UTF-8 EXTRACTOR',
    title: 'Extract PDF to Text (.TXT)',
    description:
      'Extract clean, coordinate-sorted UTF-8 plain text with instant live editing and 1-click copy.',
    icon: FileText,
    iconStyle:
      'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25',
    badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    hoverBorder: 'hover:border-emerald-400',
  },
];

export default function SeoContentBlock({ pageData }: SeoContentBlockProps) {
  return (
    <article className="mx-auto mt-12 w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
      {/* SECTION 1: 2-Column "How It Works" with Interactive Studio Window & Equal-Height Steps */}
      <section
        aria-labelledby="howto-heading"
        className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10"
      >
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-indigo-50 px-3.5 py-1 text-xs font-extrabold text-indigo-700">
              <ListOrdered className="h-3.5 w-3.5" />
              Interactive Step-by-Step Guide
            </div>
            <h2
              id="howto-heading"
              className="mt-2.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              {pageData.howToTitle}
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-xs font-extrabold text-emerald-800">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>100% Client-Side RAM • Zero Cloud Latency</span>
          </div>
        </div>

        {/* items-stretch guarantees Left Interactive Studio and Right 3-Step Stack share exact top & bottom edges */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left Column: Interactive Live Format Preview & Quick-Launch Studio */}
          <InteractivePipelineStudio />

          {/* Right Column: 3 Equal-Flex Steps Aligned Top-to-Bottom with Left Interactive Studio */}
          <div className="flex h-full flex-col justify-between gap-4 lg:col-span-7">
            {pageData.howToSteps.map((step, index) => (
              <div
                key={step.name}
                id={`step-${index + 1}`}
                className="group flex flex-1 items-start gap-5 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white to-slate-50/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md sm:items-center sm:p-6"
              >
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25 transition-transform group-hover:scale-105">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-200">
                    STEP
                  </span>
                  <span className="text-lg font-black leading-none">0{index + 1}</span>
                </div>
                <div className="flex-1">
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
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
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
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                    {rev.date}
                  </span>
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

      {/* SECTION 3: Wide, Spacious Zero-Server Security Compliance Banner */}
      <section
        aria-label="Security & Privacy Certifications"
        className="mt-10 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-6 text-white shadow-xl sm:p-10"
      >
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3.5 py-1 text-xs font-extrabold text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            Hardened Zero-Server Privacy & Security Architecture
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Your Confidential Files Never Leave Your Device
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
            Unlike cloud PDF converters that store your documents for 48 hours on external servers,
            PDFDaVinci processes 100% of your files locally inside your browser’s volatile RAM with
            strict Content-Security-Policy (CSP), Magic-Byte PDF signature verification, and
            disabled script evaluation. Closing your tab immediately purges all memory.
          </p>
        </div>

        {/* 4 Wide, Spacious Horizontal Security Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">256-Bit SSL & CSP</div>
              <div className="text-xs font-medium text-slate-300">HTTPS & XSS Protected</div>
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
              <div className="text-xs font-medium text-slate-300">Magic-Byte File Check</div>
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

      {/* SECTION 4: In-Depth SEO Articles, Elevated Feature Cards & Redesigned Tool Showcase */}
      <section className="mt-10 space-y-10 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10">
        {pageData.articleSections.map((section) => (
          <div
            key={section.heading}
            className="border-b border-slate-100 pb-8 last:border-none last:pb-0"
          >
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {section.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3.5 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white to-slate-50/90 p-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Google Featured Snippet ("Position 0") Semantic Comparison Table */}
        <div className="border-b border-slate-100 pb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-extrabold text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Architecture Benchmark Comparison
          </div>
          <h3 className="mt-2.5 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            PDFDaVinci (Local RAM Studio) vs. Traditional Cloud PDF Converters
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            See why privacy-conscious professionals, legal teams, and businesses choose client-side
            browser RAM execution over legacy cloud-upload PDF websites:
          </p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200/90 shadow-sm">
            <table
              aria-label="PDFDaVinci vs Traditional Cloud PDF Converters Comparison"
              className="w-full min-w-[640px] border-collapse bg-white text-left text-sm"
            >
              <thead>
                <tr className="border-b border-slate-200 bg-slate-900 text-xs font-extrabold uppercase tracking-wider text-white">
                  <th scope="col" className="px-5 py-4">
                    Feature &amp; Security Criteria
                  </th>
                  <th scope="col" className="bg-indigo-950 px-5 py-4 text-amber-300">
                    PDFDaVinci.com (Local RAM)
                  </th>
                  <th scope="col" className="px-5 py-4 text-slate-300">
                    Traditional Cloud PDF Sites
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-slate-700">
                <tr className="hover:bg-slate-50/80">
                  <td className="px-5 py-3.5 font-extrabold text-slate-900">
                    Document Privacy &amp; Storage
                  </td>
                  <td className="bg-indigo-50/40 px-5 py-3.5 font-bold text-emerald-700">
                    ✓ 100% Local RAM (0 Bytes Uploaded)
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    Uploaded &amp; stored on remote cloud servers
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="px-5 py-3.5 font-extrabold text-slate-900">
                    Pricing &amp; Hidden Subscriptions
                  </td>
                  <td className="bg-indigo-50/40 px-5 py-3.5 font-bold text-emerald-700">
                    ✓ 100% Free Forever (No Credit Card)
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    Paywalls, $0.50 trial traps &amp; daily limits
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="px-5 py-3.5 font-extrabold text-slate-900">
                    Registration &amp; Email Gatekeepers
                  </td>
                  <td className="bg-indigo-50/40 px-5 py-3.5 font-bold text-emerald-700">
                    ✓ Instant Download (Zero Sign-Up)
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    Often requires email or account login
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="px-5 py-3.5 font-extrabold text-slate-900">
                    JPG Export Quality &amp; Batching
                  </td>
                  <td className="bg-indigo-50/40 px-5 py-3.5 font-bold text-emerald-700">
                    ✓ 2.0x HiDPI (300 DPI) + 1-Click .ZIP
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    Compressed 72–150 DPI or paid Pro tier
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="px-5 py-3.5 font-extrabold text-slate-900">
                    Conversion Speed &amp; Queues
                  </td>
                  <td className="bg-indigo-50/40 px-5 py-3.5 font-bold text-emerald-700">
                    ✓ Sub-Second Web Worker Hardware Speed
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    Slow upload/download queues
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Redesigned Interactive SaaS Tool Cards ("Explore All Specialized Tools on PDFDaVinci.com") */}
        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/40 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-indigo-700 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                Explore All Specialized Tools on PDFDaVinci.com
              </div>
              <h3 className="mt-2.5 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Choose Your Dedicated Local RAM PDF Studio
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              4 Instant Conversion Modes • 100% Free
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specializedToolCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className={`group flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${card.hoverBorder}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 ${card.iconStyle}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${card.badgeStyle}`}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <h4 className="mt-4 text-base font-extrabold text-slate-900 group-hover:text-indigo-600">
                      {card.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs font-extrabold text-indigo-600">
                    <span>Launch Studio</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition-all group-hover:bg-indigo-600 group-hover:text-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
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
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-slate-900 focus:outline-none">
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
          <div className="mt-6 space-y-3 border-t border-slate-100 pt-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
              <a
                href="mailto:office@pdfdavinci.com"
                className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50/70 px-3 py-1.5 text-indigo-700 transition hover:bg-indigo-100"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>office@pdfdavinci.com</span>
              </a>
              <a
                href="mailto:support@pdfdavinci.com"
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50/70 px-3 py-1.5 text-emerald-700 transition hover:bg-emerald-100"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>support@pdfdavinci.com</span>
              </a>
            </div>
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-800"
              >
                <span>Read Full About Us & Engineering Architecture</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
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
          <div className="mt-6 space-y-3 border-t border-slate-100 pt-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600">
              <span>Official Inquiries:</span>
              <a
                href="mailto:office@pdfdavinci.com"
                className="font-extrabold text-indigo-600 hover:underline"
              >
                office@pdfdavinci.com
              </a>
              <span>•</span>
              <a
                href="mailto:support@pdfdavinci.com"
                className="font-extrabold text-emerald-700 hover:underline"
              >
                support@pdfdavinci.com
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-extrabold">
              <Link
                href="/terms"
                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
              >
                <span>Read Full Terms of Service</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900"
              >
                <span>Read Privacy & GDPR Policy</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
