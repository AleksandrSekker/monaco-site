import { Locale } from '@/lib/i18n';

export const contactFormTranslations: Record<
  Locale,
  {
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    taskLabel: string;
    taskPlaceholder: string;
    submitButton: string;
    privacyText: string;
  }
> = {
  en: {
    nameLabel: 'Name / Company',
    namePlaceholder: 'e.g., John, Smith Family, Company Ltd.',
    contactLabel: 'Contact (Telegram / WhatsApp / Email)',
    contactPlaceholder: '@username / +XXX / email',
    taskLabel: 'Your Request',
    taskPlaceholder:
      'e.g., Need accounts and cards in Monaco / credit line against portfolio / crypto onboarding from 300k €',
    submitButton: 'Send Message',
    privacyText: 'By clicking the button, you agree to the processing of personal data and privacy policy.',
  },
  fr: {
    nameLabel: 'Nom / Société',
    namePlaceholder: 'Ex. : Jean, Famille Martin, Société SARL',
    contactLabel: 'Contact (Télégram / WhatsApp / E-mail)',
    contactPlaceholder: '@utilisateur / +XXX / email',
    taskLabel: 'Votre demande',
    taskPlaceholder:
      'Ex. : besoin de comptes et cartes à Monaco / ligne de crédit contre portefeuille / onboarding crypto à partir de 300k €',
    submitButton: 'Envoyer',
    privacyText:
      'En cliquant sur le bouton, vous acceptez le traitement des données personnelles et la politique de confidentialité.',
  },
  ru: {
    nameLabel: 'Имя / компания',
    namePlaceholder: 'Например: Иван, семья Б., компания В.',
    contactLabel: 'Контакт (Telegram / WhatsApp / e-mail)',
    contactPlaceholder: '@username / +XXX / email',
    taskLabel: 'Ваша задача',
    taskPlaceholder:
      'Например: нужен счёт и карты в Монако / кредитная линия под залог портфеля / крипто-ввод от 300k €',
    submitButton: 'Отправить',
    privacyText: 'Нажимая на кнопку, вы соглашаетесь с обработкой персональных данных и политикой конфиденциальности.',
  },
};
