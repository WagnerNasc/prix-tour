import { City } from '@use-cases/interfaces/city-interface'

export interface ICityRepository {
  findById(id: string): Promise<City | null>
  findManyWithFilter(
    page: number,
    filter?: string
  ): Promise<{
    data: City[]
    total_list: number
    total_cities: number
    total_pages: number
  }>
  create(city: City): Promise<void>
}
