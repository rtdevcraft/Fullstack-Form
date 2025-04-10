import { Pool, PoolClient, QueryResult } from 'pg'

// Create a real pool if POSTGRES_URL exists
let realPool: Pool | null = null
if (process.env.POSTGRES_URL) {
  realPool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })

  realPool.on('error', (err: Error) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })
}

// Create a mock pool for build time or when URL is missing
const mockPool = {
  query: () => Promise.resolve({ rows: [] }) as unknown as Promise<QueryResult>,
  connect: () =>
    Promise.resolve({
      query: () => Promise.resolve({ rows: [] }),
      release: () => {},
    } as unknown as PoolClient),
  on: () => {},
  end: () => Promise.resolve(),
}

// Export either the real pool or the mock pool
const pool = realPool || mockPool

export default pool
