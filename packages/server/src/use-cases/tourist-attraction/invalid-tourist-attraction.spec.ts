import { InMemoryTouristAttractionRepository } from '@test/in-memory/in-memory-tourist-attraction.repository'
import { InvalidTouristAttractionsUseCase } from './invalid-tourist-attraction'
import { makeTouristAttraction } from '@test/factories/make-tourist-attraction'
import { TouristAttractionNotFound } from '@use-cases/errors'

let inMemoryTouristAttractionRepository: InMemoryTouristAttractionRepository
let sut: InvalidTouristAttractionsUseCase

describe('Invalid Tourist Attraction', () => {
  beforeEach(() => {
    inMemoryTouristAttractionRepository =
      new InMemoryTouristAttractionRepository()
    sut = new InvalidTouristAttractionsUseCase(
      inMemoryTouristAttractionRepository,
    )
  })

  it('should be able to invalidate a tourist attraction', async () => {
    const newTouristAttraction = makeTouristAttraction({})

    inMemoryTouristAttractionRepository.items.push(newTouristAttraction)
    await sut.execute(newTouristAttraction.id)

    expect(inMemoryTouristAttractionRepository.items[0].deletedAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to invalidate a tourist attraction if id not exists', async () => {
    expect(() => {
      return sut.execute('non-exists')
    }).rejects.toBeInstanceOf(TouristAttractionNotFound)
  })
})
