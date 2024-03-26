import { Database } from '@infra/database'
import { env } from '../src/env'
import fs from 'node:fs'

const databasePool = Database.getPool()

if (env.NODE_ENV !== 'production') {
  const seedQuery = fs.readFileSync('seeds/script.sql', {
    encoding: 'utf8',
  })
  databasePool.query(seedQuery, (err, res) => {
    console.log(err, res)
    console.log('Seeding Completed!')
    databasePool.end()
  })
}
