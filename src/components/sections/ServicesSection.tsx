// src/components/ServicesSection.tsx
'use client';

import { useParams } from 'next/navigation';
import { servicesTranslations } from '@/translations/services';

export default function ServicesSection() {
  const { locale } = useParams<{ locale: string }>();
  const { subtitle, title, description, services } =
    servicesTranslations[locale as keyof typeof servicesTranslations] || servicesTranslations.en;

  return (
    <section id="services" className="border-b border-slate-200 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">{subtitle}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
            <p className="mt-3 max-w-xl text-sm text-slate-600">{description}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-300 hover:shadow-md"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-xs text-slate-600">{service.description}</p>
              </div>
              <button className="mt-4 inline-flex items-center text-[11px] font-semibold text-red-600 group-hover:text-red-700">
                {service.cta}
                <span className="ml-1">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
