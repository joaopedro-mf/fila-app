import dotenv from 'dotenv';
import { UserTable } from "../domain/entities/User";
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

dotenv.config();

export interface dbInterface {
  User: UserTable
}

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'fila',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user:  process.env.DB_USER,
    port: parseInt(process.env.DB_PORT || '5432'),
    max: 10,
    ssl: true
  })
})


export const db = new Kysely<dbInterface>({
  dialect,
})