import { Pool } from "pg";

export const pool: Pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgresadmin",
    database: "Store",
    port: 5432
})