import { CreateCityUseCase } from '../../city/create-city-use-case'
import { RepositoryFactory } from '@repositories/factory.repository'

export function makeCreateCityUseCase() {
  const cityRepository = RepositoryFactory.makeCityRepository()
  const createCityUseCase = new CreateCityUseCase(cityRepository)

  return createCityUseCase
}
