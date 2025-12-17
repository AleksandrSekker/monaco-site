// Define validation rule types
export type ValidationRule = {
  required: () => ValidationRule;
  min: (value: number) => ValidationRule;
  max: (value: number) => ValidationRule;
  length: (length: number) => ValidationRule;
  // Add other validation methods as needed
};

// Define the base field type
export interface SanityField {
  name: string;
  title: string;
  type: string;
  description?: string;
  validation?: (rule: ValidationRule) => ValidationRule;
  options?: Record<string, unknown>;
  of?: Array<{
    type: string;
    fields?: SanityField[];
  }>;
  fields?: SanityField[];
}

// Define the preview type
export interface SanityPreview<T = Record<string, unknown>> {
  select?: Record<string, string>;
  prepare: (value: T) => { title: string; subtitle?: string };
}

// Define the document schema type
export interface SanitySchema {
  name: string;
  title: string;
  type: string;
  fields: SanityField[];
  preview?: SanityPreview;
}

// Type for the validation function
export type ValidationFunction = (rule: ValidationRule) => ValidationRule;
