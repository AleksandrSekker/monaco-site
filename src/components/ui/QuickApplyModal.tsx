'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { quickApplyTranslations } from '@/translations/quickApplyModal';

type QuickApplyModalProps = {
  buttonLabel?: string;
  variant?: 'primary' | 'secondary';
};

export default function QuickApplyModal({ buttonLabel, variant = 'primary' }: QuickApplyModalProps) {
  const { locale = 'en' } = useParams<{ locale?: Locale }>();
  const t = quickApplyTranslations[locale as Locale] || quickApplyTranslations.en;
  const [open, setOpen] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Handle escape key press
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const baseButtonClasses =
    'text-xs font-semibold tracking-wide rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white';

  const variantClasses =
    variant === 'primary'
      ? 'bg-red-600 px-4 py-2 text-white shadow-lg shadow-red-600/30 hover:bg-red-700'
      : 'border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50';

  // Check if we're on the client side
  const [isClient] = useState(() => typeof window !== 'undefined');

  // Only render the portal on the client
  if (!isClient) {
    return (
      <button type="button" className={`${baseButtonClasses} ${variantClasses} opacity-0`} aria-hidden="true">
        {buttonLabel || t.defaultButtonLabel}
      </button>
    );
  }

  const modalContent = open ? (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpen(false);
        }
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-900">{t.modalTitle}</p>
            <p className="mt-1 text-xs text-slate-600">{t.modalDescription}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs text-slate-400 hover:text-slate-900"
            aria-label="Close"
          >
            {t.closeButton}
          </button>
        </div>

        <form className="mt-4 flex flex-col gap-3">
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
            className="mt-1 h-9 w-full rounded-full bg-red-600 text-xs font-semibold tracking-wide text-white shadow-lg shadow-red-600/30 hover:bg-red-700"
          >
            {t.submitButton}
          </button>
          <p className="text-[10px] text-slate-500">{t.privacyText}</p>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button type="button" className={`${baseButtonClasses} ${variantClasses}`} onClick={() => setOpen(true)}>
        {buttonLabel || t.defaultButtonLabel}
      </button>
      {createPortal(modalContent, document.body)}
    </>
  );
}
