import { OmitProps } from '@helpers/omit'
import { randomUUID as uuid } from 'crypto'
import { TouristAttraction } from '@use-cases/interfaces/tourist-attraction-interface'
import { ICityRepository } from '../../repositories/interfaces/city-repository-interface'
import { ITouristAttractionRepository } from '../../repositories/interfaces/tourist-attraction-repository-interface'
import { CityNotFound } from '../errors'

export class CreateTouristAttractionUseCase {
  constructor(
    private touristAttractionRepository: ITouristAttractionRepository,
    private cityRepository: ICityRepository,
  ) {}

  public async execute(touristAttraction: OmitProps<TouristAttraction, 'id'>) {
    const cityNotFound = await this.cityRepository.findById(
      touristAttraction.cityId,
    )

    if (!cityNotFound) {
      throw new CityNotFound()
    }

    const newTouristAttraction: TouristAttraction = {
      id: uuid(),
      ...touristAttraction,
    }
    await this.touristAttractionRepository.create(newTouristAttraction)
  }
}
