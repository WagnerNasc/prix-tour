import { Database } from '../infra/database'
import { Pool } from 'pg'
import { CityRepository } from './city.repository'
import { TouristAttractionRepository } from './tourist-attraction.repository'

export class RepositoryFactory {
  private static pool: Pool = Database.getPool()

  static makeCityRepository(): CityRepository {
    return new CityRepository(this.pool)
  }

  static makeTouristAttractionRepository(): TouristAttractionRepository {
    return new TouristAttractionRepository(this.pool)
  }
}
