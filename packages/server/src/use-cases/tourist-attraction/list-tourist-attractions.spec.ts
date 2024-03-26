import { InMemoryTouristAttractionRepository } from '@test/in-memory/in-memory-tourist-attraction.repository'
import { ListTouristAttractionsUseCase } from './list-tourist-attractions.use-case'
import { makeTouristAttraction } from '@test/factories/make-tourist-attraction'

let inMemoryTouristAttractionRepository: InMemoryTouristAttractionRepository
let sut: ListTouristAttractionsUseCase

describe('List Tourist Attraction', () => {
  beforeEach(() => {
    inMemoryTouristAttractionRepository =
      new InMemoryTouristAttractionRepository()
    sut = new ListTouristAttractionsUseCase(inMemoryTouristAttractionRepository)
  })

  it('should be able to list tourist attractions', async () => {
    const touristAttraction1 = makeTouristAttraction({
      id: 'tourist-attraction-1',
    })
    const touristAttraction2 = makeTouristAttraction({
      id: 'tourist-attraction-2',
    })

    inMemoryTouristAttractionRepository.items.push(
      touristAttraction1,
      touristAttraction2,
    )
    const { data } = await sut.execute({
      page: 1,
    })

    expect(data).toEqual([
      expect.objectContaining({ id: 'tourist-attraction-1' }),
      expect.objectContaining({ id: 'tourist-attraction-2' }),
    ])
  })

  it('should not be able to paginated tourist attraction', async () => {
    for (let i = 1; i <= 12; i++) {
      inMemoryTouristAttractionRepository.items.push(
        makeTouristAttraction({
          id: `tourist-attraction-${i}`,
        }),
      )
    }

    const { data } = await sut.execute({
      page: 2,
    })

    expect(data).toHaveLength(2)
    expect(data).toEqual([
      expect.objectContaining({ id: 'tourist-attraction-11' }),
      expect.objectContaining({ id: 'tourist-attraction-12' }),
    ])
  })
})
