import { MetadataRoute } from 'next';

const baseUrl = 'https://monacofinancialsolution.com';
const locales = ['en', 'fr', 'ru'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['', '/about', '/services', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  const localizedRoutes = locales.flatMap((locale) =>
    ['', '/about', '/services', '/contact'].map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  );

  return [...routes, ...localizedRoutes];
}
