import React from 'react';
import Link from 'next/link';
import { Cpu, FileCheck2, Lock, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Колона 1: Инструменти */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <FileCheck2 className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                PDF<span className="text-indigo-400">DaVinci</span>
              </span>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-slate-400">
              Следващо поколение 100% клиентски PDF конвертор на{' '}
              <strong className="text-slate-200">pdfdavinci.com</strong>. Мигновена обработка
              директно в RAM паметта на вашия браузър.
            </p>
            <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-200">
              PDF Инструменти
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="transition hover:text-indigo-400">
                  Универсален PDF Конвертор (Всичко в 1)
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-jpg" className="transition hover:text-indigo-400">
                  Конвертиране на PDF в JPG (Висока резолюция)
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-word" className="transition hover:text-indigo-400">
                  Конвертиране на PDF в Word (.DOC)
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-text" className="transition hover:text-indigo-400">
                  Извличане на Текст от PDF (.TXT)
                </Link>
              </li>
            </ul>
          </div>

          {/* Колона 2: Поверителност и сигурност */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-white">
              <Shield className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                Поверителност и Сигурност
              </h3>
            </div>
            <ul className="space-y-2.5 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <Lock className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>
                  <strong className="text-slate-200">Нулев сървърен трансфер:</strong> Файловете
                  никога не напускат вашето устройство.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>
                  <strong className="text-slate-200">100% RAM изолация:</strong> При затваряне на
                  таба паметта се изчиства автоматично.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>
                  <strong className="text-slate-200">GDPR & HIPAA Ready:</strong> Пълна защита за
                  правни, финансови и медицински документи.
                </span>
              </li>
            </ul>
          </div>

          {/* Колона 3: Технологичен стек */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-white">
              <Cpu className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Технологичен Стек</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-300">
                • <span className="font-medium text-white">Mozilla PDF.js Engine</span> (Web Worker
                многонишково рендиране)
              </li>
              <li className="text-slate-300">
                • <span className="font-medium text-white">HTML5 2D Canvas API</span> (2.0x HiDPI
                растеризация)
              </li>
              <li className="text-slate-300">
                • <span className="font-medium text-white">JSZip In-Memory Stream</span> (Локално
                пакетиране на архиви)
              </li>
              <li className="text-slate-300">
                • <span className="font-medium text-white">Next.js 15 App Router</span> (Core Web
                Vitals 100/100)
              </li>
            </ul>
          </div>

          {/* Колона 4: Правни условия и GDPR */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-white">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Правни Условия & GDPR</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-400">
              PDFDaVinci се предоставя напълно безплатно. За да поддържаме услугата без абонаменти,
              използваме неинвазивни рекламни банери през Google AdSense съгласно правилата на ЕС за
              бисквитки и поверителност.
            </p>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-xs text-slate-300">
              <div className="font-semibold text-white">Статус на сигурността: АКТИВЕН</div>
              <div className="mt-1 text-slate-400">
                Домейн: <span className="text-indigo-400">https://pdfdavinci.com</span>
              </div>
              <div className="text-slate-400">Режим: Client-Side WebWorker Only</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {currentYear} PDFDaVinci (pdfdavinci.com). Всички права запазени.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/sitemap.xml" className="transition hover:text-slate-300">
              Карта на сайта (Sitemap.xml)
            </Link>
            <span>•</span>
            <Link href="/robots.txt" className="transition hover:text-slate-300">
              Robots.txt
            </Link>
            <span>•</span>
            <span className="text-emerald-400/90">100% Без сървърно съхранение</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
