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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ success: false, message: "Verification token is required." }, { status: 400 });
    }

    const connection = await getConnection();

    // Find user with matching token
    const [result] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE verification_token = ? AND verification_token_expires > NOW()',
      [token]
    );

    if (result.length === 0) {
      await connection.end();
      return NextResponse.json({ 
        success: false, 
        message: "Invalid or expired verification token." 
      }, { status: 400 });
    }

    const user = result[0];

    if (user.is_verified) {
      await connection.end();
      return NextResponse.json({ 
        success: false, 
        message: "Email is already verified." 
      }, { status: 400 });
    }

    // Update user as verified
    await connection.execute(
      'UPDATE users SET is_verified = true, verification_token = NULL, verification_token_expires = NULL WHERE id = ?',
      [user.id]
    );

    await connection.end();

    // Redirect to login page with success message
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('verified', 'true');
    
    return NextResponse.redirect(loginUrl.toString());

  } catch (error: unknown) {
    const err = error as Error;
    console.error("GET /api/verify-email error:", err.message);
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}
