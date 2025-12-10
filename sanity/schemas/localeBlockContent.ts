import {defineType} from 'sanity'

export default defineType({
  title: 'Localized Block Content',
  name: 'localeBlockContent',
  type: 'object',
  fields: [
    {
      title: 'English',
      name: 'en',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
          },
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
          ],
        },
      ],
    },
    {
      title: 'French',
      name: 'fr',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
          },
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: "Important pour le référencement et l'accessibilité.",
            },
          ],
        },
      ],
    },
    {
      title: 'Russian',
      name: 'ru',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Обычный', value: 'normal'},
            {title: 'Заголовок 1', value: 'h1'},
            {title: 'Заголовок 2', value: 'h2'},
            {title: 'Заголовок 3', value: 'h3'},
            {title: 'Цитата', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Жирный', value: 'strong'},
              {title: 'Курсив', value: 'em'},
              {title: 'Код', value: 'code'},
            ],
          },
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Альтернативный текст',
              description: 'Важно для SEO и доступности.',
            },
          ],
        },
      ],
    },
  ],
})
