/**
 * @file İstemci tarafı (Client Components) için API servisine erişim sağlayan custom hook.
 */
import 'client-only'; // Bu kodun sunucuda kullanılmasını engeller.

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { APIService } from '@madrasah/services/tedrisat';
import { env } from '~/env';

/**
 * İstemci tarafında, NextAuth session'ından alınan JWT'yi kullanarak
 * yetkilendirilmiş ve memoize edilmiş bir APIService örneği döndüren custom hook.
 *
 * @returns APIService örneğini veya session yükleniyorsa/yoksa null döndürür.
 */
export const useApi = (): APIService | null => {
  // 1. NextAuth'un client-side hook'u ile session'ı al.
  const { data: session } = useSession();

  // Kendi session yapınıza göre token'ı buradan alın (next-auth.d.ts içinde tanımlanmalı).
  const accessToken = session?.accessToken as string | undefined;

  // 2. Servis örneğini oluştur ve token değişmediği sürece yeniden oluşturma (useMemo).
  const apiServiceInstance = useMemo(() => {
    // Session henüz yüklenmediyse veya token yoksa, bir örnek oluşturma.
    if (!accessToken) {
      return null;
    }

    // İstemci tarafı için bir config oluştur.
    const config = {
      baseUrl: env.NEXT_PUBLIC_TEDRISAT_API_BASE_URL, // İstemcide NEXT_PUBLIC_ öneki olmalı!
      token: accessToken,
    };

    // APIService sınıfını kullanarak istemciye özel bir örnek oluştur.
    return new APIService(config);
  }, [accessToken]); // Sadece accessToken değiştiğinde yeniden çalışır.

  return apiServiceInstance;
};
