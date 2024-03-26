import { ITouristAttractionRepository } from '@repositories/interfaces/tourist-attraction-repository-interface'
import { TouristAttractionNotFound } from '../errors'

export class InvalidTouristAttractionsUseCase {
  constructor(
    private touristAttractionRepository: ITouristAttractionRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const touristAttraction =
      await this.touristAttractionRepository.findById(id)

    if (!touristAttraction) {
      throw new TouristAttractionNotFound()
    }

    await this.touristAttractionRepository.delete(touristAttraction.data)
  }
}
