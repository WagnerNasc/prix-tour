import { ICityRepository } from '@repositories/interfaces/city-repository-interface'
import { City } from '../interfaces/city-interface'

interface ListCitiesUseCaseRequest {
  page: number
  filter?: string
}

export class ListCitiesUseCase {
  constructor(private cityRepository: ICityRepository) {}

  public async execute({ filter, page }: ListCitiesUseCaseRequest): Promise<{
    data: City[]
    total: number
  }> {
    return this.cityRepository.findManyWithFilter(page, filter)
  }
}
