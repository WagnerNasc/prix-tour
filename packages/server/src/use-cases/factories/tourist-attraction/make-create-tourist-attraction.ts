import { RepositoryFactory } from '@repositories/factory.repository'
import { CreateTouristAttractionUseCase } from '@use-cases/tourist-attraction/create-tourist-attraction.use-case'

export function makeCreateTouristAttractionUseCase() {
  const touristAttractionRepository =
    RepositoryFactory.makeTouristAttractionRepository()
  const cityRepository = RepositoryFactory.makeCityRepository()
  const createTouristAttractionUseCase = new CreateTouristAttractionUseCase(
    touristAttractionRepository,
    cityRepository,
  )

  return createTouristAttractionUseCase
}
