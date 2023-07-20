'use client';

import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ServerProtectedPage = () => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/get-reviews`)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      });
  }, []);

  const onAddReview = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-review`, {
        title,
        body,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <section className='py-24'>
      <div className='container mx-auto flex flex-col px-4'>
        <h1 className='text-2xl font-bold'>Welcome to your dashboard</h1>
        <h2 className='mt-4 font-medium'>
          You are logged in as: {session?.user?.name}
        </h2>
        <div className='mt-4 flex flex-col rounded-xl border p-4'>
          <div className='mb-2 underline'>Add review</div>
          <div>
            <div className='mb-2'>Title</div>
            <textarea
              className='border p-2'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <div className='mb-2'>Body</div>
            <textarea
              className='border p-2'
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <button
            className='mt-4 w-[100px] rounded bg-gray-500 px-4 py-2 text-white'
            onClick={onAddReview}
          >
            Add review
          </button>
        </div>
        <div className='mt-4'>
          <div className='mb-2'>Reviews</div>
          {reviews.map((review: any) => (
            <div key={review.id} className='mb-4 rounded border p-4'>
              <h3 className='text-xl font-bold'>
                {review.title} {new Date(review.createdAt).toLocaleDateString()}
              </h3>
              <p className='mt-2'>{review.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServerProtectedPage;
