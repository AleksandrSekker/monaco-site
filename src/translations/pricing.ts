// src/translations/pricing.ts
import { Locale } from '@/lib/i18n';

type PricingHeaderTranslations = {
  subtitle: string;
  title: string;
  description: string;
};

export const pricingHeaderTranslations: Record<Locale, PricingHeaderTranslations> = {
  en: {
    subtitle: 'Pricing',
    title: 'Transparent packages, flexible terms',
    description:
      'The fee is fixed in advance and depends on the volume of capital and complexity of the structure. Partial success-fee model is possible.',
  },
  fr: {
    subtitle: 'Tarifs',
    title: 'Forfaits transparents, conditions flexibles',
    description:
      "Les honoraires sont fixés à l'avance et dépendent du volume de capital et de la complexité de la structure. Modèle success-fee partiel possible.",
  },
  ru: {
    subtitle: 'Тарифы',
    title: 'Прозрачные пакеты, гибкие условия',
    description:
      'Гонорар фиксируется заранее и зависит от объёма капитала и сложности структуры. Возможна частичная success-fee модель.',
  },
};
