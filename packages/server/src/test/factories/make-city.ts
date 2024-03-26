import { faker } from '@faker-js/faker'
import { CityDB } from '@test/in-memory/in-memory-city.repository'

export function makeCity(override: Partial<CityDB>) {
  return {
    id: faker.string.uuid(),
    name: faker.location.city(),
    stateId: faker.string.uuid(),
    isCapital: faker.datatype.boolean(),
    population: faker.number.float(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    deletedAt: null,
    updatedAt: null,
    createdAt: new Date(),
    ...override,
  }
}
