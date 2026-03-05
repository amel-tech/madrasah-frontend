import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './lib/i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

export default intlMiddleware

export const config = {
  matcher: ['/((?!api|_next|_vercel|images|uthman|icons|.*\\..*).*)'],
}
