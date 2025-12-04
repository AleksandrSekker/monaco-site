import { SanitySchema, ValidationRule } from './types';

const service: SanitySchema = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule: ValidationRule) => rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (rule: ValidationRule) => rule.required(),
    },
    {
      name: 'order',
      type: 'number',
      title: 'Order',
      validation: (rule: ValidationRule) => rule.required().min(0),
    },
  ],
};

export default service;
