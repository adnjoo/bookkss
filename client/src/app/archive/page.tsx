'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { ReviewPublic } from '@/components/ReviewPublic';
import type { Review } from '@/components/ReviewComponent';

function Archive() {
  const { data: session }: { data: any } = useSession();

  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const getReviews = async () => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/get-user-reviews?userId=${session?.user?.id}`
    );
    res.data = res.data.filter((review: Review) => review.archive);
    setReviews(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (session) getReviews();
  }, [session]);

  return (
    <div className='mx-4 mb-[400px] flex flex-col justify-center sm:mx-24'>
      <div className='mb-6 mt-2 text-3xl font-bold'>Archive</div>
      {reviews.map((review) => (
        <ReviewPublic review={review} archive getReviews={getReviews} />
      ))}
    </div>
  );
}

export default Archive;
