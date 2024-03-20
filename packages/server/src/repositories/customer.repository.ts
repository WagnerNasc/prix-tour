import { Pool } from 'pg'
import { Customer } from '../use-cases/interfaces/customer-interface'
import { ICustomerRepository } from './interfaces/customer-repository-interface'

export class CustomerRepository implements ICustomerRepository {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async findByEmail(email: string): Promise<Customer | null> {
    try {
      const queryResult = await this.pool.query(
        /* sql */ `SELECT * FROM customer WHERE email = $1`,
        [email],
      )

      const customers: Customer[] = queryResult.rows

      if (customers.length === 0) {
        return null
      }

      const customer: Customer = customers[0]

      return customer
    } catch (error) {
      console.error('Error to list customer:', error)
      throw error
    }
  }

  async findManyWithFilter(
    page: number,
    filter?: string,
  ): Promise<{ data: Customer[]; total: number }> {
    try {
      let query = /* sql */ `
        SELECT
          id,
          name,
          phone,
          email
        FROM
          customer
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
        FROM 
          customer
        ${
          filter
            ? `
          WHERE 
            (name ILIKE '%${filter}%' OR 
            email ILIKE '%${filter}%')
          `
            : ''
        }
      `

      const countResult = await this.pool.query(countQuery)
      const total = parseInt(countResult.rows[0].total, 10)

      const queryResult = await this.pool.query(query)
      const customers: Customer[] = queryResult.rows

      return { data: customers, total }
    } catch (error) {
      console.error('Error to list customer:', error)
      throw error
    }
  }

  async create(customer: Customer): Promise<void> {
    try {
      const query = {
        text: /* sql */ `
          INSERT INTO customer (id, name, email, phone) 
          VALUES ($1, $2, $3, $4)`,
        values: [customer.id, customer.name, customer.email, customer.phone],
      }

      await this.pool.query(query)
    } catch (error) {
      console.error('Error to create customer:', error)
      throw error
    }
  }
}
