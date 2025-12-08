'use client';

import { useParams } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { contactFormTranslations } from '@/translations/contactForm';

export default function ContactFormClient() {
  const { locale = 'en' } = useParams<{ locale?: Locale }>();
  const t = contactFormTranslations[locale as Locale] || contactFormTranslations.en;

  return (
    <form className="mt-4 space-y-3">
      <div>
        <label className="text-[11px] text-slate-600">{t.nameLabel}</label>
        <input
          type="text"
          className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
          placeholder={t.namePlaceholder}
        />
      </div>
      <div>
        <label className="text-[11px] text-slate-600">{t.contactLabel}</label>
        <input
          type="text"
          className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
          placeholder={t.contactPlaceholder}
        />
      </div>
      <div>
        <label className="text-[11px] text-slate-600">{t.taskLabel}</label>
        <textarea
          className="mt-1 min-h-[70px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
          placeholder={t.taskPlaceholder}
        />
      </div>
      <button
        type="submit"
        className="mt-2 h-10 w-full rounded-full bg-red-600 text-xs font-semibold tracking-wide text-white shadow-lg shadow-red-600/30 hover:bg-red-700"
      >
        {t.submitButton}
      </button>
      <p className="text-[10px] text-slate-500">{t.privacyText}</p>
    </form>
  );
}
