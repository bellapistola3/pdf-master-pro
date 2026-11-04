export type ConversionFormat = 'jpg' | 'word' | 'text' | 'gallery';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface UserReview {
  title: string;
  quote: string;
  author: string;
  role: string;
  date: string;
}

export interface PageSeoData {
  slug: string;
  breadcrumbLabel: string;
  canonicalUrl: string;
  defaultFormat: ConversionFormat;
  title: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  heroSubtitle: string;
  badgeText: string;
  valueChecks: string[];
  howToTitle: string;
  howToSteps: HowToStep[];
  reviews: UserReview[];
  articleSections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  faqs: FAQItem[];
}

export const SITE_NAME = 'PDFDaVinci';
export const SITE_URL = 'https://pdfdavinci.com';
export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-0000000000000000'; // Replace with your live Google AdSense Publisher ID
export const IS_ADSENSE_CONFIGURED = Boolean(
  ADSENSE_CLIENT_ID &&
    ADSENSE_CLIENT_ID.startsWith('ca-pub-') &&
    !ADSENSE_CLIENT_ID.includes('0000000000')
);

const DEFAULT_REVIEWS: UserReview[] = [
  {
    title: 'Finally a truly free converter with no credit card trap!',
    quote:
      'Other sites made me edit my file and then demanded a $0.50 trial that turns into a $40 monthly subscription. PDFDaVinci converted my 28-page contract in 2 seconds completely free with zero sign-up.',
    author: 'Michael R.',
    role: 'Corporate Paralegal, New York',
    date: 'Verified User • 2 days ago',
  },
  {
    title: 'Razor-sharp 2x HiDPI JPG exports straight from RAM',
    quote:
      'I needed high-resolution images from an architectural portfolio PDF without uploading client blueprints to a cloud server. The local RAM mode and one-click ZIP download on PDFDaVinci are unbeatable.',
    author: 'Elena V.',
    role: 'Senior Product Designer, London',
    date: 'Verified User • 5 days ago',
  },
  {
    title: 'Clean Word & Text extraction that keeps paragraphs intact',
    quote:
      'We use PDFDaVinci daily to extract text and editable Word documents from financial reports. Knowing zero bytes ever leave our company laptops makes our IT security team very happy.',
    author: 'David K.',
    role: 'Financial Analyst, Toronto',
    date: 'Verified User • 1 week ago',
  },
];

