import { Locale } from '@/lib/i18n';

type HeaderTranslations = {
  nav: {
    services: string;
    pricing: string;
    cases: string;
    about: string;
    blog: string;
    telegram: string;
    whatsapp: string;
  };
};

export const headerTranslations: Record<Locale, HeaderTranslations> = {
  en: {
    nav: {
      services: 'Services',
      pricing: 'Pricing',
      cases: 'Cases',
      about: 'About Us',
      blog: 'Blog',
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
    },
  },
  fr: {
    nav: {
      services: 'Services',
      pricing: 'Tarifs',
      cases: 'Cas',
      about: 'À propos',
      blog: 'Blog',
      telegram: 'Télégramme',
      whatsapp: 'WhatsApp',
    },
  },
  ru: {
    nav: {
      services: 'Услуги',
      pricing: 'Тарифы',
      cases: 'Кейсы',
      about: 'О компании',
      blog: 'Блог',
      telegram: 'Телеграм',
      whatsapp: 'Ватсап',
    },
  },
};
