const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const PORT = 3001;
const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.SERVER_HOST,
  user: process.env.SERVER_USER,
  password: process.env.SERVER_PASSWORD,
  database: process.env.SERVER_DB,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
    return;
  }
  console.log('Connected to PostgreSQL database!');
});

app.get('/hello', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Hello, World!');
});

app.get('/get-reviews', (req, res) => {
  pool.query('SELECT * FROM "Review"', (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send('Error querying the database');
      return;
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.json(results.rows);
  });
});

app.post('/add-review', (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  const review = {
    title: title,
    body: body,
  };

  pool.query(
    'INSERT INTO "Review" (title, body) VALUES($1, $2)',
    [review.title, review.body],
    (error, result) => {
      if (error) {
        console.error(
          'Error inserting review into PostgreSQL database:',
          error
        );
        res
          .status(500)
          .json({ error: 'Error inserting review into the database' });
        return;
      }
      res.json({ message: 'Review added successfully!' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
