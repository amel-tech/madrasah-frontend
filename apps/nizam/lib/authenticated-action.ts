import { auth } from '~/lib/auth_options'
import { createServerTedrisatAPIs, ResponseError } from '@madrasah/services/tedrisat'
import { getErrorMessage } from '@madrasah/services/utils'
import { env } from '~/env'

// Infer the API client type so intellisense recognizes the 'api' parameter.
type ApiClient = Awaited<ReturnType<typeof createServerTedrisatAPIs>>

/**
 * Wrapper for Server Actions that require authentication.
 * Automatically obtains the token, creates the API client, and handles errors.
 */
export async function authenticatedAction<T>(
  action: (api: ApiClient) => Promise<T>,
): Promise<T> {
  // 1. Session check
  const session = await auth()

  // If no token, throw (can be customized to return null if needed)
  if (!session?.accessToken) {
    throw new Error('Unauthorized: No access token found')
  }

  // 2. Create API client
  const api = await createServerTedrisatAPIs(session.accessToken, env.TEDRISAT_API_BASE_URL)

  try {
    // 3. Run the action
    return await action(api)
  }
  catch (error) {
    // 4. Centralized error handling
    if (error instanceof ResponseError) {
      const errorBody = await error.response.json()
      const message = getErrorMessage(errorBody)
      throw new Error(message)
    }
    // Re-throw unexpected errors as-is
    throw error
  }
}
