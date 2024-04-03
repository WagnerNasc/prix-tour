import { Pool } from 'pg'
import { TouristAttraction } from '../use-cases/interfaces/tourist-attraction-interface'
import { ITouristAttractionRepository } from './interfaces/tourist-attraction-repository-interface'
import { Optional } from '@helpers/optional'
import { OmitProps } from '@helpers/omit'
import { Paginated } from '@use-cases/interfaces/paginated-interface'

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
        /* sql */ `
          SELECT 
            id,
            name,
            description,
            image_link,
            latitude,
            longitude,
            created_at
          FROM 
            tourist_attraction 
          WHERE id = $1 AND   
          deleted_at IS NULL
        `,
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

  async findManyWithFilter({
    page,
    filter,
    pageSize,
  }: Paginated): Promise<{ data: TouristAttraction[]; total: number }> {
    try {
      let query = /* sql */ `
        SELECT
          id,
          name,
          description,
          image_link,
          latitude,
          longitude,
          created_at
        FROM
          tourist_attraction
        WHERE deleted_at IS NULL
      `
      // TODO: SQL Injection
      if (filter) {
        query += /* sql */ `
          AND
            name ILIKE '%${filter}%'
        `
      }

      const offset = (page - 1) * pageSize

      query += /* sql */ `
        ORDER BY created_at DESC
        LIMIT ${pageSize}
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
      const total = parseInt(countResult.rows[0].total, pageSize)

      const queryResult = await this.pool.query(query)
      const touristAttractions: TouristAttraction[] = queryResult.rows

      return { data: touristAttractions, total }
    } catch (error) {
      console.error('Error to list tourist attractions:', error)
      throw error
    }
  }

  async delete(touristAttraction: TouristAttraction): Promise<void> {
    try {
      const query = {
        text: /* sql */ `
          UPDATE tourist_attraction 
          SET deleted_at = NOW() 
          WHERE id = $1`,
        values: [touristAttraction.id],
      }

      await this.pool.query(query)
    } catch (error) {
      console.error('Error deleting tourist attraction:', error)
      throw error
    }
  }

  async update(
    touristAttraction: Optional<
      OmitProps<TouristAttraction, 'cityId' | 'latitude' | 'longitude'>,
      'name'
    >,
  ): Promise<void> {
    try {
      const namesToUpdate = ['id', 'description']
      const values = [touristAttraction.id, touristAttraction.description]

      if (touristAttraction.name) {
        namesToUpdate.push('name')
        values.push(touristAttraction.name)
      }

      const placeholders = namesToUpdate.map((_, i) => '$' + (i + 1)).join(', ')

      const query = `
        UPDATE 
          tourist_attraction 
        SET (${namesToUpdate.join(', ')}) = (${placeholders})  
        WHERE 
          id = $1`

      await this.pool.query(query, values)
    } catch (error) {
      console.error('Error updating tourist attraction:', error)
      throw error
    }
  }

  async create(touristAttraction: TouristAttraction): Promise<void> {
    try {
      const query = {
        text: /* sql */ `
          INSERT INTO tourist_attraction (id, name, description, city_id, image_link, latitude, longitude) 
          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        values: [
          touristAttraction.id,
          touristAttraction.name,
          touristAttraction.description,
          touristAttraction.cityId,
          touristAttraction.imageLink ?? '',
          touristAttraction.latitude.toString(),
          touristAttraction.longitude.toString(),
        ],
      }

      await this.pool.query(query)
    } catch (error) {
      console.error('Error to create tourist attraction:', error)
      throw error
    }
  }
}
