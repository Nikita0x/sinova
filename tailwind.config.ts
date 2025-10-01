// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xss: '320px',
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'can-hover': { raw: '(hover: hover)' },
    },
    extend: {
      colors: {
        primary: { DEFAULT: '#4F46E5', dark: '#251868' },
        gray: { DEFAULT: '#6B7280', light: '#F3F4F6' },
      },
    },
  },
} satisfies Config;
