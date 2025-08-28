import { Card, List } from '@madrasah/services/tedrisat';
import { en, Faker } from '@faker-js/faker';

export const tedrisat = {
  cardType(): string {
    return faker.helpers.arrayElement(['Başlangıç', 'Orta Seviye', 'İleri Seviye']);
  },

  card(id?: number): Card {
    if(id) faker.seed(id);

    return {
        id: id ?? faker.number.int(),
        author_id: faker.number.int(),
        is_public: faker.datatype.boolean(),
        content: {
          front: faker.word.adjective(),
          back: faker.lorem.paragraphs(1),
        },
        type: faker.helpers.arrayElement(['hadeeth', 'vocabulary']),
        image_source: faker.image.urlLoremFlickr({ category: 'nature', width: 640, height: 480 }),
    };
  },

  list(id?: number): List {
    if(id) faker.seed(id);

    return {
        id: id ?? faker.number.int(),
        author_id: faker.number.int(),
        is_public: faker.datatype.boolean(),
        title: faker.lorem.words(3),
        description: faker.lorem.sentence()
    };
  }
};

export type MadrasahFaker = Faker & { tedrisat: typeof tedrisat; };
const faker: MadrasahFaker = new Faker({ locale: en }) as MadrasahFaker;
faker.tedrisat = tedrisat;

export { faker };