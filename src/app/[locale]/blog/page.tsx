'use client';

import { getBlogPosts } from '@/lib/sanity/utils';
import { blogHeaders } from '@/translations/headers';
import PageHeader from '@/components/ui/PageHeader';
import BlogPostCard from '@/components/ui/blog/BlogPostCard';
import { BlogPost } from '@/lib/sanity/types';
import { useState, useEffect } from 'react';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12">
      <PageHeader translations={blogHeaders} />

      <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
