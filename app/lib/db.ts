import mysql from 'mysql2/promise';

// Define a union type for MySQL parameter values
type QueryParam = string | number | boolean | null | Date;
type QueryParams = QueryParam[];

// Pool instead of single connection for better reliability
let pool: mysql.Pool | null = null;

export async function createConnection() {
    if (!pool) {
        const {
            DATABASE_HOST,
            DATABASE_USER,
            DATABASE_PASSWORD,
            DATABASE_NAME
        } = process.env;

        if (!DATABASE_HOST || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_NAME) {
            throw new Error('Missing database environment variables');
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

        console.log('DB Pool created');
    }

    return pool;
}

export async function executeQuery(query: string, params: QueryParams = []) {
    const db = await createConnection();
    try {
        const [results] = await db.query(query, params);
        return results;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}
