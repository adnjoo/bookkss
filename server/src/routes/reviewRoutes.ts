import express from 'express';

import {
  getUserReviews,
  upsertReview,
  deleteReview,
  getPublicReviews,
} from '../controllers/reviewController';

export const reviewRouter = express.Router();

reviewRouter.post('/upsert-review', upsertReview);
reviewRouter.get('/get-user-reviews', getUserReviews);
reviewRouter.delete('/delete-review', deleteReview);
reviewRouter.get('/get-public-reviews', getPublicReviews);
