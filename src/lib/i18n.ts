type Locale = 'en' | 'fr' | 'ru';
type LocalizedContent = {
  en?: string;
  fr?: string;
  ru?: string;
};

export const defaultLocale: Locale = 'en';

export function getLocalizedText(
  content: LocalizedContent | string | undefined,
  locale: Locale = defaultLocale,
): string {
  if (!content) return '';

  // If content is a string, return it directly
  if (typeof content === 'string') return content;

  // Return the localized content if it exists, otherwise fall back to English or empty string
  return content[locale] || content[defaultLocale] || '';
}

export function getLocalizedArray(
  items: Array<{ _key: string; text: LocalizedContent }> | undefined,
  locale: Locale = defaultLocale,
): string[] {
  if (!items) return [];

  return items.map((item) => getLocalizedText(item.text, locale)).filter(Boolean) as string[];
}
