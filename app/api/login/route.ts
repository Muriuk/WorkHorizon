// app/api/login/route.ts
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

    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Missing fields." }, { status: 400 });
    }

    const connection = await getConnection();

    // Check if user exists
    const [user] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (user.length === 0 || user[0].password !== password) {
      await connection.end();
      return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 });
    }

    await connection.end();
    return NextResponse.json({ success: true, message: "Login successful." }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("POST /api/login error:", err.message);
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}
