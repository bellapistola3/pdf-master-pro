'use client';

import React from 'react';
import { FileImage, FileText, FileType2, LayoutGrid, Check } from 'lucide-react';
import type { ConversionFormat } from '@/lib/seoConfig';

interface FormatSelectorProps {
  activeFormat: ConversionFormat;
  onSelectFormat: (format: ConversionFormat) => void;
  pageCount: number;
}

export default function FormatSelector({
  activeFormat,
  onSelectFormat,
  pageCount,
}: FormatSelectorProps) {
  const formatCards: Array<{
    id: ConversionFormat;
    title: string;
    subtitle: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }> = [
    {
      id: 'jpg',
      title: 'PDF към JPG (ZIP)',
      subtitle: `Висока резолюция (2x DPI) • Пакетно сваляне на всички ${pageCount} стр.`,
      badge: 'Най-популярен',
      icon: FileImage,
      accentColor: 'from-indigo-600 to-blue-600',
    },
    {
      id: 'word',
      title: 'PDF към Word (.doc)',
      subtitle: 'Редактируем документ за Microsoft Word, Google Docs и LibreOffice',
      badge: 'Редактируем .DOC',
      icon: FileType2,
      accentColor: 'from-blue-600 to-cyan-600',
    },
    {
      id: 'text',
      title: 'PDF към Текст (.txt)',
      subtitle: 'Чист UTF-8 текст по страници + мигновено копиране в клипборда',
      badge: 'Чист текст',
      icon: FileText,
      accentColor: 'from-emerald-600 to-teal-600',
    },
    {
      id: 'gallery',
      title: 'Галерия Страници',
      subtitle: 'Визуален преглед в голям мащаб и сваляне на отделни страници',
      badge: `${pageCount} страници`,
      icon: LayoutGrid,
      accentColor: 'from-violet-600 to-purple-600',
    },
  ];

  return (
    <section aria-label="Избор на формат за конвертиране" className="mx-auto mb-8 w-full max-w-5xl">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Изберете изходен формат (превключване с 1 клик):
        </h3>
        <span className="text-xs font-medium text-slate-400">
          Без повторно зареждане на файла
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {formatCards.map((card) => {
          const Icon = card.icon;
          const isSelected = activeFormat === card.id;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectFormat(card.id)}
              className={`group relative flex flex-col justify-between rounded-2xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-md shadow-indigo-500/10 ring-2 ring-indigo-600/20'
                  : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/80'
              }`}
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.accentColor} text-white shadow-sm`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                    {card.badge}
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-slate-900">{card.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{card.subtitle}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-2.5 text-xs font-bold">
                <span className={isSelected ? 'text-indigo-700' : 'text-slate-500'}>
                  {isSelected ? '● Активен режим' : 'Превключи тук →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
