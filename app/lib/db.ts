// db.ts
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export async function createConnection() {
    if (!pool) {
        // These variables should be set in your Vercel dashboard under Project Settings > Environment Variables
        const {
            DATABASE_HOST,
            DATABASE_USER,
            DATABASE_PASSWORD,
            DATABASE_NAME
        } = process.env;

        if (!DATABASE_HOST || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_NAME) {
            throw new Error('Missing one or more required environment variables for database connection');
        }

        pool = mysql.createPool({
            host: DATABASE_HOST,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        console.log('MySQL pool created');
    }
    return pool;
}

// Use this function to run queries
export async function executeQuery(query: string, params: any[] = []) {
    const db = await createConnection();
    try {
        const [results] = await db.query(query, params);
        return results;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}
