import type { Faker } from '@faker-js/faker'

// Dynamic seeding configuration
interface SeedConfig {
  [modelName: string]: {
    count?: number
    customData?: (faker: Faker) => Record<string, unknown>
  }
}

// Utility function to create seed configurations
export function createSeedConfig(config: SeedConfig): SeedConfig {
  return config
}

// Dynamic seed function that accepts db and faker as parameters
export function seedDatabase(
  db: Record<string, unknown>,
  faker: Faker,
  config?: SeedConfig,
) {
  // Default seed configuration using the passed faker instance
  const defaultSeedConfig: SeedConfig = {
    card: {
      count: 3,
      customData: f => (f as Faker & { tedrisat: { card: () => Record<string, unknown> } }).tedrisat.card(),
    },
    deck: {
      count: 3,
      customData: f => (f as Faker & { tedrisat: { deck: () => Record<string, unknown> } }).tedrisat.deck(),
    },
    tag: {
      count: 3,
      customData: f => (f as Faker & { tedrisat: { tag: () => Record<string, unknown> } }).tedrisat.tag(),
    },
  }

  const seedConfig = config || defaultSeedConfig

  // Get all model names from the database factory
  const modelNames = Object.keys(db).filter(key => typeof db[key] === 'object')

  console.log(`🌱 Starting dynamic seeding for models: ${modelNames.join(', ')}`)

  modelNames.forEach((modelName) => {
    // Get config for this model or use defaults
    const modelConfig = seedConfig[modelName] || { count: 10 }
    const count = modelConfig.count || 10

    console.log(`📝 Seeding ${count} records for model: ${modelName}`)

    // Create records for this model
    for (let i = 0; i < count; i++) {
      // Use custom data function if provided, otherwise let MSW use factory defaults
      if (modelConfig.customData) {
        const customData = modelConfig.customData(faker)
        // Use the specific model's create method with custom data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(db[modelName] as any).create(customData)
      }
      else {
        // Create with empty object to use factory-defined generators
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(db[modelName] as any).create({})
      }
    }
  })

  console.log(`✅ Dynamic seeding completed for ${modelNames.length} models`)
  return {
    seededModels: modelNames,
    totalRecords: Object.values(seedConfig).reduce((sum, cfg) => sum + (cfg.count || 10), 0),
  }
}

// Utility function for custom seeding scenarios
export function seedWithCustomConfig(
  db: Record<string, unknown>,
  faker: Faker,
  customConfig: SeedConfig,
) {
  return seedDatabase(db, faker, customConfig)
}

// Remove the auto-seed on import
