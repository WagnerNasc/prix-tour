import { Pool } from 'pg'
import { City } from '../use-cases/interfaces/city-interface'
import { ICityRepository } from './interfaces/city-repository-interface'
import { Paginated } from '@use-cases/interfaces/paginated-interface'
import { StateCity } from '@use-cases/interfaces/state-city-interface'

export class CityRepository implements ICityRepository {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async findById(id: string): Promise<City | null> {
    try {
      const queryResult = await this.pool.query(
        /* sql */ `
          SELECT 
            * 
          FROM 
            city 
          WHERE id = $1 AND   
          deleted_at IS NULL`,
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

  async findManyWithFilter({ page, filter, pageSize }: Paginated): Promise<{
    data: StateCity[]
    total_list: number
    total_cities: number
    total_pages: number
  }> {
    try {
      let query = /* sql */ `
        SELECT
          c.id,
          c.name,
          s.name AS state_name,
          s.code AS state_code,
          c.is_capital,
          c.latitude,
          c.longitude,
          c.created_at
        FROM
          city c
        JOIN
          state s ON (c.state_id = s.id)
        WHERE c.deleted_at IS NULL
      `
      // TODO: SQL Injection
      if (filter) {
        query += /* sql */ `
          AND
            c.name ILIKE '%${filter}%'
        `
      }

      const offset = (page - 1) * pageSize

      query += /* sql */ `
        ORDER BY c.created_at DESC
        LIMIT ${pageSize}
        OFFSET ${offset}
      `

      const countTotalListQuery = /* sql */ `
        SELECT 
          COUNT(*) as total_list
        FROM (
          ${query}
        )
      `

      const countQueryTotalCities = /* sql */ `
        SELECT 
          COUNT(*) as total_cities
        FROM
          city
      `

      const countTotalList = await this.pool.query(countTotalListQuery)
      const countTotalCities = await this.pool.query(countQueryTotalCities)
      const totalList = parseInt(countTotalList.rows[0].total_list, pageSize)
      const totalCities = parseInt(countTotalCities.rows[0].total_cities)

      const queryResult = await this.pool.query(query)
      const cities: StateCity[] = queryResult.rows

      return {
        data: cities,
        total_list: totalList,
        total_cities: totalCities,
        total_pages: totalCities / pageSize,
      }
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
            state_id, 
            is_capital, 
            population, 
            latitude, 
            longitude) 
          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        values: [
          City.id,
          City.name,
          City.stateId,
          City.isCapital.toString(),
          City.population.toString(),
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
