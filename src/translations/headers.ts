// src/translations/headers.ts
import { Locale } from '@/lib/i18n';

type HeaderTranslations = {
  subtitle?: string;
  title: string;
  description?: string;
};

// Pricing Section
export const pricingHeaders: Record<Locale, HeaderTranslations> = {
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

// Services Section
export const servicesHeaders: Record<Locale, HeaderTranslations> = {
  en: {
    subtitle: 'Services',
    title: 'Comprehensive Financial Solutions',
    description: 'Tailored services to meet your financial needs in Monaco and beyond.',
  },
  fr: {
    subtitle: 'Services',
    title: 'Solutions Financières Complètes',
    description: 'Services sur mesure pour répondre à vos besoins financiers à Monaco et au-delà.',
  },
  ru: {
    subtitle: 'Услуги',
    title: 'Комплексные финансовые решения',
    description: 'Индивидуальные услуги для удовлетворения ваших финансовых потребностей в Монако и за его пределами.',
  },
};

// Cases Section
export const casesHeaders: Record<Locale, HeaderTranslations> = {
  en: {
    subtitle: 'Case Studies',
    title: 'Success Stories',
    description: "Discover how we've helped our clients achieve their financial goals.",
  },
  fr: {
    subtitle: 'Études de cas',
    title: 'Histoires de réussite',
    description: 'Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs financiers.',
  },
  ru: {
    subtitle: 'Кейсы',
    title: 'Истории успеха',
    description: 'Узнайте, как мы помогли нашим клиентам достичь их финансовых целей.',
  },
};

// About Section
export const aboutHeaders: Record<Locale, HeaderTranslations> = {
  en: {
    subtitle: 'About Us',
    title: 'Monaco Financial Solution – Votre Family Office à Monaco',
    description:
      'We create and support financial infrastructure for private clients and families with capital ranging from €100,000 to €50 million+. Our goal is to ensure that all banking, lending, and investment-related matters are handled through a single point of contact in Monaco.',
  },
  fr: {
    subtitle: 'À propos',
    title: 'Votre Partenaire de Confiance à Monaco',
    description: `Nous créons et gérons l'infrastructure financière des clients privés et des familles disposant d'un capital allant de 100 000 € à plus de 50 millions d'euros. Notre objectif est de centraliser toutes les opérations bancaires, de crédit et d'investissement auprès d'un interlocuteur unique à Monaco.`,
  },
  ru: {
    subtitle: 'О нас',
    title: 'Monaco Financial Solution — ваш семейный офис в Монако',
    description:
      'Мы создаём и сопровождаем финансовую инфраструктуру для частных клиентов и семей с капиталом от 100 000 € до 50+ млн €. Наша задача — чтобы все вопросы, связанные с банками, кредитами и инвестициями, решались через одно окно в Монако.',
  },
};

// Blog Section
export const blogHeaders: Record<Locale, HeaderTranslations> = {
  en: {
    subtitle: 'Insights',
    title: 'Latest News & Updates',
    description: 'Stay informed with our expert analysis and industry insights.',
  },
  fr: {
    subtitle: 'Actualités',
    title: 'Dernières Nouvelles',
    description: 'Restez informé avec notre analyse experte et nos informations sectorielles.',
  },
  ru: {
    subtitle: 'Блог',
    title: 'Последние новости и обновления',
    description: 'Будьте в курсе нашего экспертного анализа и отраслевых инсайтов.',
  },
};

// Contact Section
// Process Section
export const processHeaders: Record<Locale, HeaderTranslations> = {
  en: {
    subtitle: 'How it works',
    title: '5 steps to account, cards and credit line',
    description: 'Our streamlined process ensures a smooth and efficient experience from start to finish.',
  },
  fr: {
    subtitle: 'Comment ça marche',
    title: '5 étapes vers votre compte, cartes et ligne de crédit',
    description: 'Notre processus rationalisé garantit une expérience fluide et efficace du début à la fin.',
  },
  ru: {
    subtitle: 'Как это работает',
    title: '5 шагов к открытию счета, картам и кредитной линии',
    description: 'Наш отлаженный процесс обеспечивает бесперебойный и эффективный опыт от начала до конца.',
  },
};

// Contact Section
export const contactHeaders: Record<Locale, Omit<HeaderTranslations, 'subtitle'>> = {
  en: {
    title: 'Get in Touch',
    description: 'Our team is ready to assist you with your financial needs.',
  },
  fr: {
    title: 'Contactez-nous',
    description: 'Notre équipe est prête à vous aider dans vos besoins financiers.',
  },
  ru: {
    title: 'Свяжитесь с нами',
    description: 'Наша команда готова помочь вам с вашими финансовыми потребностями.',
  },
};

// Helper function to get any section's headers
export function getSectionHeaders<T extends HeaderTranslations | Omit<HeaderTranslations, 'subtitle'>>(
  section: Record<Locale, T>,
): Record<Locale, T> {
  return section;
}
