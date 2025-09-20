import { setupWorker } from 'msw/browser'
import { createHandlers } from '@madrasah/msw/tedrisat'
import { env } from '~/env'

const API_BASE_URL = env.NEXT_PUBLIC_TEDRISAT_API_BASE_URL
const handlers = createHandlers(API_BASE_URL)
export const worker = setupWorker(...handlers)
