// app/api/client/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

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
    const { email, password, remember } = data;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        message: "Email and password are required." 
      }, { status: 400 });
    }

    const connection = await getConnection();

    // Fetch user by email
    const [users] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM client_users WHERE email = ? AND user_type = "client"',
      [email]
    );

    await connection.end();

    // Check if user exists
    if (users.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid email or password." 
      }, { status: 401 });
    }

    const user = users[0];

    // Check password
    if (user.password !== password) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid email or password." 
      }, { status: 401 });
    }

    // Check if user is verified
    if (!user.is_verified) {
      return NextResponse.json({ 
        success: false, 
        message: "Please verify your email address before logging in." 
      }, { status: 403 });
    }

    // Create session token
    const tokenData = {
      id: user.id,
      email: user.email,
      name: user.full_name,
      userType: 'client'
    };

    const token = sign(
      tokenData,
      process.env.JWT_SECRET || 'fallback_secret_not_for_production',
      { expiresIn: remember ? '30d' : '24h' }
    );

    // Set cookie for authentication
    const cookieStore = cookies();
    
    cookieStore.set({
      name: 'kazibase_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      // Set longer expiration if "remember me" is checked
      maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 24 hours
    });

    // Update last login timestamp
    const updateConnection = await getConnection();
    await updateConnection.execute(
      'UPDATE client_users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );
    await updateConnection.end();

    // Return user data (excluding sensitive information)
    return NextResponse.json({ 
      success: true, 
      message: "Login successful",
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone_number,
        location: {
          county: user.county,
          subcounty: user.subcounty,
          area: user.location
        }
      }
    }, { status: 200 });
    
  } catch (error: unknown) {
    const err = error as Error;
    console.error("POST /api/client/login error:", err.message);
    return NextResponse.json({ 
      success: false, 
      message: "Server error." 
    }, { status: 500 });
  }
}
