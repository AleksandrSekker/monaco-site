import {type SchemaTypeDefinition} from '@sanity/types'
import post from './post'
import caseStudy from './case'
import pricing from './pricing'
import author from './author'
import category from './category'
import localeString from './localeString'
import localeText from './localeText'
import localeBlockContent from './localeBlockContent'
import stats from './stats'
import processStep from './processStep'
import service from './service'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  post,
  caseStudy,
  pricing,
  author,
  category,
  stats,
  processStep,
  service,
  // Localization types
  localeString,
  localeText,
  localeBlockContent,
]
