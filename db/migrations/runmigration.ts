import pg from 'pg'
import createProductsTable from './products';

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;

const db = new pg.Pool({
  host: process.env.DB_HOST,
  port: port,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const runDbMigrations = async () => {
  console.log('BEGIN DB MIGRATION');

  // use single client forn transactions
  const client = await db.connect()

  try {
    await client.query('BEGIN');

    await client.query(createProductsTable);

    await client.query('COMMIT')

    console.log('END DB MIGRATION');
  } catch (e) {
    await client.query('ROLLBACK')

    console.log('DB migration failed');

    throw e
  } finally {
    client.release()
  }
}

export default runDbMigrations;