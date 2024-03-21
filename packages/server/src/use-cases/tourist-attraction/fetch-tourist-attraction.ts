import { ITouristAttractionRepository } from '@/repositories/interfaces/tourist-attraction-repository-interface'
import { TouristAttraction } from '../interfaces/tourist-attraction-interface'
import { TouristAttractionNotFound } from '../errors/tourist-attraction-not-found'

export class FetchTouristAttractionsUseCase {
  constructor(
    private touristAttractionRepository: ITouristAttractionRepository,
  ) {}

  public async execute(id: string): Promise<{
    data: TouristAttraction
  }> {
    const touristAttraction =
      await this.touristAttractionRepository.findById(id)

    if (!touristAttraction) {
      throw new TouristAttractionNotFound()
    }

    return touristAttraction
  }
}
