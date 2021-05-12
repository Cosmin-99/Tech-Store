import { Pool, PoolConfig } from "pg";


export let pool: Pool = null!

export function initDatabase(config: PoolConfig) {
    pool = new Pool(config)
}

