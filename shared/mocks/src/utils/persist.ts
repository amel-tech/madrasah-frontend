import debounce from 'lodash/debounce'
import {
  DATABASE_INSTANCE,
  ENTITY_TYPE,
  PRIMARY_KEY,
  type FactoryAPI,
  type Entity,
  type ModelDictionary,
  type PrimaryKeyType,
} from '@mswjs/data/lib/glossary'
import {
  type SerializedEntity,
  SERIALIZED_INTERNAL_PROPERTIES_KEY,
} from '@mswjs/data/lib/db/Database'
import { inheritInternalProperties } from '@mswjs/data/lib/utils/inheritInternalProperties'

// Timout to persist state with some delay
const DEBOUNCE_PERSIST_TIME_MS = 10

type Models<Dictionary extends ModelDictionary> = Record<
  keyof Dictionary,
  Map<PrimaryKeyType, Entity<Dictionary, any>>
>

type SerializedModels<Dictionary extends ModelDictionary> = Record<
  keyof Dictionary,
  Array<SerializedEntity>
>

export interface StorageAdapter {
  getItem(key: string): string | null | Promise<string | null>
  setItem(key: string, value: string): void | Promise<void>
}

export default function persist<Dictionary extends ModelDictionary>(
  factory: FactoryAPI<Dictionary>,
  storage: StorageAdapter,
) {
  const db = factory[DATABASE_INSTANCE]

  const key = `mswjs-data/${db.id}`

  const persistState = debounce(async function persistState() {
    const models = db['models'] as Models<Dictionary>

    const serializeEntity = db['serializeEntity'] as (
      entity: Entity<Dictionary, any>,
    ) => SerializedEntity

    const json = Object.fromEntries(
      Object.entries(models).map(([modelName, entities]) => [
        modelName,
        Array.from(entities, ([, entity]) => serializeEntity(entity)),
      ]),
    )

    await storage.setItem(key, JSON.stringify(json))
  }, DEBOUNCE_PERSIST_TIME_MS)

  async function hydrateState() {
    const initialState = await storage.getItem(key)

    if (initialState) {
      const data = JSON.parse(initialState) as SerializedModels<Dictionary>

      for (const [modelName, entities] of Object.entries(data)) {
        for (const entity of entities) {
          // Avoid creating duplicates during hydration
          if (!db.has(modelName, entity.id)) {
            db.create(modelName, deserializeEntity(entity))
          }
        }
      }
    }

    // Add event listeners only after hydration
    db.events.on('create', persistState)
    db.events.on('update', persistState)
    db.events.on('delete', persistState)
  }

  hydrateState()
}

function deserializeEntity(entity: SerializedEntity) {
  const {
    [SERIALIZED_INTERNAL_PROPERTIES_KEY]: internalProperties,
    ...publicProperties
  } = entity

  inheritInternalProperties(publicProperties, {
    [ENTITY_TYPE]: internalProperties.entityType,
    [PRIMARY_KEY]: internalProperties.primaryKey,
  })

  return publicProperties as Entity<any, any>
}
