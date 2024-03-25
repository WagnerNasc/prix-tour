import { City } from '@use-cases/interfaces/city-interface'

export interface ICityRepository {
  findById(id: string): Promise<City | null>
  findManyWithFilter(
    page: number,
    filter?: string,
  ): Promise<{ data: City[]; total: number }>
  create(city: City): Promise<void>
}
