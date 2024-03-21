import { RepositoryFactory } from '@repositories/factory.repository'
import { UpdateTouristAttractionsUseCase } from '@use-cases/tourist-attraction/update-tourist-attraction'

export function makeUpdateTouristAttractionUseCase() {
  const touristAttractionRepository =
    RepositoryFactory.makeTouristAttractionRepository()
  const updateTouristAttractionUseCase = new UpdateTouristAttractionsUseCase(
    touristAttractionRepository,
  )

  return updateTouristAttractionUseCase
}
