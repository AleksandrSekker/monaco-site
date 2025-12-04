import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      // Default ignores from eslint-config-next:
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',

      // From your .eslintignore:
      'node_modules/',
      'dist/',
      '**/__tests__/**',
      '**/__mocks__/**',
      '**/*.d.ts',
      '.sanity/',
      '.idea/',
      '.vscode/',
      '*.sublime-*',

      // Sanity specific
      'sanity/.sanity/',
      'sanity/node_modules/',
      'sanity/dist/',
      'sanity/build/',
    ],
  },
]);

export default eslintConfig;
