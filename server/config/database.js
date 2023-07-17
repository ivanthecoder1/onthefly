// Use postgreSQL
import pg from 'pg'
import './dotenv.js'

// Create a connection pool so we can make frequent queries to the Postgres database
const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
}

export const pool = new pg.Pool(config)