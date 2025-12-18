// src/translations/contact.ts
import { Locale } from '@/lib/i18n';

type ContactTranslations = {
  title: string;
  subtitle: string;
  description: string;
  contactMethods: {
    telegram: {
      label: string;
      button: string;
    };
    whatsapp: {
      label: string;
      button: string;
    };
    phone: {
      label: string;
      number: string;
    };
    email: {
      label: string;
      button: string;
    };
  };
  form: {
    title: string;
    subtitle: string;
  };
};

export const contactTranslations: Record<Locale, ContactTranslations> = {
  en: {
    title: 'Contact Us',
    subtitle: "Let's discuss your requirements confidentially",
    description:
      "Write to us on your preferred messenger or leave a request. We'll get back to you with initial feedback on your case within 24-48 hours.",
    contactMethods: {
      telegram: {
        label: 'Telegram',
        button: 'Message on Telegram',
      },
      whatsapp: {
        label: 'WhatsApp',
        button: 'Message on WhatsApp',
      },
      phone: {
        label: 'Phone',
        number: '+377 XXX XXX XXX',
      },
      email: {
        label: 'Email',
        button: 'monacofinancialsolution@gmail.com',
      },
    },
    form: {
      title: 'Consultation Request',
      subtitle: "Provide the minimum required information — we'll ask specific questions during the call.",
    },
  },
  fr: {
    title: 'Contact',
    subtitle: 'Discutons de votre demande en toute confidentialité',
    description:
      'Écrivez-nous sur votre messagerie préférée ou laissez une demande. Nous vous répondrons avec une première évaluation de votre cas sous 24 à 48 heures.',
    contactMethods: {
      telegram: {
        label: 'Télégramme',
        button: 'Écrire sur Télégramme',
      },
      whatsapp: {
        label: 'WhatsApp',
        button: 'Écrire sur WhatsApp',
      },
      phone: {
        label: 'Téléphone',
        number: '+377 XXX XXX XXX',
      },
      email: {
        label: 'E-mail',
        button: 'monacofinancialsolution@gmail.com',
      },
    },
    form: {
      title: 'Demande de consultation',
      subtitle:
        "Fournissez les informations minimales requises — nous poserons des questions spécifiques lors de l'appel.",
    },
  },
  ru: {
    title: 'Контакты',
    subtitle: 'Обсудим вашу задачу конфиденциально',
    description:
      'Напишите в удобный мессенджер или оставьте заявку. Мы вернёмся с первичным видением по вашему кейсу в течение 24–48 часов.',
    contactMethods: {
      telegram: {
        label: 'Telegram',
        button: 'Написать в Telegram',
      },
      whatsapp: {
        label: 'WhatsApp',
        button: 'Написать в WhatsApp',
      },
      phone: {
        label: 'Телефон',
        number: '+377 XXX XXX XXX',
      },
      email: {
        label: 'Электронная почта',
        button: 'monacofinancialsolution@gmail.com',
      },
    },
    form: {
      title: 'Заявка на консультацию',
      subtitle: 'Укажите минимально необходимую информацию — мы зададим точные вопросы уже на созвоне.',
    },
  },
};
