import { groq } from 'next-sanity';
import { client } from './client';
import type { Case, PricingTier, LocaleString, LocaleText } from './types';

type LocalizedCase = Omit<Case, 'title' | 'description'> & {
  title: string;
  description: string;
};

export type LocalizedPricingTier = Omit<PricingTier, 'title' | 'description' | 'features'> & {
  title: string;
  description: string;
  features: Array<{
    text: string;
    included: boolean;
  }>;
};

// Helper function to get localized string
export function getLocalizedString(
  content: string | LocaleString | LocaleText | undefined,
  locale: string = 'en',
): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  return content[locale] || content.en || '';
}

// Get all cases with localized strings
export async function getCases(locale: string = 'en'): Promise<LocalizedCase[]> {
  const query = groq`*[_type == "case"] | order(order asc) {
    _id,
    _type,
    title,
    'slug': slug.current,
    description,
    content,
    featuredImage,
    publishedAt,
    order,
    result,
    details,
    duration
  }`;

  const cases = await client.fetch<Case[]>(query);

  // Localize the title and description fields
  return cases.map((caseItem) => ({
    ...caseItem,
    title: getLocalizedString(caseItem.title, locale),
    description: getLocalizedString(caseItem.description, locale),
  }));
}

// Get all pricing tiers with localized strings
export async function getPricingTiers(locale: string = 'en'): Promise<LocalizedPricingTier[]> {
  const query = groq`*[_type == "pricing"] | order(order asc) {
    _id,
    _type,
    tier,
    title,
    description,
    investmentRange,
    feeRange,
    isCustomFee,
    features,
    isPopular
  }`;

  const pricingTiers = await client.fetch<PricingTier[]>(query);

  // Localize the title, description, and feature texts
  return pricingTiers.map((tier) => ({
    ...tier,
    title: getLocalizedString(tier.title, locale),
    description: getLocalizedString(tier.description, locale),
    features:
      tier.features?.map((feature) => ({
        ...feature,
        text: getLocalizedString(feature.text, locale),
      })) || [],
  }));
}
