'use client';

import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ServerProtectedPage = () => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/get-reviews`)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      });
  }, []);

  return (
    <section className='py-24'>
      <div className='container mx-auto flex flex-col px-4'>
        <h1 className='text-2xl font-bold'>
          This is a server-side protected page
        </h1>
        <h2 className='mt-4 font-medium'>
          You are logged in as: {session?.user?.name}
        </h2>
        <div className='mt-4'>
          Reviews
          {reviews.map((review) => (
            <div key={review.id}>
              <h3>{review.title}</h3>
              <p>{review.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServerProtectedPage;
