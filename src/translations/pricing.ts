import { Locale } from '@/lib/i18n';

type PricingTranslations = {
  cryptoOnboarding: string;
  contactUs: string;
  customTerms: string;
  customTermsDescription: string;
  getAQuote: string;
};

export const pricingTranslations: Record<Locale, PricingTranslations> = {
  en: {
    cryptoOnboarding: 'Crypto onboarding from 100k €',
    contactUs: 'Contact us',
    customTerms: 'Custom terms for complex cases',
    customTermsDescription:
      'Choose the package that fits your needs. All packages include dedicated account management and personalized service.',
    getAQuote: 'Get a quote',
  },
  ru: {
    cryptoOnboarding: 'Крипто-ввод от 100k €',
    contactUs: 'Связаться с нами',
    customTerms: 'Индивидуальные условия для сложных кейсов',
    customTermsDescription:
      'Выберите пакет, соответствующий вашим потребностям. Все пакеты включают персонального менеджера и индивидуальный сервис.',
    getAQuote: 'Получить предложение',
  },
  fr: {
    cryptoOnboarding: 'Onboarding crypto à partir de 100k €',
    contactUs: 'Contactez-nous',
    customTerms: 'Conditions personnalisées pour les cas complexes',
    customTermsDescription:
      'Choisissez le forfait qui correspond à vos besoins. Tous les forfaits incluent une gestion de compte dédiée et un service personnalisé.',
    getAQuote: 'Obtenir un devis',
  },
};

// Helper function to get pricing translations
export function getPricingTranslations(locale: Locale): PricingTranslations {
  return pricingTranslations[locale] || pricingTranslations.en;
}
