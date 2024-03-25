import { faker } from '@faker-js/faker'
import { CityDB } from '@test/in-memory/in-memory-city.repository'

export function makeCity(override: Partial<CityDB>) {
  return {
    id: faker.string.uuid(),
    name: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    iso: faker.location.countryCode(),
    isCapital: faker.datatype.boolean(),
    population: faker.number.float(),
    populationProper: faker.number.float(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    deletedAt: null,
    updatedAt: null,
    createdAt: new Date(),
    ...override,
  }
}
