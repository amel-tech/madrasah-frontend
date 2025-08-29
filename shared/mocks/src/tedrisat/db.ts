import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'
import persist from '../utils/persist'
import { createWebSocketStorage } from '../utils/wsStorageAdapter'

const storage = createWebSocketStorage()

export const db = factory({
  card: {
    id: primaryKey(faker.number.int),
    author_id: faker.number.int,
    is_public: faker.datatype.boolean,
    content: {
      front: faker.word.adjective,
      back: faker.lorem.paragraphs,
    },
    type: () => faker.helpers.arrayElement(['hadeeth', 'vocabulary']),
    image_source: () => faker.image.urlLoremFlickr({ category: 'nature' }),
  },
  list: {
    id: primaryKey(faker.number.int),
    author_id: faker.number.int,
    is_public: faker.datatype.boolean,
    title: faker.lorem.words,
    description: faker.lorem.sentence,
  },
})

persist(db, storage)

setTimeout(() => {
  if (db.card.count() === 0) {
    db.card.create({
      id: 1,
      content: {
        front: 'Selam',
        back: 'Barış, esenlik',
      },
    })
  }

  if (db.list.count() === 0) {
    db.list.create({
      id: 1,
      title: 'My First List',
      description: 'A list of things to learn',
    })
  }
}, 1000) // Asenkron hidrasyona izin vermek için tohumlamayı geciktir
