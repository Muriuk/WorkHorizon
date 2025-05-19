export const runtime = 'nodejs'; // 👈 Forces use of Node runtime instead of Edge

import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';

async function getConnection() {
  return await mysql.createConnection({
   host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      client_name,
      title,
      description,
      county,
      number_of_workers,
      gender,
      duration,
      budget,
      phone,
      whatsapp,
    } = data;

    const connection = await getConnection();

    const query = `
      INSERT INTO job_posts (client_name, title, description, county, number_of_workers, gender, duration, budget, phone, whatsapp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await connection.execute(query, [
      client_name,
      title,
      description,
      county,
      number_of_workers,
      gender,
      duration,
      budget,
      phone,
      whatsapp,
    ]);

    await connection.end();

    return NextResponse.json({ message: 'Job posted successfully' }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("POST /api/postJob error:", err.message);
    return NextResponse.json({ error: 'Failed to post job', details: err.message }, { status: 500 });
  }
}
