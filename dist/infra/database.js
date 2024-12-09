"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv = require("dotenv");
const pg_1 = require("pg");
const kysely_1 = require("kysely");
dotenv.config();
var activeSsl = parseInt(process.env.DB_LOCAL) == 1 ? false : true;
const dialect = new kysely_1.PostgresDialect({
    pool: new pg_1.Pool({
        database: 'fila',
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        port: parseInt(process.env.DB_PORT || '5432'),
        max: 10,
        ssl: activeSsl
    })
});
exports.db = new kysely_1.Kysely({
    dialect,
});
