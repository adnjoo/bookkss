import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';

import type { Review } from '../components/ReviewComponent';
import { ReviewPublic } from '../components/ReviewPublic';
import { SERVER_URL } from '../lib/helpers';

export function Discover() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/reviews/get-public-reviews`
        );
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className='mx-4 pb-64 pt-12 sm:mx-20'>
      <LoadingBar color='#3b82f6' progress={loading ? 50 : 100} height={5} />
      <h1 className='text-bold mb-9 text-2xl'>Discover Reviews</h1>
      <ul>
        {reviews.map((review: Review) => (
          <ReviewPublic review={review} />
        ))}
      </ul>
    </div>
  );
}
