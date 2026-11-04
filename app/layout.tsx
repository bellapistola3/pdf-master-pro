import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import {
  ADSENSE_CLIENT_ID,
  IS_ADSENSE_CONFIGURED,
  SEO_PAGES,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seoConfig';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e1b4b',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_PAGES.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: SEO_PAGES.home.metaDescription,
  keywords: SEO_PAGES.home.keywords,
  applicationName: SITE_NAME,
  manifest: '/manifest.json',
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Utilities & Productivity',
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      'en-US': `${SITE_URL}/`,
      'x-default': `${SITE_URL}/`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: SEO_PAGES.home.title,
    description: SEO_PAGES.home.metaDescription,
    images: [
      {
        url: `${SITE_URL}/og-banner.svg`,
        width: 1200,
        height: 630,
        alt: 'PDFDaVinci — 100% Client-Side RAM PDF Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_PAGES.home.title,
    description: SEO_PAGES.home.metaDescription,
    images: [`${SITE_URL}/og-banner.svg`],
  },
};

const globalWebsiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'PDFDaVinci Client-Side PDF Converter',
  url: `${SITE_URL}/`,
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    email: 'office@pdfdavinci.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'office@pdfdavinci.com',
        contactType: 'corporate & legal inquiries',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        email: 'support@pdfdavinci.com',
        contactType: 'customer support',
        availableLanguage: ['English'],
      },
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon.svg`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Hardened Security Meta Policies (CSP with Google AdSense Frame Support, Nosniff, Referrer & HTTPS Upgrade) */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https: blob: data:; frame-src 'self' https: data: blob:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
        />
        {IS_ADSENSE_CONFIGURED && (
          <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                    window.location.replace('https://' + window.location.host + window.location.pathname + window.location.search + window.location.hash);
                  }
                  if (window.top && window.top !== window.self) {
                    var ref = document.referrer || '';
                    var isGooglePreview = ref.indexOf('google.com') !== -1 || ref.indexOf('googlesyndication.com') !== -1 || ref.indexOf('doubleclick.net') !== -1;
                    if (!isGooglePreview) {
                      try { window.top.location.replace(window.self.location.href); } catch (e) {}
                    }
                  }
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalWebsiteSchema) }}
        />
        {/* Google AdSense Asynchronous Script (Loads automatically once real ca-pub ID is configured) */}
        {IS_ADSENSE_CONFIGURED && (
          <Script
            id="adsense-init"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
