import { client, isSanityConfigured } from './client';
import type { Hero, Service, PricingTier, Case, BlogPost, About, Contact, LocaleString, LocaleText } from './types';
import { StatItem } from './types';
export interface I18nString {
  _type: 'i18nString';
  en: string;
  ru?: string;
  fr?: string;
  [key: string]: string | undefined; // For any other languages
}
// Helper function to handle i18n strings
export function getLocalizedString(
  content:
    | string
    | LocaleString
    | LocaleText
    | I18nString
    | { en: string; [key: string]: string | undefined }
    | undefined,
  lang: string = 'en',
): string {
  if (!content) return '';
  if (typeof content === 'string') return content;

  // Handle both I18nString (with _type) and plain objects
  const localizedContent = content as { [key: string]: string | undefined };

  // Try the requested language, then English, then the first available language
  return localizedContent[lang] || localizedContent.en || Object.values(localizedContent)[0] || '';
}
import { heroQuery, servicesQuery, pricingQuery, casesQuery, aboutQuery, contactQuery } from './queries';

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

export async function getPricingTiers(): Promise<PricingTier[]> {
  if (!isSanityConfigured || !client) {
    console.warn('Sanity client is not configured');
    return [];
  }
  try {
    console.log('Fetching pricing tiers from Sanity...');
    const pricingTiers = await client.fetch<PricingTier[]>(pricingQuery);
    console.log('Raw pricing tiers from Sanity:', pricingTiers);

    if (!pricingTiers || !Array.isArray(pricingTiers)) {
      console.warn('No pricing tiers found or invalid data format');
      return [];
    }

    return pricingTiers.map((tier) => ({
      ...tier,
      features:
        tier.features?.map((feature) => ({
          ...feature,
          included: feature?.included ?? false,
        })) || [],
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
  if (!client) {
    console.error('Sanity client is not configured');
    return [];
  }

  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        "categories": categories[]->{
          title,
          description
        },
        "author": author->{
          name,
          "image": image.asset->url
        }
      }
    `);
    return posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!client) {
    console.error('Sanity client is not configured');
    return null;
  }

  try {
    console.log('Searching for post with slug:', slug); // Debug log

    const post = await client.fetch(
      `*[_type == "post" && (slug.current == $slug || slug.current == $slugWithDashes)][0]{
        ...,
        "categories": categories[]->{
          title,
          description
        },
        "author": author->{
          name,
          "image": image.asset->url
        }
      }`,
      {
        slug,
        slugWithDashes: slug.replace(/-/g, ' '), // Also try with spaces instead of dashes
      },
    );

    console.log('Found post:', post ? 'Yes' : 'No'); // Debug log
    return post || null;
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

export async function getStats() {
  const query = `*[_type == "stats"][0] {
    items[] {
      _key,
      title->{en, fr, ru},
      value,
      description->{en, fr, ru}
    }
  }`;

  const data = await client.fetch(query);
  return (data?.items || []) as StatItem[];
}
