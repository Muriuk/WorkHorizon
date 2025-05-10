// app/api/jobs/route.js
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
        budget,
        phone,
        whatsapp
      FROM job_posts 
      WHERE status = 'active' OR status IS NULL
      ORDER BY created_at DESC
    `;
    
    const [rows] = await connection.execute(query);
    await connection.end();
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs from database', details: error.message },
      { status: 500 }
    );
  }
}
