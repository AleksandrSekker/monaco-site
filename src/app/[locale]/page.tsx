import { Metadata } from 'next';
import { locales } from '@/lib/i18n';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import CasesSection from '@/components/sections/CasesSection';
import PricingSection from '@/components/sections/PricingSection';
import ContactSection from '@/components/sections/ContactSection';
import ProcessSteps from '@/components/ProcessSteps';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';

// Generate static params for static generation
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export const metadata: Metadata = {
  title: 'Monaco Financial Solution',
  description: 'Your financial partner in Monaco',
};

// The page component with proper typing
export default async function Home() {
  return (
    <div className="bg-white">
      <FadeIn>
        <HeroSection />
      </FadeIn>

      <SlideUp delay={0.2}>
        <ServicesSection />
      </SlideUp>

      <SlideUp delay={0.3}>
        <PricingSection />
      </SlideUp>

      <SlideUp delay={0.4}>
        <ProcessSteps />
      </SlideUp>

      <section id="cases" className="border-b border-slate-200 bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <FadeIn delay={0.5}>
            <CasesSection />
          </FadeIn>
        </div>
      </section>

      <FadeIn delay={0.6}>
        <ContactSection />
      </FadeIn>
    </div>
  );
}
