import { NextApiRequest, NextApiResponse } from 'next';
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
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
    } = req.body;

    const query = `
      INSERT INTO job_posts (client_name, title, description, county, number_of_workers, gender, duration, budget, phone, whatsapp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      const [result]: [mysql.ResultSetHeader] = await db.execute(query, [
        client_name, title, description, county, number_of_workers, gender,
        duration, budget, phone, whatsapp
      ]);
      console.log('Insert result:', result);
      res.status(200).json({ message: 'Job posted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to post job' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
