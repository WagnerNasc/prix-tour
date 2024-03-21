import { Pool } from 'pg'
import { City } from '../use-cases/interfaces/city-interface'
import { ICityRepository } from './interfaces/city-repository-interface'

export class CityRepository implements ICityRepository {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async findById(id: string): Promise<City | null> {
    try {
      const queryResult = await this.pool.query(
        /* sql */ `SELECT * FROM city WHERE id = $1`,
        [id],
      )

      const cities: City[] = queryResult.rows

      if (cities.length === 0) {
        return null
      }

      const city: City = cities[0]

      return city
    } catch (error) {
      console.error('Error to find city:', error)
      throw error
    }
  }

  async findManyWithFilter(
    page: number,
    filter?: string,
  ): Promise<{ data: City[]; total: number }> {
    try {
      let query = /* sql */ `
        SELECT
          id,
          name,
          description,
          latitude,
          longitude
        FROM
          tourist_attraction
      `

      if (filter) {
        query += /* sql */ `
          WHERE 
            (name ILIKE '%${filter}%' OR 
            email ILIKE '%${filter}%')
        `
      }

      const offset = (page - 1) * 10

      query += /* sql */ `
        ORDER BY created_at DESC
        LIMIT 10
        OFFSET ${offset}
      `

      const countQuery = /* sql */ `
        SELECT 
          COUNT(*) as total 
        FROM (
          ${query}
        )
      `

      const countResult = await this.pool.query(countQuery)
      const total = parseInt(countResult.rows[0].total, 10)

      const queryResult = await this.pool.query(query)
      const cities: City[] = queryResult.rows

      return { data: cities, total }
    } catch (error) {
      console.error('Error to list cities:', error)
      throw error
    }
  }

  async create(City: City): Promise<void> {
    try {
      const query = {
        text: /* sql */ `
          INSERT INTO city (
            id, 
            name, 
            state, 
            country, 
            iso, 
            is_capital, 
            population, 
            population_proper, 
            latitude, 
            longitude) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        values: [
          City.id,
          City.name,
          City.state,
          City.country,
          City.iso,
          City.isCapital.toString(),
          City.population.toString(),
          City.populationProper.toString(),
          City.latitude.toString(),
          City.longitude.toString(),
        ],
      }

      await this.pool.query(query)
    } catch (error) {
      console.error('Error to create city:', error)
      throw error
    }
  }
}
