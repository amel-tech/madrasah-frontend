import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import { TedrisatService } from '@madrasah/services/tedrisat';

/**
 * 
 */
type QueryResult<T> = { data: T | null; error: string | null };

/**
 * Generic custom hook used to safely execute any API function.
 * Automatically manages loading, data, and error states.
 * @param queryFunction The service function to execute. (e.g., api => api.getPosts())
 * @param options.skip A condition to prevent the request from being made.
 */
export const useQuery = <T>(
  queryFunction: (api: TedrisatService) => Promise<QueryResult<T>>,
  options: { skip?: boolean } = {}
) => {
  const { api, status } = useApi();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If we need to skip the request or the session is not ready yet, do nothing.
    if (options.skip || status !== 'authenticated') {
      // If the session is not loading, stop loading.
      if (status !== 'loading') {
        setIsLoading(false);
      }
      return;
    }

    // If the `api` instance is not ready yet, do nothing.
    if (!api) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await queryFunction(api);
        if (result.error) {
          setError(result.error);
        } else {
          setData(result.data);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(e.message || 'Beklenmedik bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, status, options.skip]);

  return { data, error, isLoading };
};