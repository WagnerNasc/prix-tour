import { ICityRepository } from '@repositories/interfaces/city-repository-interface'
import { City } from '../interfaces/city-interface'
import { Paginated } from '@use-cases/interfaces/paginated-interface'

export class ListCitiesUseCase {
  constructor(private cityRepository: ICityRepository) {}

  public async execute({ filter, page, pageSize }: Paginated): Promise<{
    data: City[]
    total_list: number
    total_cities: number
    total_pages: number
  }> {
    return this.cityRepository.findManyWithFilter({ page, filter, pageSize })
  }
}
