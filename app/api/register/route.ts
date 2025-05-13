import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import crypto from 'crypto';
import { sendVerificationEmail } from '/lib/email';

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

    // Check if email or phone number already exists
    const [existingUser] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ? OR phone_number = ?',
      [email, phone_number]
    );

    if (existingUser.length > 0) {
      await connection.end();

      const alreadyEmail = existingUser.find(user => user.email === email);
      const alreadyPhone = existingUser.find(user => user.phone_number === phone_number);

      let message = "Account already exists.";
      if (alreadyEmail && alreadyPhone) {
        message = "Email and phone number are already registered.";
      } else if (alreadyEmail) {
        message = "Email is already registered.";
      } else if (alreadyPhone) {
        message = "Phone number is already registered.";
      }

      return NextResponse.json({ success: false, message }, { status: 409 });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Insert new user with is_verified = false
    await connection.execute(
      `INSERT INTO users (full_name, email, phone_number, password, work_category, county, is_verified, verification_token, verification_token_expires) 
       VALUES (?, ?, ?, ?, ?, ?, false, ?, ?)`,
      [full_name, email, phone_number, password, work_category, county, verificationToken, expiresAt]
    );

    await connection.end();

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({ 
      success: true, 
      message: "Account created successfully. Please check your email to verify your account.",
      emailSent: true
    }, { status: 201 });

  } catch (error: unknown) {
    const err = error as Error;
    console.error("POST /api/register error:", err.message);
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}
