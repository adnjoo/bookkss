import { Request, Response } from 'express';
import { pool } from '../db';

export const getUserReviews = async (req: Request, res: Response) => {
  const userid = req.query.userid as string;

  if (!userid) {
    res.status(400).send('Missing userid parameter');
    return;
  }

  try {
    const query = {
      text: 'SELECT * FROM "Review" WHERE userid = $1',
      values: [userid],
    };

    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Error querying the database' });
  }
};

export const addReview = async (req: Request, res: Response) => {
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
};
