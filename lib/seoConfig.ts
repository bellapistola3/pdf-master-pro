export type ConversionFormat = 'jpg' | 'word' | 'text' | 'gallery';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface PageSeoData {
  slug: string;
  canonicalUrl: string;
  defaultFormat: ConversionFormat;
  title: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  heroSubtitle: string;
  badgeText: string;
  howToTitle: string;
  howToSteps: HowToStep[];
  articleSections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  faqs: FAQItem[];
}

export const SITE_NAME = 'PDFDaVinci';
export const SITE_URL = 'https://pdfdavinci.com';
export const ADSENSE_CLIENT_ID = 'ca-pub-0000000000000000'; // Replace with your live Google AdSense Publisher ID

export const SEO_PAGES: Record<'home' | 'jpg' | 'word' | 'text', PageSeoData> = {
  home: {
    slug: '/',
    canonicalUrl: `${SITE_URL}/`,
    defaultFormat: 'jpg',
    title: 'PDFDaVinci — Free Online PDF Converter (100% Client-Side in Browser RAM)',
    metaDescription:
      'Convert PDF to high-resolution JPG images, editable Word (.doc), and plain Text (.txt) instantly for free with PDFDaVinci. 100% local in-browser RAM processing with zero server uploads.',
    keywords: [
      'pdfdavinci',
      'convert pdf online',
      'pdf converter client side free',
      'free online pdf converter',
      'pdf to jpg',
      'pdf to word',
      'pdf to text',
      'secure local pdf converter',
      'no upload pdf tool',
    ],
    h1: 'Ultra-Fast & 100% Private Client-Side PDF Converter',
    heroSubtitle:
      'Transform your PDF files into high-resolution JPG images (ZIP), editable Microsoft Word (.doc) documents, or clean plain text (.txt) directly inside your browser RAM — zero servers, zero queues, zero privacy risk.',
    badgeText: '🔒 100% Client-Side RAM Architecture • Zero Server Uploads',
    howToTitle: 'How to Convert a PDF File Online with PDFDaVinci in 3 Simple Steps',
    howToSteps: [
      {
        name: 'Step 1: Select or Drag & Drop Your PDF Document',
        text: 'Click the upload dropzone or drag and drop any PDF file directly into PDFDaVinci. You can also click the Instant Demo button to test a synthesized 2-page PDF in RAM.',
      },
      {
        name: 'Step 2: Choose Your Output Format Instantly',
        text: 'Switch seamlessly with a single click between our 4 core modes: PDF to High-DPI JPG (ZIP Archive), PDF to Editable Word (.doc), PDF to Plain Text (.txt), or Interactive Page Gallery.',
      },
      {
        name: 'Step 3: Download Your Converted Files Immediately',
        text: 'Our Mozilla PDF.js Web Worker engine renders and extracts your pages locally using your device hardware, allowing instant downloads with no watermarks, no file size caps, and no email sign-up.',
      },
    ],
    articleSections: [
      {
        heading: 'Why PDFDaVinci Is the Safest & Fastest Online PDF Converter',
        paragraphs: [
          'Traditional online PDF converters require you to upload sensitive documents — legal contracts, tax returns, bank statements, medical records, and NDA-protected agreements — to remote cloud servers. That creates serious data privacy risks, slows down conversion with upload and download bottlenecks, and frequently locks you behind daily file limits or paywalls.',
          'PDFDaVinci (pdfdavinci.com) eliminates cloud uploads completely through a 100% Client-Side Web Worker and HTML5 Canvas architecture. When you open a file in PDFDaVinci, not a single byte ever leaves your computer or smartphone. Every calculation, vector font rasterization, and coordinate-based text extraction happens locally inside your browser’s volatile memory (RAM).',
        ],
        bullets: [
          'Zero Network File Transfers: Your documents remain 100% on your own device at all times.',
          'Instant Hardware Acceleration: No waiting in server queues or uploading large multi-megabyte PDFs.',
          'Strict GDPR, HIPAA & Enterprise Compliance: Built for legal professionals, accountants, healthcare teams, and executives.',
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
        question: 'Do I need to create an account or enter my email address?',
        answer:
          'No registration or email address is ever required. Your converted files download directly from your browser memory with one click and zero watermarks.',
      },
    ],
  },

  jpg: {
    slug: '/pdf-to-jpg',
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
    badgeText: '🖼️ 2.0x HiDPI Canvas Rendering • Instant ZIP Packaging',
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
    ],
  },

  word: {
    slug: '/pdf-to-word',
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
    badgeText: '📝 Direct Microsoft Word (.DOC) Export • Full UTF-8 Typography',
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
    ],
  },

  text: {
    slug: '/pdf-to-text',
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
    badgeText: '⚡ Coordinate-Aware Text Parser • 1-Click Clipboard Copy',
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
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and HTML5 Canvas support',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      '100% Client-Side RAM PDF Processing',
      'PDF to High-Resolution JPG & ZIP Archive',
      'PDF to Editable Word (.doc) Export',
      'PDF to Plain Text (.txt) Extraction',
      'Zero Server Uploads — Complete GDPR Privacy',
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
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

  return [webAppSchema, howToSchema, faqSchema];
}
