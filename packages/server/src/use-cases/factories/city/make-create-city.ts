import { CreateCityUseCase } from '../../city/create'
import { RepositoryFactory } from '@repositories/factory.repository'

export function makeCreateCityUseCase() {
  const cityRepository = RepositoryFactory.makeCityRepository()
  const listCityUseCase = new CreateCityUseCase(cityRepository)

  return listCityUseCase
}
