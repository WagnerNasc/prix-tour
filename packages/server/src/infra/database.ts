import { env } from '@env'
import fs from 'node:fs'
import path from 'node:path'
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

  static async seed() {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')
      const sqlDirectory = path.join(__dirname, 'db', 'seeds')
      const sqlFiles = fs.readdirSync(sqlDirectory)
      for (const file of sqlFiles) {
        const sql = fs.readFileSync(path.join(sqlDirectory, file), 'utf8')
        await client.query(sql)
      }
      await client.query('COMMIT')
      console.log('Seed successfully executed!')
    } catch (err) {
      await client.query('ROLLBACK')
      console.error('Error when executing seed', err)
    } finally {
      client.release()
    }
  }
}
