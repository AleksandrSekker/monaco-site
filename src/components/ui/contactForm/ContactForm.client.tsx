'use client';

import { useParams } from 'next/navigation';
import { useState, FormEvent, useRef } from 'react';
import { Locale } from '@/lib/i18n';
import { contactFormTranslations } from '@/translations/contactForm';

export interface ContactFormProps {
  serviceName?: string;
  serviceTitle?: string;
  currentPath?: string;
  locale?: string;
}

interface SubmitStatus {
  success: boolean;
  message: string;
}

export default function ContactFormClient({
  serviceName = '',
  serviceTitle = '',
  currentPath = '',
  locale = 'en',
}: ContactFormProps) {
  const params = useParams<{ locale?: Locale }>();
  const formRef = useRef<HTMLFormElement>(null);
  const currentLocale = locale || params.locale || 'en';
  const t =
    contactFormTranslations[currentLocale as keyof typeof contactFormTranslations] || contactFormTranslations.en;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('contact') as string,
      message: formData.get('message') as string,
      service: serviceTitle || serviceName,
      currentPath,
    };

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await response.json();
        setSubmitStatus({ success: true, message: t.successMessage });
        formRef.current?.reset();
      } else {
        const error = await response.text();
        throw new Error(error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : t.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div>
        <label className="text-[11px] text-slate-600">{t.nameLabel} *</label>
        <input
          name="name"
          type="text"
          required
          className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
          placeholder={t.namePlaceholder}
        />
      </div>
      <div>
        <label className="text-[11px] text-slate-600">{t.contactLabel} *</label>
        <input
          name="contact"
          type="text"
          required
          className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
          placeholder={t.contactPlaceholder}
        />
      </div>
      <div>
        <label className="text-[11px] text-slate-600">{t.taskLabel} *</label>
        <textarea
          name="message"
          required
          className="mt-1 min-h-[70px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
          placeholder={serviceName ? `${t.taskAboutService} ${serviceName}` : t.taskPlaceholder}
          defaultValue={serviceName ? `${t.taskAboutService} ${serviceName}` : ''}
        />
        <input type="hidden" name="service" value={serviceTitle || serviceName} />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex h-10 w-full items-center justify-center rounded-full bg-red-600 text-xs font-semibold tracking-wide text-white shadow-lg shadow-red-600/30 hover:bg-red-700 disabled:opacity-50"
      >
        {isSubmitting ? t.sendingButton : t.submitButton}
      </button>
      {submitStatus && (
        <div
          className={`rounded-md p-2 text-xs ${submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
        >
          {submitStatus.message}
        </div>
      )}
      <p className="text-[10px] text-slate-500">{t.privacyText}</p>
    </form>
  );
}
