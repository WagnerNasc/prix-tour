import { City } from '@use-cases/interfaces/city-interface'
import { Paginated } from '@use-cases/interfaces/paginated-interface'

export interface ICityRepository {
  findById(id: string): Promise<City | null>
  findManyWithFilter({ page, filter, pageSize }: Paginated): Promise<{
    data: City[]
    total_list: number
    total_cities: number
    total_pages: number
  }>
  create(city: City): Promise<void>
}
