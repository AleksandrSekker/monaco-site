// This file contains type definitions for your Sanity schema
// and extends the default Sanity types

// Import Sanity type definitions
import type {SchemaTypeDefinition} from 'sanity'

// Define the config type
type SanityConfig = {
  name: string
  title: string
  projectId: string
  dataset: string
  plugins: any[]
  schema: {
    types: SchemaTypeDefinition[]
  }
}

declare module 'sanity' {
  // Export defineConfig function
  export function defineConfig(config: SanityConfig): SanityConfig

  // Extend the Schema namespace to include our custom types
  namespace Schema {
    // Define the types for your schema
    interface StringField {
      type: 'string'
      validation?: (rule: any) => any
      [key: string]: any
    }

    interface SlugField {
      type: 'slug'
      options?: {
        source: string
        maxLength?: number
      }
      validation?: (rule: any) => any
      [key: string]: any
    }

    interface ImageField {
      type: 'image'
      options?: {
        hotspot?: boolean
      }
      [key: string]: any
    }
  }

  // This makes the Rule type available in your schema files
  interface Rule {
    required: () => Rule
    min: (min: number) => Rule
    max: (max: number) => Rule
    length: (length: number) => Rule
    // Add other Rule methods as needed
  }

  // Make Rule available globally
  const Rule: Rule
}
