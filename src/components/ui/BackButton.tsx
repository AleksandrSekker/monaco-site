// src/components/ui/BackButton.tsx
'use client';

import { Locale } from '@/lib/i18n';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  locale: Locale;
}

export default function BackButton({ href, locale }: BackButtonProps) {
  const backText = locale === 'fr' ? 'Retour aux articles' : locale === 'ru' ? 'Назад к статьям' : 'Back to blog';

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <Link
        href={href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#4b5563',
          transition: 'color 0.2s ease',
        }}
      >
        <svg
          style={{
            width: '1rem',
            height: '1rem',
            marginRight: '0.5rem',
            transition: 'transform 0.2s ease',
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span
          style={{
            borderBottom: '1px solid transparent',
            transition: 'border-color 0.2s ease',
          }}
        >
          {backText}
        </span>
      </Link>
    </div>
  );
}
