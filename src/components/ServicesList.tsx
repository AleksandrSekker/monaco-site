// src/components/ServicesList.tsx
'use client';

import { motion } from 'framer-motion';
import { HoverScale } from '@/components/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedString } from '@/sanity/utils';
import Link from 'next/link';
import { RoundedImage } from './ui/RoundedImage';
import { useEffect, useState } from 'react';
import { getServices } from '@/lib/sanity/utils';
import type { Service } from '@/lib/sanity/types';
import { LoadingState, ErrorState } from './ui';

import { Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function ServicesList() {
  const { locale } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err instanceof Error ? err : new Error('Failed to load services'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return <ErrorState message={error.message} onRetry={fetchServices} />;
  }

  // Main content
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {services.map((service) => {
        if (!service.slug?.current) {
          console.warn('Service is missing slug:', service);
          return null;
        }

        return (
          <motion.div key={service._id} variants={item} className="h-full">
            <HoverScale>
              <Link
                href={`/${locale}/services/${service.slug.current}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-300 hover:shadow-md"
              >
                {service.icon?.asset?.url && (
                  <div className="mb-4">
                    <RoundedImage
                      src={service.icon.asset.url}
                      alt={service.icon.alt || getLocalizedString(service.title, locale) || 'Service icon'}
                      className="h-12 w-12"
                      variant="service"
                      border={false}
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{getLocalizedString(service.title, locale)}</h3>
                  <p className="mt-3 text-xs text-slate-600 line-clamp-3">
                    {getLocalizedString(service.description, locale)}
                  </p>
                </div>
                <button className="mt-4 inline-flex items-center text-[11px] font-semibold text-red-600 group-hover:text-red-700">
                  {getLocalizedString(service.cta, locale) || 'Learn more'}
                  <span className="ml-1">→</span>
                </button>
              </Link>
            </HoverScale>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
