// src/components/sections/ServicesSection.tsx
'use client';

import { PageHeader } from '../ui';
import { servicesHeaders } from '@/translations/headers';
import ServicesList from '../ServicesList';
import { FadeIn } from '../animations';

export default function ServicesSection() {
  return (
    <section id="services" className="border-b border-slate-200 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <FadeIn>
          <PageHeader translations={servicesHeaders} className="pb-8" />
          <ServicesList />
        </FadeIn>
      </div>
    </section>
  );
}