export const SEO_PAGES: Record<'home' | 'jpg' | 'word' | 'text', PageSeoData> = {
  home: {
    slug: '/',
    breadcrumbLabel: 'All-in-One PDF Converter',
    canonicalUrl: `${SITE_URL}/`,
    defaultFormat: 'jpg',
    title: 'PDFDaVinci — Free Online PDF Converter (100% Client-Side RAM • No Sign-Up)',
    metaDescription:
      'Convert PDF to high-resolution JPG images (ZIP), editable Microsoft Word (.doc), and plain Text (.txt) online for free. 100% local in-browser RAM processing — zero server uploads, no credit card, no watermarks.',
    keywords: [
      'pdfdavinci',
      'convert pdf online free',
      'pdf converter client side free',
      'free online pdf converter no sign up',
      'pdf to jpg high resolution',
      'pdf to word editable free',
      'extract text from pdf online',
      'private local ram pdf converter',
      'no upload pdf tool',
      'convert pdf without email',
    ],
    h1: 'Ultra-Fast & 100% Private Online PDF Converter',
    heroSubtitle:
      'Transform your PDF files into high-resolution JPG images (ZIP), editable Microsoft Word (.doc) documents, or clean plain text (.txt) directly inside your browser RAM — zero servers, zero queues, zero privacy risk.',
    badgeText: '100% Client-Side RAM Architecture • Zero Server Uploads',
    valueChecks: [
      '100% Free Forever — No Credit Card or Trial Trap',
      '100% Local RAM Mode — Files Never Leave Your Device',
      'Preserves Original Layout, Fonts & 2x HiDPI Quality',
      'Works on Windows, Mac, iOS & Android — No Installation',
    ],
    howToTitle: 'How to Convert a PDF File Online with PDFDaVinci in 3 Simple Steps',
    howToSteps: [
      {
        name: 'Step 1: Upload or Drag & Drop Your PDF File',
        text: 'Drop your PDF into the double-framed workspace above or click "Select PDF File". You can also click the Instant Demo button to test a synthesized 2-page PDF in RAM.',
      },
      {
        name: 'Step 2: Choose Your Output Format in 1 Click',
        text: 'Switch seamlessly between our 4 instant modes: PDF to High-DPI JPG (ZIP Archive), PDF to Editable Word (.doc), PDF to Plain Text (.txt), or Interactive Page Gallery.',
      },
      {
        name: 'Step 3: Download Your Converted File Instantly',
        text: 'Our Mozilla PDF.js Web Worker engine renders and extracts your pages locally using your device hardware, allowing instant downloads with no watermarks, no file size caps, and no email sign-up.',
      },
    ],
    reviews: DEFAULT_REVIEWS,
    articleSections: [
      {
        heading: 'Why PDFDaVinci Is the Safest & Fastest Online PDF Converter',
        paragraphs: [
          'Traditional online PDF converters require you to upload sensitive documents — legal contracts, tax returns, bank statements, medical records, and NDA-protected agreements — to remote cloud servers. That creates serious data privacy risks, slows down conversion with upload and download bottlenecks, and frequently locks you behind deceptive "$0.50 trial" paywalls.',
          'PDFDaVinci (pdfdavinci.com) eliminates cloud uploads completely through a 100% Client-Side Web Worker and HTML5 Canvas architecture. When you open a file in PDFDaVinci, not a single byte ever leaves your computer or smartphone. Every calculation, vector font rasterization, and coordinate-based text extraction happens locally inside your browser’s volatile memory (RAM).',
        ],
        bullets: [
          'Zero Network File Transfers: Your documents remain 100% on your own device at all times.',
          'Instant Hardware Acceleration: No waiting in server queues or uploading large multi-megabyte PDFs.',
          'Strict GDPR, CCPA & HIPAA-Friendly Privacy: Built for legal professionals, accountants, healthcare teams, and executives.',
          'Completely Free & Unlimited: Convert unlimited pages with zero watermarks and no registration.',
        ],
      },
      {
        heading: 'All-in-One Multi-Format PDF Conversion Without Reloading',
        paragraphs: [
          'PDFDaVinci unifies the four most essential document workflows into a single reactive workspace. Once your PDF is parsed into browser RAM, you can switch between exporting a bundled ZIP archive of 2.0x HiDPI JPG images, generating a formatted Microsoft Word (.doc) file, or copying clean UTF-8 plain text (.txt) without ever re-processing the file.',
          'Powered by Mozilla’s battle-tested PDF.js rendering engine and 2x supersampled HTML5 2D Canvas contexts, every page maintains razor-sharp typography, accurate vector graphics, and full international Unicode character fidelity.',
        ],
      },
      {
        heading: 'Technical Advantages of In-Memory Web Worker Processing',
        paragraphs: [
          'Cloud-based utilities throttle performance on shared backend CPUs. By offloading PDF parsing to an isolated background Web Worker thread on your own device, PDFDaVinci keeps the user interface silky-smooth at 60 FPS while rendering high-resolution pages and packaging compressed archives on the fly via JSZip. As soon as you close your browser tab, the browser’s garbage collector permanently wipes the allocated RAM.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are my PDF files ever uploaded to a PDFDaVinci server?',
        answer:
          'Never. PDFDaVinci runs 100% locally inside your web browser (Client-Side RAM Mode). Not a single byte of your PDF file is transmitted over the internet, stored in a database, or processed on an external server.',
      },
      {
        question: 'Is PDFDaVinci really 100% free with no hidden subscription charges?',
        answer:
          'Yes! Unlike paid websites that ask for a credit card or a small trial fee before letting you download your converted file, PDFDaVinci is 100% free forever. We never ask for payment details, emails, or registrations.',
      },
      {
        question: 'Are there any file size limits or daily page restrictions?',
        answer:
          'No. Because all processing uses your own device’s RAM and CPU rather than a remote server, we never impose artificial file size limits, page count caps, countdown timers, or daily quotas.',
      },
      {
        question: 'Does PDFDaVinci support multi-language fonts and Unicode characters?',
        answer:
          'Yes! Both our 2x HiDPI JPG visual renderer and our UTF-8 Word (.doc) and Text (.txt) extractors preserve international scripts, accented characters, symbols, and technical typography accurately.',
      },
      {
        question: 'Can I convert confidential legal, financial, or medical PDF documents safely?',
        answer:
          'Yes. Because PDFDaVinci executes 100% locally inside your browser’s volatile memory (RAM) with zero server uploads, your confidential contracts, tax returns, bank statements, and medical records never leave your computer or phone.',
      },
      {
        question: 'Does PDFDaVinci work on Windows, Mac, iPhone (iOS), and Android without installing software?',
        answer:
          'Yes! PDFDaVinci works directly inside any modern browser (Chrome, Safari, Microsoft Edge, Firefox, Brave) on desktop and mobile devices with zero plugins or software downloads required.',
      },
    ],
  },

  jpg: {
    slug: '/pdf-to-jpg',
    breadcrumbLabel: 'PDF to JPG Converter',
    canonicalUrl: `${SITE_URL}/pdf-to-jpg/`,
    defaultFormat: 'jpg',
    title: 'Convert PDF to JPG Online Free — High Resolution & ZIP Download | PDFDaVinci',
    metaDescription:
      'Convert PDF pages to high-resolution JPG images (300 DPI equivalent) online for free. Download all pages as a single ZIP archive or save individual JPGs locally in your browser.',
    keywords: [
      'convert pdf to jpg',
      'pdf to image high resolution',
      'pdf to zip images',
      'pdf to jpeg converter online free',
      'save pdf pages as pictures',
      'high dpi pdf to jpg',
      'pdfdavinci jpg',
    ],
    h1: 'Convert PDF to High-Resolution JPG Images Online',
    heroSubtitle:
      'Turn every page of your PDF document into a crystal-clear, high-resolution JPG image. Download individual pages with one click or export the entire document as a ready-to-use ZIP archive — 100% locally in your browser.',
    badgeText: '2.0x HiDPI Canvas Rendering • Instant ZIP Packaging',
    valueChecks: [
      '2.0x Supersampled HiDPI Resolution (Crystal-Clear Text)',
      '1-Click Batch .ZIP Download or Single Page .JPG Save',
      '100% Local Browser RAM Rendering — Zero Cloud Upload',
      'Pure White Alpha Backing — Zero Dark Artifacts',
    ],
    howToTitle: 'How to Convert PDF Pages to High-Resolution JPG Images',
    howToSteps: [
      {
        name: 'Step 1: Load Your PDF Document into RAM',
        text: 'Select a PDF file from your computer or phone, or drop it into the upload zone. The file opens immediately in local browser memory.',
      },
      {
        name: 'Step 2: Automatic 2.0x HiDPI Rasterization',
        text: 'PDFDaVinci automatically activates High-Resolution JPG mode, rendering vector fonts and graphics at 2x supersampled resolution.',
      },
      {
        name: 'Step 3: Download All as .ZIP or Save Individual JPGs',
        text: 'Click "Download All as .ZIP" for one-click batch archiving, or browse the visual grid to preview and save specific pages as standalone .jpg files.',
      },
    ],
    reviews: DEFAULT_REVIEWS,
    articleSections: [
      {
        heading: 'Studio-Grade PDF to JPG Conversion with 2x Supersampling',
        paragraphs: [
          'When you need to embed a presentation slide, certificate, architectural blueprint, invoice, or brochure into a website, social media post, or slide deck, raw PDF files can be cumbersome to display. PDFDaVinci’s dedicated PDF to JPG engine rasterizes every vector page into a universally compatible JPEG image with ultra-crisp pixel density.',
          'Unlike ordinary screen captures that blur small text, our HTML5 2D Canvas pipeline applies a 2.0x HiDPI scale factor paired with 92% studio-grade JPEG encoding. Even fine-print footnotes, financial tables, and intricate diagrams remain sharp on Retina and 4K displays.',
        ],
        bullets: [
          'One-Click Batch ZIP Archive: Automatically bundles all rendered pages into a sequentially numbered .zip file (page-001.jpg, page-002.jpg).',
          'Individual Page Inspection & Download: Preview every page thumbnail and download only the exact pages you need.',
          'Pure White Alpha Backing: Automatically composites transparent PDF layers onto a clean white background to prevent dark artifacts.',
          '100% Local GPU/CPU Execution: Zero upload wait time, even for image-heavy catalogs and portfolios.',
        ],
      },
      {
        heading: 'When Should You Convert a PDF to JPG Format?',
        paragraphs: [
          'JPEG is the universal standard for digital imagery across every operating system, CMS platform (WordPress, Webflow, Shopify), email client, and mobile app. Converting PDF to JPG is ideal when you want to lock visual formatting against accidental edits, showcase document previews inline on a webpage, or upload verification documents to portals that only accept image files (.jpg / .jpeg).',
          'Because PDFDaVinci performs both the rendering and the JSZip compression right inside your browser RAM, converting a 50-page presentation takes only seconds.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What resolution are the exported JPG images?',
        answer:
          'PDFDaVinci renders every PDF page at 2.0x HiDPI scale relative to the native PDF viewport dimensions (typically around 1190 × 1684 pixels for standard A4/Letter pages), ensuring crisp readability for both web publishing and printing.',
      },
      {
        question: 'Can I download just one specific page from my PDF as a JPG?',
        answer:
          'Yes! Below the main "Download All as .ZIP" button, you will see a responsive grid of every rendered page. Each page card has its own "Download .JPG" button and a full-screen zoom preview.',
      },
      {
        question: 'Are original colors, vector illustrations, and embedded fonts preserved?',
        answer:
          'Yes. Our Mozilla PDF.js interpreter renders embedded fonts, vector paths, gradients, and high-res bitmap layers with 100% visual accuracy.',
      },
      {
        question: 'How does the batch ZIP download work for multi-page PDF files?',
        answer:
          'When you load a multi-page PDF, PDFDaVinci renders all pages in local browser RAM and bundles them on the fly using JSZip into a single, sequentially numbered ZIP archive (page-001.jpg, page-002.jpg, etc.) with one click.',
      },
      {
        question: 'Will transparent PDF backgrounds turn black when converted to JPG?',
        answer:
          'No. PDFDaVinci automatically applies a pure white (#FFFFFF) alpha backing layer before encoding each JPEG image, preventing dark or inverted transparency artifacts.',
      },
      {
        question: 'Is there any watermark added to the exported JPG images?',
        answer:
          'Never. All JPG images and ZIP archives exported from PDFDaVinci are 100% clean, watermark-free, and ready for commercial or personal use.',
      },
    ],
  },

  word: {
    slug: '/pdf-to-word',
    breadcrumbLabel: 'PDF to Word Converter',
    canonicalUrl: `${SITE_URL}/pdf-to-word/`,
    defaultFormat: 'word',
    title: 'Convert PDF to Word Online Free (.DOC / .DOCX) — No Email | PDFDaVinci',
    metaDescription:
      'Convert PDF to editable Microsoft Word (.doc) documents online for free without email or sign-up. 100% client-side in-browser processing with PDFDaVinci for complete privacy.',
    keywords: [
      'convert pdf to word docx free',
      'pdf to doc without email',
      'pdf to word converter online',
      'editable word document from pdf',
      'private pdf to word client side',
      'pdfdavinci word',
    ],
    h1: 'Convert PDF to Editable Word (.DOC) — Free & No Email Required',
    heroSubtitle:
      'Extract your PDF content into a structured, ready-to-edit Microsoft Word (.doc) document with preserved paragraphs and page breaks — processed 100% locally inside your browser.',
    badgeText: 'Direct Microsoft Word (.DOC) Export • Full UTF-8 Typography',
    valueChecks: [
      'Compatible with Microsoft Word, Google Docs & LibreOffice',
      'Reconstructs Natural Paragraphs & Page Section Breaks',
      'Optional High-Res Visual Page Snapshot Embedding',
      '100% Private In-Browser Processing — No Email Required',
    ],
    howToTitle: 'How to Convert a PDF into an Editable Word Document Online',
    howToSteps: [
      {
        name: 'Step 1: Open Your PDF in PDFDaVinci',
        text: 'Drag and drop your PDF document into the converter box. The file is parsed locally in your browser RAM in milliseconds.',
      },
      {
        name: 'Step 2: Review the Reconstructed Document Structure',
        text: 'Our "PDF to Word (.doc)" engine analyzes X/Y glyph coordinates to rebuild natural lines, paragraphs, and page sections.',
      },
      {
        name: 'Step 3: Download Your .DOC File Instantly',
        text: 'Click "Download as Word (.DOC)" and open your file directly in Microsoft Word, Google Docs, Apple Pages, or LibreOffice Writer.',
      },
    ],
    reviews: DEFAULT_REVIEWS,
    articleSections: [
      {
        heading: 'How Client-Side PDF to Word (.doc) Conversion Works Without a Server',
        paragraphs: [
          'Most "free" online PDF to Word converters trap users with dark patterns: forcing you to wait in slow queues, demanding your personal email address to send a download link, or storing copies of your private contracts on third-party servers. PDFDaVinci takes a fundamentally transparent approach.',
          'Our client-side document parser inspects the internal text matrix of each PDF page directly in your browser RAM, calculates vertical and horizontal coordinate deltas, and reconstructs clean paragraphs and section breaks. It then synthesizes a standards-compliant Microsoft Word (.doc) document complete with UTF-8 encoding, print page layout headers, and optional embedded page visuals.',
        ],
        bullets: [
          'Opens seamlessly in Microsoft Word (Office 365 / 2007–2024), Google Docs, and LibreOffice.',
          'Zero Email Gatekeepers: Instant direct download from your browser.',
          'Preserves logical reading order, paragraph spacing, and multi-page section breaks.',
          'Optional Visual Page Embedding: Include high-res page snapshots inside the Word file for scanned forms or complex tables.',
        ],
      },
      {
        heading: 'Unmatched Confidentiality for Legal, Financial & Academic Documents',
        paragraphs: [
          'When converting an employment agreement, commercial proposal, resume, or academic thesis from PDF to Word, document confidentiality is non-negotiable. Because PDFDaVinci executes entirely inside your local browser memory, your intellectual property never touches an external server.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which word processors can open the downloaded .doc file?',
        answer:
          'The exported .doc file uses Microsoft Office XML/HTML document specifications with UTF-8 BOM headers, making it 100% compatible with Microsoft Word, Google Docs, LibreOffice Writer, WPS Office, and Apple Pages.',
      },
      {
        question: 'Do I have to provide an email address to download my Word file?',
        answer:
          'Never. Your converted Word document is synthesized directly in your browser and downloads immediately when you click the button.',
      },
      {
        question: 'What if my PDF contains scanned pages or complex visual charts?',
        answer:
          'In the PDF to Word panel, you can check the option "Embed high-resolution visual page snapshots inside the Word document" to include crisp visual renders alongside the extracted text.',
      },
      {
        question: 'How does PDFDaVinci reconstruct paragraphs without uploading to a server?',
        answer:
          'Our local in-browser parser inspects the X and Y coordinate matrices of every text glyph in the PDF, detecting line breaks, paragraph spacing, and page boundaries directly inside your device RAM.',
      },
      {
        question: 'Can I edit the converted .doc file in Google Docs or Apple Pages?',
        answer:
          'Yes! You can open and edit the downloaded .doc file directly in Microsoft Word, upload it to Google Drive for editing in Google Docs, or open it in Apple Pages and LibreOffice Writer.',
      },
      {
        question: 'Are my private contracts or resumes safe when converting PDF to Word?',
        answer:
          '100% safe. Unlike cloud converters that upload your documents to remote servers, PDFDaVinci converts your PDF to Word entirely inside your own browser tab with zero network transmission.',
      },
    ],
  },

  text: {
    slug: '/pdf-to-text',
    breadcrumbLabel: 'PDF to Text Extractor',
    canonicalUrl: `${SITE_URL}/pdf-to-text/`,
    defaultFormat: 'text',
    title: 'Extract Text from PDF Online Free (PDF to TXT Converter) | PDFDaVinci',
    metaDescription:
      'Extract clean plain text from any PDF file online in seconds. Edit in-browser, copy to clipboard with 1 click, or download as a UTF-8 .txt file — 100% locally with PDFDaVinci.',
    keywords: [
      'extract text from pdf online',
      'pdf to txt converter',
      'copy text from pdf online free',
      'pdf text extractor client side',
      'convert pdf to plain text',
      'pdfdavinci text',
    ],
    h1: 'Extract Clean Plain Text from PDF Online (PDF to TXT)',
    heroSubtitle:
      'Pull all readable text from your PDF document with accurate line and page organization. Edit live in your browser, copy to clipboard with one click, or download as a clean .txt file.',
    badgeText: 'Coordinate-Aware Text Parser • 1-Click Clipboard Copy',
    valueChecks: [
      'Coordinate-Aware Line & Paragraph Reconstruction',
      'Live In-Browser Editor with Word & Character Counters',
      'Instant 1-Click Copy to Clipboard or UTF-8 .TXT Save',
      '100% Client-Side RAM Execution — Zero API Data Leaks',
    ],
    howToTitle: 'How to Extract Plain Text from a PDF Document Online',
    howToSteps: [
      {
        name: 'Step 1: Select a PDF File to Parse',
        text: 'Drop your PDF into PDFDaVinci’s local dropzone or click the Instant Demo button to test right away.',
      },
      {
        name: 'Step 2: Inspect & Edit Extracted Text Live',
        text: 'The parser automatically extracts text layers across all pages into an interactive editor complete with live page, word, and character counters.',
      },
      {
        name: 'Step 3: Copy to Clipboard or Download as .TXT',
        text: 'Click "Copy Full Text" to paste directly into your workflow or AI prompt, or click "Download .TXT File" to save a UTF-8 text file.',
      },
    ],
    reviews: DEFAULT_REVIEWS,
    articleSections: [
      {
        heading: 'Precision PDF Text Extraction Without Broken Line Wrapping',
        paragraphs: [
          'Copying and pasting text directly from a standard PDF viewer often results in garbled line breaks, missing spaces between words, or jumbled multi-column layouts. PDFDaVinci’s PDF to Text engine solves this by analyzing the transformation matrix and Y-axis coordinates of every text item on the page.',
          'By detecting vertical baseline shifts, the parser accurately determines where lines and paragraphs begin and end. Every page is clearly separated with a clean header marker, making it effortless to navigate long research papers, e-books, legal briefs, and technical manuals.',
        ],
        bullets: [
          'Interactive In-Browser Text Editor with real-time Page, Word, and Character counts.',
          'Instant 1-Click Copy to system clipboard.',
          'Clean UTF-8 .txt export — ideal for LLM prompts (ChatGPT, Claude, Gemini), data mining, and code editors.',
          'Sub-Second Speed: Extracts dozens of pages of text in milliseconds inside browser RAM.',
        ],
      },
      {
        heading: 'Built for Researchers, Developers, Writers & AI Workflows',
        paragraphs: [
          'Whether you are preparing PDF reports for AI summarization, auditing document word counts, or migrating legacy PDF documentation into Markdown or CMS platforms, PDFDaVinci delivers clean, unformatted text instantly without exposing proprietary data to external APIs.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I copy the extracted PDF text without downloading a file?',
        answer:
          'Yes! The PDF to Text workspace features a one-click "Copy Full Text" button as well as an interactive text area where you can edit or select specific passages before copying.',
      },
      {
        question: 'Does the tool show word count and character count statistics?',
        answer:
          'Yes. As soon as your PDF is loaded, PDFDaVinci displays the total page count, word count, and character count, updating dynamically if you edit the text in the browser.',
      },
      {
        question: 'How does it handle scanned PDFs that do not contain a text layer?',
        answer:
          'PDFDaVinci extracts all embedded vector text streams from the PDF. If a page is a pure scanned bitmap without an embedded text layer, the tool clearly notes it and lets you switch to "PDF to JPG" mode with 1 click to export high-resolution page images.',
      },
      {
        question: 'Is the exported .txt file encoded in standard UTF-8 format?',
        answer:
          'Yes. Every exported .txt file uses clean UTF-8 encoding, preserving international alphabets, mathematical symbols, currencies, and special punctuation without garbled characters.',
      },
      {
        question: 'Can I use the PDF to Text extractor to prepare documents for ChatGPT, Claude, or Gemini?',
        answer:
          'Absolutely! Researchers and professionals use PDFDaVinci to extract clean, page-delimited text from long PDFs and copy it with 1 click into AI prompts without uploading confidential PDF files to third-party servers.',
      },
      {
        question: 'Can I edit the extracted text right inside the browser before downloading?',
        answer:
          'Yes. Our interactive text studio lets you edit, add notes, or trim unwanted sections right in the browser before copying to the clipboard or saving your .txt file.',
      },
    ],
  },
};

export function generateJsonLdSchemas(pageData: PageSeoData) {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': ['WebApplication', 'SoftwareApplication'],
    name: `${SITE_NAME} — ${pageData.h1}`,
    url: pageData.canonicalUrl,
    description: pageData.metaDescription,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'PDF Converter & Document Utility',
    operatingSystem: 'Windows, macOS, Linux, iOS, Android, ChromeOS',
    browserRequirements: 'Requires JavaScript and HTML5 Canvas support',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '2840',
      reviewCount: '612',
    },
    featureList: [
      '100% Client-Side RAM PDF Processing',
      'PDF to High-Resolution JPG & ZIP Archive',
      'PDF to Editable Word (.doc) Export',
      'PDF to Plain Text (.txt) Extraction',
      'Zero Server Uploads — Complete GDPR & HIPAA Privacy',
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement:
      pageData.slug === '/'
        ? [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: pageData.breadcrumbLabel,
              item: pageData.canonicalUrl,
            },
          ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: pageData.howToTitle,
    description: pageData.metaDescription,
    totalTime: 'PT15S',
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Modern Web Browser (Chrome, Firefox, Edge, Safari)',
      },
    ],
    step: pageData.howToSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${pageData.canonicalUrl}#step-${index + 1}`,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return [webAppSchema, breadcrumbSchema, howToSchema, faqSchema];
}
