'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { client } from '@/lib/sanity/client';
import { statsQuery } from '@/lib/sanity/queries';
import type { Stats, LocaleString, LocaleText } from '@/lib/sanity/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { RoundedImage } from '@/components/ui/RoundedImage';

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

type LocalizedContent = LocaleString | LocaleText | string;

function getLocalizedString(content: LocalizedContent, locale: string = 'en'): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (content[locale]) return content[locale];
  return content.en || '';
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { locale } = useLanguage();

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const data = await client.fetch(statsQuery);
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <motion.div
        className="grid gap-4 text-sm text-slate-700 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {[1, 2, 3].map((i) => (
          <motion.div key={i} variants={itemVariants} className="h-32 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </motion.div>
    );
  }

  if (!stats.length) return null;

  return (
    <motion.div
      className="grid gap-4 text-sm text-slate-700 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat._id}
          variants={itemVariants}
          whileHover="hover"
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          {stat.image?.asset?.url && (
            <div className="space-y-3">
              <RoundedImage
                src={stat.image.asset.url}
                alt={getLocalizedString(stat.title) || 'Statistic'}
                size={48}
                placeholder="blur"
                blurDataURL={stat.image.asset.metadata?.lqip}
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
          <div>
            <p className="text-xs text-slate-500">{getLocalizedString(stat.title, locale)}</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{getLocalizedString(stat.value, locale)}</p>
            <p className="mt-1 text-xs text-slate-500">{getLocalizedString(stat.description, locale)}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
