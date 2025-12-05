import { client, isSanityConfigured } from './client';
import type {
  Hero,
  Service,
  PricingTier,
  Case,
  BlogPost,
  About,
  Contact,
  LocaleString,
  LocaleText,
  LocalizedPricingTier,
} from './types';

export interface I18nString {
  _type: 'i18nString';
  en: string;
  ru?: string;
  fr?: string;
  [key: string]: string | undefined; // For any other languages
}
// Helper function to handle i18n strings
function getLocalizedString(
  content: string | LocaleString | LocaleText | I18nString | undefined,
  lang: string = 'en',
): string {
  if (!content) return '';
  if (typeof content === 'string') return content;

  // Handle all object types with language keys
  const localizedContent = content as { [key: string]: string | undefined };
  return localizedContent[lang] || localizedContent.en || '';
}
import {
  heroQuery,
  servicesQuery,
  pricingQuery,
  casesQuery,
  blogPostsQuery,
  blogPostQuery,
  aboutQuery,
  contactQuery,
} from './queries';

export async function getHero(): Promise<Hero | null> {
  if (!isSanityConfigured || !client) {
    return null;
  }
  try {
    return await client.fetch<Hero>(heroQuery);
  } catch (error) {
    console.error('Error fetching hero:', error);
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured || !client) {
    return [];
  }
  try {
    return await client.fetch<Service[]>(servicesQuery);
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getPricingTiers(locale: string = 'en'): Promise<LocalizedPricingTier[]> {
  if (!isSanityConfigured || !client) {
    return [];
  }
  try {
    const pricingTiers = await client.fetch<PricingTier[]>(pricingQuery);
    return pricingTiers.map((tier) => ({
      ...tier,
      title: getLocalizedString(tier.title, locale),
      description: getLocalizedString(tier.description, locale),
      features: tier.features.map((feature) => ({
        text: getLocalizedString(feature.text, locale),
        included: feature.included,
      })),
    }));
  } catch (error) {
    console.error('Error fetching pricing tiers:', error);
    return [];
  }
}

export async function getCases(locale: string = 'en'): Promise<Case[]> {
  if (!isSanityConfigured || !client) {
    return [];
  }
  try {
    const cases = await client.fetch<Case[]>(casesQuery);

    // Process cases to handle localized content
    return cases.map((caseItem) => ({
      ...caseItem,
      title: getLocalizedString(caseItem.title, locale),
      description: getLocalizedString(caseItem.description, locale),
    }));
  } catch (error) {
    console.error('Error fetching cases:', error);
    return [];
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured || !client) {
    return [];
  }
  try {
    return await client.fetch<BlogPost[]>(blogPostsQuery);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured || !client) {
    return null;
  }
  try {
    return await client.fetch<BlogPost | null>(blogPostQuery, { slug });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getAbout(): Promise<About | null> {
  if (!isSanityConfigured || !client) {
    return null;
  }
  try {
    return await client.fetch<About>(aboutQuery);
  } catch (error) {
    console.error('Error fetching about:', error);
    return null;
  }
}

export async function getContact(): Promise<Contact | null> {
  if (!isSanityConfigured || !client) {
    return null;
  }
  try {
    return await client.fetch<Contact>(contactQuery);
  } catch (error) {
    console.error('Error fetching contact:', error);
    return null;
  }
}
