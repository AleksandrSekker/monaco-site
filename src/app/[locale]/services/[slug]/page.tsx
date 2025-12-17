// src/app/[locale]/services/[slug]/page.tsx
'use client';

import { useEffect, useState, use } from 'react';
import { usePathname } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/sanity/utils';
import ServiceDetailContent from '@/components/ui/service/ServiceDetailContent';
import type { Locale } from '@/lib/i18n';
import type { Service } from '@/lib/sanity/types';

interface PageProps {
  params: Promise<{
    slug: string;
    locale: Locale;
  }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  const currentPath = usePathname();
  const resolvedParams = use(params);
  const { slug, locale } = resolvedParams;
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // First, try to get all services to see what's available
        const allServices = await getServices();

        // Try to get the specific service
        const serviceData = await getServiceBySlug(slug);

        if (!serviceData) {
          // Try to find a matching service with different case or spacing
          const matchedService = allServices.find(
            (s) =>
              s.slug?.current?.toLowerCase() === slug.toLowerCase() ||
              s.slug?.current?.toLowerCase() === slug.toLowerCase().replace(/-/g, ' '),
          );

          if (matchedService) {
            setService(matchedService);
            return;
          }

          // No matching service found, redirect to 404
          window.location.href = `/${locale || 'en'}/404`;
          return;
        }

        setService(serviceData);
      } catch (error) {
        console.error('Error fetching service:', error);
        if (error instanceof Error && error.message.includes('404')) {
          window.location.href = `/${locale || 'en'}/404`;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, locale]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-32"></div>
            <div className="h-12 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return null;
  }
  console.log('currentPath', currentPath);
  console.log('service detail page', service);
  return <ServiceDetailContent service={service} locale={locale} currentPath={currentPath} />;
}
