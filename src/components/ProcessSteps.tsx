'use client';

import { getProcessSteps } from '@/lib/sanity/utils';
import { ProcessStep } from '@/translations/process';
import { useEffect, useState } from 'react';
import { RoundedImage } from './ui/RoundedImage';
import { getLocalizedString } from '@/sanity/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { ErrorState, PageHeader } from './ui';
import { processHeaders } from '@/translations/headers';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
} as const;

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
} as const;

const loadingContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
    },
  },
} as const;

const loadingItem: Variants = {
  hidden: {
    opacity: 0.5,
    x: -10,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      duration: 1.5,
    },
  },
} as const;

export default function ProcessSteps() {
  const { locale } = useLanguage();
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProcessSteps = async () => {
      try {
        const data = await getProcessSteps();
        setProcessSteps(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessSteps();
  }, [locale]);

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <section id="process" className="border-b border-slate-200 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <PageHeader translations={processHeaders} className="pb-8" />

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              variants={loadingContainer}
              initial="hidden"
              animate="show"
              className="grid gap-6 grid-cols-1 md:grid-cols-5"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} variants={loadingItem} className="h-40 rounded-2xl bg-slate-100 p-4">
                  <div className="mb-3 h-12 w-12 rounded-full bg-slate-200" />
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-slate-200" />
                  <div className="mt-1 h-3 w-2/3 rounded bg-slate-200" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 grid-cols-1 md:grid-cols-5"
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={step._id}
                  variants={item}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center cursor-pointer"
                >
                  {step.image?.asset?.url && (
                    <motion.div className="mb-3 h-12 w-12" whileHover={{ scale: 1.1 }}>
                      <RoundedImage
                        src={step.image.asset.url}
                        alt={getLocalizedString(step.title?.[locale as string], locale) || `Step ${index + 1}`}
                        size={48}
                        placeholder="blur"
                        blurDataURL={step.image.asset.metadata?.lqip}
                        className="h-full w-full object-contain"
                      />
                    </motion.div>
                  )}

                  <h3 className="mb-2 text-sm font-semibold text-slate-900">
                    {step.title?.[locale as string] || `Step ${index + 1}`}
                  </h3>
                  <p className="text-xs text-slate-600">{step.description?.[locale as string] || ''}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
