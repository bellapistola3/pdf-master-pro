'use client';

import React, { useState } from 'react';
import { Check, Copy, Heart, Share2 } from 'lucide-react';
import { SITE_URL } from '@/lib/seoConfig';

export default function ShareGrowthBar() {
  const [copied, setCopied] = useState(false);

  const shareText =
    'Found a 100% free online PDF converter (PDF to JPG, Word & Text) that runs locally in browser RAM with zero server uploads and no credit card traps:';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${SITE_URL}/`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored
    }
  };

  const shareLinks = [
    {
      name: 'Reddit',
      href: `https://www.reddit.com/submit?url=${encodeURIComponent(`${SITE_URL}/`)}&title=${encodeURIComponent(shareText)}`,
      className:
        'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-600 hover:text-white hover:border-orange-600',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_URL}/`)}`,
      className:
        'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600',
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/`)}`,
      className:
        'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-700 hover:text-white hover:border-sky-700',
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(`${SITE_URL}/`)}&text=${encodeURIComponent(shareText)}`,
      className:
        'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900',
    },
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${SITE_URL}/`)}`,
      className:
        'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600',
    },
  ];

  return (
    <div className="mt-8 rounded-2xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/80 via-white to-amber-50/60 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/20 sm:flex">
            <Heart className="h-5 w-5 fill-amber-300 text-amber-300" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-slate-900 sm:text-base">
              Saved you from a paid subscription trap? Share PDFDaVinci with a friend or colleague!
            </p>
            <p className="mt-0.5 text-xs font-medium text-slate-600">
              Help others convert PDFs 100% free &amp; privately in local RAM • Press{' '}
              <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-800">
                Ctrl + D
              </kbd>{' '}
              to bookmark
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {shareLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-extrabold transition-all duration-150 ${item.className}`}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{item.name}</span>
            </a>
          ))}

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-300 bg-indigo-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm transition hover:bg-indigo-700"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-300" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
