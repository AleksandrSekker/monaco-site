import { servicesHeaders } from '@/translations/headers';
import PageHeader from '@/components/ui/PageHeader';
import ServicesList from '@/components/ServicesList';

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <PageHeader translations={servicesHeaders} />
          <ServicesList />
        </div>
      </section>
    </div>
  );
}
