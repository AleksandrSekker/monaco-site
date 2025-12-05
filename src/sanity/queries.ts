// src/sanity/queries.ts
import { groq } from 'next-sanity';
import { client } from './client';

export async function getPosts() {
  return client.fetch(groq`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "author": author->{name, image},
      "categories": categories[]->{title, description}
    }
  `);
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    groq`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        body,
        "author": author->{name, image, bio},
        "categories": categories[]->{title, description}
      }
    `,
    { slug },
  );
}
export const blogPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "mainImage": mainImage.asset->url,
  publishedAt,
  "author": author->{
    name,
    "image": image.asset->url
  },
  "categories": categories[]->{
    title,
    description
  }
}`;
