// src/components/ServicesSection.tsx
'use client';

import { useParams } from 'next/navigation';
import { servicesTranslations } from '@/translations/services';
import { PageHeader } from '../ui';
import { servicesHeaders } from '@/translations/headers';
import ServicesList from '../ServicesList';

export default function ServicesSection() {
  const { locale } = useParams<{ locale: string }>();
  const { services } = servicesTranslations[locale as keyof typeof servicesTranslations] || servicesTranslations.en;

  return (
    <section id="services" className="border-b border-slate-200 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <PageHeader translations={servicesHeaders} className="pb-8" />
        <ServicesList />
      </div>
    </section>
  );
}
