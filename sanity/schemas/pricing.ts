import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pricing',
  title: 'Pricing Plans',
  type: 'document',
  fields: [
    defineField({
      name: 'tier',
      title: 'Pricing Tier',
      type: 'string',
      options: {
        list: [
          {title: 'Essential', value: 'essential'},
          {title: 'Premium', value: 'premium'},
          {title: 'Family Office', value: 'familyOffice'},
          {title: 'Crypto Service', value: 'crypto'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'investmentRange',
      title: 'Investment Range',
      type: 'object',
      fields: [
        {
          name: 'min',
          title: 'Minimum',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'max',
          title: 'Maximum',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'feeRange',
      title: 'Fee Range',
      type: 'object',
      fields: [
        {
          name: 'min',
          title: 'Minimum',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'max',
          title: 'Maximum',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isCustomFee',
      title: 'Has Custom Fee?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isPopular',
      title: 'Mark as Popular?',
      type: 'boolean',
      initialValue: false,
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
              name: 'text',
              title: 'Feature Text',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'included',
              title: 'Included',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              title: 'text.en',
              included: 'included',
            },
            prepare({title, included}) {
              return {
                title: title || 'Untitled feature',
                subtitle: included ? 'Included' : 'Not included',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort the pricing tiers',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'order',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      tier: 'tier',
      order: 'order',
    },
    prepare({title, tier, order}) {
      return {
        title: title || 'Untitled pricing plan',
        subtitle: `${tier} (Order: ${order || 'Not set'})`,
      }
    },
  },
})
