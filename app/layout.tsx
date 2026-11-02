import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { ADSENSE_CLIENT_ID, SEO_PAGES, SITE_NAME, SITE_URL } from '@/lib/seoConfig';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4f46e5',
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
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
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
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SEO_PAGES.home.title,
    description: SEO_PAGES.home.metaDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_PAGES.home.title,
    description: SEO_PAGES.home.metaDescription,
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
        {/* Google AdSense Asynchronous Script (Zero-Blocking for Core Web Vitals) */}
        <Script
          id="adsense-init"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
