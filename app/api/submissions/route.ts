import { NextResponse } from 'next/server'
import pool from '../../../lib/db'

export async function GET() {
  try {
    const client = await pool.connect()
    try {
      const result = await client.query(
        'SELECT id, name, email, message, timestamp FROM contacts ORDER BY timestamp DESC'
      )
      return NextResponse.json(result.rows, { status: 200 })
    } finally {
      client.release() // Release the client back to the pool
    }
  } catch (error) {
    console.error('Error fetching submissions:', error)
    let errorMessage = 'Internal Server Error'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json(
      { message: 'Failed to fetch submissions', error: errorMessage },
      { status: 500 }
    )
  }
}
