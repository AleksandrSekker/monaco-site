import {defineType} from 'sanity'

export default defineType({
  title: 'Localized Text',
  name: 'localeText',
  type: 'object',
  fields: [
    {
      title: 'English',
      name: 'en',
      type: 'text',
      rows: 3,
    },
    {
      title: 'French',
      name: 'fr',
      type: 'text',
      rows: 3,
    },
    {
      title: 'Russian',
      name: 'ru',
      type: 'text',
      rows: 3,
    },
  ],
})
