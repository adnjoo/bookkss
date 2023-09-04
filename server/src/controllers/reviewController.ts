import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const upsertReview = async (req: Request, res: Response) => {
  const {
    id,
    title,
    body,
    userId,
    setPrivate,
    setArchive,
    reviewDate,
    rating,
  } = req.body;

  if (!title || !body || !userId) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  try {
    if (!id) {
      const newReview = await prisma.review.create({
        data: {
          title,
          body,
          userId,
        },
      });

      res.json({ message: 'Review inserted successfully!', id: newReview.id });
    } else {
      const updatedReview = await prisma.review.update({
        where: {
          id: +id,
          userId: +userId,
        },
        data: {
          title,
          body,
          private: setPrivate,
          archive: setArchive,
          reviewDate,
          rating,
        },
      });

      res.json({ message: 'Review updated successfully!', updatedReview });
    }
  } catch (error) {
    console.error('Error performing database operation:', error);
    res.status(500).json({ error: 'Error performing database operation' });
  }
};

export const getUserReviews = async (req: Request, res: Response) => {
  const userId = Number(req.query.userId);

  if (!userId) {
    res.status(400).send('Missing userId parameter');
    return;
  }

  try {
    const reviews = await prisma.review.findMany({
      where: {
        userId: userId,
      },
    });

    res.json(reviews);
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

    const deletedReview = await prisma.review.delete({
      where: {
        id: Number(id),
        userId: Number(userId),
      },
    });

    if (!deletedReview) {
      res
        .status(500)
        .json({ error: 'Error deleting review from the database' });
      return;
    }

    res.json({ message: 'Review deleted successfully!' });
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
        reviewDate: true,
        id: true,
        title: true,
        body: true,
        userId: true,
        rating: true,
      },
    });
    publicReviews.sort((a, b) => {
      return (
        new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
      );
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
        reviewDate: true,
        rating: true,
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
