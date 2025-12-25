// src/app/[locale]/layout.tsx
import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { PageTransition, FadeIn } from '@/components/animations';
import GoogleAnalytics from '@/components/seo/GoogleAnalytics';
import { cormorant, gilda, europa } from '../fonts';

// Preload critical CSS and fonts
import '../globals.css';

// Add preload for critical fonts
const preloadFonts: Array<{
  href: string;
  as: string;
  type: string;
  crossOrigin: 'anonymous' | 'use-credentials' | '' | undefined;
}> = [
  {
    href: '/_next/static/media/europa-regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous' as const,
  },
  { href: '/_next/static/media/europa-bold.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' as const },
];

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
  colorScheme: 'light',
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: 'Monaco Financial Solution | Your Trusted Financial Partner',
    template: '%s | Monaco Financial Solution',
  },
  description:
    'Expert financial solutions in Monaco. Specializing in investment management, tax planning, and wealth management services for private and corporate clients.',
  metadataBase: new URL('https://monacofinancialsolution.com'),
  applicationName: 'Monaco Financial Solution',
  referrer: 'origin-when-cross-origin',
  generator: 'Next.js',
  publisher: 'Monaco Financial Solution',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    'Monaco',
    'financial services',
    'wealth management',
    'investment',
    'tax planning',
    'private banking',
    'asset management',
    'financial planning',
    'Monaco finance',
    'wealth preservation',
  ],
  authors: [{ name: 'Monaco Financial Solution' }],
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      fr: '/fr',
      ru: '/ru',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://monacofinancialsolution.com',
    siteName: 'Monaco Financial Solution',
    title: 'Monaco Financial Solution | Your Trusted Financial Partner',
    description:
      'Expert financial solutions in Monaco. Specializing in investment management, tax planning, and wealth management services.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Monaco Financial Solution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monaco Financial Solution | Your Trusted Financial Partner',
    description:
      'Expert financial solutions in Monaco. Specializing in investment management, tax planning, and wealth management services.',
    images: ['/images/og-image.jpg'],
    site: '@monacofinancial',
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  other: {
    'msapplication-TileColor': '#2b5797',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#ffffff',
  },
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await Promise.resolve(params);

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${gilda.variable} ${europa.variable} light scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical fonts */}
        {preloadFonts.map((font, index) => (
          <link
            key={index}
            rel="preload"
            href={font.href}
            as={font.as}
            type={font.type}
            crossOrigin={font.crossOrigin}
          />
        ))}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />

        {/* Canonical and alternate URLs */}
        <link rel="canonical" href={`https://monacofinancialsolution.com/${locale}`} />
        <link rel="alternate" hrefLang="x-default" href="https://monacofinancialsolution.com/en" />
        <link rel="alternate" hrefLang="en" href="https://monacofinancialsolution.com/en" />
        <link rel="alternate" hrefLang="fr" href="https://monacofinancialsolution.com/fr" />
        <link rel="alternate" hrefLang="ru" href="https://monacofinancialsolution.com/ru" />

        <GoogleAnalytics />
      </head>
      <body className="antialiased transition-colors duration-300">
        <LanguageProvider>
          <PageTransition>
            <FadeIn>
              <ScrollToTop />
              <div className="flex min-h-screen flex-col" lang={locale}>
                <Header />
                <main className="flex-1 bg-white transition-all duration-300 ease-in-out" id="main-content">
                  {children}
                </main>
                <Footer />

                {/* Social media buttons */}
                <div className="fixed bottom-4 left-4 z-50 space-y-4">
                  <a
                    href="https://t.me/Monacofinancialsolution"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/40 transition-all duration-300 hover:scale-110 hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/50"
                    aria-label="Telegram"
                  >
                    <svg
                      className="h-6 w-6 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.2 1.37-.98 4.05-1.38 5.38-.2.7-.6.93-.98.94-.33.01-.89-.17-1.38-.31-.35-.12-1.2-.4-1.99-.65-.79-.25-1.49-.38-1.53-.81-.02-.11.01-.23.1-.32.12-.14.33-.18.7-.28.38-.1 1.26-.41 1.47-.46.21-.05.35-.15.4-.29.05-.14.02-.39-.05-.55-.07-.16-.56-1.38-.8-1.88-.21-.41-.42-.44-.58-.45-.14-.01-.3-.01-.46-.01-.18 0-.46.06-.7.3-.24.24-.92.9-.92 2.19 0 1.3.94 2.54 1.07 2.72.13.17 1.83 2.8 4.44 3.92.61.26 1.08.42 1.45.54.61.19 1.16.16 1.6.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.11-.26-.17-.55-.3-.29-.13-1.71-.85-1.97-.94-.27-.1-.46-.16-.64.15-.19.3-.73.94-.89 1.13-.17.19-.33.22-.61.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.14-.14.29-.25.43-.37.15-.13.2-.22.3-.37.1-.15.05-.28-.03-.39-.08-.12-.6-1.46-.82-2-0.22-.54-.44-.47-.6-.48-.15-.01-.33-.01-.51-.01-.19 0-.49.03-.75.16-.33.17-.58.54-.46.56.17.03.54.1.77.32.26.25.25.84.47 1.21.23.37.8 1.26.86 1.35.07.09.12.19.01.31-.11.13-.21.11-.39.06-.17-.05-.73-.24-1.39-.47-1.14-.39-1.91-.46-2.27-.47-.2-.01-.34-.02-.47.02-.13.04-.22.13-.26.23-.19.4.19.56.68.82.25.13.49.27.64.47.15.2.29.6.34.69.05.09.07.19 0 .25-.07.07-.12.06-.23.09-.11.03-.23.03-.35.06-.12.02-.25.02-.37 0-.12-.02-.22-.04-.33-.08-.11-.04-.21-.12-.3-.22-.25-.27-.63-.76-.77-1.03-.14-.26-.28-.23-.38-.23-.1 0-.21-.01-.32-.01z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/377640626753"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/50"
                    aria-label="WhatsApp"
                  >
                    <span className="text-lg font-semibold group-hover:scale-110">WA</span>
                  </a>
                </div>

                <div className="fixed bottom-4 right-4 z-50">
                  <div className="animate-pulse-slow rounded-full bg-slate-900/95 px-4 py-2 text-xs text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-slate-800/95">
                    Осталось <span className="font-bold text-red-300">5 мест</span> на декабрь–январь
                  </div>
                </div>
              </div>
            </FadeIn>
          </PageTransition>
        </LanguageProvider>
      </body>
    </html>
  );
}
