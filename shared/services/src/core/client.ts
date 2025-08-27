export interface APIConfig {
  baseUrl: string
  token?: string
}

// Global config for the customFetcher - will be set by createAPIService
let globalConfig: APIConfig | null = null

export function setGlobalConfig(config: APIConfig) {
  globalConfig = config
}

// Default fetcher that handles both relative and absolute URLs
export async function customFetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  // If we have a global config and the URL is relative, make it absolute
  const fullUrl = globalConfig && !url.startsWith('http')
    ? `${globalConfig.baseUrl}${url}`
    : url

  // Inject auth headers if we have a global config
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  }

  if (globalConfig?.token) {
    headers.Authorization = `Bearer ${globalConfig.token}`
  }

  const authOptions: RequestInit = {
    ...options,
    headers,
  }

  const response = await fetch(fullUrl, authOptions)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const contentType = response.headers.get('content-type')

  // Handle different response types based on content-type
  if (contentType?.includes('application/json')) {
    const data = await response.json()
    return data
  }
  else if (contentType?.includes('text/')) {
    const text = await response.text()
    return text as T
  }
  else {
    // For other content types, try to parse as text first
    const text = await response.text()
    try {
      return JSON.parse(text)
    }
    catch {
      return text as T
    }
  }
}

export function createConfiguredFetcher(config: APIConfig) {
  return async function configuredFetcher<T>(
    url: string,
    options?: RequestInit,
  ): Promise<T> {
    const fullUrl = url.startsWith('http') ? url : `${config.baseUrl}${url}`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.headers as Record<string, string>),
    }

    if (config.token) {
      headers.Authorization = `Bearer ${config.token}`
    }

    const authOptions: RequestInit = {
      ...options,
      headers,
    }

    return customFetcher<T>(fullUrl, authOptions)
  }
}
