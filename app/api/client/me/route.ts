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

// Define expected row structure for client user
interface ClientUserRow extends RowDataPacket {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  county: string;
  subcounty: string;
  location: string;
}

// Define expected row structure for job posts
interface JobPostRow extends RowDataPacket {
  id: number;
  client_name: string;
  title: string;
  description: string;
  county: string;
  number_of_workers: number;
  gender: string;
  duration: string;
  budget: string;
  phone: string;
  whatsapp: string;
  created_at: string;
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
    
    // Get client user details
    const [clientRows] = await connection.execute<ClientUserRow[]>(
      'SELECT id, full_name, email, phone_number, county, subcounty, location FROM client_users WHERE id = ?',
      [payload.id]
    );

    if (clientRows.length === 0) {
      await connection.end();
      return NextResponse.json({ success: false, message: 'Client not found' }, { status: 404 });
    }

    const user = clientRows[0];

    // Get job posts associated with this client (by email or phone)
    const [jobPosts] = await connection.execute<JobPostRow[]>(
      `SELECT id, client_name, title, description, county, number_of_workers, 
       gender, duration, budget, phone, whatsapp, created_at 
       FROM job_posts 
       WHERE phone = ? OR whatsapp = ?`,
      [user.phone_number, user.phone_number] // Assuming phone_number matches job_posts.phone/whatsapp
    );

    await connection.end();

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
      },
      jobPosts: jobPosts.map(post => ({
        id: post.id,
        clientName: post.client_name,
        title: post.title,
        description: post.description,
        county: post.county,
        numberOfWorkers: post.number_of_workers,
        gender: post.gender,
        duration: post.duration,
        budget: post.budget,
        phone: post.phone,
        whatsapp: post.whatsapp,
        createdAt: post.created_at
      }))
    });
  } catch (error) {
    const err = error as Error;
    console.error('GET /api/client/me error:', err.message);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
