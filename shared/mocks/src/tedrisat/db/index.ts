import { factory, primaryKey } from '@mswjs/data'
import { faker } from '../faker'
import { seedDatabase } from './seed'

export const db = factory({
  card: {
    id: primaryKey(faker.number.int),
    type: () => faker.helpers.arrayElement(['hadeeth', 'vocabulary']),
    is_public: faker.datatype.boolean,
    author: faker.string.uuid,
    content: {
      front: faker.word.adjective,
      back: faker.lorem.paragraphs,
      note: faker.lorem.sentence,
    },
    image_source: () => faker.image.urlLoremFlickr({ category: 'nature' }),
    deck_id: faker.number.int,
  },
  deck: {
    id: primaryKey(faker.number.int),
    author: faker.string.uuid,
    title: faker.lorem.words,
    description: faker.lorem.paragraph,
    stats: {
      cards_count: faker.number.int,
      downloads_count: faker.number.int,
      rating: faker.number.float,
    },
    is_public: faker.datatype.boolean,
  },
  tag: {
    id: primaryKey(faker.number.int),
    title: faker.lorem.word,
  },
})

seedDatabase(db, faker)
