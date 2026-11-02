'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { ADSENSE_CLIENT_ID } from '@/lib/seoConfig';

interface StickyBottomAdProps {
  slotId?: string;
}

/**
 * Дискретен мобилен Sticky Footer банер за висок CTR на мобилни екрани
 * с бутон за затваряне и защитна дистанция от интерактивните елементи.
 */
export default function StickyBottomAd({ slotId = '9900112233' }: StickyBottomAdProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const adPushed = useRef(false);

  useEffect(() => {
    if (isDismissed || adPushed.current) return;
    try {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        adPushed.current = true;
      }
    } catch {
      // Безшумно игнориране при AdBlocker
    }
  }, [isDismissed]);

  if (isDismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Мобилна рекламна лента"
      className="fixed bottom-0 left-0 right-0 z-40 block border-t border-slate-200 bg-white/95 px-3 py-1.5 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-between pb-1">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
          РЕКЛАМА / ADVERTISEMENT
        </span>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="Затвори рекламния банер"
          className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 transition hover:bg-slate-200"
        >
          <span>Затвори</span>
          <X className="h-3 w-3" />
        </button>
      </div>

      <div className="relative flex min-h-[60px] w-full items-center justify-center overflow-hidden rounded-lg border border-slate-200/70 bg-slate-100/50">
        <span className="pointer-events-none absolute text-[10px] text-slate-400">
          PDFDaVinci Mobile Sticky Ad (320x50)
        </span>
        <ins
          className="adsbygoogle relative z-10 block h-[50px] w-[320px]"
          style={{ display: 'inline-block', width: '320px', height: '50px' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
        />
      </div>
    </div>
  );
}
