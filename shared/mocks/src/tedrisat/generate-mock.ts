#!/usr/bin/env node

/**
 * Mock Data Generator Script
 *
 * This script generates JSON mock data using our faker setup.
 * It can be run standalone to produce mock.json files.
 */

import { writeFileSync } from 'fs'
import path, { join } from 'path'
import { faker } from './faker'
import { Card, Deck, Tag } from '@madrasah/services/tedrisat'

export interface MockData {
  cards: Card[]
  decks: Deck[]
  tags: Tag[]
  metadata: {
    generatedAt: string
    totalRecords: number
    relationships: Record<string, unknown>
  }
}

interface GenerationConfig {
  decks: number
  cards: number
  tags: number
}

function generateMockData(config: GenerationConfig = { decks: 5, cards: 20, tags: 8 }): MockData {
  console.log('🚀 Starting mock data generation...')

  // Generate decks first to establish relationships
  console.log(`📝 Generating ${config.decks} decks...`)
  const decks = Array.from({ length: config.decks }, () => faker.tedrisat.deck())

  // Generate cards with proper deck_id relationships
  console.log(`📝 Generating ${config.cards} cards with deck relationships...`)
  const cards = Array.from({ length: config.cards }, () => {
    const card = faker.tedrisat.card()
    // Assign a random deck_id from generated decks
    if (decks.length > 0) {
      card.deck_id = faker.helpers.arrayElement(decks).id
    }
    return card
  })

  // Generate tags
  console.log(`� Generating ${config.tags} tags...`)
  const tags = Array.from({ length: config.tags }, () => faker.tedrisat.tag())

  const mockData: MockData = {
    cards,
    decks,
    tags,
    metadata: {
      generatedAt: new Date().toISOString(),
      totalRecords: cards.length + decks.length + tags.length,
      relationships: {
        decks_count: decks.length,
        cards_count: cards.length,
        tags_count: tags.length,
        cards_with_deck_relations: cards.filter(card =>
          typeof card === 'object' && card !== null && 'deck_id' in card,
        ).length,
      },
    },
  }

  console.log('✅ Mock data generation completed!')
  console.log(`📊 Generated ${mockData.metadata.totalRecords} total records`)
  console.log(`   - ${decks.length} decks`)
  console.log(`   - ${cards.length} cards`)
  console.log(`   - ${tags.length} tags`)

  return mockData
}

function saveMockData(data: MockData, outputPath?: string): void {
  const defaultPath = join(process.cwd(), 'mock-data.json')
  const filePath = outputPath || defaultPath

  console.log(`💾 Saving mock data to: ${filePath}`)

  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
    console.log('✅ Mock data saved successfully!')
  }
  catch (error) {
    console.error('❌ Error saving mock data:', error)
    process.exit(1)
  }
}

// Main execution
if (process.argv[1]?.endsWith('generate-mock.ts')) {
  try {
    const mockData = generateMockData()

    // Get output path from command line args
    const outputPath = path.dirname(process.argv[1]) + '/mock-data.json'

    saveMockData(mockData, outputPath)

    console.log('\n🎉 Mock data generation script completed successfully!')
    console.log('Usage: npm run generate-mocks [output-path]')
    console.log('Example: npm run generate-mocks ./data/mock-data.json')
  }
  catch (error) {
    console.error('❌ Mock data generation failed:', error)
    process.exit(1)
  }
}

export { generateMockData, saveMockData }
