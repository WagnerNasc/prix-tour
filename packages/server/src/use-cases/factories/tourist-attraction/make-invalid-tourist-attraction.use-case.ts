import { RepositoryFactory } from '@repositories/factory.repository'
import { InvalidTouristAttractionsUseCase } from '@use-cases/tourist-attraction/invalid-tourist-attraction'

export function makeInvalidTouristAttractionUseCase() {
  const touristAttractionRepository =
    RepositoryFactory.makeTouristAttractionRepository()
  const invalidTouristAttractionUseCase = new InvalidTouristAttractionsUseCase(
    touristAttractionRepository,
  )

  return invalidTouristAttractionUseCase
}
