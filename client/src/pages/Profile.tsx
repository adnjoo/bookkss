import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ReviewPublic, type Review } from '../components';
import { SERVER_URL } from '../lib/helpers';

export function Profile() {
  const { id } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    axios.get(`${SERVER_URL}/reviews/get-public-reviews`).then((res) => {
      let temp = res.data.filter(
        (review: Review) => String(review.userId) === id
      );
      setReviews(temp);
    });
  }, [id]);

  return (
    <div className='mb-[380px] mt-16'>
      <div className='mx-auto flex flex-col items-center justify-center'>
        <h1 className='mb-8'>Profile {id}</h1>
        <ul className='flex w-full flex-col items-center'>
          {reviews.map((review) => (
            <ReviewPublic review={review} />
          ))}
        </ul>
      </div>
    </div>
  );
}
