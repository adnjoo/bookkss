import express from 'express';
import { getUserReviews, addReview } from '../controllers/reviewController';

export const reviewRouter = express.Router();

// Define the routes and their corresponding controller functions
reviewRouter.get('/get-user-reviews', getUserReviews);
reviewRouter.post('/add-review', addReview);
