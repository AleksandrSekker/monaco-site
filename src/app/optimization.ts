import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.monacofinancialsolution.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Monaco Financial Solution',
    description: 'Your trusted financial partner',
    url: 'https://www.monacofinancialsolution.com',
    siteName: 'Monaco Financial Solution',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monaco Financial Solution',
    description: 'Your trusted financial partner',
    creator: '@monacofinancial',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YANDEX_VERIFICATION_CODE',
  },
};

export const optimize = {
  // Add any optimization flags here
  optimizeFonts: true,
  optimizeImages: true,
  optimizeScripts: true,
};
