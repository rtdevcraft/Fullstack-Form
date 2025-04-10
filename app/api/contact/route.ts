import { NextResponse } from 'next/server'
import pool from '@/lib/db' // Import the database pool

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Basic validation (can be expanded)
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('Received contact form submission:')
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Message:', message)

    // Database insertion logic
    const queryText =
      'INSERT INTO contacts(name, email, message) VALUES($1, $2, $3) RETURNING *'
    const values = [name, email, message]

    const client = await pool.connect()
    try {
      const result = await client.query(queryText, values)
      console.log('Database insertion successful:', result.rows[0])
    } finally {
      client.release() // Release the client back to the pool
    }

    return NextResponse.json(
      { message: 'Form submitted successfully!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    let errorMessage = 'Internal Server Error'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json(
      { message: 'Failed to submit form', error: errorMessage },
      { status: 500 }
    )
  }
}
