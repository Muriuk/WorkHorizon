// app/lib/db.ts
import mysql from 'mysql2/promise';

// Explicitly set runtime to Node.js for this module
export const runtime = "nodejs";

let pool: mysql.Pool | null = null;

export async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

export async function executeQuery<T>(query: string, params: any[] = []): Promise<T> {
  try {
    const connection = await getConnection();
    const [results] = await connection.execute(query, params);
    return results as T;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}
