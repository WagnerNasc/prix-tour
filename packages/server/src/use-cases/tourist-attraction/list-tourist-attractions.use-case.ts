import { ITouristAttractionRepository } from '@/repositories/interfaces/tourist-attraction-repository-interface'
import { TouristAttraction } from '../interfaces/tourist-attraction-interface'

interface ListTouristAttractionsUseCaseRequest {
  page: number
  filter?: string
}

export class ListTouristAttractionsUseCase {
  constructor(
    private touristAttractionRepository: ITouristAttractionRepository,
  ) {}

  public async execute({
    filter,
    page,
  }: ListTouristAttractionsUseCaseRequest): Promise<{
    data: TouristAttraction[]
    total: number
  }> {
    return this.touristAttractionRepository.findManyWithFilter(page, filter)
  }
}
