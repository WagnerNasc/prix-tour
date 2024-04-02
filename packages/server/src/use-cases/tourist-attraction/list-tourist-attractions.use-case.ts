import { ITouristAttractionRepository } from '@repositories/interfaces/tourist-attraction-repository-interface'
import { TouristAttraction } from '../interfaces/tourist-attraction-interface'

export interface ListTouristAttractionsUseCaseRequest {
  page: number
  filter?: string
  pageSize: number
}

export class ListTouristAttractionsUseCase {
  constructor(
    private touristAttractionRepository: ITouristAttractionRepository,
  ) {}

  public async execute({
    page,
    filter,
    pageSize,
  }: ListTouristAttractionsUseCaseRequest): Promise<{
    data: TouristAttraction[]
    total: number
  }> {
    return this.touristAttractionRepository.findManyWithFilter({
      page,
      pageSize,
      filter,
    })
  }
}
