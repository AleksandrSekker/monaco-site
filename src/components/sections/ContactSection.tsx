// src/components/ContactSection.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { contactTranslations } from '@/translations/contact';
import ContactForm from '../ui/contactForm/ContactForm';
import { Locale } from '@/lib/i18n';

export default function ContactSection() {
  const { locale } = useLanguage();
  const t = contactTranslations[locale as Locale] || contactTranslations.en;

  return (
    <section id="contact" className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">
              {locale === 'en' ? 'Contacts' : locale === 'fr' ? 'Contacts' : 'Контакты'}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t.subtitle}</h2>
            <p className="mt-3 max-w-xl text-sm text-slate-600">{t.description}</p>

            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500">{t.contactMethods.telegram.label}</span>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-300 px-3 py-1 text-xs hover:border-slate-400"
                >
                  {t.contactMethods.telegram.button}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500">{t.contactMethods.whatsapp.label}</span>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-300 px-3 py-1 text-xs hover:border-slate-400"
                >
                  {t.contactMethods.whatsapp.button}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500">{t.contactMethods.phone.label}</span>
                <span className="text-sm text-slate-900">{t.contactMethods.phone.number}</span>
              </div>{' '}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500">{t.contactMethods.email.label}</span>
                <a href="mailto:monacofinancialsolution@gmail.com">
                  <span className="text-sm text-slate-900">{t.contactMethods.email.button}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <p className="text-xs font-semibold tracking-wide text-slate-900">{t.form.title}</p>
            <p className="mt-1 text-xs text-slate-600">{t.form.subtitle}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
