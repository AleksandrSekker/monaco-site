import { getBlogPosts } from '../../lib/sanity/utils';
import type { BlogPost, LocaleString } from '../../lib/sanity/types';
import Image from 'next/image';
import Link from 'next/link';

type I18nString = {
  _type: 'i18nString';
  en: string;
  fr?: string;
  ru?: string;
  [key: string]: string | undefined; // For any other potential languages
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Helper function to get the current language string
  const getLocalizedString = (content: I18nString | LocaleString | string, lang: string = 'en'): string => {
    if (typeof content === 'string') return content;
    return content[lang] || content.en || '';
  };

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Блог</h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Аналитика и экспертные материалы о частном банковском обслуживании, инвестициях и управлении капиталом.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post: BlogPost) => {
          const imageUrl =
            post.mainImage ||
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80';

          return (
            <article
              key={post._id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:opacity-90 transition-opacity"
            >
              <div className="absolute inset-0 -z-10">
                <Image
                  src={imageUrl}
                  alt={getLocalizedString(post.title)}
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
                    {getLocalizedString(category.title)}
                  </span>
                ))}
              </div>

              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <Link href={`/blog/${post.slug.current}`} className="text-sm font-semibold leading-6 text-white-600">
                  <span className="absolute inset-0" />
                  {getLocalizedString(post.title)}
                </Link>
              </h3>

              {post.excerpt && (
                <p className="mt-5 text-sm leading-6 text-grey-300 line-clamp-2">{getLocalizedString(post.excerpt)}</p>
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
        })}
      </div>
    </div>
  );
}
