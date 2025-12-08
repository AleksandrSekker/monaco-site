'use client';

import { useState, useEffect, useMemo } from 'react';
import { getPricingTiers, getLocalizedString } from '../../lib/sanity/utils';
import type { PricingTier } from '../../lib/sanity/types';
import { pricingHeaders } from '@/translations/headers';
import PageHeader from '../ui/PageHeader';

interface LocalizedPricingTier extends Omit<PricingTier, 'title' | 'description' | 'features'> {
  title: string;
  description: string;
  features: Array<{
    text: string;
    included: boolean;
  }>;
}

export default function PricingSection() {
  const [pricingTiers, setPricingTiers] = useState<LocalizedPricingTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section id="pricing" className="border-b border-slate-200 bg-slate-50 py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <PageHeader translations={pricingHeaders} />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {sortedTiers
            .filter((tier) => tier.tier !== 'crypto')
            .map((tier) => {
              const title = getLocalizedString(tier.title);
              const description = getLocalizedString(tier.description);
              const investmentRange = tier.investmentRange;
              const feeRange = tier.feeRange;

              return (
                <div
                  key={tier._id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase">{title}</p>
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
                    <p className="mt-3 text-xs text-slate-600">{description}</p>
                  </div>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-red-600 px-4 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                  >
                    {getLocalizedString({
                      en: 'Get a quote',
                      ru: 'Получить предложение',
                      fr: 'Obtenir un devis',
                    })}
                  </a>
                </div>
              );
            })}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          {sortedTiers
            .filter((tier) => tier.tier === 'crypto')
            .map((tier: LocalizedPricingTier) => (
              <div
                key={tier._id}
                className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-700"
              >
                <p className="font-semibold text-slate-900">
                  {getLocalizedString({
                    en: 'Crypto onboarding from 100k €',
                    ru: 'Крипто-ввод от 100k €',
                    fr: 'Onboarding crypto à partir de 100k €',
                  })}
                </p>
                <p className="mt-1 text-slate-600">{getLocalizedString(tier.description)}</p>
                <p className="mt-2 text-sm font-semibold text-red-600">
                  {tier.feeRange ? (
                    <>
                      {tier.feeRange.min ? <>{formatCurrency(tier.feeRange.min, false)}</> : null}
                      {tier.feeRange.max ? <>{`–${formatCurrency(tier.feeRange.max, false)}`}</> : '+'} €
                    </>
                  ) : (
                    'Contact us'
                  )}
                </p>
              </div>
            ))}
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900">
            <p className="font-semibold">
              {getLocalizedString({
                en: 'Custom terms for complex cases',
                ru: 'Индивидуальные условия для сложных кейсов',
                fr: 'Conditions personnalisées pour les cas complexes',
              })}
            </p>
            <p className="mt-1">
              {getLocalizedString({
                en: 'Choose the package that fits your needs. All packages include dedicated account management and personalized service.',
                ru: 'Выберите пакет, соответствующий вашим потребностям. Все пакеты включают персонального менеджера и индивидуальный сервис.',
                fr: 'Choisissez le forfait qui correspond à vos besoins. Tous les forfaits incluent une gestion de compte dédiée et un service personnalisé.',
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

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
