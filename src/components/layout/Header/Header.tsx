// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
// import QuickApplyModal from '@/components/ui/QuickApplyModal';
import { locales, Locale } from '@/lib/i18n';
import Image from 'next/image';
import { headerTranslations } from '@/translations/header';

export default function Header() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const t = headerTranslations[locale as Locale] || headerTranslations.en;
  // Function to get the path with the new locale
  const getLocalizedPath = (newLocale: string) => {
    const pathSegments = pathname.split('/');
    const currentLocale = pathSegments[1];

    if (locales.includes(currentLocale as Locale)) {
      pathSegments[1] = newLocale;
    } else {
      pathSegments.splice(1, 0, newLocale);
    }

    return pathSegments.join('/');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
        {/* Logo and other header content */}
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
            <Link href={`/${locale}`} className="flex flex-col leading-tight">
              <span className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">Monaco</span>
              <span className="text-sm font-medium text-slate-900">Financial Solution</span>
            </Link>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-xs font-medium tracking-wide text-slate-600 md:flex">
          <Link href={`/${locale}/services`} className="hover:text-slate-900">
            {t.nav.services}
          </Link>
          <Link href={`/${locale}/pricing`} className="hover:text-slate-900">
            {t.nav.pricing}
          </Link>
          <Link href={`/${locale}/cases`} className="hover:text-slate-900">
            {t.nav.cases}
          </Link>
          <Link href={`/${locale}/about`} className="hover:text-slate-900">
            {t.nav.about}
          </Link>
          <Link href={`/${locale}/blog`} className="hover:text-slate-900">
            {t.nav.blog}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 border border-slate-200 rounded-full px-2 py-1">
            {locales.map((lang) => (
              <Link
                key={lang}
                href={getLocalizedPath(lang)}
                className={`px-2 py-1 text-xs rounded-full transition-colors ${
                  locale === lang ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {lang.toUpperCase()}
              </Link>
            ))}
          </div>
          {/* Rest of your header content */}
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 md:inline-flex"
            >
              {t.nav.telegram}
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 md:inline-flex"
            >
              {t.nav.whatsapp}
            </a>
            {/* <QuickApplyModal /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
