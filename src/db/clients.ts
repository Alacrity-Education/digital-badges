import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Define a global type so TypeScript doesn’t complain
declare global {
  var _db: ReturnType<typeof drizzle> | undefined;
  var _pool: Pool | undefined;
}

// Reuse connections during hot reload in dev
const pool =
  global._pool || new Pool({ connectionString: process.env.DATABASE_URL });
const db = global._db || drizzle(pool, { schema });

if (process.env.NODE_ENV !== "production") {
  global._pool = pool;
  global._db = db;
}

export { db, pool };
