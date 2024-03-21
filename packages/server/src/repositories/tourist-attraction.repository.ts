import { Pool } from 'pg'
import { TouristAttraction } from '../use-cases/interfaces/tourist-attraction-interface'
import { ITouristAttractionRepository } from './interfaces/tourist-attraction-repository-interface'

export class TouristAttractionRepository
  implements ITouristAttractionRepository
{
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async findById(id: string): Promise<{ data: TouristAttraction } | null> {
    try {
      const queryResult = await this.pool.query(
        /* sql */ `SELECT * FROM tourist_attraction WHERE id = $1`,
        [id],
      )

      const touristAttractions: TouristAttraction[] = queryResult.rows

      if (touristAttractions.length === 0) {
        return null
      }

      const touristAttraction: TouristAttraction = touristAttractions[0]

      return { data: touristAttraction }
    } catch (error) {
      console.error('Error to find tourist attraction:', error)
      throw error
    }
  }

  async findManyWithFilter(
    page: number,
    filter?: string,
  ): Promise<{ data: TouristAttraction[]; total: number }> {
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
            name ILIKE '%${filter}%'
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
      const touristAttractions: TouristAttraction[] = queryResult.rows

      return { data: touristAttractions, total }
    } catch (error) {
      console.error('Error to list tourist attractions:', error)
      throw error
    }
  }

  async create(TouristAttraction: TouristAttraction): Promise<void> {
    try {
      const query = {
        text: /* sql */ `
          INSERT INTO tourist_attraction (id, name, description, latitude, longitude) 
          VALUES ($1, $2, $3, $4, $5)`,
        values: [
          TouristAttraction.id,
          TouristAttraction.name,
          TouristAttraction.description,
          TouristAttraction.latitude.toString(),
          TouristAttraction.longitude.toString(),
        ],
      }

      await this.pool.query(query)
    } catch (error) {
      console.error('Error to create tourist attraction:', error)
      throw error
    }
  }
}
