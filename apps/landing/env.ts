import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  isServer: typeof window === 'undefined',
  emptyStringAsUndefined: false,
  server: {
    OTEL_EXPORTER_OTLP_ENDPOINT: z.string().min(1).url().optional(),
    OTEL_SERVICE_NAME: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_TEDRIS_APP_URL: z.string().min(1).url().optional(),
  },
  runtimeEnv: {
    OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
    NEXT_PUBLIC_TEDRIS_APP_URL: process.env.NEXT_PUBLIC_TEDRIS_APP_URL,
  },
})
