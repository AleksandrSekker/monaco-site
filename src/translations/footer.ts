// src/translations/footer.ts
import { Locale } from '@/lib/i18n';

export const footerTranslations: Record<
  Locale,
  {
    companyName: string;
    description: string;
    readyToDiscuss: string;
    leaveRequest: string;
    requestPopupText: string;
    officeLocation: string;
    languageSelector: string;
    copyright: (year: number) => string;
  }
> = {
  en: {
    companyName: 'Monaco Financial Solution',
    description:
      'Turnkey family office in Monaco: bank accounts, credit lines, investments, and cryptocurrency acceptance for private clients and companies.',
    readyToDiscuss: 'Ready to discuss your needs',
    leaveRequest: 'Leave a request',
    requestPopupText: 'Submit your request with one click — the form will open in a popup.',
    officeLocation: 'Office: Monaco',
    languageSelector: 'FR / EN / RU',
    copyright: (year) => `© ${year} Monaco Financial Solution`,
  },
  fr: {
    companyName: 'Monaco Financial Solution',
    description:
      'Bureau de famille clé en main à Monaco : comptes bancaires, lignes de crédit, investissements et acceptation des cryptomonnaies pour les clients privés et les entreprises.',
    readyToDiscuss: 'Prêt à discuter de vos besoins',
    leaveRequest: 'Laisser une demande',
    requestPopupText: "Soumettez votre demande en un clic — le formulaire s'ouvrira dans une fenêtre contextuelle.",
    officeLocation: 'Bureau : Monaco',
    languageSelector: 'FR / EN / RU',
    copyright: (year) => `© ${year} Monaco Financial Solution`,
  },
  ru: {
    companyName: 'Monaco Financial Solution',
    description:
      'Семейный офис под ключ в Монако: банковские счета, кредитные линии, инвестиции и приём криптовалюты для частных клиентов и компаний.',
    readyToDiscuss: 'Готовы обсудить задачу',
    leaveRequest: 'Оставить заявку',
    requestPopupText: 'Оставьте заявку в один клик — форма откроется во всплывающем окне.',
    officeLocation: 'Офис: Монако',
    languageSelector: 'FR / EN / RU',
    copyright: (year) => `© ${year} Monaco Financial Solution`,
  },
};
