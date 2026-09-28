import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, message: 'CampusFlow API and database are connected.' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Database connection failed.' });
  }
});

app.get('/api/tasks', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, description, priority, status, deadline, estimated_hours
       FROM tasks ORDER BY deadline IS NULL, deadline ASC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load tasks.' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { user_id, title, description, priority, deadline, estimated_hours } = req.body;

  if (!user_id || !title) {
    return res.status(400).json({ message: 'user_id and title are required.' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO tasks
       (user_id, title, description, priority, deadline, estimated_hours)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        title,
        description || null,
        priority || 'medium',
        deadline || null,
        estimated_hours || 1
      ]
    );

    res.status(201).json({ id: result.insertId, message: 'Task created.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CampusFlow API running on http://localhost:${PORT}`);
});
