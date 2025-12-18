'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';

interface ProcessStep {
  title: string;
  description: string;
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
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
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export default function ProcessSection() {
  const t = useTranslations('ProcessSection');

  const steps = [
    { title: t('step1.title'), description: t('step1.description') },
    { title: t('step2.title'), description: t('step2.description') },
    { title: t('step3.title'), description: t('step3.description') },
    { title: t('step4.title'), description: t('step4.description') },
    { title: t('step5.title'), description: t('step5.description') },
  ] as ProcessStep[];

  return (
    <section id="process" className="border-b border-slate-200 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
          }}
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">{t('subtitle')}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('title')}</h2>
          </div>
        </motion.div>

        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-8 grid gap-4 md:grid-cols-5"
        >
          {steps.map((step, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span className="text-xs font-semibold text-slate-500">{t('step', { number: index + 1 })}</span>
              <p className="mt-2 text-sm text-slate-900">{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
