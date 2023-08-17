import { useEffect, useState } from 'react';
import axios from 'axios';

import type { Review } from '../components/ReviewComponent';
import { ReviewPublic } from '../components/ReviewPublic';
import { SERVER_URL } from '../lib/helpers';
import { useUserStore, useLoadingStore } from '../zustand/store';

export function Discover() {
  const [reviews, setReviews] = useState([]);
  const setLoading = useLoadingStore((state: any) => state.setLoading);
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
    <div className='mx-4 flex flex-col items-center pb-64 pt-12 sm:mx-20'>
      <h1 className='text-bold mx-auto mb-9  text-2xl'>Discover Reviews</h1>
      <ul className='flex w-full flex-col items-center'>
        {reviews.map((review: Review) => (
          <ReviewPublic review={review} />
        ))}
      </ul>
    </div>
  );
}
