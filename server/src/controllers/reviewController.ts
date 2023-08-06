import { Request, Response } from 'express';

import { pool } from '../db';

export const upsertReview = async (req: Request, res: Response) => {
  const { id, title, body, userId, setPrivate, setArchive } = req.body;

  if (!title || !body || !userId) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  if (!id) {
    pool.query(
      `
      INSERT INTO "Review" (title, body, "userId")
      VALUES ($1, $2, $3)
      `,
      [title, body, userId],
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
        res.json({ message: 'Review inserted successfully!' });
      }
    );
  } else {
    pool.query(
      `
      UPDATE "Review"
      SET title = $1, body = $2, private = $5, archive = $6
      WHERE "userId" = $3 AND id = $4 
      `,
      [title, body, userId, id, setPrivate],
      (error: any, result: any) => {
        if (error) {
          console.error('Error updating review in PostgreSQL database:', error);
          res
            .status(500)
            .json({ error: 'Error updating review in the database' });
          return;
        }
        res.json({ message: 'Review updated successfully!' });
      }
    );
  }
};

export const getUserReviews = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  if (!userId) {
    res.status(400).send('Missing userId parameter');
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

export const deleteReview = async (req: Request, res: Response) => {
  const { id, userId } = req.body;

  if (!id || !userId) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  pool.query(
    'DELETE FROM "Review" WHERE id = $1 AND "userId" = $2',
    [id, userId],
    (error: any, result: any) => {
      if (error) {
        console.error('Error deleting review from PostgreSQL database:', error);
        res
          .status(500)
          .json({ error: 'Error deleting review from the database' });
        return;
      }
      res.json({ message: 'Review deleted successfully!' });
    }
  );
};

export const getPublicReviews = async (req: Request, res: Response) => {
  pool.query(
    'SELECT "createdAt", id, title, body from "Review" WHERE private = false',
    (error: any, result: any) => {
      if (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Error querying the database' });
        return;
      }
      res.json(result.rows);
    }
  );
};
