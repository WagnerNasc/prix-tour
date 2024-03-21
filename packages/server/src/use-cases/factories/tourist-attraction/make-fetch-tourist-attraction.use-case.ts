import { FetchTouristAttractionsUseCase } from '@use-cases/tourist-attraction/fetch-tourist-attraction'
import { RepositoryFactory } from '@repositories/factory.repository'

export function makeFetchTouristAttractionUseCase() {
  const touristAttractionRepository =
    RepositoryFactory.makeTouristAttractionRepository()
  const fetchTouristAttractionUseCase = new FetchTouristAttractionsUseCase(
    touristAttractionRepository,
  )

  return fetchTouristAttractionUseCase
}
