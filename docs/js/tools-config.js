const TOOL_CATEGORIES = [
  { id: 'organize', bg: 'Организиране на PDF', en: 'Organize PDF' },
  { id: 'optimize', bg: 'Оптимизиране на PDF', en: 'Optimize PDF' },
  { id: 'convert-to', bg: 'Конвертиране в PDF', en: 'Convert to PDF' },
  { id: 'convert-from', bg: 'Конвертиране от PDF', en: 'Convert from PDF' },
  { id: 'edit', bg: 'Редактиране на PDF', en: 'Edit PDF' },
  { id: 'security', bg: 'PDF сигурност', en: 'PDF Security' },
  { id: 'ai', bg: 'AI PDF инструменти', en: 'AI PDF Tools' },
];

// field types: file | files | images | dualfile | text | password | select | number | textarea
const TOOLS = [
  { slug: 'merge-pdf', category: 'organize', api: '/tools/merge', bg: 'Обедини PDF', en: 'Merge PDF', bgDesc: 'Обедини няколко PDF файла в един, с подредба чрез drag & drop.', enDesc: 'Combine multiple PDFs into one, reordered by drag & drop.', fields: [{ name: 'files', type: 'files', label: 'PDF files' }], featured: true },
  { slug: 'split-pdf', category: 'organize', api: '/tools/split', bg: 'Раздели PDF', en: 'Split PDF', bgDesc: 'Раздели по страници или извади конкретен диапазон.', enDesc: 'Split into individual pages or extract a page range.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'mode', type: 'select', label: 'Mode', options: [['all', 'Every page → separate file'], ['ranges', 'Custom ranges']], default: 'all' },
      { name: 'ranges', type: 'text', label: 'Ranges (e.g. 1-3;5;8-10)', optional: true },
  ]},
  { slug: 'remove-pages', category: 'organize', api: '/tools/remove-pages', bg: 'Премахни страници', en: 'Remove pages', bgDesc: 'Премахни избрани страници от PDF.', enDesc: 'Delete selected pages from a PDF.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'pages', type: 'text', label: 'Pages to remove (e.g. 2,4-6)' },
  ]},
  { slug: 'extract-pages', category: 'organize', api: '/tools/extract-pages', bg: 'Извлечи страници', en: 'Extract pages', bgDesc: 'Извлечи само избрани страници в нов PDF.', enDesc: 'Pull out only the pages you need into a new PDF.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'pages', type: 'text', label: 'Pages to keep (e.g. 1-3,5)' },
  ]},
  { slug: 'rotate-pdf', category: 'organize', api: '/tools/rotate', bg: 'Завърти PDF', en: 'Rotate PDF', bgDesc: 'Завърти всички или избрани страници на 90/180/270°.', enDesc: 'Rotate all or selected pages by 90/180/270°.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'angle', type: 'select', label: 'Angle', options: [['90', '90°'], ['180', '180°'], ['270', '270°']], default: '90' },
      { name: 'pages', type: 'text', label: 'Pages (optional, e.g. 1,3-4)', optional: true },
  ]},

  { slug: 'compress-pdf', category: 'optimize', api: '/tools/compress', bg: 'Компресирай PDF', en: 'Compress PDF', bgDesc: 'Намали размера на PDF без излишна загуба на качество.', enDesc: 'Shrink large PDFs without unnecessary quality loss.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'level', type: 'select', label: 'Compression level', options: [['low', 'Low — best quality'], ['medium', 'Medium'], ['high', 'High — smallest size']], default: 'medium' },
  ], featured: true },
  { slug: 'repair-pdf', category: 'optimize', api: '/tools/repair', bg: 'Поправи PDF', en: 'Repair PDF', bgDesc: 'Опит за възстановяване на повреден PDF файл.', enDesc: 'Attempt to recover a damaged or malformed PDF.', fields: [{ name: 'file', type: 'file', label: 'PDF file' }] },
  { slug: 'ocr-pdf', category: 'optimize', api: '/tools/ocr', bg: 'OCR PDF', en: 'OCR PDF', bgDesc: 'Разпознай текст в сканиран PDF или изображение (BG/EN).', enDesc: 'Recognize text in a scanned PDF or image (BG/EN).', fields: [
      { name: 'file', type: 'file', label: 'PDF or image file' },
      { name: 'language', type: 'select', label: 'Language', options: [['bul+eng', 'Bulgarian + English'], ['bul', 'Bulgarian'], ['eng', 'English']], default: 'bul+eng' },
      { name: 'exportAs', type: 'select', label: 'Output', options: [['pdf', 'Searchable PDF'], ['txt', 'Plain text']], default: 'pdf' },
  ]},
  { slug: 'pdf-to-pdfa', category: 'optimize', api: '/tools/pdf-to-pdfa', bg: 'PDF в PDF/A', en: 'PDF to PDF/A', bgDesc: 'Конвертирай в архивен формат PDF/A.', enDesc: 'Convert to the archival PDF/A format.', fields: [{ name: 'file', type: 'file', label: 'PDF file' }] },

  { slug: 'jpg-to-pdf', category: 'convert-to', api: '/tools/images-to-pdf', formField: 'images', bg: 'JPG в PDF', en: 'JPG to PDF', bgDesc: 'Превърни снимки в подреден PDF документ.', enDesc: 'Turn photos into a clean, ordered PDF document.', fields: [
      { name: 'images', type: 'images', label: 'Images' },
      { name: 'pageSize', type: 'select', label: 'Page size', options: [['A4', 'A4'], ['Letter', 'Letter'], ['Auto', 'Auto (fit image)']], default: 'A4' },
      { name: 'orientation', type: 'select', label: 'Orientation', options: [['portrait', 'Portrait'], ['landscape', 'Landscape']], default: 'portrait' },
      { name: 'margin', type: 'select', label: 'Margin', options: [['none', 'None'], ['small', 'Small'], ['medium', 'Medium']], default: 'small' },
  ], featured: true },
  { slug: 'word-to-pdf', category: 'convert-to', api: '/tools/word-to-pdf', bg: 'Word в PDF', en: 'Word to PDF', bgDesc: 'Конвертирай .doc/.docx в PDF.', enDesc: 'Convert .doc/.docx to PDF.', fields: [{ name: 'file', type: 'file', label: 'Word document' }], roadmap: true },
  { slug: 'ppt-to-pdf', category: 'convert-to', api: '/tools/ppt-to-pdf', bg: 'PowerPoint в PDF', en: 'PowerPoint to PDF', bgDesc: 'Конвертирай .ppt/.pptx в PDF.', enDesc: 'Convert .ppt/.pptx to PDF.', fields: [{ name: 'file', type: 'file', label: 'PowerPoint file' }], roadmap: true },
  { slug: 'excel-to-pdf', category: 'convert-to', api: '/tools/excel-to-pdf', bg: 'Excel в PDF', en: 'Excel to PDF', bgDesc: 'Конвертирай .xls/.xlsx в PDF.', enDesc: 'Convert .xls/.xlsx to PDF.', fields: [{ name: 'file', type: 'file', label: 'Excel file' }], roadmap: true },
  { slug: 'html-to-pdf', category: 'convert-to', api: '/tools/html-to-pdf', bg: 'HTML в PDF', en: 'HTML to PDF', bgDesc: 'Генерирай PDF от URL или HTML код.', enDesc: 'Generate a PDF from a URL or raw HTML.', fields: [{ name: 'url', type: 'text', label: 'URL' }], roadmap: true },

  { slug: 'pdf-to-jpg', category: 'convert-from', api: '/tools/pdf-to-jpg', bg: 'PDF в JPG', en: 'PDF to JPG', bgDesc: 'Експортирай страници на PDF като JPG изображения.', enDesc: 'Export PDF pages as JPG images.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'pages', type: 'text', label: 'Pages (optional, e.g. 1-3)', optional: true },
  ]},
  { slug: 'pdf-to-word', category: 'convert-from', api: '/tools/pdf-to-word', bg: 'PDF в Word', en: 'PDF to Word', bgDesc: 'Извлечи текст в .docx (базово преобразуване).', enDesc: 'Extract text into a .docx (basic conversion).', fields: [{ name: 'file', type: 'file', label: 'PDF file' }], notice: true },
  { slug: 'pdf-to-excel', category: 'convert-from', api: '/tools/pdf-to-excel', bg: 'PDF в Excel', en: 'PDF to Excel', bgDesc: 'Извлечи таблици в .xlsx.', enDesc: 'Extract tables into .xlsx.', fields: [{ name: 'file', type: 'file', label: 'PDF file' }], roadmap: true },
  { slug: 'pdf-to-ppt', category: 'convert-from', api: '/tools/pdf-to-ppt', bg: 'PDF в PowerPoint', en: 'PDF to PowerPoint', bgDesc: 'Всяка страница става слайд.', enDesc: 'Each page becomes a slide.', fields: [{ name: 'file', type: 'file', label: 'PDF file' }], roadmap: true },

  { slug: 'page-numbers', category: 'edit', api: '/tools/page-numbers', bg: 'Номера на страници', en: 'Page numbers', bgDesc: 'Добави номера на страници с избрана позиция.', enDesc: 'Add page numbers at a chosen position.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'position', type: 'select', label: 'Position', options: [['bottom-center', 'Bottom center'], ['bottom-right', 'Bottom right'], ['bottom-left', 'Bottom left'], ['top-center', 'Top center'], ['top-right', 'Top right'], ['top-left', 'Top left']], default: 'bottom-center' },
      { name: 'startNumber', type: 'number', label: 'Start number', optional: true },
  ]},
  { slug: 'watermark-pdf', category: 'edit', api: '/tools/watermark', bg: 'Добави воден знак', en: 'Add watermark', bgDesc: 'Текстов воден знак с прозрачност, ротация и позиция.', enDesc: 'Text watermark with opacity, rotation, and position.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'text', type: 'text', label: 'Watermark text' },
      { name: 'position', type: 'select', label: 'Position', options: [['center', 'Center'], ['bottom-right', 'Bottom right'], ['top-right', 'Top right']], default: 'center' },
      { name: 'opacity', type: 'number', label: 'Opacity (0-1)', optional: true, step: '0.05' },
  ], featured: true },

  { slug: 'unlock-pdf', category: 'security', api: '/tools/unlock', bg: 'Отключи PDF', en: 'Unlock PDF', bgDesc: 'Премахни парола, ако я знаеш.', enDesc: 'Remove a password you already know.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'password', type: 'password', label: 'Current password' },
  ]},
  { slug: 'protect-pdf', category: 'security', api: '/tools/protect', bg: 'Защити PDF', en: 'Protect PDF', bgDesc: 'Добави парола и ограничения за печат/копиране.', enDesc: 'Add a password and print/copy restrictions.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'password', type: 'password', label: 'New password' },
      { name: 'allowPrinting', type: 'select', label: 'Allow printing', options: [['true', 'Yes'], ['false', 'No']], default: 'true' },
      { name: 'allowCopying', type: 'select', label: 'Allow copying text', options: [['true', 'Yes'], ['false', 'No']], default: 'true' },
  ]},
  { slug: 'sign-pdf', category: 'security', api: '/tools/sign', bg: 'Подпиши PDF', en: 'Sign PDF', bgDesc: 'Постави визуален подпис (текст или изображение). Не е квалифициран електронен подпис.', enDesc: 'Place a visual signature (text or image). Not a qualified e-signature.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'text', type: 'text', label: 'Typed signature', optional: true },
      { name: 'pageIndex', type: 'number', label: 'Page (0-indexed)', default: 0 },
      { name: 'x', type: 'number', label: 'X position (pt)', default: 50 },
      { name: 'y', type: 'number', label: 'Y position (pt)', default: 50 },
  ]},
  { slug: 'compare-pdf', category: 'security', api: '/tools/compare', sync: true, bg: 'Сравни PDF', en: 'Compare PDF', bgDesc: 'Сравни два PDF файла и виж текстовите разлики.', enDesc: 'Compare two PDFs and see the text differences.', fields: [
      { name: 'fileA', type: 'file', label: 'File A' },
      { name: 'fileB', type: 'file', label: 'File B' },
  ]},

  { slug: 'ai-summary', category: 'ai', api: '/tools/ai-summary', sync: true, bg: 'AI резюме на PDF', en: 'AI PDF Summary', bgDesc: 'Резюме, ключови точки и теми, генерирани от AI.', enDesc: 'AI-generated summary, key points, and topics.', fields: [{ name: 'file', type: 'file', label: 'PDF file' }], needsLlm: true },
  { slug: 'chat-with-pdf', category: 'ai', api: '/tools/chat-pdf', sync: true, bg: 'Разговор с PDF', en: 'Chat with PDF', bgDesc: 'Задай въпрос за съдържанието на документа.', enDesc: 'Ask a question about the document\'s content.', fields: [
      { name: 'file', type: 'file', label: 'PDF file' },
      { name: 'question', type: 'text', label: 'Your question' },
  ], needsLlm: true },
  { slug: 'extract-data', category: 'ai', api: '/tools/extract-data', sync: true, bg: 'Извлечи данни от PDF', en: 'Extract data from PDF', bgDesc: 'Имейли, телефони, дати и суми.', enDesc: 'Emails, phone numbers, dates, and amounts.', fields: [{ name: 'file', type: 'file', label: 'PDF file' }] },
];

function toolBySlug(slug) {
  return TOOLS.find((t) => t.slug === slug);
}
