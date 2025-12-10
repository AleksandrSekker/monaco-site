import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';
import { client } from './client';

// Get a pre-configured url-builder from the sanity client
const builder = createImageUrlBuilder(client);

// Helper function to build image URLs with your Sanity project's configuration
export const urlFor = (source: Image) => {
  return builder.image(source);
};
