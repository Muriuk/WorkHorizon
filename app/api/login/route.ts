import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { RowDataPacket } from "mysql2";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
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

    await connection.end();

    if (rows.length === 0 || rows[0].password !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // ✅ Set email in cookie
    const res = NextResponse.json(
      { success: true, message: "Login successful." },
      { status: 200 }
    );

    res.cookies.set("userEmail", email, {
      httpOnly: false, // you can set true to hide from JavaScript if needed
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}
