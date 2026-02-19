import { auth } from '~/lib/auth_options'
import { createServerTedrisatAPIs, ResponseError } from '@madrasah/services/tedrisat'
import { getErrorMessage } from '@madrasah/services/utils'
import { env } from '~/env'

// Infer the API client type so intellisense recognizes the 'api' parameter.
type ApiClient = Awaited<ReturnType<typeof createServerTedrisatAPIs>>

/** Result type for actions: success with data, or failure with server error message. */
export type AuthenticatedActionResult<T>
  = | { success: true, data: T }
    | { success: false, error: string }

/**
 * Wrapper for Server Actions that require authentication.
 * Returns a result object instead of throwing so the client can show server error messages
 * (Next.js omits thrown error messages in production).
 */
export async function authenticatedAction<T>(
  action: (api: ApiClient) => Promise<T>,
): Promise<AuthenticatedActionResult<T>> {
  const session = await auth()

  if (!session?.accessToken) {
    return { success: false, error: 'Unauthorized: No access token found' }
  }

  const api = await createServerTedrisatAPIs(session.accessToken, env.TEDRISAT_API_BASE_URL)

  try {
    const data = await action(api)
    return { success: true, data }
  }
  catch (error) {
    if (error instanceof ResponseError) {
      let message: string
      try {
        const errorBody = await error.response.json()
        message = getErrorMessage(errorBody)
      }
      catch {
        message = error.response.statusText || 'Request failed'
      }
      return { success: false, error: message }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred.',
    }
  }
}
