import { env } from './env'

import { registerOTel, OTLPHttpJsonTraceExporter } from '@vercel/otel'
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR) // set diaglog level to DEBUG when debugging

export async function register() {
  registerOTel({
    serviceName: env.OTEL_SERVICE_NAME,
    traceExporter: new OTLPHttpJsonTraceExporter({
      url: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    }),
  })

  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV === 'development' && env.API_MOCKING === 'enabled') {
    const { server } = await import('./mocks/server');
    server.listen({
      onUnhandledRequest: 'bypass'
    });
    console.log('✅ MSW mocking is enabled for Server Components.');
  }
}
