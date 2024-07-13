import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;
export const pool = new Pool({
    connectionString: process.env.PG_CONNECTION_STRING, 
    ssl: 'required'
});