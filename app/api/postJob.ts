import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2/promise';

interface JobPost {
  client_name: string;
  title: string;
  description: string;
  county: string;
  number_of_workers: number;
  gender: string;
  duration: string;
  budget: number;
  phone: string;
  whatsapp: string;
}

const db = mysql.createConnection({
  host: process.env.DB_HOST, // Your database hostname
  user: process.env.DB_USER, // Your database username
  password: process.env.DB_PASSWORD, // Your database password
  database: process.env.DB_NAME, // Your database name
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
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
    }: JobPost = req.body;  // Apply JobPost interface here

    const query = `
      INSERT INTO job_posts (client_name, title, description, county, number_of_workers, gender, duration, budget, phone, whatsapp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    try {
      const connection = await db;
      await connection.query(query, [client_name, title, description, county, number_of_workers, gender, duration, budget, phone, whatsapp]);
      res.status(200).json({ message: 'Job posted successfully' });
    } catch (err) {
      console.error("Error inserting job post:", err);
      res.status(500).json({ error: 'Failed to post job' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

