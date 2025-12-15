import { aboutHeaders } from '@/translations/headers';
import PageHeader from '@/components/ui/PageHeader';
import { PageDescription } from '@/components/ui';
import StatsSection from '@/components/sections/StatsSection';

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <PageHeader translations={aboutHeaders} />
            <StatsSection />
            <PageDescription />
          </div>
        </div>
      </section>
    </div>
  );
}
