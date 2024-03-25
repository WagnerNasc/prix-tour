import { InMemoryCityRepository } from '@test/in-memory/in-memory-city.repository'
import { makeCity } from '@test/factories/make-city'
import { CreateCityUseCase } from './create'

let inMemoryCityRepository: InMemoryCityRepository
let sut: CreateCityUseCase

describe('Create City', () => {
  beforeEach(() => {
    inMemoryCityRepository = new InMemoryCityRepository()
    sut = new CreateCityUseCase(inMemoryCityRepository)
  })

  it('should be able to create a city', async () => {
    const newCity = makeCity({})

    await sut.execute(newCity)

    expect(inMemoryCityRepository.items[0].id).toEqual(newCity.id)
  })
})
