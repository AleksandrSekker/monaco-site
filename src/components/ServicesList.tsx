'use client';

import { useEffect, useState } from 'react';
import { getServices } from '@/lib/sanity/utils';
import { getLocalizedString } from '@/sanity/utils';
import { useLanguage } from '@/contexts/LanguageContext';

import type { Service } from '@/lib/sanity/types';
import Image from 'next/image';
import { RoundedImage } from './ui/RoundedImage';

export default function ServicesList() {
  const { locale } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [locale]);

  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error loading services</div>;
  console.log('services', services);
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <div
          key={service._id}
          className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-300 hover:shadow-md"
        >
          {service.icon?.asset && (
            <div className="mb-4">
              <RoundedImage
                src={service.icon.asset.url}
                alt={service.icon.alt || getLocalizedString(service.title, locale as string) || 'Service icon'}
                className="h-12 w-12 object-contain"
                onError={(e) => {
                  console.error('Failed to load service icon:', e);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {getLocalizedString(service.title, locale as string) || service.title.en}
            </h3>
            <p className="mt-3 text-xs text-slate-600">
              {getLocalizedString(service.description, locale as string) || ''}
            </p>
          </div>
          <button className="mt-4 inline-flex items-center text-[11px] font-semibold text-red-600 group-hover:text-red-700">
            {getLocalizedString(service.cta, locale as string) || 'Learn more'}
            <span className="ml-1">→</span>
          </button>
        </div>
      ))}
    </div>
  );
}
