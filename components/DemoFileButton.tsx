'use client';

import React from 'react';
import { Zap } from 'lucide-react';
import { generateDemoPdfFileInRam } from '@/lib/pdfEngine';

interface DemoFileButtonProps {
  onSelectDemoFile: (file: File) => void;
  disabled?: boolean;
}

export default function DemoFileButton({
  onSelectDemoFile,
  disabled = false,
}: DemoFileButtonProps) {
  const handleGenerateDemo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const demoFile = generateDemoPdfFileInRam();
    onSelectDemoFile(demoFile);
  };

  return (
    <button
      type="button"
      onClick={handleGenerateDemo}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-amber-300 bg-amber-50 px-5 py-3.5 text-sm font-bold text-amber-900 shadow-sm transition hover:border-amber-400 hover:bg-amber-100 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Zap className="h-4 w-4 fill-amber-500 text-amber-600" />
      <span>⚡ Try Instant DEMO File (2 Pages in RAM)</span>
    </button>
  );
}
