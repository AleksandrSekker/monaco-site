import CasesSection from '@/components/CasesSection';
import PricingSection from '@/components/PricingSection';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/lib/i18n';
import ContactSection from '@/components/ContactSection';
import ProcessSteps from '@/components/ProcessSteps';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';

interface PageProps {
  params: {
    locale: string;
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
  const { locale } = await params;
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
