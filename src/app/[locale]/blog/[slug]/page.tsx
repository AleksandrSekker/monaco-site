'use client';

import { useEffect, useState, use } from 'react';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/sanity/utils';
import BackButton from '@/components/ui/BackButton';
import BlogPostContent from '@/components/ui/blog/BlogPostContent';
import RelatedPosts from '@/components/ui/blog/RelatedPosts';
import { Locale } from '@/lib/i18n';
import type { BlogPost } from '@/lib/sanity/types';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    locale: Locale;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = use(params);
  const { slug, locale } = resolvedParams;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching post with slug:', slug);

        // First, try to get all posts to see what's available
        const allPosts = await getBlogPosts();
        console.log(
          'Available posts:',
          allPosts.map((p) => ({
            title: p.title,
            slug: p.slug?.current,
            _id: p._id,
          })),
        );

        // Then try to get the specific post
        const postData = await getBlogPostBySlug(slug);
        console.log('Post data for slug', slug, ':', postData);

        if (!postData || !postData._id) {
          console.warn('Post not found or invalid data. Available posts:', allPosts);
          // Instead of redirecting, let's see if we can find a matching post
          const matchedPost = allPosts.find(
            (p) =>
              p.slug?.current?.toLowerCase() === slug.toLowerCase() ||
              p.slug?.current?.toLowerCase() === slug.toLowerCase().replace(/-/g, ' '),
          );

          if (matchedPost) {
            console.log('Found matching post with different case or spacing:', matchedPost);
            setPost(matchedPost);
            const filteredPosts = allPosts.filter((p: BlogPost) => p._id && p._id !== matchedPost._id).slice(0, 3);
            setRelatedPosts(filteredPosts);
            return;
          }

          console.warn('No matching post found, redirecting to 404');
          window.location.href = `/${locale || 'en'}/404`;
          return;
        }

        setPost(postData);

        // Filter out the current post and get related posts
        if (Array.isArray(allPosts)) {
          const filteredPosts = allPosts.filter((p: BlogPost) => p._id && p._id !== postData._id).slice(0, 3);
          setRelatedPosts(filteredPosts);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        // Only redirect if we're sure it's a 404
        if (error instanceof Error && error.message.includes('404')) {
          window.location.href = `/${locale || 'en'}/404`;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, locale]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-32"></div>
            <div className="h-12 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-64 bg-slate-200 rounded-lg mt-8"></div>
            <div className="space-y-2 mt-8">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <BackButton href={`/${locale}/blog`} locale={locale} />
        <BlogPostContent post={post} locale={locale} />
        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} locale={locale} />}
      </div>
    </div>
  );
}
