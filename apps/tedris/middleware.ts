import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '~/lib/i18n/routing'
import { withAuth } from 'next-auth/middleware'

import { NextRequest } from 'next/server'

const intlMiddleware = createIntlMiddleware(routing)

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // console.log('Auth middleware - authorized callback:', data)
        return token !== null && !token.error
      },
    },
  },
)

export default function middleware(req: NextRequest) {
  const publicPages = ['/', '/home', '/api/auth/signin']
  const locales = routing.locales

  const publicPathnameRegex = new RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?$`,
    'i',
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return intlMiddleware(req as any)
  }
  else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req)
  }
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
}
