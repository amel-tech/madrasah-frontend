import { defineConfig } from 'orval'

export default defineConfig({
  tedrisat: {
    input: {
      target: 'https://api-tedrisat-dev.medaris.net/docs-json',
    },
    output: {
      target: './src/tedrisat/generated',
      prettier: true,
      mode: 'single',
      client: 'fetch',
      schemas: './src/tedrisat/generated',
      override: {
        mutator: {
          path: './src/core/client.ts',
          name: 'customFetcher',
        },
      },
    },
  },
})
