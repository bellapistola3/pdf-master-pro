'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RotateCcw, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  hasLoadedFile?: boolean;
  onResetFile?: () => void;
}

export default function Header({ hasLoadedFile = false, onResetFile }: HeaderProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'All PDF Tools' },
    { href: '/pdf-to-jpg', label: 'PDF to JPG' },
    { href: '/pdf-to-word', label: 'PDF to Word' },
    { href: '/pdf-to-text', label: 'PDF to Text' },
    { href: '/about', label: 'About Us' },
  ];

  const isRouteActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname === `${href}/`;
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-indigo-500/40 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white shadow-xl shadow-indigo-950/20">
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-indigo-500 to-emerald-400" />

      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-3.5 sm:px-8 lg:px-12">
        {/* Custom Bespoke Logo PDFDaVinci + Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center focus:outline-none"
            aria-label="PDFDaVinci Home"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-black tracking-tight text-white sm:text-[26px]">
                  PDF
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-indigo-300 bg-clip-text text-transparent">
                    DaVinci
                  </span>
                </span>
                <span className="hidden rounded-md border border-amber-400/40 bg-amber-400/15 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-amber-300 sm:inline-block">
                  PRO RAM
                </span>
              </div>
              <span className="text-[11px] font-semibold tracking-wider text-indigo-200/80">
                pdfdavinci.com • Instant Local Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Pills */}
          <nav aria-label="Primary Navigation" className="hidden items-center gap-2 lg:flex">
            {navLinks.map((item) => {
              const isActive = isRouteActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/30 ring-1 ring-amber-300/50'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Security Badge + "Load Another PDF" Button */}
        <div className="flex items-center gap-3">
          <div
            title="All files are processed 100% locally inside your browser RAM without any server uploads"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-xs font-bold text-emerald-300 shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline">🔒 100% Local RAM Mode</span>
            <span className="sm:hidden">🔒 Local RAM</span>
          </div>

          {hasLoadedFile && onResetFile && (
            <button
              type="button"
              onClick={onResetFile}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-md shadow-amber-500/20 transition hover:from-amber-300 hover:to-amber-400 active:scale-[0.99]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Load Another PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-t border-indigo-800/60 bg-slate-950/60 px-4 py-2 lg:hidden">
        {navLinks.map((item) => {
          const isActive = isRouteActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-sm ring-1 ring-amber-300/40'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
