import { env } from './env'

import { registerOTel, OTLPHttpJsonTraceExporter } from '@vercel/otel'
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR) // set diaglog level to DEBUG when debugging

export function register() {
  registerOTel({
    serviceName: env.OTEL_SERVICE_NAME,
    traceExporter: new OTLPHttpJsonTraceExporter({
      url: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    }),
  })
}
