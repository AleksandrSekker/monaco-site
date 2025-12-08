// src/components/ui/PageHeader/PageHeader.tsx
'use client';

import { useParams } from 'next/navigation';
import { Locale } from '@/lib/i18n';

interface PageHeaderProps {
  translations: {
    [key in Locale]: {
      title: string;
      subtitle?: string;
      description?: string;
    };
  };
  className?: string;
}

export default function PageHeader({ translations, className = '' }: PageHeaderProps) {
  const { locale = 'en' } = useParams<{ locale?: Locale }>();
  const t = translations[locale as Locale] || translations.en;

  return (
    <div className={className}>
      {t.subtitle && <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">{t.subtitle}</p>}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t.title}</h2>
      {t.description && <p className="mt-3 max-w-xl text-sm text-slate-600">{t.description}</p>}
    </div>
  );
}
