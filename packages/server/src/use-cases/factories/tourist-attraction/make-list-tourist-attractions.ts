import { RepositoryFactory } from '@repositories/factory.repository'
import { ListTouristAttractionsUseCase } from '@use-cases/tourist-attraction/list-tourist-attractions.use-case'

export function makeListTouristAttractionsUseCase() {
  const touristAttractionRepository =
    RepositoryFactory.makeTouristAttractionRepository()
  const listTouristAttractionUseCase = new ListTouristAttractionsUseCase(
    touristAttractionRepository,
  )

  return listTouristAttractionUseCase
}
