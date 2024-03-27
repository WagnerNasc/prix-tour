import { RepositoryFactory } from '@repositories/factory.repository'
import { ListCitiesUseCase } from '@use-cases/city/list-cities.use-case'

export function makeListCitiesUseCase() {
  const cityRepository = RepositoryFactory.makeCityRepository()
  const listCityUseCase = new ListCitiesUseCase(cityRepository)

  return listCityUseCase
}
