import { LocaleString, LocaleText } from '@/sanity/types';

export interface ProcessStep {
  _id: string;
  _type: 'processStep';
  order: number;
  title: LocaleString;
  description: LocaleText;
  image?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url: string;
      metadata?: {
        lqip: string;
      };
    };
  };
}
