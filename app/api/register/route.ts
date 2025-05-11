// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

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

    const { full_name, email, phone_number, password, work_category, county } = data;

    if (!full_name || !email || !phone_number || !password || !work_category || !county) {
      return NextResponse.json({ success: false, message: "Missing fields." }, { status: 400 });
    }

    const connection = await getConnection();

    // Check if user already exists
    const [existingUser] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      await connection.end();
      return NextResponse.json({ success: false, message: "Email is already registered." }, { status: 409 });
    }

    // Insert new user into the database
    await connection.execute(
      `INSERT INTO users (full_name, email, phone_number, password, work_category, county) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [full_name, email, phone_number, password, work_category, county]
    );

    await connection.end();
    return NextResponse.json({ success: true, message: "Account created successfully." }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("POST /api/register error:", err.message);
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}
