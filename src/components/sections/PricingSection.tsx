'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { getPricingTiers } from '@/lib/sanity/utils';
import type { PricingTier, LocaleString, LocaleText } from '@/lib/sanity/types';
import { pricingHeaders } from '@/translations/headers';
import { getPricingTranslations } from '@/translations/pricing';
import PageHeader from '../ui/PageHeader';
import { RoundedImage } from '@/components/ui/RoundedImage';
import { useLanguage } from '@/contexts/LanguageContext';

// Type for localized content with language codes as keys
type LocalizedContent = LocaleString | LocaleText | string;

// Helper function to handle i18n strings
function getLocalizedString(
  content: LocalizedContent | { en: string; [key: string]: string },
  locale: string = 'en',
): string {
  if (!content) return '';
  if (typeof content === 'string') return content;

  // Handle Sanity locale objects
  if ('_type' in content && (content._type === 'localeString' || content._type === 'localeText')) {
    return content[locale as keyof typeof content] || content.en || '';
  }

  // Handle our inline locale objects like { en: 'text', ru: 'текст' }
  if ('en' in content) {
    return content[locale as keyof typeof content] || content.en || '';
  }

  return '';
}

// We'll use the PricingTier type directly

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export default function PricingSection() {
  const [pricingTiers, setPricingTiers] = useState<Array<PricingTier>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLanguage();
  const t = getPricingTranslations(locale);

  // Single effect for data fetching and debugging
  useEffect(() => {
    let isMounted = true;

    const fetchPricingTiers = async () => {
      try {
        console.log('Fetching pricing tiers...');
        const data = await getPricingTiers();
        console.log('Fetched pricing tiers:', data);

        if (isMounted) {
          setPricingTiers(data || []);
          setError(null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Error fetching pricing tiers:', err);
        if (isMounted) {
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPricingTiers();

    return () => {
      isMounted = false;
    };
  }, []);

  // Log debug info when it changes
  useEffect(() => {
    if (pricingTiers.length > 0) {
      console.log('Current pricingTiers state:', pricingTiers);
    }
    if (error) {
      console.error('Error state:', error);
    }
  }, [pricingTiers, error]);

  // Sort tiers by tier type for consistent order using useMemo
  const sortedTiers = useMemo(() => {
    const tierOrder: Record<string, number> = { essential: 1, premium: 2, familyOffice: 3, crypto: 4 };
    return [...pricingTiers].sort((a, b) => (tierOrder[a.tier] || 0) - (tierOrder[b.tier] || 0));
  }, [pricingTiers]);

  // Debug logging
  useEffect(() => {
    if (sortedTiers.length > 0) {
      console.log('Sorted tiers:', sortedTiers);
    }
  }, [sortedTiers]);

  if (isLoading) {
    return (
      <section id="pricing" className="border-b border-slate-200 bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">Loading...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  console.log('seo', pricingTiers);
  return (
    <section id="pricing" className="border-b border-slate-200 bg-slate-50 py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <PageHeader translations={pricingHeaders} />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-8 grid gap-5 md:grid-cols-3"
        >
          {sortedTiers
            .filter((tier) => tier.tier !== 'crypto')
            .map((tier) => {
              const investmentRange = tier.investmentRange;
              const feeRange = tier.feeRange;

              return (
                <motion.div
                  key={tier._id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div>
                    {tier.image?.asset?.url && (
                      <div className="mb-3">
                        <RoundedImage
                          src={tier.image.asset.url}
                          alt={getLocalizedString(tier.title, locale) || 'Pricing tier'}
                          size={48}
                          placeholder="blur"
                          blurDataURL={tier.image.asset.metadata?.lqip}
                          className="h-12 w-12"
                        />
                      </div>
                    )}
                    <p className="text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase">
                      {getLocalizedString(tier.title, locale)}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {getLocalizedString({
                        en: 'Capital',
                        ru: 'Капитал',
                        fr: 'Capital',
                      })}{' '}
                      {investmentRange ? (
                        <>
                          {investmentRange.min ? <>{formatCurrency(investmentRange.min, false)}</> : null}
                          {investmentRange.max ? <>{`–${formatCurrency(investmentRange.max, false)}`}</> : '+'} €
                        </>
                      ) : (
                        <span className="text-red-600">Contact us</span>
                      )}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-red-600">
                      {tier.isCustomFee ? (
                        <>
                          {getLocalizedString({
                            en: 'Custom pricing',
                            ru: 'Индивидуально',
                            fr: 'Sur devis',
                          })}
                        </>
                      ) : feeRange ? (
                        <>
                          {feeRange.min ? <>{formatCurrency(feeRange.min, false)}</> : null}
                          {feeRange.max ? <>{`–${formatCurrency(feeRange.max, false)}`}</> : '+'} €
                        </>
                      ) : (
                        <span className="text-sm">Contact us</span>
                      )}
                    </p>
                    <p className="mt-3 text-xs text-slate-600">{getLocalizedString(tier.description, locale)}</p>
                  </div>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-red-600 px-4 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                  >
                    {t.getAQuote}
                  </a>
                </motion.div>
              );
            })}
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-8 grid gap-5">
          {sortedTiers
            .filter((tier) => tier.tier === 'crypto')
            .map((tier) => (
              <motion.div key={tier._id} variants={itemVariants} whileHover="hover">
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-700">
                  <div className="flex items-start gap-4">
                    {tier.image?.asset?.url && (
                      <div className="flex-shrink-0">
                        <RoundedImage
                          src={tier.image.asset.url}
                          alt={getLocalizedString(tier.title, locale) || 'Crypto service'}
                          size={40}
                          placeholder="blur"
                          blurDataURL={tier.image.asset.metadata?.lqip}
                          className="h-10 w-10"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-slate-900">{getLocalizedString(tier.title, locale)}</p>
                      <p className="mt-1 text-slate-600">{getLocalizedString(tier.description, locale)}</p>
                      <p className="mt-2 font-semibold text-red-600">
                        {tier.feeRange ? (
                          <>
                            {tier.feeRange.min ? <>{formatCurrency(tier.feeRange.min, false)}</> : null}
                            {tier.feeRange.max ? <>{`–${formatCurrency(tier.feeRange.max, false)}`}</> : '+'} €
                          </>
                        ) : (
                          getLocalizedString(t.contactUs, locale)
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900">
                  <p className="font-semibold">{getLocalizedString(t.customTerms, locale)}</p>
                  <p className="mt-1">{getLocalizedString(t.customTermsDescription, locale)}</p>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );

  // Helper function to format currency
  function formatCurrency(amount?: number, showCurrency: boolean = true): string {
    if (amount === undefined || amount === null) return '';
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return showCurrency ? `${formatted} €` : formatted;
  }
}
