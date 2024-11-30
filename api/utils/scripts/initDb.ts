// import { Pool, QueryResult } from 'pg';
// import dotenv from 'dotenv';

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: parseInt(process.env.DB_PORT || '5432'),
//     });

// export const query = async (text: string, params?: any[]): Promise<QueryResult> => {
//     const client = await pool.connect();
//     try {
//       const result = await client.query(text, params);
//       return result;
//     } finally {
//       client.release();
//     }
//   };

// async function initDb() {
//     dotenv.config();
//   try {
//     await query(`
//       CREATE TABLE IF NOT EXISTS example_table (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);
//     console.log('Tabela criada com sucesso');
//   } catch (error) {
//     console.error('Erro ao criar tabela:', error);
//   }
// }

// initDb();