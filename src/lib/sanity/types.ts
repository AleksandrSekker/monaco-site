// TypeScript типы для данных из Sanity

export interface Hero {
  tagline?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  guaranteeText: string;
  guaranteeSubtext: string;
  stats: string;
  desktopImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
      url: string;
    };
    alt?: string;
  };
  mobileImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
      url: string;
    };
    alt?: string;
  };
}

export interface Service {
  _id: string;
  order: number;
  title: LocaleString;
  description: LocaleText;
  longDescription: LocaleText;
  cta: LocaleString;
  slug: {
    current?: string;
  };
  features?: Array<{
    _key: string;
    title: LocaleString;
    description?: LocaleText;
  }>;
  icon?: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        lqip: string;
      };
    };
    alt?: string;
  };
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
  image?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url: string;
      metadata?: {
        lqip?: string;
      };
    };
    alt?: string;
  };
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
  longtext?: {
    _type: 'localeBlockContent';
    en?: import('@portabletext/types').PortableTextBlock[];
    fr?: import('@portabletext/types').PortableTextBlock[];
    ru?: import('@portabletext/types').PortableTextBlock[];
  };
  content: import('@portabletext/types').PortableTextBlock[];
  featuredImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    url: string;
    lqip: string;
    alt?: string;
  };
  publishedAt: string;
  order?: number;
  result?: string;
  details?: string;
  duration?: string;
  categories?: Array<
    | {
        _key?: string;
        _ref?: string;
        _type?: 'reference';
        title?: LocaleString | string;
        slug?: {
          _type: 'slug';
          current: string;
        };
      }
    | string
  >;
  externalLink?: string;
  technologies?: string[];
  client?: string;
  role?: string;
  teamSize?: string;
  challenges?: LocaleText | string;
  solution?: LocaleText | string;
  impact?: LocaleText | string;
  testimonials?: Array<{
    _key: string;
    author: string;
    role: string;
    content: LocaleText | string;
    avatar?: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
      url: string;
      lqip: string;
      alt?: string;
    };
  }>;
  gallery?: Array<{
    _key: string;
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    url: string;
    lqip: string;
    alt?: string;
    caption?: string;
  }>;
  relatedCases?: Array<{
    _key: string;
    _ref: string;
    _type: 'reference';
  }>;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
      url: string;
      alt?: string;
    };
  };
}

export interface BlogPost {
  _id: string;
  title: string | LocaleString;
  slug: {
    current: string;
  };
  description?: string;
  excerpt?: string | LocaleString;
  mainImage?: {
    asset?: {
      _ref?: string;
      url?: string;
    };
  };
  content?: import('@portabletext/types').PortableTextBlock[];
  body?: import('@portabletext/types').PortableTextBlock[];
  publishedAt: string;
  author?: {
    name: string;
    image?: string;
  };
  categories?: Array<{
    title: string | LocaleString;
    description?: string | LocaleString;
  }>;
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
export interface StatItem {
  _key: string;
  title: LocaleString;
  value: string;
  description: LocaleText;
}

export interface Stats {
  _id: string;
  _type: 'stats';
  title: LocaleString;
  value: LocaleString;
  description: LocaleText;
  image?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url: string;
      metadata?: {
        lqip?: string;
      };
    };
    alt?: string;
  };
}
