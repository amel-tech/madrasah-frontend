'use client';

import { useEffect } from 'react';
import { env } from '~/env';

export function MSWComponent() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      if (typeof window !== 'undefined') {
        import('../mocks/browser').then(({ worker }) => {
          worker.start({
            onUnhandledRequest: 'bypass'
          });
        });
      }
    }
  }, []);

  return null;
}