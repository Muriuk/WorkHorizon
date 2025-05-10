// pages/api/postJob.ts

import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: process.env.DB_HOST, // Your database hostname
  user: process.env.DB_USER, // Your database username
  password: process.env.DB_PASSWORD, // Your database password
  database: process.env.DB_NAME, // Your database name
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
    } = req.body;

    const query = `
      INSERT INTO job_posts (client_name, title, description, county, number_of_workers, gender, duration, budget, phone, whatsapp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(query, [client_name, title, description, county, number_of_workers, gender, duration, budget, phone, whatsapp], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to post job' });
      }
      res.status(200).json({ message: 'Job posted successfully' });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
