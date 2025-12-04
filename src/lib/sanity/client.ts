import { createClient } from '@sanity/client';

// Check if environment variables are set
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2025-12-01'; // Match this with your Sanity project's API version

// Log environment variables for debugging (remove in production)
console.log('Sanity Config:', { projectId, dataset, apiVersion });

// Create client only if projectId is configured
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      useCdn: process.env.NODE_ENV === 'production',
      apiVersion, // Use the same API version as in env.ts
      // Enable API token if needed
      // token: process.env.SANITY_API_TOKEN,
    })
  : null;

// Check if Sanity is properly configured
export const isSanityConfigured = !!projectId;

if (!isSanityConfigured) {
  console.warn('Sanity client is not properly configured. Check your environment variables.');
}
