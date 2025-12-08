import { Locale } from '@/lib/i18n';

type ProcessStep = {
  title: string;
  description: string;
};

type ProcessTranslations = {
  subtitle: string;
  title: string;
  steps: ProcessStep[];
};

export const processTranslations: Record<Locale, ProcessTranslations> = {
  en: {
    subtitle: 'How it works',
    title: '5 steps to account, cards and credit line',
    steps: [
      { title: 'Step 1', description: 'You submit an application' },
      { title: 'Step 2', description: 'We review your case (24-48 hours)' },
      { title: 'Step 3', description: 'We offer 2-3 best solutions' },
      { title: 'Step 4', description: 'We sign the contract and start working' },
      { title: 'Step 5', description: 'You get an account, cards, credit - all turnkey' },
    ],
  },
  fr: {
    subtitle: 'Comment ça marche',
    title: '5 étapes vers un compte, des cartes et une ligne de crédit',
    steps: [
      { title: 'Étape 1', description: 'Vous soumettez une demande' },
      { title: 'Étape 2', description: 'Nous étudions votre dossier (24-48 heures)' },
      { title: 'Étape 3', description: 'Nous proposons 2-3 meilleures solutions' },
      { title: 'Étape 4', description: 'Nous signons le contrat et commençons à travailler' },
      { title: 'Étape 5', description: 'Vous obtenez un compte, des cartes, un crédit - tout clé en main' },
    ],
  },
  ru: {
    subtitle: 'Как это работает',
    title: '5 шагов до счёта, карт и кредитной линии',
    steps: [
      { title: 'Шаг 1', description: 'Вы оставляете заявку' },
      { title: 'Шаг 2', description: 'Мы изучаем ваш кейс (24–48 ч)' },
      { title: 'Шаг 3', description: 'Предлагаем 2–3 лучших решения' },
      { title: 'Шаг 4', description: 'Подписываем договор и начинаем работу' },
      { title: 'Шаг 5', description: 'Вы получаете счёт, карты, кредит — всё под ключ' },
    ],
  },
};
