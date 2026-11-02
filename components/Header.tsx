'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileCheck2, RotateCcw, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  hasLoadedFile?: boolean;
  onResetFile?: () => void;
}

export default function Header({ hasLoadedFile = false, onResetFile }: HeaderProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Всички инструменти' },
    { href: '/pdf-to-jpg', label: 'PDF в JPG' },
    { href: '/pdf-to-word', label: 'PDF в Word' },
    { href: '/pdf-to-text', label: 'PDF в Текст' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Лого PDFDaVinci */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="PDFDaVinci Начална страница"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                PDF<span className="text-indigo-600">DaVinci</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                pdfdavinci.com
              </span>
            </div>
          </Link>

          {/* Навигация за десктоп */}
          <nav aria-label="Главна навигация" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Десен статус + Бутон "Зареди друг PDF" */}
        <div className="flex items-center gap-3">
          <div
            title="Всички файлове се обработват на 100% локално в оперативната памет (RAM) на браузъра ви без качване на сървър"
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/90 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>🔒 100% Local RAM Mode</span>
          </div>

          {hasLoadedFile && onResetFile && (
            <button
              type="button"
              onClick={onResetFile}
              className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-100 active:scale-[0.99]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Зареди друг PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Мобилна поднавигация за бърз достъп до SEO маршрутите */}
      <div className="flex items-center gap-1 overflow-x-auto border-t border-slate-100 bg-slate-50/70 px-4 py-1.5 lg:hidden">
        {navLinks.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/70'
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
