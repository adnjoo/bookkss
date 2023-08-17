import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { pool } from '../db'; // delete this line

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
      [title, body, userId, id, setPrivate, setArchive],
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

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as {
      userId: number;
    };

    if (decodedToken.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden - Unauthorized user.' });
    }

    pool.query(
      'DELETE FROM "Review" WHERE id = $1 AND "userId" = $2',
      [id, userId],
      (error: any, result: any) => {
        if (error) {
          console.error(
            'Error deleting review from PostgreSQL database:',
            error
          );
          res
            .status(500)
            .json({ error: 'Error deleting review from the database' });
          return;
        }
        res.json({ message: 'Review deleted successfully!' });
      }
    );
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    res.status(401).json({ error: 'Unauthorized - Invalid token.' });
  }
};

export const getPublicReviews = async (req: Request, res: Response) => {
  try {
    const publicReviews = await prisma.review.findMany({
      where: {
        private: false,
      },
      select: {
        createdAt: true,
        id: true,
        title: true,
        body: true,
        userId: true,
      },
    });
    res.json(publicReviews);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Error querying the database' });
  }
};

export const getPublicReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.findFirst({
      where: {
        id: Number(id),
        private: false,
      },
      select: {
        createdAt: true,
        id: true,
        title: true,
        body: true,
        userId: true,
        private: true,
      },
    });

    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    res.json([review]);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Error querying the database' });
  }
};
