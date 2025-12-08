// src/contexts/LanguageContext.tsx
'use client';

import { createContext, useContext, ReactNode, useState, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, locales, defaultLocale } from '@/lib/i18n';

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract the current locale from the pathname
  const pathLocale = useMemo(() => {
    const segments = pathname.split('/');
    const maybeLocale = segments[1];
    return locales.includes(maybeLocale as Locale) ? (maybeLocale as Locale) : defaultLocale;
  }, [pathname]);

  const [locale, setLocaleState] = useState<Locale>(pathLocale);

  // Update the state if the pathname changes
  if (pathLocale !== locale) {
    setLocaleState(pathLocale);
  }

  const changeLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;

      // Update the URL with the new locale
      const segments = pathname.split('/');

      // Check if the current path already has a locale
      const currentPathLocale = segments[1];
      const hasLocale = locales.includes(currentPathLocale as Locale);

      let newPath;
      if (hasLocale) {
        // Replace the existing locale
        segments[1] = newLocale;
        newPath = segments.join('/');
      } else {
        // Add the new locale
        segments.splice(1, 0, newLocale);
        newPath = segments.join('/');
      }

      // Update the URL without causing a full page reload
      router.push(newPath);
    },
    [locale, pathname, router],
  );

  return <LanguageContext.Provider value={{ locale, setLocale: changeLocale }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
