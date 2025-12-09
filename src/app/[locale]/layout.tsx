// src/app/[locale]/layout.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import '../globals.css';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Monaco Financial Solution',
  description: 'Your financial partner in Monaco',
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  // Validate that the incoming locale is valid
  const { locale } = await Promise.resolve(params);

  // Type assertion after validation
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-white">{children}</main>

            <Footer />

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
