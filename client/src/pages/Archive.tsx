import axios from 'axios';
import { useState, useEffect } from 'react';

import { SERVER_URL } from '../lib/helpers';
import { ReviewPublic } from '../components/ReviewPublic';
import type { Review } from '../components/ReviewComponent';
import { useUserStore } from '../zustand/store';

export function Archive() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const user = useUserStore((state: any) => state?.user);

  const getReviews = async () => {
    const res = await axios.get(
      `${SERVER_URL}/reviews/get-user-reviews?userId=${user?.id}`
    );
    res.data = res.data.filter((review: Review) => review.archive);
    setReviews(res.data);
  };

  useEffect(() => {
    if (user) getReviews();
  }, [user]);

  return (
    <div className='mx-4 mb-[400px] flex flex-col justify-center sm:mx-24'>
      <div className='mb-6 mt-2 text-3xl font-bold'>Archive</div>
      {reviews.map((review) => (
        <ReviewPublic review={review} archive getReviews={getReviews} />
      ))}
    </div>
  );
}
