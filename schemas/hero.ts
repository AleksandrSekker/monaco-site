import { SanitySchema, ValidationRule } from './types';

const hero: SanitySchema = {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
      description: 'Short text that appears above the main title',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule: ValidationRule) => rule.required(),
    },
    {
      name: 'subtitle',
      type: 'text',
      title: 'Subtitle',
      validation: (rule: ValidationRule) => rule.required(),
    },
    {
      name: 'ctaText',
      type: 'string',
      title: 'CTA Button Text',
      validation: (rule: ValidationRule) => rule.required(),
    },
    {
      name: 'guaranteeText',
      type: 'string',
      title: 'Guarantee Text',
    },
    {
      name: 'guaranteeSubtext',
      type: 'string',
      title: 'Guarantee Subtext',
    },
    {
      name: 'stats',
      type: 'text',
      title: 'Stats Text',
    },
    {
      name: 'desktopImage',
      title: 'Desktop Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
      ],
    },
    {
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
      ],
    },
  ],
};

export default hero;
