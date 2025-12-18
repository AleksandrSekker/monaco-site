// src/app/[locale]/layout.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { PageTransition, FadeIn } from '@/components/animations';
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
    <html lang={locale} className="light scroll-smooth">
      <body className="antialiased transition-colors duration-300">
        <LanguageProvider>
          <PageTransition>
            <FadeIn>
              <ScrollToTop />
              <div className="flex min-h-screen flex-col" lang={locale}>
                <Header />
                <main className="flex-1 bg-white transition-all duration-300 ease-in-out">{children}</main>
                <Footer />

                {/* Floating Action Buttons with animations */}
                <div className="fixed bottom-4 left-4 z-50 space-y-4">
                  <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/40 transition-all duration-300 hover:scale-110 hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/50"
                    aria-label="Telegram"
                  >
                    <svg
                      className="h-6 w-6 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.2 1.37-.98 4.05-1.38 5.38-.2.7-.6.93-.98.94-.33.01-.89-.17-1.38-.31-.35-.12-1.2-.4-1.99-.65-.79-.25-1.49-.38-1.53-.81-.02-.11.01-.23.1-.32.12-.14.33-.18.7-.28.38-.1 1.26-.41 1.47-.46.21-.05.35-.15.4-.29.05-.14.02-.39-.05-.55-.07-.16-.56-1.38-.8-1.88-.21-.41-.42-.44-.58-.45-.14-.01-.3-.01-.46-.01-.18 0-.46.06-.7.3-.24.24-.92.9-.92 2.19 0 1.3.94 2.54 1.07 2.72.13.17 1.83 2.8 4.44 3.92.61.26 1.08.42 1.45.54.61.19 1.16.16 1.6.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.11-.26-.17-.55-.3-.29-.13-1.71-.85-1.97-.94-.27-.1-.46-.16-.64.15-.19.3-.73.94-.89 1.13-.17.19-.33.22-.61.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.14-.14.29-.25.43-.37.15-.13.2-.22.3-.37.1-.15.05-.28-.03-.39-.08-.12-.6-1.46-.82-2-0.22-.54-.44-.47-.6-.48-.15-.01-.33-.01-.51-.01-.19 0-.49.03-.75.16-.33.17-.58.54-.46.56.17.03.54.1.77.32.26.25.25.84.47 1.21.23.37.8 1.26.86 1.35.07.09.12.19.01.31-.11.13-.21.11-.39.06-.17-.05-.73-.24-1.39-.47-1.14-.39-1.91-.46-2.27-.47-.2-.01-.34-.02-.47.02-.13.04-.22.13-.26.23-.19.4.19.56.68.82.25.13.49.27.64.47.15.2.29.6.34.69.05.09.07.19 0 .25-.07.07-.12.06-.23.09-.11.03-.23.03-.35.06-.12.02-.25.02-.37 0-.12-.02-.22-.04-.33-.08-.11-.04-.21-.12-.3-.22-.25-.27-.63-.76-.77-1.03-.14-.26-.28-.23-.38-.23-.1 0-.21-.01-.32-.01z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/50"
                    aria-label="WhatsApp"
                  >
                    <span className="text-lg font-semibold group-hover:scale-110">WA</span>
                  </a>
                </div>

                <div className="fixed bottom-4 right-4 z-50">
                  <div className="animate-pulse-slow rounded-full bg-slate-900/95 px-4 py-2 text-xs text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-slate-800/95">
                    Осталось <span className="font-bold text-red-300">5 мест</span> на декабрь–январь
                  </div>
                </div>
              </div>
            </FadeIn>
          </PageTransition>
        </LanguageProvider>
      </body>
    </html>
  );
}
