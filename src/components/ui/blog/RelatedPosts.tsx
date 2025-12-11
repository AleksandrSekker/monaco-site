// src/components/ui/blog/RelatedPosts.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getLocalizedText, Locale } from '@/lib/i18n';
import type { BlogPost } from '@/lib/sanity/types';

interface RelatedPostsProps {
  posts: BlogPost[];
  locale: Locale;
}

export default function RelatedPosts({ posts, locale }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  const getImageUrl = (image: BlogPost['mainImage'] | undefined) => {
    if (!image?.asset?._ref) return '';
    // If we have a direct URL, use it
    if (image.asset.url) return image.asset.url;
    // Otherwise, try to construct the URL from the reference
    const [fileId, dimensions, format] = image.asset._ref.split('-').slice(1);
    return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${
      process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
    }/${fileId}-${dimensions}.${format}`;
  };
  console.log('related post', posts);
  return (
    <div className="relative py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-full mb-4">
            {locale === 'fr' ? 'À lire ensuite' : locale === 'ru' ? 'Рекомендуем' : 'Read next'}
          </span>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            <span className="text-slate-900">
              {locale === 'fr' ? 'Articles similaires' : locale === 'ru' ? 'Похожие статьи' : 'Related Posts'}
            </span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            {locale === 'fr'
              ? 'Découvrez plus de contenu similaire'
              : locale === 'ru'
                ? 'Откройте для себя больше похожего контента'
                : 'Discover more similar content'}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = post.mainImage
              ? getImageUrl(post.mainImage)
              : 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80';

            return (
              <article
                key={post._id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Link href={`/${locale}/blog/${post.slug.current}`} className="flex-1 flex flex-col">
                  <div className="relative h-56 w-full overflow-hidden bg-gray-50">
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src={imageUrl}
                        alt={getLocalizedText(post.title, locale)}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                      />
                    </>

                    {/* Category Badge */}
                    {post.categories?.[0] && (
                      <span className="absolute top-4 right-4 z-20 px-3 py-1 text-xs font-medium text-red-700 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full shadow-sm">
                        {getLocalizedText(post.categories[0].title, locale)}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <time dateTime={post.publishedAt} className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1.5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {new Date(post.publishedAt).toLocaleDateString(locale, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>

                      <h3 className="text-xl font-semibold text-slate-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
                        {getLocalizedText(post.title, locale)}
                      </h3>

                      {post.excerpt && (
                        <p className="mt-2 text-gray-700 line-clamp-3 text-sm">
                          {getLocalizedText(post.excerpt, locale)}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <span className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200">
                        {locale === 'fr' ? 'Lire la suite' : locale === 'ru' ? 'Читать далее' : 'Read more'}
                        <svg
                          className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
