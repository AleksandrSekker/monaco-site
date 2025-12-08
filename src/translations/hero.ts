import { Locale } from '@/lib/i18n';

type HeroTranslations = {
  tagline: string;
  title: string;
  highlightedTitle: string;
  description: string;
  cta: string;
  guarantee: {
    text: string;
    subtext: string;
  };
  stats: string;
  card: {
    title: string;
    badge: string;
    cases: Array<{
      client: string;
      description: string;
      time: string;
      timeColor: string;
    }>;
    disclaimer: string;
  };
};

export const heroTranslations: Record<Locale, HeroTranslations> = {
  en: {
    tagline: 'Turnkey Family Office',
    title: 'One stop for all your ',
    highlightedTitle: 'financial needs in Monaco',
    description:
      'Bank accounts and cards · Credit lines · Investments · Crypto acceptance and conversion from €100,000 — all turnkey, confidential, and in a family office format.',
    cta: 'Discuss my case',
    guarantee: {
      text: '100% result in 90 days',
      subtext: 'or full fee refund as per contract',
    },
    stats: '10+ years in private banking · 400+ accounts opened · Tailored solutions for HNWI and companies',
    card: {
      title: 'Private Banking Monaco',
      badge: 'HNWI / UHNWI',
      cases: [
        {
          client: 'Client A.',
          description: '1.2M $ in USDT → Monaco account + Infinite card',
          time: '28 days',
          timeColor: 'emerald-600',
        },
        {
          client: 'Family B.',
          description: '€4M loan secured by Dubai real estate',
          time: '45 days',
          timeColor: 'amber-600',
        },
        {
          client: 'Company C.',
          description: 'Account + crypto acceptance in a European bank',
          time: 'crypto onboarding',
          timeColor: 'sky-600',
        },
      ],
      disclaimer: 'Confidential anonymous cases. Details and personalized solutions after KYC consultation.',
    },
  },
  fr: {
    tagline: 'Family Office clé en main',
    title: "Une seule porte d'entrée pour tous vos ",
    highlightedTitle: 'besoins financiers à Monaco',
    description:
      'Comptes bancaires et cartes · Lignes de crédit · Investissements · Acceptation et conversion de crypto-monnaie à partir de 100 000 € — tout en clé en main, confidentiel et au format family office.',
    cta: 'Discutons de mon cas',
    guarantee: {
      text: '100% de résultat en 90 jours',
      subtext: 'ou remboursement intégral des honoraires selon contrat',
    },
    stats:
      'Plus de 10 ans en banque privée · Plus de 400 comptes ouverts · Solutions sur mesure pour HNWI et entreprises',
    card: {
      title: 'Private Banking Monaco',
      badge: 'HNWI / UHNWI',
      cases: [
        {
          client: 'Client A.',
          description: '1,2 M$ en USDT → Compte à Monaco + carte Infinite',
          time: '28 jours',
          timeColor: 'emerald-600',
        },
        {
          client: 'Famille B.',
          description: 'Prêt de 4 M€ garanti par un bien immobilier à Dubaï',
          time: '45 jours',
          timeColor: 'amber-600',
        },
        {
          client: 'Société C.',
          description: 'Compte + acceptation de crypto dans une banque européenne',
          time: 'onboarding crypto',
          timeColor: 'sky-600',
        },
      ],
      disclaimer: 'Cas anonymes et confidentiels. Détails et solutions personnalisées après consultation KYC.',
    },
  },
  ru: {
    tagline: 'Family Office под ключ',
    title: 'Одно окно для всех ваших ',
    highlightedTitle: 'финансовых задач в Монако',
    description:
      'Банковские счета и карты · Кредитные линии · Инвестиции · Приём и конвертация криптовалюты от 100 000 € — всё под ключ, конфиденциально и в формате семейного офиса.',
    cta: 'Обсудить мою задачу',
    guarantee: {
      text: '100% результат за 90 дней',
      subtext: 'или полный возврат гонорара по договору',
    },
    stats: '10+ лет в private banking · Более 400 открытых счетов · Индивидуальные решения для HNWI и компаний',
    card: {
      title: 'Private Banking Monaco',
      badge: 'HNWI / UHNWI',
      cases: [
        {
          client: 'Клиент А.',
          description: '1,2 млн $ в USDT → счёт в Монако + карта Infinite',
          time: '28 дней',
          timeColor: 'emerald-600',
        },
        {
          client: 'Семья Б.',
          description: 'Кредит 4 млн € под залог недвижимости в Дубае',
          time: '45 дней',
          timeColor: 'amber-600',
        },
        {
          client: 'Компания В.',
          description: 'Счёт + приём криптовалюты в европейском банке',
          time: 'crypto onboarding',
          timeColor: 'sky-600',
        },
      ],
      disclaimer: 'Конфиденциальные анонимные кейсы. Подробности и персональное решение после KYC-консультации.',
    },
  },
};
