import { ITouristAttractionRepository } from '@repositories/interfaces/tourist-attraction-repository-interface'
import { TouristAttraction } from '../interfaces/tourist-attraction-interface'
import { Paginated } from '@use-cases/interfaces/paginated-interface'

export class ListTouristAttractionsUseCase {
  constructor(
    private touristAttractionRepository: ITouristAttractionRepository,
  ) {}

  public async execute({ page, filter, pageSize }: Paginated): Promise<{
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
