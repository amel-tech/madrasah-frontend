import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  isServer: typeof window === 'undefined',
  emptyStringAsUndefined: false,
  server: {
    KEYCLOAK_CLIENT_ID: z.string().min(1),
    KEYCLOAK_CLIENT_SECRET: z.string().min(1),
    KEYCLOAK_ISSUER: z.string().min(1).url(),
    NEXTAUTH_URL: z.string().min(1).url(),
    NEXTAUTH_SECRET: z.string().min(1),
    OTEL_EXPORTER_OTLP_ENDPOINT: z.string().min(1).url().optional(),
    OTEL_SERVICE_NAME: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_KEYCLOAK_ISSUER: z.string().min(1).url(),
    NEXT_PUBLIC_KEYCLOAK_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_NEXTAUTH_URL: z.string().min(1).url(),
  },
  runtimeEnv: {
    KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET,
    KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER,
    OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_KEYCLOAK_ISSUER: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER,
    NEXT_PUBLIC_KEYCLOAK_CLIENT_ID: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  },
})
