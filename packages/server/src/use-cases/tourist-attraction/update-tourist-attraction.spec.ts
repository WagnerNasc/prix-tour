import { InMemoryTouristAttractionRepository } from '@test/in-memory/in-memory-tourist-attraction.repository'
import { UpdateTouristAttractionsUseCase } from './update-tourist-attraction.use-case'
import { makeTouristAttraction } from '@test/factories/make-tourist-attraction'
import { TouristAttractionNotFound } from '@use-cases/errors'

let inMemoryTouristAttractionRepository: InMemoryTouristAttractionRepository
let sut: UpdateTouristAttractionsUseCase

describe('Update Tourist Attraction', () => {
  beforeEach(() => {
    inMemoryTouristAttractionRepository =
      new InMemoryTouristAttractionRepository()
    sut = new UpdateTouristAttractionsUseCase(
      inMemoryTouristAttractionRepository,
    )
  })

  it('should be able to update a tourist attraction', async () => {
    const newTouristAttraction = makeTouristAttraction({})

    inMemoryTouristAttractionRepository.items.push(newTouristAttraction)
    await sut.execute(newTouristAttraction)

    expect(inMemoryTouristAttractionRepository.items[0].updatedAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to update a tourist attraction if id not exists', async () => {
    const newTouristAttraction = makeTouristAttraction({})

    expect(() => {
      return sut.execute(newTouristAttraction)
    }).rejects.toBeInstanceOf(TouristAttractionNotFound)
  })
})
