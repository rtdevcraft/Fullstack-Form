import { Pool } from 'pg'

let pool

// Check if we're in a build environment or missing the URL
if (
  !process.env.POSTGRES_URL &&
  process.env.NODE_ENV === 'production' &&
  process.env.VERCEL_ENV === 'production'
) {
  console.warn(
    'POSTGRES_URL not available during build, database connections will be skipped'
  )
  pool = {
    query: () => Promise.resolve({ rows: [] }),
    on: () => {},
  }
} else if (process.env.POSTGRES_URL) {
  // Normal operation with valid connection string
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })

  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })
} else {
  console.warn('POSTGRES_URL not set, database connections will not work')

  pool = {
    query: () => Promise.resolve({ rows: [] }),
    on: () => {},
  }
}

export default pool
