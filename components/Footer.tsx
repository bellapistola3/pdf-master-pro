import React from 'react';
import Link from 'next/link';
import { Cpu, FileCheck2, Lock, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Tools */}
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
              Next-generation 100% client-side PDF converter at{' '}
              <strong className="text-slate-200">pdfdavinci.com</strong>. Instant document
              processing directly inside your browser RAM.
            </p>
            <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-200">
              Core PDF Converters
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="transition hover:text-indigo-400">
                  All-in-One PDF Converter Suite
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-jpg" className="transition hover:text-indigo-400">
                  Convert PDF to JPG (High-Res ZIP)
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-word" className="transition hover:text-indigo-400">
                  Convert PDF to Editable Word (.DOC)
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-text" className="transition hover:text-indigo-400">
                  Extract Plain Text from PDF (.TXT)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Privacy & Security */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-white">
              <Shield className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                Privacy & Security
              </h3>
            </div>
            <ul className="space-y-2.5 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <Lock className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>
                  <strong className="text-slate-200">Zero Server Uploads:</strong> Your files never
                  leave your device.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>
                  <strong className="text-slate-200">100% Volatile RAM Isolation:</strong> Closing
                  your browser tab immediately wipes memory.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>
                  <strong className="text-slate-200">GDPR & HIPAA Ready:</strong> Enterprise-grade
                  confidentiality for legal, financial, and medical records.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Technology Stack */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-white">
              <Cpu className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Technology Stack</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-300">
                • <span className="font-medium text-white">Mozilla PDF.js Engine</span> (Multi-threaded
                Web Worker)
              </li>
              <li className="text-slate-300">
                • <span className="font-medium text-white">HTML5 2D Canvas API</span> (2.0x HiDPI
                Supersampling)
              </li>
              <li className="text-slate-300">
                • <span className="font-medium text-white">JSZip In-Memory Stream</span> (Instant
                Client-Side Archiving)
              </li>
              <li className="text-slate-300">
                • <span className="font-medium text-white">Next.js 15 Static Export</span> (Core Web
                Vitals 100/100)
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & GDPR */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-white">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Legal & GDPR Policy</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-400">
              PDFDaVinci is 100% free to use with no subscriptions. To keep this utility free for
              everyone, we display non-intrusive, zero-CLS advertisements via Google AdSense in
              compliance with Google Publisher Policies.
            </p>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-xs text-slate-300">
              <div className="font-semibold text-white">Security Status: ACTIVE</div>
              <div className="mt-1 text-slate-400">
                Domain: <span className="text-indigo-400">https://pdfdavinci.com</span>
              </div>
              <div className="text-slate-400">Mode: Client-Side WebWorker Only</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {currentYear} PDFDaVinci (pdfdavinci.com). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/sitemap.xml" className="transition hover:text-slate-300">
              Sitemap.xml
            </Link>
            <span>•</span>
            <Link href="/robots.txt" className="transition hover:text-slate-300">
              Robots.txt
            </Link>
            <span>•</span>
            <span className="text-emerald-400/90">100% Zero-Server Storage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
