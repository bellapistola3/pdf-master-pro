import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock, Mail, Scale, Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-8 lg:px-12">
        {/* Symmetrical 4-Column Layout */}
        <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand, Mission & Direct Emails */}
          <div className="flex flex-col justify-between">
            <div>
              <Link href="/" className="mb-4 inline-flex items-center">
                <span className="text-2xl font-black tracking-tight text-white">
                  PDF
                  <span className="bg-gradient-to-r from-amber-300 to-indigo-400 bg-clip-text text-transparent">
                    DaVinci
                  </span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-400">
                Fast, 100% free online PDF converter at{' '}
                <strong className="text-slate-200">pdfdavinci.com</strong>. Convert your documents
                to JPG, Word, and Text locally inside your browser without uploading files to any
                server.
              </p>
            </div>

            <div className="mt-5 space-y-2.5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>100% Free • No Credit Card Trap</span>
              </div>

              <div className="pt-1 text-xs">
                <a
                  href="mailto:office@pdfdavinci.com"
                  className="flex items-center gap-2 font-bold text-slate-200 transition hover:text-amber-400"
                >
                  <Mail className="h-3.5 w-3.5 text-amber-400" />
                  <span>office@pdfdavinci.com</span>
                </a>
                <a
                  href="mailto:support@pdfdavinci.com"
                  className="mt-1.5 flex items-center gap-2 font-bold text-slate-200 transition hover:text-amber-400"
                >
                  <Mail className="h-3.5 w-3.5 text-indigo-400" />
                  <span>support@pdfdavinci.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: PDF Converter Tools */}
          <div>
            <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-white">
              PDF Converter Tools
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/" className="transition hover:text-amber-400">
                  All-in-One PDF Converter
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-jpg" className="transition hover:text-amber-400">
                  PDF to High-Resolution JPG (ZIP)
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-word" className="transition hover:text-amber-400">
                  PDF to Editable Word (.DOC)
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-text" className="transition hover:text-amber-400">
                  Extract Plain Text from PDF (.TXT)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Privacy & Security Guarantees */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-white">
              <Shield className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider">
                Privacy & Security
              </h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Zero Cloud Uploads (100% Local RAM)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Automatic Memory Purge on Tab Close</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>256-Bit HTTPS SSL & CSP Protection</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>GDPR & CCPA Privacy Compliant</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Company, Legal & Official Contact */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-white">
              <Scale className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider">
                Company, Legal & Contact
              </h3>
            </div>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/about" className="transition hover:text-amber-400">
                  About Us & Our Mission
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-amber-400">
                  Terms of Service (Rules of Use)
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-amber-400">
                  Privacy Policy & GDPR / Cookies
                </Link>
              </li>
              <li>
                <a
                  href="mailto:office@pdfdavinci.com"
                  className="inline-flex items-center gap-2 text-amber-300 transition hover:text-amber-200"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Office: office@pdfdavinci.com</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@pdfdavinci.com"
                  className="inline-flex items-center gap-2 text-indigo-300 transition hover:text-indigo-200"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Support: support@pdfdavinci.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Clean Symmetrical Bottom Copyright & Contact Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-400 lg:flex-row">
          <p>© {currentYear} PDFDaVinci (https://pdfdavinci.com). All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-5 font-medium">
            <a
              href="mailto:office@pdfdavinci.com"
              className="text-slate-300 transition hover:text-amber-400"
            >
              office@pdfdavinci.com
            </a>
            <a
              href="mailto:support@pdfdavinci.com"
              className="text-slate-300 transition hover:text-amber-400"
            >
              support@pdfdavinci.com
            </a>
            <Link href="/about" className="transition hover:text-white">
              About Us
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms of Service
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/sitemap.xml" className="transition hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
