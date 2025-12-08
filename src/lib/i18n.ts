// src/lib/i18n.ts
export type Locale = 'en' | 'fr' | 'ru';
export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'fr', 'ru'];

export const languageNames = {
  en: 'English',
  fr: 'Français',
  ru: 'Русский',
} as const;

export type LocalizedContent = {
  [key in Locale]?: string;
};

export function getLocalizedText(
  content: LocalizedContent | string | undefined,
  locale: Locale = defaultLocale,
): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  return content[locale] || content[defaultLocale] || '';
}
