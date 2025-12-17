import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
      description: 'Short text that appears above the main title',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Subtitle',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaText',
      type: 'string',
      title: 'CTA Button Text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'guaranteeText',
      type: 'string',
      title: 'Guarantee Text',
    }),
    defineField({
      name: 'guaranteeSubtext',
      type: 'string',
      title: 'Guarantee Subtext',
    }),
    defineField({
      name: 'stats',
      type: 'string',
      title: 'Statistics Text',
    }),
    defineField({
      name: 'desktopImage',
      type: 'image',
      title: 'Desktop Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mobileImage',
      type: 'image',
      title: 'Mobile Image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
