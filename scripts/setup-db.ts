import pool from '../lib/db' // Adjust path as needed

async function setupDatabase() {
  const client = await pool.connect()
  try {
    // Check if the table already exists
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'contacts'
      );
    `
    const { rows: tableExistsRows } = await client.query(checkTableQuery)
    const tableExists = tableExistsRows[0].exists

    if (tableExists) {
      console.log('Table "contacts" already exists.')
      // Optional: Add checks/alterations for existing columns here if needed
    } else {
      console.log('Table "contacts" does not exist. Creating table...')
      // Create the contacts table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE contacts (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
      await client.query(createTableQuery)
      console.log('Table "contacts" created successfully.')
    }
  } catch (err) {
    console.error('Error setting up database:', err)
    process.exit(1) // Exit with error
  } finally {
    await client.release()
    await pool.end() // Close the pool after the script runs
    console.log('Database connection closed.')
  }
}

setupDatabase()
