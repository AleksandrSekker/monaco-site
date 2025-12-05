// TypeScript типы для данных из Sanity

export interface Hero {
  title: string;
  subtitle: string;
  ctaText: string;
  guaranteeText: string;
  guaranteeSubtext: string;
  stats: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  order: number;
}

export interface PricingTier {
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

export interface LocalizedPricingTier extends Omit<PricingTier, 'title' | 'description' | 'features'> {
  title: string;
  description: string;
  features: Array<{
    text: string;
    included: boolean;
  }>;
}

export interface LocaleString {
  _type: 'localeString';
  en: string;
  ru?: string;
  fr?: string;
  [key: string]: string | undefined;
}

export interface LocaleText {
  _type: 'localeText';
  en: string;
  ru?: string;
  fr?: string;
  [key: string]: string | undefined;
}

export interface Case {
  _id: string;
  _type: 'case';
  title: LocaleString | string;
  slug: {
    _type: 'slug';
    current: string;
  };
  description: LocaleText | string;
  content: import('@portabletext/types').PortableTextBlock[];
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
  // Legacy fields for backward compatibility
  result?: string;
  details?: string;
  duration?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  content?: import('@portabletext/types').PortableTextBlock[];
  publishedAt: string;
  image?: string;
}

export interface About {
  title: string;
  description: string;
  stats: Array<{
    label: string;
    value: string;
    subtext: string;
  }>;
  content: string;
}

export interface Contact {
  telegram: string;
  whatsapp: string;
  phone: string;
  email: string;
}
