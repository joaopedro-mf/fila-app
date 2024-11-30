import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { User } from "../domain/entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "fila",
  entities: [__dirname + '/../domain/entities/*.{js,ts}'],
  synchronize: true,
  logging: true,
});