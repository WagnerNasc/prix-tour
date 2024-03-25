import { OmitProps } from '@helpers/omit'
import { Optional } from '@helpers/optional'
import { ITouristAttractionRepository } from '@repositories/interfaces/tourist-attraction-repository-interface'
import { TouristAttraction } from '@use-cases/interfaces/tourist-attraction-interface'

export interface TouristAttractionDB extends TouristAttraction {
  updatedAt?: Date | null
  createdAt?: Date
  deletedAt?: Date | null
}

export class InMemoryTouristAttractionRepository
  implements ITouristAttractionRepository
{
  public items: TouristAttractionDB[] = []

  async findById(id: string): Promise<{ data: TouristAttraction } | null> {
    const touristAttraction = this.items.find(
      (item) => item.id === id && item.updatedAt === null,
    )

    if (!touristAttraction) {
      return null
    }

    return {
      data: touristAttraction,
    }
  }

  async findManyWithFilter(
    page: number,
    filter?: string | undefined,
  ): Promise<{ data: TouristAttraction[]; total: number }> {
    const touristAttractions = this.items
      .filter((item) => item.deletedAt === null)
      .slice((page - 1) * 10, page * 10)

    if (!filter) {
      return {
        data: touristAttractions,
        total: touristAttractions.length,
      }
    }

    const regex = new RegExp(filter, 'i') // get filter and change to lower case
    const touristAttractionsFiltered = touristAttractions.filter((item) =>
      regex.test(item.name),
    )

    return {
      data: touristAttractionsFiltered,
      total: touristAttractionsFiltered.length,
    }
  }

  async delete(touristAttraction: TouristAttraction): Promise<void> {
    const touristAttractionIndex = this.items.findIndex(
      (item) => item.id === touristAttraction.id,
    )

    if (touristAttractionIndex >= 0) {
      this.items[touristAttractionIndex].deletedAt = new Date()
    }
  }

  async update(
    touristAttraction: Optional<
      OmitProps<TouristAttraction, 'latitude' | 'longitude' | 'cityId'>,
      'name'
    >,
  ): Promise<void> {
    const touristAttractionIndex = this.items.findIndex(
      (item) => item.id === touristAttraction.id,
    )

    if (touristAttractionIndex >= 0) {
      if (touristAttraction.name) {
        this.items[touristAttractionIndex].name = touristAttraction.name
      }
      this.items[touristAttractionIndex].description =
        touristAttraction.description
      this.items[touristAttractionIndex].updatedAt = new Date()
    }
  }

  async create(touristAttraction: TouristAttraction): Promise<void> {
    this.items.push({
      id: touristAttraction.id,
      name: touristAttraction.name,
      description: touristAttraction.description,
      cityId: touristAttraction.cityId,
      latitude: touristAttraction.latitude,
      longitude: touristAttraction.longitude,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    })
  }
}
