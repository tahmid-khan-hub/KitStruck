import { Pool } from "pg";

declare global {
  var pgPool: Pool | undefined;
}

const pool =
  global.pgPool ||
  new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: Number(process.env.POSTGRES_PORT),
  });

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

export default pool;
