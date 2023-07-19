const express = require('express');
const mysql = require('mysql2');

const PORT = 3001;
const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookkss',
  connectionLimit: 10, // Adjust this according to your needs
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
  connection.release();
});

app.get('/hello', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('Hello, World!');
});

app.get('/get-reviews', (req, res) => {
  pool.query('SELECT * FROM Review', (error, results) => {
    if (error) {
      console.error('Error querying MySQL database:', error);
      res.status(500).send('Error querying the database');
      return;
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  });
});

app.post('/add-review', (req, res) => {
  console.log(req.body)
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  const review = {
    title: title,
    body: body,
  };

  pool.query('INSERT INTO Review SET ?', review, (error, result) => {
    if (error) {
      console.error('Error inserting review into MySQL database:', error);
      res.status(500).json({ error: 'Error inserting review into the database' });
      return;
    }
    res.json({ message: 'Review added successfully!' });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
