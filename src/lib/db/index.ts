import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/ask_bangladesh";

// Disable prefetch for connection pooling (PgBouncer compatible)
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
