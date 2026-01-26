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
          50: 'var(--color-brand-50)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
        },
        blue: {
          200: 'var(--color-blue-200)',
        },
        accent: {
          50: 'var(--color-accent-50)',
          500: 'var(--color-accent-500)',
        },
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          900: 'var(--color-gray-900)',
        },
        white: 'var(--color-white)',
      },
    },
  },
}

export default config
