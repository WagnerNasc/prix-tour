import { InMemoryTouristAttractionRepository } from '@test/in-memory/in-memory-tourist-attraction.repository'
import { FetchTouristAttractionsUseCase } from './fetch-tourist-attraction'
import { makeTouristAttraction } from '@test/factories/make-tourist-attraction'
import { TouristAttractionNotFound } from '@use-cases/errors'

let inMemoryTouristAttractionRepository: InMemoryTouristAttractionRepository
let sut: FetchTouristAttractionsUseCase

describe('Fetch Tourist Attraction', () => {
  beforeEach(() => {
    inMemoryTouristAttractionRepository =
      new InMemoryTouristAttractionRepository()
    sut = new FetchTouristAttractionsUseCase(
      inMemoryTouristAttractionRepository,
    )
  })

  it('should be able to fetch a tourist attraction', async () => {
    const newTouristAttraction = makeTouristAttraction({})

    inMemoryTouristAttractionRepository.items.push(newTouristAttraction)
    const { data } = await sut.execute(newTouristAttraction.id)

    expect(data.id).toEqual(newTouristAttraction.id)
  })

  it('should not be able to fetch a tourist attraction if id not exists', async () => {
    expect(() => {
      return sut.execute('non-exists')
    }).rejects.toBeInstanceOf(TouristAttractionNotFound)
  })
})
