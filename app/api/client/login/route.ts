import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import crypto from 'crypto';

// Define types for session and request body
interface SessionPayload {
  id: number;
  email: string;
  name: string;
  userType: 'client';
  exp: number;
}

interface LoginRequestBody {
  email: string;
  password: string;
  remember: boolean;
}

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
}

// Function to create a session token
function createSessionToken(payload: SessionPayload, secret: string): string {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(encodedPayload)
    .digest('base64');
  return `${encodedPayload}.${signature}`;
}

export async function POST(req: NextRequest) {
  try {
    const data: LoginRequestBody = await req.json();
    const { email, password, remember } = data;

    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        message: "Email and password are required." 
      }, { status: 400 });
    }

    const connection = await getConnection();
    const [users] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM client_users WHERE email = ? AND user_type = "client"',
      [email]
    );
    await connection.end();

    if (users.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid email or password." 
      }, { status: 401 });
    }

    const user = users[0];

    // TODO: Replace plain password comparison with hashed password check if using hashes
    if (user.password !== password) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid email or password." 
      }, { status: 401 });
    }

    if (!user.is_verified) {
      return NextResponse.json({ 
        success: false, 
        message: "Please verify your email address before logging in." 
      }, { status: 403 });
    }

    const tokenData: SessionPayload = {
      id: user.id,
      email: user.email,
      name: user.full_name,
      userType: 'client',
      exp: Math.floor(Date.now() / 1000) + (remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60)
    };

    const secret = process.env.AUTH_SECRET;
    if (!secret) {
      console.error("Missing AUTH_SECRET environment variable");
      return NextResponse.json({ 
        success: false,
        message: "Server configuration error."
      }, { status: 500 });
    }

    const token = createSessionToken(tokenData, secret);

    const response = NextResponse.json({ 
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

    try {
      response.cookies.set('kazibase_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
      });
    } catch (cookieError) {
      console.error("Error setting cookie:", cookieError);
      // Still continue, but log error
    }

    try {
      const updateConnection = await getConnection();
      await updateConnection.execute(
        'UPDATE client_users SET last_login = NOW() WHERE id = ?',
        [user.id]
      );
      await updateConnection.end();
    } catch (updateError) {
      console.error("Error updating last_login:", updateError);
      // Not critical, so continue
    }

    return response;

  } catch (error: unknown) {
    const err = error as Error;
    console.error("POST /api/client/login error:", err.message);
    return NextResponse.json({ 
      success: false, 
      message: "Server error." 
    }, { status: 500 });
  }
}
