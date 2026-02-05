import { auth } from '~/lib/auth_options'
import { createServerTedrisatAPIs, ResponseError } from '@madrasah/services/tedrisat'
import { getErrorMessage } from '@madrasah/services/utils'
import { env } from '~/env'

// API istemcisinin (client) tipini çıkarıyoruz (Type Inference)
// Bu sayede intellisense 'api' parametresini otomatik tanıyacak.
type ApiClient = Awaited<ReturnType<typeof createServerTedrisatAPIs>>

/**
 * Kimlik doğrulaması gerektiren Server Action'lar için wrapper.
 * Otomatik olarak token alır, API client'ı oluşturur ve hataları yönetir.
 */
export async function authenticatedAction<T>(
  action: (api: ApiClient) => Promise<T>
): Promise<T> {
  // 1. Oturum kontrolü
  const session = await auth()

  // Token yoksa hata fırlat veya null dön (ihtiyaca göre özelleştirilebilir)
  if (!session?.accessToken) {
    throw new Error('Unauthorized: No access token found')
  }

  // 2. API Client oluşturma
  const api = await createServerTedrisatAPIs(session.accessToken, env.TEDRISAT_API_BASE_URL)

  try {
    // 3. Asıl aksiyonu çalıştır
    return await action(api)
  }
  catch (error) {
    // 4. Merkezi Hata Yönetimi
    if (error instanceof ResponseError) {
      const errorBody = await error.response.json()
      const message = getErrorMessage(errorBody)
      // Burada hatayı loglayabilir veya belirli formatta dönebilirsiniz
      throw new Error(message)
    }
    // Beklenmeyen hataları olduğu gibi fırlat
    throw error
  }
}
