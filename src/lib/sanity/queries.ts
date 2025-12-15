export const heroQuery = `*[_type == "hero"][0] {
  title,
  subtitle,
  ctaText,
  guaranteeText,
  guaranteeSubtext,
  stats
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  description,
  order
}`;

export const casesQuery = `*[_type == "case"] | order(order asc) {
  _id,
  _type,
  title,
  slug,
  description,
  "featuredImage": featuredImage.asset->{
    url,
    "dimensions": metadata.dimensions,
    "lqip": metadata.lqip
  },
  publishedAt,
  order,
  result,
  details,
  duration,
  "content": content[]{
    ...
  }
}`;

export const blogPostQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  content,
  publishedAt,
  "image": mainImage.asset->url
}`;

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

export const contactQuery = `*[_type == "contact"][0] {
  telegram,
  whatsapp,
  phone,
  email
}`;

export const pricingQuery = `*[_type == "pricing"] | order(order asc) {
  _id,
  _type,
  tier,
  title,
  description,
  "investmentRange": {
    "min": investmentRange.min,
    "max": investmentRange.max
  },
  "feeRange": {
    "min": feeRange.min,
    "max": feeRange.max
  },
  isCustomFee,
  "features": features[] {
    "text": text,
    "included": included
  },
  isPopular,
  order
}`;

export const aboutQuery = `*[_type == "about"][0] {
  _id,
  title,
  description,
  content,
  image,
  values[] {
    title,
    description,
    icon
  },
  team[]->{
    _id,
    name,
    position,
    bio,
    image,
    socialLinks[] {
      platform,
      url
    }
  }
}`;

export const statsQuery = `*[_type == "stats"] {
  _id,
  _type,
  title,
  value,
  description,
  image {
    _type,
    asset->{
      _id,
      url,
      metadata {
        lqip
      }
    },
    alt
  }
}`;
