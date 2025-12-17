// src/components/ServicesList.tsx
'use client';

import { useEffect, useState } from 'react';
import { getServices } from '@/lib/sanity/utils';
import { getLocalizedString } from '@/sanity/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { RoundedImage } from './ui/RoundedImage';
import type { Service } from '@/lib/sanity/types';

export default function ServicesList() {
  const { locale } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load services'));
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error loading services: {error.message}</div>;

  console.log('servics', services);
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        if (!service.slug?.current) {
          console.warn('Service is missing slug:', service);
          return null;
        }

        return (
          <Link
            href={`/${locale}/services/${service.slug.current}`}
            key={service._id}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-300 hover:shadow-md"
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
              <p className="mt-3 text-xs text-slate-600">{getLocalizedString(service.description, locale)}</p>
            </div>
            <button className="mt-4 inline-flex items-center text-[11px] font-semibold text-red-600 group-hover:text-red-700">
              {getLocalizedString(service.cta, locale) || 'Learn more'}
              <span className="ml-1">→</span>
            </button>
          </Link>
        );
      })}
    </div>
  );
}
