/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    '../../shared/ui/components/**/*.{js,ts,jsx,tsx}',
    '../../shared/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
        },
        accent: {
          500: 'var(--color-accent-500)',
        },
        gray: {
          400: 'var(--color-gray-400)',
        },
      },
    },
  },
}

export default config
