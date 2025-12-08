import CasesSection from '@/components/sections/CasesSection';
import PricingSection from '@/components/sections/PricingSection';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/lib/i18n';
import ContactSection from '@/components/sections/ContactSection';
import ProcessSteps from '@/components/ProcessSteps';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';

interface PageProps {
  params: {
    locale: Locale;
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Monaco Financial Solution',
  description: 'Your financial partner in Monaco',
};

export default async function Home({ params }: PageProps) {
  const { locale } = params;
  if (!locales.includes(locale as Locale)) notFound();
  return (
    <div className="bg-white">
      <HeroSection />
      <ServicesSection />

      <PricingSection />

      <ProcessSteps />

      <section id="cases" className="border-b border-slate-200 bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <CasesSection />
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
