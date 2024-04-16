import pg from 'pg'

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;

const db = new pg.Pool({
    host: process.env.DB_HOST,
    port: port,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default db;