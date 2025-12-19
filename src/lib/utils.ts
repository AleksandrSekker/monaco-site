import type { LocaleString, LocaleText } from './sanity/types';

type LocalizedContent = LocaleString | LocaleText | string;

export function getLocalizedString(content: LocalizedContent, locale: string = 'en'): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if ('_type' in content && (content._type === 'localeString' || content._type === 'localeText')) {
    return content[locale] || content.en || '';
  }
  return '';
}

// Utility function to merge class names
export function cn(...classes: (string | undefined | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}
