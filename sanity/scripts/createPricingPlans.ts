// sanity/scripts/createPricingPlans.ts
import {createClient} from '@sanity/client'
import {v4 as uuidv4} from 'uuid'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({path: path.resolve(process.cwd(), '.env.local')})

// Verify required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error('❌ Error: Missing required environment variables')
  console.error(
    'Please ensure NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are set in your .env.local file',
  )
  process.exit(1)
}

// Define types
interface LocalizedString {
  _type: 'localeString'
  en: string
  ru?: string
  fr?: string
}

interface Range {
  min: number
  max?: number
}

interface Feature {
  _key: string
  text: LocalizedString
  included: boolean
}

interface PricingTier {
  _type: 'pricing'
  tier: 'essential' | 'premium' | 'familyOffice' | 'crypto'
  title: LocalizedString
  description: LocalizedString
  investmentRange: Range
  feeRange: Range
  isCustomFee: boolean
  features: Feature[]
  isPopular: boolean
}

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: '2023-05-03',
})

// Helper functions
function createLocalizedString(en: string, ru?: string, fr?: string): LocalizedString {
  return {
    _type: 'localeString',
    en,
    ...(ru && {ru}),
    ...(fr && {fr}),
  }
}

// Define pricing tiers
const pricingTiers: Omit<PricingTier, '_id' | '_rev'>[] = [
  {
    _type: 'pricing',
    tier: 'essential',
    title: createLocalizedString('Essential', 'Базовый', 'Essentiel'),
    description: createLocalizedString(
      'Basic financial services for individuals and small businesses',
      'Базовые финансовые услуги для частных лиц и малого бизнеса',
      'Services financiers de base pour les particuliers et les petites entreprises',
    ),
    investmentRange: {min: 100000, max: 500000},
    feeRange: {min: 2000, max: 5000},
    isCustomFee: false,
    isPopular: false,
    features: [
      {
        _key: uuidv4(),
        text: createLocalizedString(
          'Basic bank account',
          'Базовый банковский счет',
          'Compte bancaire de base',
        ),
        included: true,
      },
      // Add more features...
    ],
  },
  // Add other tiers...
]

async function createPricingPlans() {
  try {
    console.log('Deleting existing pricing plans...')

    // Delete existing pricing documents
    const existingPricing = await client.fetch('*[_type == "pricing"]')
    const transaction = client.transaction()

    existingPricing.forEach((doc: {_id: string}) => {
      transaction.delete(doc._id)
    })

    await transaction.commit()

    console.log('Creating new pricing plans...')

    // Create new pricing plans
    for (const tier of pricingTiers) {
      await client.create({
        ...tier,
        _id: `pricing.${tier.tier}`,
      })
    }

    console.log('✅ Successfully created pricing plans!')
  } catch (error) {
    console.error('❌ Error creating pricing plans:', error)
    process.exit(1)
  } finally {
    // Ensure the script exits
    process.exit(0)
  }
}

createPricingPlans()
