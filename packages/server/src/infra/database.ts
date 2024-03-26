import { env } from '../env'
import { Pool } from 'pg'

export class Database {
  private static pool: Pool

  public static getPool(): Pool {
    if (!Database.pool) {
      Database.pool = new Pool({
        user: env.DATABASE_USER,
        database: env.DATABASE_NAME,
        port: env.DATABASE_PORT,
        password: env.DATABASE_PASSWORD,
        host: env.DATABASE_HOST,
      })
    }

    return Database.pool
  }
}
