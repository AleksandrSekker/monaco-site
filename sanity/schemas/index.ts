import { type SchemaTypeDefinition } from '@sanity/types';
import post from './post';
import caseStudy from './case';
import pricing from './pricing';
import author from './author';
import category from './category';
import localeString from './localeString';
import localeText from './localeText';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  post,
  caseStudy,
  pricing,
  author,
  category,

  // Localization types
  localeString,
  localeText,
];
