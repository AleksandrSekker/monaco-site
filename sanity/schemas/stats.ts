import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'stats',
  title: 'Stats',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional image for the stats section',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'Title for the stats section in multiple languages',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'localeString',
      description: 'The numeric or text value to display in multiple languages',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      description: 'Additional details about the stats',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title || 'Stats Section',
        media,
        subtitle: 'Statistics section',
      }
    },
  },
})
