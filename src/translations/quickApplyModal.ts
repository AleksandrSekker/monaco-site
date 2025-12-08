// src/translations/quickApplyModal.ts
import { Locale } from '@/lib/i18n';

export const quickApplyTranslations: Record<
  Locale,
  {
    defaultButtonLabel: string;
    modalTitle: string;
    modalDescription: string;
    closeButton: string;
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
    defaultButtonLabel: 'Quick Apply',
    modalTitle: 'Quick Application',
    modalDescription: "Leave your contacts — we'll get back to you with an offer within 24-48 hours.",
    closeButton: '✕',
    nameLabel: 'Name / Company',
    namePlaceholder: 'e.g., John, Smith Family, Company Ltd.',
    contactLabel: 'Contact (Telegram / WhatsApp / Phone)',
    contactPlaceholder: '@username / +XXX / email',
    taskLabel: 'Briefly describe your request',
    taskPlaceholder: 'e.g., Need accounts and cards in Monaco / credit line / crypto onboarding from 300k €',
    submitButton: 'Submit Application',
    privacyText: 'By clicking the button, you agree to the processing of personal data and privacy policy.',
  },
  fr: {
    defaultButtonLabel: 'Application Rapide',
    modalTitle: 'Demande Rapide',
    modalDescription: 'Laissez vos coordonnées — nous vous recontacterons avec une offre sous 24-48 heures.',
    closeButton: '✕',
    nameLabel: 'Nom / Société',
    namePlaceholder: 'Ex. : Jean, Famille Martin, Société SARL',
    contactLabel: 'Contact (Télégram / WhatsApp / Téléphone)',
    contactPlaceholder: '@utilisateur / +XXX / email',
    taskLabel: 'Décrivez brièvement votre demande',
    taskPlaceholder:
      'Ex. : besoin de comptes et cartes à Monaco / ligne de crédit / onboarding crypto à partir de 300k €',
    submitButton: 'Envoyer la demande',
    privacyText:
      'En cliquant sur le bouton, vous acceptez le traitement des données personnelles et la politique de confidentialité.',
  },
  ru: {
    defaultButtonLabel: 'Быстрая заявка',
    modalTitle: 'Быстрая заявка',
    modalDescription: 'Оставьте контакты — вернёмся с предложением в течение 24–48 часов.',
    closeButton: '✕',
    nameLabel: 'Имя / компания',
    namePlaceholder: 'Например: Иван, семья Б., компания В.',
    contactLabel: 'Контакт (Telegram / WhatsApp / телефон)',
    contactPlaceholder: '@username / +XXX / email',
    taskLabel: 'Кратко опишите вашу задачу',
    taskPlaceholder: 'Например: нужен счёт и карты в Монако / кредитная линия / крипто-ввод от 300k €',
    submitButton: 'Отправить заявку',
    privacyText: 'Нажимая на кнопку, вы соглашаетесь с обработкой персональных данных и политикой конфиденциальности.',
  },
};
