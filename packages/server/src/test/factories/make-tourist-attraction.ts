import { faker } from '@faker-js/faker'
import { TouristAttractionDB } from '@test/in-memory/in-memory-tourist-attraction.repository'

export function makeTouristAttraction(override: Partial<TouristAttractionDB>) {
  return {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    description: faker.lorem.sentence(),
    cityId: faker.string.uuid(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    deletedAt: null,
    updatedAt: null,
    createdAt: new Date(),
    ...override,
  }
}
