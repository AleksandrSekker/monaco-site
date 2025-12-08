// src/translations/services.ts
import { Locale } from '@/lib/i18n';

type ServiceItem = {
  title: string;
  description: string;
  cta: string;
};

type ServicesTranslations = {
  subtitle: string;
  title: string;
  description: string;
  services: ServiceItem[];
};

export const servicesTranslations: Record<Locale, ServicesTranslations> = {
  en: {
    subtitle: 'Services',
    title: 'Premium Banking and Investment Solutions',
    description:
      'We work with private clients and companies with capital from €100,000. All solutions are tailored to your jurisdiction, source of funds, and risk profile.',
    services: [
      {
        title: 'Premium bank accounts and cards in Monaco',
        description:
          'Turnkey solutions through banks in Monaco, Switzerland, and the EU, considering your tax residency and ownership structure.',
        cta: 'Discuss case',
      },
      {
        title: 'High-limit credit and debit cards (up to €1-5M)',
        description:
          'Turnkey solutions through banks in Monaco, Switzerland, and the EU, considering your tax residency and ownership structure.',
        cta: 'Discuss case',
      },
      {
        title: 'Asset-backed lending (real estate, portfolio, cryptocurrency)',
        description:
          'Turnkey solutions through banks in Monaco, Switzerland, and the EU, considering your tax residency and ownership structure.',
        cta: 'Discuss case',
      },
      {
        title: 'Cryptocurrency acceptance and conversion in traditional banks from €100,000',
        description:
          'Turnkey solutions through banks in Monaco, Switzerland, and the EU, considering your tax residency and ownership structure.',
        cta: 'Discuss case',
      },
      {
        title: 'Investment solutions and family offices',
        description:
          'Turnkey solutions through banks in Monaco, Switzerland, and the EU, considering your tax residency and ownership structure.',
        cta: 'Discuss case',
      },
      {
        title: 'Capital structuring and KYC/AML support',
        description:
          'Turnkey solutions through banks in Monaco, Switzerland, and the EU, considering your tax residency and ownership structure.',
        cta: 'Discuss case',
      },
    ],
  },
  fr: {
    subtitle: 'Services',
    title: "Solutions Bancaires et d'Investissement Premium",
    description:
      "Nous travaillons avec des clients privés et des entreprises disposant d'un capital à partir de 100 000 €. Toutes les solutions sont adaptées à votre juridiction, à l'origine des fonds et à votre profil de risque.",
    services: [
      {
        title: 'Comptes bancaires et cartes premium à Monaco',
        description:
          "Solutions clés en main via des banques à Monaco, en Suisse et dans l'UE, en tenant compte de votre résidence fiscale et de votre structure de propriété.",
        cta: 'Discuter du cas',
      },
      {
        title: "Cartes de crédit et de débit à limite élevée (jusqu'à 1-5 M€)",
        description:
          "Solutions clés en main via des banques à Monaco, en Suisse et dans l'UE, en tenant compte de votre résidence fiscale et de votre structure de propriété.",
        cta: 'Discuter du cas',
      },
      {
        title: 'Prêts garantis par des actifs (immobilier, portefeuille, cryptomonnaie)',
        description:
          "Solutions clés en main via des banques à Monaco, en Suisse et dans l'UE, en tenant compte de votre résidence fiscale et de votre structure de propriété.",
        cta: 'Discuter du cas',
      },
      {
        title: 'Acceptation et conversion de cryptomonnaie dans les banques traditionnelles à partir de 100 000 €',
        description:
          "Solutions clés en main via des banques à Monaco, en Suisse et dans l'UE, en tenant compte de votre résidence fiscale et de votre structure de propriété.",
        cta: 'Discuter du cas',
      },
      {
        title: "Solutions d'investissement et family offices",
        description:
          "Solutions clés en main via des banques à Monaco, en Suisse et dans l'UE, en tenant compte de votre résidence fiscale et de votre structure de propriété.",
        cta: 'Discuter du cas',
      },
      {
        title: 'Structuration de capital et accompagnement KYC/AML',
        description:
          "Solutions clés en main via des banques à Monaco, en Suisse et dans l'UE, en tenant compte de votre résidence fiscale et de votre structure de propriété.",
        cta: 'Discuter du cas',
      },
    ],
  },
  ru: {
    subtitle: 'Услуги',
    title: 'Премиальные банковские и инвестиционные решения',
    description:
      'Работаем с частными клиентами и компаниями с капиталом от 100 000 €. Все решения разрабатываются индивидуально под вашу юрисдикцию, источник средств и риск-профиль.',
    services: [
      {
        title: 'Премиальные банковские счета и карты в Монако',
        description:
          'Решения под ключ через банки Монако, Швейцарии и ЕС с учётом вашей налоговой резидентности и структуры владения.',
        cta: 'Обсудить кейс',
      },
      {
        title: 'Кредитные и дебетовые карты с высоким лимитом (до 1–5 млн €)',
        description:
          'Решения под ключ через банки Монако, Швейцарии и ЕС с учётом вашей налоговой резидентности и структуры владения.',
        cta: 'Обсудить кейс',
      },
      {
        title: 'Кредитование под залог активов (недвижимость, портфель, криптовалюта)',
        description:
          'Решения под ключ через банки Монако, Швейцарии и ЕС с учётом вашей налоговой резидентности и структуры владения.',
        cta: 'Обсудить кейс',
      },
      {
        title: 'Приём и конвертация криптовалюты в традиционные банки от 100 000 €',
        description:
          'Решения под ключ через банки Монако, Швейцарии и ЕС с учётом вашей налоговой резидентности и структуры владения.',
        cta: 'Обсудить кейс',
      },
      {
        title: 'Инвестиционные решения и семейные офисы',
        description:
          'Решения под ключ через банки Монако, Швейцарии и ЕС с учётом вашей налоговой резидентности и структуры владения.',
        cta: 'Обсудить кейс',
      },
      {
        title: 'Структурирование капитала и сопровождение KYC/AML',
        description:
          'Решения под ключ через банки Монако, Швейцарии и ЕС с учётом вашей налоговой резидентности и структуры владения.',
        cta: 'Обсудить кейс',
      },
    ],
  },
};
