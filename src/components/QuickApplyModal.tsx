'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type QuickApplyModalProps = {
  buttonLabel?: string;
  variant?: 'primary' | 'secondary';
};

export default function QuickApplyModal({ buttonLabel = 'Быстрая заявка', variant = 'primary' }: QuickApplyModalProps) {
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(() => typeof window !== 'undefined');

  // This effect will only run on the client side
  if (typeof window !== 'undefined' && !isClient) {
    setIsClient(true);
  }

  // Закрытие по Escape
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    // Блокируем скролл body когда попап открыт
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

  const modalContent = open ? (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-4"
      onClick={(e) => {
        // Закрываем попап при клике на overlay (фон)
        if (e.target === e.currentTarget) {
          setOpen(false);
        }
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.3)]"
        onClick={(e) => {
          // Предотвращаем закрытие при клике внутри попапа
          e.stopPropagation();
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-900">Быстрая заявка</p>
            <p className="mt-1 text-xs text-slate-600">
              Оставьте контакты — вернёмся с предложением в течение 24–48 часов.
            </p>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="text-xs text-slate-400 hover:text-slate-900">
            ✕
          </button>
        </div>

        <form className="mt-4 flex flex-col gap-3">
          <div>
            <label className="text-[11px] text-slate-600">Имя / компания</label>
            <input
              type="text"
              className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
              placeholder="Например: Иван, семья Б., компания В."
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-600">Контакт (Telegram / WhatsApp / телефон)</label>
            <input
              type="text"
              className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
              placeholder="@username / +XXX / email"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-600">Кратко опишите вашу задачу</label>
            <textarea
              className="mt-1 min-h-[70px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
              placeholder="Например: нужен счёт и карты в Монако / кредитная линия / крипто-ввод от 300k €."
            />
          </div>
          <button
            type="submit"
            className="mt-1 h-9 w-full rounded-full bg-red-600 text-xs font-semibold tracking-wide text-white shadow-lg shadow-red-600/30 hover:bg-red-700"
          >
            Отправить заявку
          </button>
          <p className="text-[10px] text-slate-500">
            Нажимая на кнопку, вы соглашаетесь с обработкой персональных данных и политикой конфиденциальности.
          </p>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button type="button" className={`${baseButtonClasses} ${variantClasses}`} onClick={() => setOpen(true)}>
        {buttonLabel}
      </button>

      {isClient && createPortal(modalContent, document.body)}
    </>
  );
}
