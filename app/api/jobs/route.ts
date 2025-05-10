// app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
}

export async function GET() {
  try {
    const connection = await getConnection();
    
    const query = `
      SELECT 
        id, 
        client_name, 
        title, 
        description, 
        county, 
        number_of_workers, 
        gender, 
        duration, 
        budget
      FROM job_posts 
      WHERE status = 'active' OR status IS NULL
      ORDER BY created_at DESC
    `;
    
    const [rows] = await connection.execute(query);
    await connection.end();
    
    // Ensure 'rows' is an array
    if (!Array.isArray(rows)) {
      return NextResponse.json(
        { error: 'Invalid response format from database' },
        { status: 500 }
      );
    }

    // If the result is empty, return an empty array (no jobs available)
    if (rows.length === 0) {
      return NextResponse.json({ message: 'No jobs available' }, { status: 200 });
    }

    return NextResponse.json(rows);

  } catch (error) {
    // Handle known errors
    console.error('Database error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to fetch jobs from database', details: error.message },
        { status: 500 }
      );
    }

    // Fallback for unknown errors
    console.error('Unknown error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs from database', details: 'Unknown error' },
      { status: 500 }
    );
  }
}
