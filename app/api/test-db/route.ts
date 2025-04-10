import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const client = await pool.connect()
    try {
      const result = await client.query('SELECT NOW()')
      return NextResponse.json({
        status: 'Connected',
        time: result.rows[0].now,
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
