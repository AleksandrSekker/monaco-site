'use client';

import { useParams } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { pageDescriptions } from '@/translations/about';

export default function PageDescription() {
  const { locale = 'en' } = useParams<{ locale?: Locale }>();
  const { paragraph1, paragraph2 } = pageDescriptions[locale as Locale] || pageDescriptions.en;

  return (
    <div className="space-y-4 mt-6">
      <p className="text-sm text-slate-600">{paragraph1}</p>
      <p className="text-sm text-slate-600">{paragraph2}</p>
    </div>
  );
}
