import { ITouristAttractionRepository } from '@repositories/interfaces/tourist-attraction-repository-interface'
import { TouristAttractionNotFound } from '../errors'
import { TouristAttraction } from '@use-cases/interfaces/tourist-attraction-interface'
import { OmitProps } from '@helpers/omit'
import { Optional } from '@helpers/optional'

export class UpdateTouristAttractionsUseCase {
  constructor(
    private touristAttractionRepository: ITouristAttractionRepository,
  ) {}

  public async execute(
    touristAttraction: Optional<
      OmitProps<TouristAttraction, 'cityId' | 'latitude' | 'longitude'>,
      'name'
    >,
  ): Promise<void> {
    const foundTouristAttraction =
      await this.touristAttractionRepository.findById(touristAttraction.id)

    if (!foundTouristAttraction) {
      throw new TouristAttractionNotFound()
    }

    await this.touristAttractionRepository.update(touristAttraction)
  }
}
