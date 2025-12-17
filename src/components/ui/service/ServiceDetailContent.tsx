// src/components/ui/service/ServiceDetailContent.tsx
'use client';

import { Service } from '@/lib/sanity/types';
import { getLocalizedString } from '@/sanity/utils';
import ContactForm from '../contactForm/ContactForm.client';

interface ServiceDetailContentProps {
  service: Service;
  locale: string;
  currentPath: string;
}

export default function ServiceDetailContent({ service, locale, currentPath }: ServiceDetailContentProps) {
  const title = getLocalizedString(service.title, locale);
  const description = getLocalizedString(service.longDescription || service.description, locale);
  const features = service.features?.map((feature) => ({
    ...feature,
    title: getLocalizedString(feature.title, locale),
    description: getLocalizedString(feature.description, locale),
  }));

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Service Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>

            <div className="prose prose-lg mt-6 text-gray-500">{description}</div>

            {features && features.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">
                  {locale === 'ru'
                    ? 'Ключевые особенности'
                    : locale === 'fr'
                      ? 'Caractéristiques clés'
                      : 'Key Features'}
                </h2>
                <ul className="mt-4 space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h3 className="font-medium text-gray-900">{feature.title}</h3>
                        {feature.description && <p className="text-gray-600 mt-1">{feature.description}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="mt-12 lg:mt-0">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {locale === 'ru'
                  ? 'Запросить консультацию'
                  : locale === 'fr'
                    ? 'Demander une consultation'
                    : 'Request a Consultation'}
              </h2>
              <ContactForm currentPath={currentPath} serviceTitle={title} locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
