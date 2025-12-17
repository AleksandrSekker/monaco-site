import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'The service title in multiple languages',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      description: 'The service description in multiple languages',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'localeString',
      description: 'Call to action text (e.g., "Learn more", "Get started")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'localeText',
      description: 'A more detailed description of the service',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/svg+xml,image/jpeg,image/png,image/webp',
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'The order in which this service should appear',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'localeString',
              title: 'Feature Title',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'localeText',
              title: 'Feature Description',
            },
          ],
        },
      ],
      description: 'List of features for this service',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Used for URLs (e.g., /services/your-service-slug)',
      options: {
        source: 'title.en', // or another field to generate the slug from
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w-]+/g, '') // Remove all non-word chars
            .replace(/[^\w-]+/g, '') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text
            .substring(0, 96), // Limit length
      },
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'icon',
    },
  },
})
