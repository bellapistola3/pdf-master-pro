import React from 'react';
import type { Metadata } from 'next';
import PdfConverterWorkspace from '@/components/PdfConverterWorkspace';
import { generateJsonLdSchemas, SEO_PAGES, SITE_NAME } from '@/lib/seoConfig';

const pageData = SEO_PAGES.home;

export const metadata: Metadata = {
  title: pageData.title,
  description: pageData.metaDescription,
  keywords: pageData.keywords,
  alternates: {
    canonical: pageData.canonicalUrl,
  },
  openGraph: {
    title: pageData.title,
    description: pageData.metaDescription,
    url: pageData.canonicalUrl,
    siteName: SITE_NAME,
    locale: 'bg_BG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageData.title,
    description: pageData.metaDescription,
  },
};

export default function HomePage() {
  const schemas = generateJsonLdSchemas(pageData);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PdfConverterWorkspace pageData={pageData} />
    </>
  );
}
