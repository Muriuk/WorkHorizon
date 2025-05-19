export const runtime = 'nodejs'; // 👈 Forces use of Node runtime instead of Edge

// /app/api/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import mysql, { RowDataPacket } from "mysql2/promise";

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  console.log("Received email:", email);  // Log the received email

  try {
    const connection = await getConnection();

    // Get user info
    const [users] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    console.log("Users found:", users);  // Log the user data

    if (users.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });
    const user = users[0];

    // Get jobs in their county
    const [availableJobs] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM jobs WHERE county = ? ORDER BY created_at DESC",
      [user.county]
    );
    console.log("Available jobs:", availableJobs);  // Log the available jobs

    // Get jobs the user has applied to
    const [appliedJobs] = await connection.execute<RowDataPacket[]>(
      `SELECT j.* FROM jobs j
       JOIN applications a ON j.id = a.job_id
       WHERE a.user_id = ?
       ORDER BY a.applied_at DESC`,
      [user.id]
    );
    console.log("Applied jobs:", appliedJobs);  // Log the applied jobs

    await connection.end();

    return NextResponse.json({
      greeting: getGreeting(),
      name: user.full_name,
      county: user.county,
      availableJobs,
      appliedJobs,
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
