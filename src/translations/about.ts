import { Locale } from '@/lib/i18n';

export const pageDescriptions: Record<Locale, { paragraph1: string; paragraph2: string }> = {
  en: {
    paragraph1:
      'We work in close partnership with banks, management companies, legal and tax advisors in Monaco and beyond. This allows us to quickly assemble teams for specific cases while maintaining a single point of contact for the client.',
    paragraph2:
      'The working format is strictly confidential. After the initial consultation and basic KYC, we prepare an individual map of opportunities and risks, and then structure the project according to your goals and constraints.',
  },
  fr: {
    paragraph1:
      'Nous travaillons en étroite collaboration avec des banques, des sociétés de gestion, des conseillers juridiques et fiscaux à Monaco et au-delà. Cela nous permet de constituer rapidement des équipes pour des cas spécifiques tout en maintenant un point de contact unique pour le client.',
    paragraph2:
      "Le format de travail est strictement confidentiel. Après la consultation initiale et la vérification d'identité de base (KYC), nous préparons une carte individuelle des opportunités et des risques, puis structurons le projet en fonction de vos objectifs et contraintes.",
  },
  ru: {
    paragraph1:
      'Мы работаем в тесном партнёрстве с банками, управляющими компаниями, юридическими и налоговыми советниками в Монако и за его пределами. Это позволяет быстро собирать команды под конкретный кейс и сохранять при этом единое окно коммуникации для клиента.',
    paragraph2:
      'Формат работы — строго конфиденциальный. После первичной консультации и базового KYC мы готовим индивидуальную карту возможностей и рисков, а затем структурируем проект под ваши цели и ограничения.',
  },
};
