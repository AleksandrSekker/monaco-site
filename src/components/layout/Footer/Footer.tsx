'use client';

import { useParams, usePathname } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { footerTranslations } from '@/translations/footer';
import QuickApplyModal from '../../ui/QuickApplyModal';
import { locales } from '@/lib/i18n';
import Link from 'next/link';

// Reusable Language Switcher Component
function LanguageSwitcher({ locale, className = '' }: { locale: string; className?: string }) {
  const pathname = usePathname();

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
    <div className={`flex items-center gap-1 ${className}`}>
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
  );
}

export default function Footer() {
  const { locale = 'en' } = useParams<{ locale?: Locale }>();
  const t = footerTranslations[locale as Locale] || footerTranslations.en;

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-slate-600 lg:px-6 lg:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-slate-700 uppercase">{t.companyName}</p>
            <p className="mt-2 max-w-xl text-sm text-slate-600">{t.description}</p>
          </div>
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-lg">
            <p className="text-xs font-semibold tracking-wide text-slate-900">{t.readyToDiscuss}</p>
            <p className="mt-1 text-xs text-slate-600">{t.requestPopupText}</p>
            <div className="mt-3">
              <QuickApplyModal buttonLabel={t.leaveRequest} variant="secondary" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-4 text-xs text-slate-500 md:flex-row md:items-center">
          <span>{t.copyright(new Date().getFullYear())}</span>
          <div className="flex flex-wrap items-center gap-4">
            <LanguageSwitcher locale={locale as string} className="border border-slate-200 rounded-full px-2 py-1" />
            <span>{t.officeLocation}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
