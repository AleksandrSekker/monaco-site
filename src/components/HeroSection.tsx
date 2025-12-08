'use client';

import { useParams } from 'next/navigation';
import { heroTranslations } from '@/translations/hero';

export default function HeroSection() {
  const { locale } = useParams<{ locale: string }>();
  const t = heroTranslations[locale as keyof typeof heroTranslations] || heroTranslations.en;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[-10rem] h-80 w-80 rounded-full bg-red-100 blur-3xl" />
        <div className="absolute right-[-10rem] top-40 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-24 lg:px-6">
        <div className="max-w-xl space-y-6">
          <p className="text-xs font-semibold tracking-[0.35em] text-slate-500 uppercase">{t.tagline}</p>
          <h1 className="text-balance text-4xl font-light tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {t.title}
            <span className="font-semibold text-red-600">{t.highlightedTitle}</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">{t.description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contacts"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-red-600/30 hover:bg-red-700"
            >
              {t.cta}
            </a>
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-700">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                ✓
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold">{t.guarantee.text}</span>
                <span className="text-[11px] text-slate-500">{t.guarantee.subtext}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <div>{t.stats}</div>
          </div>
        </div>

        <div className="relative w-full max-w-md">
          <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full border border-red-200" />
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{t.card.title}</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-700">
                {t.card.badge}
              </span>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-900">
              {t.card.cases.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-2xl border ${index === 1 ? 'bg-slate-50' : 'bg-white'} px-4 py-3 ${index === 2 ? 'border-dashed' : 'border-slate-200'}`}
                >
                  <div>
                    <p className="text-xs text-slate-500">{item.client}</p>
                    <p className="text-sm font-medium">{item.description}</p>
                  </div>
                  <span className={`text-[11px] text-${item.timeColor}`}>{item.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-500">
              <p>{t.card.disclaimer}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
