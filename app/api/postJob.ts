// pages/api/postJob.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("🔹 Incoming request to /api/postJob:", req.method); // Log method

  if (req.method !== 'POST') {
    console.warn("⚠️ Method not allowed:", req.method);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      client_name,
      title,
      description,
      county,
      number_of_workers,
      gender,
      duration,
      budget,
      phone,
      whatsapp,
    } = req.body;

    console.log("📦 Received job data:", req.body); // Log incoming data

    // Basic check
    if (!client_name || !title || !description || !county || !phone) {
      console.warn("⚠️ Missing required fields");
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log("🔌 Connecting to MySQL...");
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
    });

    console.log("✅ MySQL connected. Inserting data...");

    const query = `
      INSERT INTO job_posts (client_name, title, description, county, number_of_workers, gender, duration, budget, phone, whatsapp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await connection.execute(query, [
      client_name,
      title,
      description,
      county,
      number_of_workers,
      gender,
      duration,
      budget,
      phone,
      whatsapp,
    ]);

    console.log("✅ Data inserted:", result);

    await connection.end();
    console.log("🔌 MySQL connection closed.");

    return res.status(200).json({ message: 'Job posted successfully' });

  } catch (error: any) {
    console.error("❌ Error inserting job:", error);
    return res.status(500).json({ error: 'Failed to post job' });
  }
}
