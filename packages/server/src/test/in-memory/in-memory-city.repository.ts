import { ICityRepository } from '@repositories/interfaces/city-repository-interface'
import { City } from '@use-cases/interfaces/city-interface'

export interface CityDB extends City {
  updatedAt?: Date | null
  createdAt?: Date
  deletedAt?: Date | null
}

export class InMemoryCityRepository implements ICityRepository {
  public items: CityDB[] = []

  async findById(id: string): Promise<City | null> {
    const city = this.items.find(
      (item) => item.id === id && item.updatedAt === null,
    )

    if (!city) {
      return null
    }

    return city
  }

  async findManyWithFilter(
    page: number,
    filter?: string | undefined,
  ): Promise<{
    data: City[]
    total_list: number
    total_cities: number
    total_pages: number
  }> {
    const cities = this.items
      .filter((item) => item.deletedAt === null)
      .slice((page - 1) * 10, page * 10)

    if (!filter) {
      return {
        data: cities,
        total_list: cities.length,
        total_cities: this.items.length,
        total_pages: this.items.length / 10,
      }
    }

    const regex = new RegExp(filter, 'i') // get filter and change to lower case
    const citiesFiltered = cities.filter((item) => regex.test(item.name))

    return {
      data: citiesFiltered,
      total_list: citiesFiltered.length,
      total_cities: this.items.length,
      total_pages: this.items.length / 10,
    }
  }

  async create(city: City): Promise<void> {
    this.items.push({
      id: city.id,
      name: city.name,
      stateId: city.stateId,
      isCapital: city.isCapital,
      population: city.population,
      latitude: city.latitude,
      longitude: city.longitude,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    })
  }
}
