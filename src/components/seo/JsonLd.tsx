'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

type JsonLdProps = {
  type?: 'Organization' | 'WebPage' | 'WebSite' | 'LocalBusiness';
};

export function JsonLd({ type = 'Organization' }: JsonLdProps) {
  const pathname = usePathname();
  const baseUrl = 'https://monacofinancialsolution.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Monaco Financial Solution',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    sameAs: [
      'https://www.linkedin.com/company/monaco-financial-solution',
      'https://www.facebook.com/monacofinancialsolution',
      'https://twitter.com/monacofinancial',
      'https://t.me/Monacofinancialsolution',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+377 97 97 11 11',
      contactType: 'customer service',
      email: 'contact@monacofinancialsolution.com',
      availableLanguage: ['English', 'French', 'Russian'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Monaco Financial Solution',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const schema = type === 'Organization' ? organizationSchema : websiteSchema;

  return (
    <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
