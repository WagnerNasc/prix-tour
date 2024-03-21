import { OmitProps } from '@/helpers/omit'
import { randomUUID as uuid } from 'crypto'
import { City } from '../interfaces/city-interface'
import { ICityRepository } from '@/repositories/interfaces/city-repository-interface'

export class CreateCityUseCase {
  constructor(private cityRepository: ICityRepository) {}

  public async execute(city: OmitProps<City, 'id'>) {
    const newCity: City = {
      id: uuid(),
      ...city,
    }
    await this.cityRepository.create(newCity)
  }
}
