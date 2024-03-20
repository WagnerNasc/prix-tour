import { Pool } from 'pg'

export class Database {
  private static pool: Pool

  public static getPool(): Pool {
    if (!Database.pool) {
      Database.pool = new Pool({
        user: 'docker',
        database: 'prix-tour',
        port: 5432,
        password: 'docker',
        host: 'localhost',
      })
    }

    return Database.pool
  }
}
