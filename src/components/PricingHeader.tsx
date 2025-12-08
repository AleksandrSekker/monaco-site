'use client';

import { useParams } from 'next/navigation';
import { Locale } from '@/lib/i18n'; // Make sure this import path is correct
import { pricingHeaderTranslations as translations } from '@/translations/pricing';
export default function PricingHeader({ className = '' }: { className?: string }) {
  const { locale = 'en' } = useParams<{ locale?: Locale }>();
  const t = translations[locale as Locale] || translations.en;

  return (
    <div className={className}>
      <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">{t.subtitle}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t.title}</h2>
      <p className="mt-3 max-w-xl text-sm text-slate-600">{t.description}</p>
    </div>
  );
}
