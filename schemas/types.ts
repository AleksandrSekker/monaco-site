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
  validation?: (rule: ValidationRule) => ValidationRule;
  options?: Record<string, unknown>;
  of?: Array<{ type: string }>;
  fields?: SanityField[];
}

// Define the document schema type
export interface SanitySchema {
  name: string;
  title: string;
  type: string;
  fields: SanityField[];
}

// Type for the validation function
export type ValidationFunction = (rule: ValidationRule) => ValidationRule;
