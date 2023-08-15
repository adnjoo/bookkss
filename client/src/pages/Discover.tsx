import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';

import type { Review } from '../components/ReviewComponent';
import { ReviewPublic } from '../components/ReviewPublic';
import { SERVER_URL } from '../lib/helpers';
import { useUserStore } from '../zustand/store';

export function Discover() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state: any) => state?.user);

  useEffect(() => {
    setLoading(true);
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/reviews/get-public-reviews`
        );
        if (user) {
          setReviews(
            response.data.filter((review: Review) => review.userId !== user?.id)
          );
        } else {
          setReviews(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [user]);

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
