/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-europa)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        display: ['var(--font-gilda)', 'serif'],
      },
    },
  },
  plugins: [
    typography,
    forms,
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-balance': {
          textWrap: 'balance',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};

export default config;
