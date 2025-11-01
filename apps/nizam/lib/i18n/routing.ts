import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'tr', 'ar'] as const
export type MadrasahLocale = (typeof locales)[number]

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/home': '/home',
  },
})
