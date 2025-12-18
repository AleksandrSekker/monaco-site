'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCases } from '../../lib/sanity/utils';
import type { Case, LocaleString, LocaleText } from '../../lib/sanity/types';
import { RoundedImage } from '@/components/ui/RoundedImage';
import PageHeader from '../ui/PageHeader';
import { casesHeaders } from '@/translations/headers';
import { useLanguage } from '@/contexts/LanguageContext';

type LocalizedContent = LocaleString | LocaleText | string;

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    } as const,
  },
  hover: {
    y: -5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut' as const,
    } as const,
  },
};

function getLocalizedString(content: LocalizedContent, locale: string = 'en'): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if ('_type' in content && (content._type === 'localeString' || content._type === 'localeText')) {
    return content[locale] || content.en || '';
  }
  return '';
}

export default function CasesSection() {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { locale } = useLanguage();

  useEffect(() => {
    const fetchCases = async () => {
      setIsLoading(true);
      try {
        const data = await getCases(locale);
        setCases(data || []);
      } catch (error) {
        console.error('Error fetching cases:', error);
        setCases([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, [locale]);

  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (!cases || cases.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-12 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-900">No Cases Found</h2>
        <p className="text-gray-600">Check back later for our latest case studies.</p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <PageHeader translations={casesHeaders} className="pb-8" />

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {cases.map((caseItem) => (
              <motion.article
                key={caseItem._id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-all duration-200"
                variants={item}
                whileHover="hover"
                layout
              >
                <div className="space-y-3">
                  {caseItem.featuredImage && (
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <RoundedImage
                        src={caseItem.featuredImage.url}
                        alt={getLocalizedString(caseItem.title) || 'Case study'}
                        size={48}
                        placeholder="blur"
                        blurDataURL={caseItem.featuredImage.lqip}
                        onError={(e) => {
                          console.error('Image failed to load:', e);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </motion.div>
                  )}
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                    {getLocalizedString(caseItem.title)}
                  </h3>
                  {caseItem.description && (
                    <p className="text-slate-600 mb-4 line-clamp-3 group-hover:text-slate-500 transition-colors">
                      {getLocalizedString(caseItem.description)}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
