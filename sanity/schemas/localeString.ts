import {defineType} from 'sanity'

export default defineType({
  title: 'Localized String',
  name: 'localeString',
  type: 'object',
  fields: [
    {
      title: 'English',
      name: 'en',
      type: 'string',
    },
    {
      title: 'French',
      name: 'fr',
      type: 'string',
    },
    {
      title: 'Russian',
      name: 'ru',
      type: 'string',
    },
  ],
})
