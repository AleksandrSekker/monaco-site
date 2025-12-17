// src/sanity/types.ts
import type { PortableTextBlock } from '@portabletext/types';

interface LocaleString {
  _type: 'localeString';
  en: string;
  ru?: string;
  fr?: string;
  [key: string]: string | undefined;
}

interface LocaleText {
  _type: 'localeText';
  en: string;
  ru?: string;
  fr?: string;
  [key: string]: string | undefined;
}

interface Case {
  _id: string;
  _type: 'case';
  title: LocaleString | string;
  slug: {
    _type: 'slug';
    current: string;
  };
  description: LocaleText | string;
  content?: PortableTextBlock[]; // PortableText content
  featuredImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  publishedAt: string;
  order?: number;
  result?: string;
  details?: string;
  duration?: string;
}

interface PricingTier {
  _id: string;
  _type: 'pricing';
  tier: 'essential' | 'premium' | 'familyOffice' | 'crypto';
  title: LocaleString;
  description: LocaleText;
  investmentRange: {
    min: number;
    max?: number;
  };
  feeRange: {
    min: number;
    max?: number;
  };
  isCustomFee: boolean;
  features: Array<{
    text: LocaleString;
    included: boolean;
  }>;
  isPopular: boolean;
}
interface Image {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

interface CardCase {
  client?: string;
  description?: string;
  time?: string;
  timeColor?: string;
}

interface Card {
  title?: string;
  badge?: string;
  cases?: CardCase[];
  disclaimer?: string;
}

interface Hero {
  title?: string;
  highlightedTitle?: string;
  description?: string;
  tagline?: string;
  ctaText?: string;
  ctaLink?: string;
  guaranteeText?: string;
  guaranteeSubtext?: string;
  stats?: string;
  desktopImage?: Image;
  mobileImage?: Image;
  card?: Card;
}
// Export all types
export type { Case, LocaleString, LocaleText, PricingTier, Image, CardCase, Card, Hero };
