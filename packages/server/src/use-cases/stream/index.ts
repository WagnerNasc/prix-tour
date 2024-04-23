import { Readable, Transform, Writable } from 'stream'
import { Client } from 'pg'

import {
  MapperAnonymizationData,
  MapperAnonymizationDataResponse,
} from 'src/util/anonymizer/mapper'

interface QueryResponse extends MapperAnonymizationDataResponse {
  limit: number
  offset: number
}

async function connectDatabase() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    password: 'postgres',
  })

  await client.connect()

  return { client }
}

const query = ({
  schema,
  table: { name, fields },
}: MapperAnonymizationDataResponse) => {
  const adaptedFields = fields.join(',').replace(/,(\s*)$/, '$1')
  const queryMounted = `
  SELECT
    ${adaptedFields}
    FROM ${schema}.${name} 
  `
  // LIMIT ${10} OFFSET ${1}

  return queryMounted
}

function createReadableStream(client: Client, query: string) {
  const queryStream = new Readable({
    objectMode: true,
    read() {
      console.log('READABLE')

      client.query(query, (error, result) => {
        if (error) {
          this.emit('error', error)
        } else {
          result.rows.forEach((row) => {
            this.push(row)
          })
        }
        this.push(null)
      })
    },
  })
  return queryStream
}

function createTransformStream(mapper: MapperAnonymizationDataResponse) {
  const transformStream = new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      try {
        console.log('TRANSFORM')

        const table = mapper.table

        for (const key in chunk) {
          if (!chunk[key]) continue
          if (table.fields.includes(key)) {
            if (!table.fieldFunctions) {
              console.log('Not found fieldFunctions')
              break
            }

            chunk[key] = table.fieldFunctions[key](chunk[key], 1234) ?? 'err'
          }
        }

        callback(null, chunk)
      } catch (error) {
        console.log('Error in transform', error)
      }
    },
  })

  return transformStream
}

function createWritableStream(
  client: Client,
  { schema, table: { name, fields } }: MapperAnonymizationDataResponse,
) {
  const writableStream = new Writable({
    objectMode: true,
    async write(chunk, encoding, callback) {
      try {
        console.log('WRITABLE')

        const insert = `INSERT INTO ${schema}.tmp_${name} (${fields.join(',').replace(/,(\s*)$/, '$1')})
        VALUES (${fields.map((_, index) => '$' + (index + 1)).join(', ')})`

        await client.query(insert, Object.values(chunk))

        callback(null)
      } catch (error) {
        console.log('Error in writable', error)
      }
    },
  })

  return writableStream
}

async function* fetchRowsGenerator(
  client: Client,
  mapperData: MapperAnonymizationDataResponse,
  paginatedQuery: (queryResponse: QueryResponse) => string,
  pageSize: number,
) {
  let offset = 0
  let rows = []

  while (true) {
    const { rows: newRows } = await client.query(
      paginatedQuery({
        ...mapperData,
        limit: pageSize,
        offset,
      }),
    )
    rows = newRows

    if (rows.length === 0) break

    yield rows

    offset += pageSize
  }
}

function bindFinishEvent(readableClient: Client, writableClient: Client) {
  writableClient.on('end', () => {
    console.log('FINISHED: ', new Date())
    readableClient.end()
    writableClient.end()
  })
}

async function main() {
  const mapperData: MapperAnonymizationDataResponse | null =
    MapperAnonymizationData('ead', 'aluno')

  if (!mapperData) {
    console.error('Mapper data not found')
    throw new Error('Mapper data not found')
  }

  console.log('STARTED ', new Date())

  const { client: readableConnection } = await connectDatabase()

  const amountedQuery = query({
    ...mapperData,
  })

  const readableStream = createReadableStream(readableConnection, amountedQuery)

  const { client: writableConnection } = await connectDatabase()

  const transformStream = createTransformStream(mapperData)

  const writeStream = createWritableStream(writableConnection, mapperData)

  bindFinishEvent(readableConnection, writableConnection)

  readableStream.pipe(transformStream).pipe(writeStream)
}

main().catch(console.error)
