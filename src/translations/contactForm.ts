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
    taskAboutService: string;
    sendingButton: string;
    successMessage: string;
    errorMessage: string;
  }
> = {
  en: {
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    contactLabel: 'Contact',
    contactPlaceholder: 'Email or phone',
    taskLabel: 'Your task',
    taskPlaceholder: 'How can we help you?',
    taskAboutService: 'I am interested in: ',
    submitButton: 'Send Request',
    sendingButton: 'Sending...',
    successMessage: 'Thank you! Your message has been sent. We will contact you soon.',
    errorMessage: 'An error occurred. Please try again later.',
    privacyText: 'By submitting this form, you agree to our Privacy Policy',
  },
  fr: {
    nameLabel: 'Nom',
    namePlaceholder: 'Votre nom',
    contactLabel: 'Contact',
    contactPlaceholder: 'Email ou téléphone',
    taskLabel: 'Votre demande',
    taskPlaceholder: 'Comment pouvons-nous vous aider?',
    taskAboutService: 'Je suis intéressé par : ',
    submitButton: 'Envoyer la demande',
    sendingButton: 'Envoi en cours...',
    successMessage: 'Merci! Votre message a été envoyé. Nous vous contacterons bientôt.',
    errorMessage: 'Une erreur est survenue. Veuillez réessayer plus tard.',
    privacyText: 'En soumettant ce formulaire, vous acceptez notre Politique de confidentialité',
  },
  ru: {
    nameLabel: 'Имя',
    namePlaceholder: 'Ваше имя',
    contactLabel: 'Контакт',
    contactPlaceholder: 'Email или телефон',
    taskLabel: 'Ваш запрос',
    taskPlaceholder: 'Как мы можем вам помочь?',
    taskAboutService: 'Меня интересует: ',
    submitButton: 'Отправить заявку',
    sendingButton: 'Отправка...',
    successMessage: 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.',
    errorMessage: 'Произошла ошибка. Пожалуйста, попробуйте позже.',
    privacyText: 'Отправляя эту форму, вы соглашаетесь с нашей Политикой конфиденциальности',
  },
};
