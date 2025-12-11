// src/lib/i18n.ts
import { PortableTextBlock } from '@portabletext/types';

export type Locale = 'en' | 'fr' | 'ru';
export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'fr', 'ru'];

export const languageNames = {
  en: 'English',
  fr: 'Français',
  ru: 'Русский',
} as const;

export interface LocaleString {
  _type: 'localeString';
  en?: string;
  fr?: string;
  ru?: string;
  [key: string]: string | undefined;
}

export interface LocaleText {
  _type: 'localeText';
  en?: string;
  fr?: string;
  ru?: string;
  [key: string]: string | undefined;
}

export interface LocaleBlock {
  _type: 'localeBlock';
  en?: PortableTextBlock[];
  fr?: PortableTextBlock[];
  ru?: PortableTextBlock[];
  [key: string]: PortableTextBlock[] | string | undefined;
}

export function getLocalizedText(content: LocaleString | string | undefined, locale: Locale = defaultLocale): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  return content[locale] || content[defaultLocale] || '';
}

export function getLocalizedBlockContent(
  content: LocaleBlock | PortableTextBlock[] | null | undefined,
  locale: Locale = defaultLocale,
): PortableTextBlock[] {
  if (!content) return [];
  if (Array.isArray(content)) return content;
  if (content[locale]) return content[locale] || [];
  return content[defaultLocale] || [];
}
