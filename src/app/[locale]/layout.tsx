// src/app/[locale]/layout.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/lib/i18n';
import { LanguageProvider } from '@/contexts/LanguageContext';
import QuickApplyModal from '@/components/QuickApplyModal';
import Header from '@/components/Header';
import '../globals.css';

interface LayoutProps {
  children: React.ReactNode;
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

export default async function LocaleLayout({ children, params }: LayoutProps) {
  // Await the params
  const { locale } = await params;

  // Validate that the incoming locale is valid
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <html lang={locale}>
      <body>
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-white">{children}</main>

            <footer className="border-t border-slate-200 bg-slate-50">
              <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-slate-600 lg:px-6 lg:py-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] text-slate-700 uppercase">
                      Monaco Financial Solution
                    </p>
                    <p className="mt-2 max-w-xl text-sm text-slate-600">
                      Семейный офис под ключ в Монако: банковские счета, кредитные линии, инвестиции и приём
                      криптовалюты для частных клиентов и компаний.
                    </p>
                  </div>
                  <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-lg">
                    <p className="text-xs font-semibold tracking-wide text-slate-900">Готовы обсудить задачу</p>
                    <p className="mt-1 text-xs text-slate-600">
                      Оставьте заявку в один клик — форма откроется во всплывающем окне.
                    </p>
                    <div className="mt-3">
                      <QuickApplyModal buttonLabel="Оставить заявку" variant="secondary" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-4 text-xs text-slate-500 md:flex-row md:items-center">
                  <span>© {new Date().getFullYear()} Monaco Financial Solution</span>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">FR / EN / RU</span>
                    <span>Офис: Монако</span>
                  </div>
                </div>
              </div>
            </footer>

            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="fixed bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-xs font-semibold text-white shadow-lg shadow-sky-500/40 hover:bg-sky-400"
            >
              TG
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="fixed bottom-4 left-20 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white shadow-lg shadow-emerald-500/40 hover:bg-emerald-400"
            >
              WA
            </a>

            <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2">
              <div className="rounded-full bg-slate-900 px-4 py-2 text-xs text-white shadow-lg backdrop-blur">
                Осталось <span className="font-semibold text-red-300">5 мест</span> на декабрь–январь
              </div>
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
