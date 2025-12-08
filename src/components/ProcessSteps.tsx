'use client';

import { useParams } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { processTranslations } from '@/translations/process';

export default function ProcessSteps() {
  const { locale } = useParams<{ locale: Locale }>();
  const { subtitle, title, steps } = processTranslations[locale] || processTranslations['en'];

  return (
    <section id="process" className="border-b border-slate-200 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">{subtitle}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
          </div>
        </div>

        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <li key={index} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="text-xs font-semibold text-slate-500">{step.title}</span>
              <p className="mt-2 text-sm text-slate-900">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
