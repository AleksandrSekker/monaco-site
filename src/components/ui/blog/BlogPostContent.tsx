// src/components/ui/blog/BlogPostContent.tsx
'use client';

import Image from 'next/image';
import { getLocalizedText, getLocalizedBlockContent, Locale } from '@/lib/i18n';
import type { BlogPost } from '@/lib/sanity/types';
import { PortableText, PortableTextComponents } from '@portabletext/react';
// Remove unused import

const components: PortableTextComponents = {
  // Let prose handle basic typography
  block: {
    // Keep only structural components without custom typography
    blockquote: ({ children }) => (
      <blockquote className="not-italic bg-gray-50 border-l-4 border-blue-400 pl-6 py-2 my-6 rounded-r-lg">
        <div className="text-blue-500 text-4xl font-serif absolute -left-1 -top-2">&quot;</div>
        <div className="pl-4">{children}</div>
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline underline-offset-4 decoration-2"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({
      value,
    }: {
      value: {
        asset?: {
          _ref?: string;
          url?: string;
          metadata?: {
            dimensions?: {
              width?: number;
              height?: number;
            };
          };
        };
        alt?: string;
        caption?: string;
      };
    }) => {
      // Don't render the image if there's no asset
      if (!value?.asset) {
        console.warn('Image asset is missing', value);
        return null;
      }

      // Build the image URL based on the asset type
      let imageUrl = '';
      if (value.asset.url) {
        // Direct URL available
        imageUrl = value.asset.url;
      } else if (value.asset._ref) {
        // Handle Sanity image reference
        // Format: image-{id}-{width}x{height}-{format}
        const ref = value.asset._ref;
        const [fileId, dimensions, format] = ref.split('-').slice(1);
        imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${fileId}-${dimensions}.${format}`;
      } else {
        console.warn('Image URL is missing', value);
        return null;
      }

      const width = value.asset.metadata?.dimensions?.width || 800;
      const height = value.asset.metadata?.dimensions?.height || 500;

      return (
        <div className="my-8 group relative">
          <div className="rounded-xl overflow-hidden shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
            <Image
              src={imageUrl}
              alt={value.alt || 'Blog post image'}
              width={width}
              height={height}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority={false}
            />
          </div>
          {value.caption && <figcaption className="mt-3 text-sm text-center text-gray-500">{value.caption}</figcaption>}
        </div>
      );
    },
  },
};

interface BlogPostContentProps {
  post: BlogPost;
  locale: Locale;
}

export default function BlogPostContent({ post, locale }: BlogPostContentProps) {
  const content = post.body ? getLocalizedBlockContent(post.body, locale) : null;

  if (!content || !Array.isArray(content) || content.length === 0) {
    return <div className="text-gray-800">No content available.</div>;
  }
  console.log('Blog post content:', content);
  return (
    <article className="custom-prose max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <header className="mb-12 text-center">
        {post.categories && post.categories?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-red-800 bg-red-50 border border-red-100 rounded-full hover:bg-red-100 transition-colors duration-200"
              >
                {getLocalizedText(category.title, locale)}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
          <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-red-600">
            {getLocalizedText(post.title, locale)}
          </span>
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 mb-12">
          {post.author?.name && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium">{post.author.name}</span>
            </div>
          )}

          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={post.publishedAt} className="font-medium">
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>

        {post.mainImage?.asset?.url && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 mb-12 transform hover:scale-[1.01] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-100/30 z-10 rounded-2xl"></div>
            <Image
              src={post.mainImage.asset.url}
              alt={getLocalizedText(post.title, locale)}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
        )}
      </header>

      <div
        className="
        prose prose-lg max-w-3xl mx-auto 
        prose-headings:font-semibold 
        prose-headings:bg-gradient-to-r 
        prose-headings:from-red-600 
        prose-headings:to-red-800 
        prose-headings:bg-clip-text 
        prose-headings:text-transparent
        [&>h1]:text-4xl
        [&>h1]:mb-6
        [&>h2]:text-3xl
        [&>h2]:mt-12
        [&>h2]:mb-6
        [&>h3]:text-2xl
        [&>h3]:mt-10
        [&>h3]:mb-4
        [&>h3]:text-gray-800
        [&>p]:text-gray-800
        [&>p]:leading-relaxed
        [&>p]:mb-6
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4
        [&_li]:text-gray-800 [&_li]:mb-2 [&_li]:leading-relaxed
        prose-strong:text-gray-900
        prose-li:text-gray-900
        prose-a:text-red-600 
        hover:prose-a:text-red-700 
        prose-img:rounded-xl 
        prose-img:border 
        prose-img:border-gray-200 
        prose-blockquote:not-italic 
        prose-blockquote:bg-gray-50 
        prose-blockquote:border-l-red-400
        prose-blockquote:border-l-4
        prose-blockquote:text-gray-800"
      >
        <PortableText
          value={content}
          components={components}
          onMissingComponent={(message, options) => {
            console.warn('PortableText missing component:', message, options);
            return <div style={{ color: 'red' }}>Missing component: {message}</div>;
          }}
        />
      </div>
    </article>
  );
}
