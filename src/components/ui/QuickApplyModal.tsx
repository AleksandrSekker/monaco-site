'use client';

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from '@/lib/i18n';
import { quickApplyTranslations } from '@/translations/quickApplyModal';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/components/ui/contactForm/ContactForm'), {
  ssr: false,
  loading: () => <div className="mt-4 h-[300px] w-full animate-pulse rounded-md bg-slate-100" />,
});

function ModalPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // Use setTimeout to make it async, avoiding the ESLint warning
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}

type QuickApplyModalProps = {
  buttonLabel?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  initialService?: string;
};

export default function QuickApplyModal({
  buttonLabel,
  variant = 'primary',
  className = '',
  isOpen: externalIsOpen = false,
  onClose: externalOnClose,
  initialService = '',
}: QuickApplyModalProps) {
  const { locale = 'en' } = useParams<{ locale?: Locale }>();
  const [internalOpen, setInternalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isControlled = externalOnClose !== undefined;
  const open = isControlled ? externalIsOpen : internalOpen;

  const t = quickApplyTranslations[locale as Locale] || quickApplyTranslations.en;
  const resolvedButtonLabel = buttonLabel || t.defaultButtonLabel;

  // Handle button click
  const handleButtonClick = useCallback(() => {
    if (!isControlled) {
      setInternalOpen(true);
    } else if (externalOnClose) {
      externalOnClose();
    }
  }, [isControlled, externalOnClose]);

  // Handle close with useCallback to prevent unnecessary re-renders
  const handleClose = useCallback(() => {
    if (isControlled && externalOnClose) {
      externalOnClose();
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, externalOnClose]);

  // Handle escape key press
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, handleClose]);

  // Handle click outside modal - add this effect for better UX
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const modalContent = document.querySelector('.modal-content');
      if (modalContent && !modalContent.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, handleClose]);

  const baseButtonClasses =
    'text-xs font-semibold tracking-wide rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white';

  const variantClasses = {
    primary: 'bg-red-600 px-4 py-2 text-white shadow-lg shadow-red-600/30 hover:bg-red-700',
    secondary: 'border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50',
  };

  // Button component with direct onClick
  const button = (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleButtonClick}
      className={`${baseButtonClasses} ${variantClasses[variant]} ${className}`}
    >
      {resolvedButtonLabel}
    </button>
  );

  // Don't render portal during SSR
  if (typeof window === 'undefined') {
    return isControlled ? null : button;
  }
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15, delay: 0.1 },
    },
  } as const;

  const modalContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm md:items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="modal-content relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{t.modalTitle}</h3>
                <p className="mt-1 text-sm text-slate-500">{t.modalDescription}</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-slate-400 hover:text-slate-900"
                aria-label="Close"
              >
                {t.closeButton}
              </button>
            </div>

            <div className="mt-4">
              <ContactForm serviceName={initialService} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {!isControlled && button}
      <ModalPortal>{modalContent}</ModalPortal>
    </>
  );
}
