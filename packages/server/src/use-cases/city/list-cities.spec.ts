import { InMemoryCityRepository } from '@test/in-memory/in-memory-city.repository'
import { ListCitiesUseCase } from './list-cities.use-case'
import { makeCity } from '@test/factories/make-city'

let inMemoryCityRepository: InMemoryCityRepository
let sut: ListCitiesUseCase

describe('List City', () => {
  beforeEach(() => {
    inMemoryCityRepository = new InMemoryCityRepository()
    sut = new ListCitiesUseCase(inMemoryCityRepository)
  })

  it('should be able to list cities', async () => {
    const city1 = makeCity({
      id: 'city-1',
    })
    const city2 = makeCity({
      id: 'city-2',
    })

    inMemoryCityRepository.items.push(city1, city2)
    const { data } = await sut.execute({
      page: 1,
      pageSize: 10,
    })

    expect(data).toEqual([
      expect.objectContaining({ id: 'city-1' }),
      expect.objectContaining({ id: 'city-2' }),
    ])
  })

  it('should not be able to paginated cities', async () => {
    for (let i = 1; i <= 12; i++) {
      inMemoryCityRepository.items.push(
        makeCity({
          id: `city-${i}`,
        }),
      )
    }

    const { data } = await sut.execute({
      page: 2,
      pageSize: 10,
    })

    expect(data).toHaveLength(2)
    expect(data).toEqual([
      expect.objectContaining({ id: 'city-11' }),
      expect.objectContaining({ id: 'city-12' }),
    ])
  })
})
