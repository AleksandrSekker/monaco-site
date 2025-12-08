import { aboutHeaders } from '@/translations/headers';
import PageHeader from '@/components/ui/PageHeader';
import { PageDescription } from '@/components/ui';

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <PageHeader translations={aboutHeaders} />
            <div className="grid gap-4 text-sm text-slate-700 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">Опыт</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">10+ лет</p>
                <p className="mt-1 text-xs text-slate-500">в private banking и wealth management</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">Счета</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">400+</p>
                <p className="mt-1 text-xs text-slate-500">открытых счетов в банках Монако, Швейцарии и ЕС</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">География</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">HNWI / UHNWI</p>
                <p className="mt-1 text-xs text-slate-500">клиенты из Европы, Ближнего Востока и СНГ</p>
              </div>
            </div>
            <PageDescription />
          </div>
        </div>
      </section>
    </div>
  );
}
