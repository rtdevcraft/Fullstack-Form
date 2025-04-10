import { Pool } from 'pg'

const connectionString = process.env.POSTGRES_URL

if (!connectionString) {
  throw new Error('POSTGRES_URL environment variable is not set')
}

const pool = new Pool({
  connectionString,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export default pool
