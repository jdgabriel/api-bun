import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connection = postgres("postgresql://docker:docker@localhost:5432/pizza_shop", { max: 1 })
const db = drizzle(connection);

await migrate(db, { migrationsFolder: "./src/db/migrations" });
await connection.end();

process.exit()
