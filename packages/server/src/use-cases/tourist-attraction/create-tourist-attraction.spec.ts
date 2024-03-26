import { InMemoryTouristAttractionRepository } from '@test/in-memory/in-memory-tourist-attraction.repository'
import { CreateTouristAttractionUseCase } from './create-tourist-attraction.use-case'
import { InMemoryCityRepository } from '@test/in-memory/in-memory-city.repository'
import { makeTouristAttraction } from '@test/factories/make-tourist-attraction'
import { makeCity } from '@test/factories/make-city'
import { CityNotFound } from '@use-cases/errors'

let inMemoryTouristAttractionRepository: InMemoryTouristAttractionRepository
let inMemoryCityRepository: InMemoryCityRepository
let sut: CreateTouristAttractionUseCase

describe('Create Tourist Attraction', () => {
  beforeEach(() => {
    inMemoryTouristAttractionRepository =
      new InMemoryTouristAttractionRepository()
    inMemoryCityRepository = new InMemoryCityRepository()
    sut = new CreateTouristAttractionUseCase(
      inMemoryTouristAttractionRepository,
      inMemoryCityRepository,
    )
  })

  it('should be able to create a tourist attraction', async () => {
    const newCity = makeCity({})
    const newTouristAttraction = makeTouristAttraction({
      cityId: newCity.id,
    })

    inMemoryCityRepository.items.push(newCity)
    await sut.execute(newTouristAttraction)

    expect(inMemoryTouristAttractionRepository.items[0].id).toEqual(
      newTouristAttraction.id,
    )
  })

  it('should not be able to create a tourist attraction if cityId not exists', async () => {
    const newTouristAttraction = makeTouristAttraction({
      cityId: 'non-exists',
    })

    expect(() => {
      return sut.execute(newTouristAttraction)
    }).rejects.toBeInstanceOf(CityNotFound)
  })
})
