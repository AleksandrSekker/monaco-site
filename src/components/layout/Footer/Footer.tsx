'use client';

import { useParams } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { footerTranslations } from '@/translations/footer';
// import QuickApplyModal from '../../ui/QuickApplyModal';

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
            <div className="mt-3">{/* <QuickApplyModal buttonLabel={t.leaveRequest} variant="secondary" /> */}</div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-4 text-xs text-slate-500 md:flex-row md:items-center">
          <span>{t.copyright(new Date().getFullYear())}</span>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{t.languageSelector}</span>
            <span>{t.officeLocation}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
