export interface MobileTool {
  slug: string;
  name: string;
  api: string;
  fileField: string;
  isImage?: boolean;
  extraFields?: { name: string; label: string; default?: string }[];
  roadmap?: boolean;
}

export const MOBILE_TOOLS: MobileTool[] = [
  { slug: 'merge-pdf', name: 'Merge PDF', api: '/tools/merge', fileField: 'files' },
  { slug: 'compress-pdf', name: 'Compress PDF', api: '/tools/compress', fileField: 'file', extraFields: [{ name: 'level', label: 'Level (low/medium/high)', default: 'medium' }] },
  { slug: 'rotate-pdf', name: 'Rotate PDF', api: '/tools/rotate', fileField: 'file', extraFields: [{ name: 'angle', label: 'Angle (90/180/270)', default: '90' }] },
  { slug: 'watermark-pdf', name: 'Watermark PDF', api: '/tools/watermark', fileField: 'file', extraFields: [{ name: 'text', label: 'Watermark text', default: 'CONFIDENTIAL' }] },
  { slug: 'protect-pdf', name: 'Protect PDF', api: '/tools/protect', fileField: 'file', extraFields: [{ name: 'password', label: 'New password' }] },
  { slug: 'unlock-pdf', name: 'Unlock PDF', api: '/tools/unlock', fileField: 'file', extraFields: [{ name: 'password', label: 'Current password' }] },
  { slug: 'sign-pdf', name: 'Sign PDF', api: '/tools/sign', fileField: 'file', extraFields: [{ name: 'text', label: 'Typed signature' }, { name: 'pageIndex', label: 'Page (0-indexed)', default: '0' }] },
  { slug: 'jpg-to-pdf', name: 'JPG to PDF', api: '/tools/images-to-pdf', fileField: 'images', isImage: true },
  { slug: 'pdf-to-jpg', name: 'PDF to JPG', api: '/tools/pdf-to-jpg', fileField: 'file' },
  { slug: 'ocr-pdf', name: 'OCR PDF', api: '/tools/ocr', fileField: 'file', extraFields: [{ name: 'language', label: 'Language (bul+eng/eng/bul)', default: 'bul+eng' }] },
  { slug: 'word-to-pdf', name: 'Word to PDF', api: '/tools/word-to-pdf', fileField: 'file', roadmap: true },
];
