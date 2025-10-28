# @madrasah/services

Shared service layer for Madrasah applications with auto-generated API clients from OpenAPI specifications.

## Overview

This package provides TypeScript API clients generated from OpenAPI/Swagger specifications for various Madrasah backend services. The clients are automatically generated during build time to ensure they stay in sync with the backend APIs.

## Structure

```
shared/services/
├── swagger-docs/           # OpenAPI specifications
│   ├── tedrisat.json      # Tedrisat service API spec
│   └── README.md          # Documentation for swagger specs
├── src/
│   ├── tedrisat/          # Tedrisat service client
│   │   ├── generated/     # Auto-generated API client (do not edit)
│   │   ├── api-factory.ts # Factory for creating authenticated clients
│   │   └── index.ts       # Public exports
│   └── core/              # Core utilities and shared types
└── openapitools.json      # OpenAPI generator configuration
```

## Usage

### Basic API Client Usage

```typescript
import { createTedrisatAPIs, DeckInclude } from '@madrasah/services/tedrisat'

// Create API clients
const { decks, cards, service } = createTedrisatAPIs({
  baseUrl: 'https://tedrisat-api.madrasah.com',
  token: 'your-auth-token'
})

// Use the generated API methods
const deckList = await decks.getAllFlashcardDecks({ 
  include: [DeckInclude.Tags] 
})

const deck = await decks.getFlashcardDeckById({ 
  id: 123, 
  include: [DeckInclude.Flashcards] 
})
```

### Server-Side Usage (Next.js)

```typescript
import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { cookies } from 'next/headers'

// In server components or API routes
const cookieStore = await cookies()
const { decks } = await createServerTedrisatAPIs(
  cookieStore, 
  process.env.TEDRISAT_API_BASE_URL!
)

const decks = await decks.getAllFlashcardDecks()
```

### Client-Side Usage (React)

```typescript
import { createTedrisatAPIs } from '@madrasah/services/tedrisat'
import { useSession } from 'next-auth/react'

function MyComponent() {
  const { data: session } = useSession()
  
  const fetchData = async () => {
    const { decks } = createTedrisatAPIs({
      baseUrl: process.env.NEXT_PUBLIC_TEDRISAT_API_BASE_URL!,
      token: session?.accessToken
    })
    
    return await decks.getAllFlashcardDecks()
  }
}
```

## Development

### Generate API Clients

```bash
# Generate all API clients
npm run generate

# Generate specific service
npm run generate:tedrisat

# Build (automatically runs generation first)
npm run build
```

### Adding New Services

1. **Add OpenAPI specification**: Place the swagger JSON file in `swagger-docs/`
2. **Add generation script**: Update `package.json` scripts
3. **Create API factory**: Create factory function for the new service
4. **Add package export**: Update main `package.json` exports

### Available Services

- **Tedrisat** (`@madrasah/services/tedrisat`) - Education management service

## Scripts

- `npm run generate` - Generate all API clients from swagger specs
- `npm run generate:tedrisat` - Generate Tedrisat API client only
- `npm run build` - Build the package (runs generation first)
- `npm run clean` - Clean build artifacts and generated files
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## Notes

- **Generated files**: Never manually edit files in `src/*/generated/` directories
- **Regeneration**: API clients are automatically regenerated during build
- **Swagger specs**: Keep swagger-docs files up to date with backend APIs