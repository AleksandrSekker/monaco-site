import createImageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url';
import type { Image } from '@sanity/types';

import { dataset, projectId } from '../env';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: Image | string): ImageUrlBuilder => {
  return builder.image(source);
};
