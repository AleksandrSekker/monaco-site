// src/components/blog/BlogPostCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPost, LocaleString, LocaleText } from '@/lib/sanity/types';

type LocalizedContent = LocaleString | LocaleText | string;

// Helper function to handle i18n strings

export default function BlogPostCard({ post }: { post: BlogPost }) {
  const { locale } = useLanguage();

  function getLocalizedString(content: LocalizedContent, locale: string = 'en'): string {
    if (!content) return '';
    if (typeof content === 'string') return content;
    if ('_type' in content && (content._type === 'localeString' || content._type === 'localeText')) {
      return content[locale] || content.en || '';
    }
    return '';
  }

  const imageUrl =
    post.mainImage?.asset?.url ||
    'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80';

  return (
    <article
      key={post._id}
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:opacity-90 transition-opacity"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageUrl}
          alt={getLocalizedString(post.title, locale)}
          className="h-full w-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <div className="flex flex-wrap gap-2 mb-2">
        {post.categories?.map((category, i) => (
          <span
            key={i}
            className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10"
          >
            {getLocalizedString(category.title, locale)}
          </span>
        ))}
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <Link href={`/blog/${post.slug.current}`} className="text-sm font-semibold leading-6 text-white-600">
          <span className="absolute inset-0" />
          {getLocalizedString(post.title, locale)}
        </Link>
      </h3>

      {post.excerpt && (
        <p className="mt-5 text-sm leading-6 text-grey-300 line-clamp-2">{getLocalizedString(post.excerpt, locale)}</p>
      )}

      <div className="mt-6 flex items-center gap-x-4">
        {post.author?.image && (
          <div className="relative h-10 w-10">
            <Image
              src={post.author.image}
              alt={post.author.name || 'Author'}
              className="rounded-full bg-gray-800"
              fill
              sizes="40px"
            />
          </div>
        )}
        <div className="text-sm">
          <p className="font-semibold text-white">{post.author?.name || 'Анонимный автор'}</p>
          <time dateTime={post.publishedAt} className="text-gray-300">
            {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>
    </article>
  );
}
