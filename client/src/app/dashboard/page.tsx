'use client';

import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ServerProtectedPage = () => {
  const { data: session }: { data: any } = useSession();
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // console.log('session', session);

  const getReviews = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/get-user-reviews?userId=${session?.user?.id}`
    );
    // console.log(res.data);
    setReviews(res.data);
  };

  useEffect(() => {
    getReviews();
  }, [session]);

  const onAddReview = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/add-review`, {
        title,
        body,
        userId: session?.user?.id,
      })
      .then(() => {
        getReviews();
        setTitle('');
        setBody('');
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
            <input
              className='w-full border p-4'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <div className='mb-2'>Body</div>
            <textarea
              className='w-full border p-6'
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
          </div>
          <div className='flex gap-2'>
            <button
              className='mt-4 w-[100px] rounded bg-gray-500 p-2 text-white'
              onClick={onAddReview}
            >
              Add review
            </button>
            <button
              className='mt-4 w-[100px] rounded bg-gray-700 p-2 text-white'
              onClick={() => {
                setTitle('');
                setBody('');
              }}
            >
              Clear content
            </button>
          </div>
        </div>
        <div className='mt-4'>
          <div className='mb-2'>Reviews</div>
          {reviews.map((review: any) => (
            <div key={review.id} className='mb-4 rounded border p-4'>
              <h3 className='text-xl font-bold'>
                {review.title} {new Date(review.createdAt).toLocaleDateString()}
              </h3>
              <p>
                Private:{' '}
                <input
                  type='checkbox'
                  checked={review.private}
                  onChange={(e) => {
                    window.confirm(
                      'Are you sure you want to change the privacy setting of this review?'
                    );
                  }}
                />
              </p>
              <p className='mt-2'>{review.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServerProtectedPage;
