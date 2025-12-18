// src/components/ui/PageHeader/PageHeader.tsx
'use client';

import { useParams } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { Locale } from '@/lib/i18n';

interface PageHeaderProps {
  translations: {
    [key in Locale]: {
      title: string;
      subtitle?: string;
      description?: string;
    };
  };
  className?: string;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function PageHeader({ translations, className = '' }: PageHeaderProps) {
  const { locale = 'en' } = useParams() as { locale?: Locale };
  const t = translations[locale as Locale] || translations.en;

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
    >
      {t.subtitle && (
        <motion.p variants={item} className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">
          {t.subtitle}
        </motion.p>
      )}
      <motion.h2 variants={item} className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {t.title}
      </motion.h2>
      {t.description && (
        <motion.p variants={item} className="mt-3 max-w-xl text-sm text-slate-600">
          {t.description}
        </motion.p>
      )}
    </motion.div>
  );
}
