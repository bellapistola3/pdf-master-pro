'use client';

import React, { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT_ID } from '@/lib/seoConfig';

export type AdVariant = 'leaderboard' | 'rectangle' | 'in-article' | 'mobile-box';

interface AdBannerProps {
  slotId: string;
  variant?: AdVariant;
  label?: string;
  className?: string;
}

/**
 * Интелигентен Google AdSense компонент с твърдо резервирани минимални височини
 * за гарантиран 0.000 Cumulative Layout Shift (CLS) и спазване на Google Publisher Policies.
 */
export default function AdBanner({
  slotId,
  variant = 'leaderboard',
  label = 'РЕКЛАМА / ADVERTISEMENT',
  className = '',
}: AdBannerProps) {
  const adInitialized = useRef(false);

  useEffect(() => {
    if (adInitialized.current) return;
    try {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        adInitialized.current = true;
      }
    } catch {
      // В локална среда или при активен AdBlocker не хвърляме грешка в конзолата
    }
  }, []);

  const sizeClasses: Record<AdVariant, string> = {
    leaderboard: 'min-h-[90px] md:min-h-[90px]',
    rectangle: 'min-h-[250px] md:min-h-[90px] lg:min-h-[250px]',
    'in-article': 'min-h-[250px]',
    'mobile-box': 'min-h-[280px]',
  };

  return (
    <aside
      aria-label="Спонсорирана рекламна секция"
      className={`my-8 mx-auto w-full max-w-5xl select-none px-2 ${className}`}
    >
      <div className="mb-1.5 flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-slate-200" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {label}
        </span>
        <span className="h-px w-8 bg-slate-200" />
      </div>

      <div
        className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100/50 p-2 shadow-inner ${sizeClasses[variant]}`}
      >
        {/* Визуален placeholder за разработка и CLS защита преди рендиране на AdSense */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-xs text-slate-400">
          <span className="font-medium text-slate-400/80">
            PDFDaVinci AdSense Slot ({slotId})
          </span>
          <span className="mt-0.5 text-[11px] text-slate-400/60">
            Zero-CLS Reserved Container • Viewability Optimized
          </span>
        </div>

        <ins
          className="adsbygoogle relative z-10 block w-full text-center"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
