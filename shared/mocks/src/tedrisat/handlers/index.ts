import { HttpHandler } from 'msw'
import { tedrisatHandlers } from './tedrisat'

// Merge all handlers into a single array
export const createHandlers = (baseUrl: string): HttpHandler[] => {
  const apiHandlersObject = tedrisatHandlers(baseUrl)
  const apiHandlersArray = Object.values(apiHandlersObject) as HttpHandler[]

  return [
    ...apiHandlersArray,
  ]
}
