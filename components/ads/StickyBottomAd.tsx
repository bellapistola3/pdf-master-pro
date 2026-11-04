'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { ADSENSE_CLIENT_ID, IS_ADSENSE_CONFIGURED } from '@/lib/seoConfig';

interface StickyBottomAdProps {
  slotId?: string;
}

/**
 * Discreet mobile Sticky Footer banner for high mobile CTR
 * with a dismiss button and safe padding from interactive elements.
 */
export default function StickyBottomAd({ slotId = '9900112233' }: StickyBottomAdProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const adPushed = useRef(false);

  useEffect(() => {
    if (!IS_ADSENSE_CONFIGURED || isDismissed || adPushed.current) return;
    try {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        adPushed.current = true;
      }
    } catch {
      // Silently ignore when ad blocker is active
    }
  }, [isDismissed]);

  if (!IS_ADSENSE_CONFIGURED || isDismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Mobile Sticky Advertisement"
      className="fixed bottom-0 left-0 right-0 z-40 block border-t border-slate-200 bg-white/95 px-3 py-1.5 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-between pb-1">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
          ADVERTISEMENT
        </span>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="Close advertisement banner"
          className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 transition hover:bg-slate-200"
        >
          <span>Close</span>
          <X className="h-3 w-3" />
        </button>
      </div>

      <div className="relative flex min-h-[60px] w-full items-center justify-center overflow-hidden rounded-lg border border-slate-200/70 bg-slate-50/60">
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
