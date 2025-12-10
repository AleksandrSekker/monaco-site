import { getBlogPosts } from '../../../lib/sanity/utils';
import { blogHeaders } from '@/translations/headers';
import PageHeader from '@/components/ui/PageHeader';
import BlogPostCard from '@/components/ui/blog/BlogPostCard';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  console.log('posts', posts);
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
