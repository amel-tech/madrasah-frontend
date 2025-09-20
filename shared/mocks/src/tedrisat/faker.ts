import { Card, Tag, Deck } from '@madrasah/services/tedrisat'
import { en, Faker } from '@faker-js/faker'

export const tedrisat = {
  cardType(): string {
    return faker.helpers.arrayElement(['Başlangıç', 'Orta Seviye', 'İleri Seviye'])
  },

  card(id?: number): Card {
    if (id) faker.seed(id)

    return {
      id: id ?? faker.number.int(),
      author: faker.person.fullName(),
      is_public: faker.datatype.boolean(),
      content: {
        front: faker.word.adjective(),
        back: faker.lorem.paragraphs(1),
      },
      type: faker.helpers.arrayElement(['hadeeth', 'vocabulary']),
      image_source: faker.image.urlLoremFlickr({ category: 'nature', width: 640, height: 480 }),
    }
  },
  tag(id?: number): Tag {
    if (id) faker.seed(id)

    return {
      id: id ?? faker.number.int(),
      title: faker.lorem.word(),
    }
  },

  deck(id?: number): Deck {
    if (id) faker.seed(id)

    return {
      id: id ?? faker.number.int(),
      author: faker.person.fullName(),
      is_public: faker.datatype.boolean(),
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      stats: {
        cards_count: faker.number.int({ min: 3, max: 55 }),
        downloads_count: faker.number.int({ min: 0, max: 1000 }),
        rating: faker.number.int({ min: 1, max: 5 }),
      },
    }
  },
}

export type MadrasahFaker = Faker & { tedrisat: typeof tedrisat }
const faker: MadrasahFaker = new Faker({ locale: en }) as MadrasahFaker
faker.tedrisat = tedrisat

export { faker }
