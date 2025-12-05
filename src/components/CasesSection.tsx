// src/components/CasesSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { getCases } from '../lib/sanity/utils';
import type { Case, LocaleString, LocaleText } from '../lib/sanity/types';
import Image from 'next/image';
import PageHeader from './PageHeader';

// Type for localized content with language codes as keys
type LocalizedContent = LocaleString | LocaleText | string;

// Helper function to handle i18n strings
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

  useEffect(() => {
    const fetchCases = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching cases...');
        const data = await getCases();
        console.log('Fetched cases:', data);
        setCases(data || []);
      } catch (error) {
        console.error('Error fetching cases:', error);
        // Set empty array to prevent infinite loading state
        setCases([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!cases || cases.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">No Cases Found</h2>
        <p className="text-gray-600">Check back later for our latest case studies.</p>
      </div>
    );
  }
  console.log('cases:', cases);
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <PageHeader
          title="Наши кейсы"
          description="Реальные примеры успешной работы с нашими клиентами в сфере частного банковского обслуживания в Монако"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseItem) => {
            const title = getLocalizedString(caseItem.title);
            const description = getLocalizedString(caseItem.description);

            return (
              <article
                key={caseItem._id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors duration-200"
              >
                {caseItem.featuredImage?.asset?._ref && (
                  <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SANITY_IMAGE_CDN || ''}${caseItem.featuredImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg')}`}
                      alt={title || 'Case study'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
                {description && <p className="text-slate-600 mb-4 line-clamp-3">{description}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
