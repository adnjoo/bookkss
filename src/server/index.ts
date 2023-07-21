const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, '../../.env')});
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.connect((err: any) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
    return;
  }
  console.log('Connected to PostgreSQL database!');
});

app.get('/', (req: any, res: any) => {
  res.send('Hello, World!');
});

app.get('/get-user-reviews', (req: any, res: any) => {
  const userid = req.query.userid;

  if (!userid) {
    res.status(400).send('Missing userid parameter');
    return;
  }

  const query = {
    text: 'SELECT * FROM "Review" WHERE userid = $1',
    values: [userid],
  };

  pool.query(query, (error: any, results: any) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send('Error querying the database');
      return;
    }
    res.json(results.rows);
  });
});

app.post('/add-review', (req: any, res: any) => {
  const { title, body, userid } = req.body;

  if (!title || !body || !userid) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  const review = {
    title,
    body,
    userid,
  };

  pool.query(
    'INSERT INTO "Review" (title, body, userid) VALUES($1, $2, $3)',
    [review.title, review.body, review.userid],
    (error: any, result: any) => {
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
