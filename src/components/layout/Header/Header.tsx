// src/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import QuickApplyModal from '@/components/ui/QuickApplyModal';
import { locales, Locale } from '@/lib/i18n';
import Image from 'next/image';
import { headerTranslations } from '@/translations/header';
import { FiMenu, FiX } from 'react-icons/fi';

// Reusable Language Switcher Component
function LanguageSwitcher({
  locale,
  getLocalizedPath,
  className = '',
}: {
  locale: string;
  getLocalizedPath: (lang: string) => string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1 border border-slate-200 rounded-full px-2 py-1 ${className}`}>
      {locales.map((lang) => (
        <Link
          key={lang}
          href={getLocalizedPath(lang)}
          className={`px-2 py-1 text-xs rounded-full transition-colors ${
            locale === lang ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {lang.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = headerTranslations[locale as Locale] || headerTranslations.en;

  // Function to get the path with the new locale
  const getLocalizedPath = (newLocale: string) => {
    const pathSegments = pathname.split('/');
    const currentLocale = pathSegments[1];

    if (locales.includes(currentLocale as Locale)) {
      pathSegments[1] = newLocale;
    } else {
      pathSegments.splice(1, 0, newLocale);
    }

    return pathSegments.join('/');
  };

  // Close menu when route changes
  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    // Use requestAnimationFrame to make it non-blocking
    const timer = requestAnimationFrame(closeMenu);
    return () => cancelAnimationFrame(timer);
  }, [pathname]);

  // Handle scroll for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: 'services', label: t.nav.services },
    { href: 'pricing', label: t.nav.pricing },
    { href: 'cases', label: t.nav.cases },
    { href: 'about', label: t.nav.about },
    { href: 'blog', label: t.nav.blog },
  ];

  return (
    <header
      className={`sticky top-0 z-30 border-b border-slate-200 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-white/95 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-9">
            <Link href={`/${locale}`}>
              <Image
                src="/monaco-financial-solution-logo.png"
                alt="Monaco Financial Solution"
                fill
                sizes="36px"
                className="object-contain"
              />
            </Link>
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <Link href={`/${locale}`} className="flex flex-col leading-tight">
              <span className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">Monaco</span>
              <span className="text-sm font-medium text-slate-900">Financial Solution</span>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-xs font-medium tracking-wide text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={`/${locale}/${link.href}`} className="transition-colors hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} getLocalizedPath={getLocalizedPath} />
          <div className="flex items-center gap-2">
            <a
              href="https://t.me/Monacofinancialsolution"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              {t.nav.telegram}
            </a>
            <a
              href="https://wa.me/377640626753"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              {t.nav.whatsapp}
            </a>
            <QuickApplyModal />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[9999] h-[100dvh] w-full overflow-hidden md:hidden">
            {/* Backdrop with increased z-index */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 z-[9999]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel with proper iOS viewport handling */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'tween',
                duration: 0.3,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="fixed right-0 top-0 h-[100dvh] w-full max-w-sm bg-white shadow-xl z-[10000] flex flex-col"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex-1 bg-white p-6 flex flex-col w-full overflow-y-auto">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-9">
                      <Image
                        src="/monaco-financial-solution-logo.png"
                        alt="Monaco Financial Solution"
                        fill
                        sizes="36px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">Monaco</span>
                      <span className="text-sm font-medium text-slate-900">Financial Solution</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100"
                    aria-label="Close menu"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                <nav className="space-y-4 flex-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                    >
                      <Link
                        href={`/${locale}/${link.href}`}
                        className="block rounded-lg px-4 py-3 text-base font-medium text-slate-900 transition-colors hover:bg-slate-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-8 space-y-6 border-t border-slate-100 pt-6">
                  <div className="flex flex-col space-y-4">
                    <a
                      href="https://t.me/Monacofinancialsolution"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                    >
                      {t.nav.telegram}
                    </a>
                    <a
                      href="https://wa.me/377640626753"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                    >
                      {t.nav.whatsapp}
                    </a>
                    <div className="w-full">
                      <QuickApplyModal buttonLabel="Quick Apply" variant="primary" />
                    </div>
                  </div>

                  <motion.div
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <p className="mb-2 text-sm font-medium text-slate-700">Select Language</p>
                    <LanguageSwitcher
                      locale={locale}
                      getLocalizedPath={getLocalizedPath}
                      className="w-full justify-center"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
