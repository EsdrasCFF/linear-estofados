import * as dotenv from "dotenv";
import path from "path";
import { neon } from "@neondatabase/serverless";

const envPath = path.resolve(process.cwd(), ".env.local");
const result = dotenv.config({ path: envPath });

console.log("envPath:", envPath);
console.log("dotenv error:", result.error);
console.log("DATABASE_URL loaded:", !!process.env.DATABASE_URL);
console.log("DATABASE_URL preview:", process.env.DATABASE_URL?.slice(0, 30));

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL não foi carregada");
  }

  const sql = neon(connectionString);
  const dbResult = await sql`select version()`;
  console.log("✅ Conexão OK");
  console.log(dbResult[0]);
}

testConnection().catch((err) => {
  console.error("❌ Falha:", err);
  process.exit(1);
});
