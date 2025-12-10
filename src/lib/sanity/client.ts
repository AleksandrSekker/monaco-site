import { createClient } from '@sanity/client';

// Check if environment variables are set
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2025-12-01'; // Match this with your Sanity project's API version

if (!projectId) {
  console.warn('Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Some features may not work correctly.');
}

// Create the Sanity client
export const client = createClient({
  projectId,
  dataset,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion,
  // Enable API token if needed
  // token: process.env.SANITY_API_TOKEN,
});

// Check if Sanity is properly configured
export const isSanityConfigured = !!projectId;

if (!isSanityConfigured) {
  console.warn('Sanity client is not properly configured. Check your environment variables.');
}
