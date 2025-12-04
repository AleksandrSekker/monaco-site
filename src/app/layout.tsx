import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import QuickApplyModal from '@/components/QuickApplyModal';
import './globals.css';

export const metadata: Metadata = {
  title: 'Monaco Financial Solution — Family Office под ключ',
  description:
    'Премиальные банковские решения, кредитные линии, инвестиции и приём криптовалюты в Монако от 100 000 €.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-9">
                  <Image
                    src="/monaco-financial-solution-logo.png"
                    alt="Monaco Financial Solution"
                    fill
                    sizes="36px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <Link href="/" className="flex flex-col leading-tight">
                    <span className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">Monaco</span>
                    <span className="text-sm font-medium text-slate-900">Financial Solution</span>
                  </Link>
                </div>
              </div>
              <div className="hidden items-center gap-6 text-xs font-medium tracking-wide text-slate-600 md:flex">
                <Link href="/services" className="hover:text-slate-900">
                  Услуги
                </Link>
                <Link href="/pricing" className="hover:text-slate-900">
                  Тарифы
                </Link>
                <Link href="/cases" className="hover:text-slate-900">
                  Кейсы
                </Link>
                <Link href="/about" className="hover:text-slate-900">
                  О компании
                </Link>
                <Link href="/blog" className="hover:text-slate-900">
                  Блог
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 md:inline-flex"
                >
                  Telegram
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 md:inline-flex"
                >
                  WhatsApp
                </a>
                <QuickApplyModal />
              </div>
            </div>
          </header>

          <main className="flex-1 bg-white">{children}</main>

          <footer className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-slate-600 lg:px-6 lg:py-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.25em] text-slate-700 uppercase">
                    Monaco Financial Solution
                  </p>
                  <p className="mt-2 max-w-xl text-sm text-slate-600">
                    Семейный офис под ключ в Монако: банковские счета, кредитные линии, инвестиции и приём криптовалюты
                    для частных клиентов и компаний.
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
      </body>
    </html>
  );
}
