import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { RowDataPacket } from "mysql2";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  worker_category: string;
  is_verified: boolean;
};

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
    const { email, password } = await req.json();
    const connection = await getConnection();
    const [rows] = await connection.execute<RowDataPacket[] & User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0 || rows[0].password !== password) {
      await connection.end();
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email or password. Please check your credentials and try again.",
        },
        { status: 401 }
      );
    }

    if (!rows[0].is_verified) {
      await connection.end();
      return NextResponse.json(
        {
          success: false,
          message:
            "Please verify your email before logging in. Check your inbox for the verification link.",
          needsVerification: true,
        },
        { status: 401 }
      );
    }

    await connection.end();
    return NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        user: {
          id: rows[0].id,
          name: rows[0].name,
          email: rows[0].email,
          worker_category: rows[0].worker_category,
          is_verified: rows[0].is_verified,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}
