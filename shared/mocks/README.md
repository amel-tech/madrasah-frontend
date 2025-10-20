# @madrasah/mocks

This package contains mock data for development and testing purposes.

## Architecture

The mocks package uses a **distribution system** to share mock data across apps:

1. **Source**: Mock data is maintained in `src/` directory
2. **Distribution**: Scripts automatically copy mock files to consuming apps' `public/mocks/` directories  
3. **Consumption**: Apps fetch mock data as static assets at runtime

### Key Files

- **`src/tedrisat/faker.ts`**: Custom Faker.js instance with domain-specific generators
- **`src/tedrisat/generate-mock.ts`**: Script to generate fresh mock data with proper relationships
- **`src/tedrisat/mock.json`**: Pre-generated JSON file with realistic mock data
- **`scripts/distribute.js`**: Distribution script that copies mock files to consuming apps

### Type-Safe Mock Data

The faker functions are designed to match the types from `@madrasah/services/tedrisat`, ensuring that generated mock data conforms to the expected API response shapes. This provides compile-time safety and guarantees that mock data structure stays in sync with the actual service interfaces.

```typescript
// Example: Card with proper deck relationship
card(): Card {
  return {
    id: faker.number.int(),
    author: faker.person.fullName(),
    is_public: faker.datatype.boolean(),
    content: {
      front: faker.word.adjective(),
      back: faker.lorem.paragraphs(1),
    },
    type: faker.helpers.arrayElement(['hadeeth', 'vocabulary']),
    image_source: faker.image.urlLoremFlickr({ category: 'nature' }),
    deck_id: faker.number.int({ min: 1, max: 1000 }), // Will be overridden with valid deck ID
  }
}
```

## Usage

### Importing Static Mock Data

Applications can import the pre-generated JSON mock data directly:

```typescript
// Import the static mock data
import mockData from '@madrasah/mocks/tedrisat/mock.json'

// Use the mock data in your application
const { cards, decks, tags } = mockData

// Example: Get cards for a specific deck
const deckCards = cards.filter(card => card.deck_id === targetDeckId)
```

### Generating Fresh Mock Data

To generate new mock data with custom configurations:

```bash
# Generate default mock data (5 decks, 20 cards, 8 tags)
npm run generate-mocks --workspace=@madrasah/mocks

# The generated data will be saved to mock-data.json in the workspace root
```

### Programmatic Generation

You can also use the generator programmatically:

```typescript
import { generateMockData } from '@madrasah/mocks/tedrisat/generate-mock'

// Generate with custom configuration
const mockData = generateMockData({
  decks: 3,
  cards: 15,
  tags: 5
})

// Access the generated data
console.log(`Generated ${mockData.cards.length} cards across ${mockData.decks.length} decks`)
```

## Data Relationships

The mock generator ensures proper relationships between entities:

- **Cards → Decks**: Each card's `deck_id` references a valid deck from the generated deck collection
- **Realistic Counts**: Card counts per deck are distributed realistically
- **Consistent IDs**: All entities have unique, consistent IDs across generations

## How to Extend Mock Data

To add new mock data types or modify existing ones:

### 1. Extend the Faker Instance

Add new data generators to `src/tedrisat/faker.ts`:

```typescript
// src/tedrisat/faker.ts
export const tedrisat = {
  // ... existing generators
  
  newDataType(): NewType {
    return {
      id: faker.number.int(),
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      // ... other properties
    }
  }
}
```

### 2. Update the Generator Script

Modify `src/tedrisat/generate-mock.ts` to include your new data type:

```typescript
// Add to GenerationConfig interface
interface GenerationConfig {
  decks: number
  cards: number
  tags: number
  newDataTypes: number  // Add new type
}

// Add generation logic in generateMockData function
const newDataTypes = Array.from({ length: config.newDataTypes }, () => 
  faker.tedrisat.newDataType()
)
```

### 3. Regenerate Mock Data

Run the generator to create fresh mock data:

```bash
npm run generate-mocks --workspace=@madrasah/mocks
```

The updated mock data will be available for import in your applications.

## Development

### Available Scripts

- `npm run generate-mocks` - Generate new mock data using the default configuration
- `npm run clean` - Clean build artifacts and dependencies

### Mock Data Structure

The generated JSON follows this structure:

```typescript
interface MockData {
  cards: Card[]
  decks: Deck[] 
  tags: Tag[]
  metadata: {
    generatedAt: string
    totalRecords: number
    relationships: {
      decks_count: number
      cards_count: number
      tags_count: number
      cards_with_deck_relations: number
    }
  }
}
```