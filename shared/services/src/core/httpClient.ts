/**
 * Creates a reusable HTTP client for making API requests with a specified base URL and default options.
 *
 * @param baseURL - The base URL to prepend to all request endpoints.
 * @param defaultOptions - Optional default options to apply to every request (e.g., headers, credentials).
 * @returns An async function that performs HTTP requests to the given endpoint with merged options.
 *
 * @template T - The expected response data type.
 *
 * @example
 * const httpClient = createHttpClient('https://api.example.com', { credentials: 'include' });
 * const { data, error } = await httpClient<User>('/users/1');
 */
/**

 */
export const createHttpClient = (baseURL: string, defaultOptions: RequestInit = {}) => {
  return async <T>(endpoint: string, options: RequestInit = {}): Promise<{ data: T | null, error: string | null }> => {
    const url = `${baseURL}${endpoint}`

    const config: RequestInit = {
      ...defaultOptions,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...defaultOptions.headers,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(errorData.message || 'Bir sunucu hatası oluştu.')
      }
      const data: T = await response.json()
      return { data, error: null }
    }
    catch (error: any) {
      return { data: null, error: error.message || 'Beklenmedik bir hata oluştu.' }
    }
  }
}
