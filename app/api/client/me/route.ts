// /app/api/client/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';
import crypto from 'crypto';

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
}

// Define expected row structure
interface ClientUserRow extends RowDataPacket {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  county: string;
  subcounty: string;
  location: string;
}

export async function GET(req: NextRequest) {
  try {
    const session = req.cookies.get('kazibase_session')?.value;
    if (!session) {
      return NextResponse.json({ success: false, message: 'No session token' }, { status: 401 });
    }

    const [encodedPayload, signature] = session.split('.');
    const expectedSig = crypto
      .createHmac('sha256', process.env.AUTH_SECRET || 'fallback_secret_not_for_production')
      .update(encodedPayload)
      .digest('base64');

    if (signature !== expectedSig) {
      return NextResponse.json({ success: false, message: 'Invalid session signature' }, { status: 401 });
    }

    const payloadJson = Buffer.from(encodedPayload, 'base64').toString();
    const payload = JSON.parse(payloadJson);

    if (!payload || payload.userType !== 'client') {
      return NextResponse.json({ success: false, message: 'Invalid session payload' }, { status: 403 });
    }

    const connection = await getConnection();
    const [rows] = await connection.execute<ClientUserRow[]>(
      'SELECT id, full_name, email, phone_number, county, subcounty, location FROM client_users WHERE id = ?',
      [payload.id]
    );
    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Client not found' }, { status: 404 });
    }

    const user = rows[0];

    return NextResponse.json({
      success: true,
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
    });
  } catch (error) {
    const err = error as Error;
    console.error('GET /api/client/me error:', err.message);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
