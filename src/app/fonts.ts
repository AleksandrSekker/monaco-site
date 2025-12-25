// src/app/fonts.ts
import { Cormorant, Gilda_Display } from 'next/font/google';
import localFont from 'next/font/local';
export const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const gilda = Gilda_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-gilda',
  display: 'swap',
});

export const europa = localFont({
  src: [
    {
      path: '../../public/fonts/Europa-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Europa-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    // Add other weights and styles as needed
  ],
  variable: '--font-europa',
  display: 'swap',
});
