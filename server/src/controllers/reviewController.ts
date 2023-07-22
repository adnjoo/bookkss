import { Request, Response } from 'express';
import { pool } from '../db';

export const getUserReviews = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  if (!userId) {
    res.status(400).send('Missing userid parameter');
    return;
  }

  try {
    const query = {
      text: 'SELECT * FROM "Review" WHERE "userId" = $1',
      values: [userId],
    };

    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Error querying the database' });
  }
};

export const addReview = async (req: Request, res: Response) => {
  const { title, body, userId } = req.body;

  if (!title || !body || !userId) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  const review = {
    title,
    body,
    userId,
  };

  pool.query(
    'INSERT INTO "Review" (title, body, "userId") VALUES($1, $2, $3)',
    [review.title, review.body, review.userId],
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
