'use client';

import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

import { Review, ReviewComponent } from '@/components/ReviewComponent';
import { saveReview } from '@/app/utils/saveReview';
import { AddReview } from '@/components/AddReview';

const ServerProtectedPage = () => {
  // const { data: session, status }: { data: any; status: any } = useSession();
  // console.log('session', session);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showAddReview, setShowAddReview] = useState(false);

  // const getReviews = async () => {
  //   setLoading(true);
  //   const res = await axios.get(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/get-user-reviews?userId=${session?.user?.id}`
  //   );
  //   res.data = res.data.filter((review: Review) => !review.archive);
  //   setReviews(res.data);
  //   setLoading(false);
  // };

  useEffect(() => {
    console.log('status', status, new Date().toISOString());
  }, [status]);

  // useEffect(() => {
  //   if (session) getReviews();
  // }, [session]);

  // const onAddReview = () => {
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/upsert-review`, {
  //       title,
  //       body,
  //       userId: session?.user?.id,
  //     })
  //     .then(() => {
  //       getReviews();
  //       setTitle('');
  //       setBody('');
  //       setShowAddReview(false);
  //     });
  // };

  // const onDelete = (id: string) => {
  //   window.confirm('Are you sure you want to delete this review?') &&
  //     axios
  //       .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/delete-review`, {
  //         data: {
  //           id,
  //           userId: session?.user?.id,
  //         },
  //       })
  //       .then(() => getReviews());
  // };

  // const onSaveReview = (
  //   reviewId: string,
  //   updatedBody: string,
  //   setPrivate: boolean,
  //   setArchive: boolean
  // ) => {
  //   saveReview({
  //     userId: session?.user?.id,
  //     reviewId,
  //     title: reviews.find((review) => review.id === reviewId)?.title as string, // Keep the existing title
  //     updatedBody,
  //     setPrivate,
  //     setArchive,
  //   }).then(() => {
  //     getReviews();
  //     console.log('Review saved', updatedBody);
  //   });
  // };

  return (
    <>
      {/* {session ? (
        <section className='pb-64 pt-12'>
          <LoadingBar
            color='#3b82f6'
            progress={loading ? 50 : 100}
            height={5}
          />
          <div className='container mx-auto flex flex-col px-4'>
            <h1 className='text-2xl font-bold'>Welcome to your dashboard</h1>
            <div className='flex flex-col justify-between'>
              <h2 className='mt-4 font-medium'>
                You are logged in as: {session?.user?.name}
              </h2>
              <img
                className='my-2 h-8 w-8 rounded-full'
                src={session?.user?.image}
              />
              <button
                className='mt-4 w-[120px] rounded bg-blue-500 p-2 text-white'
                onClick={() => {
                  if (showAddReview) return;
                  setShowAddReview(!showAddReview);
                  setTitle('');
                  setBody('');
                }}
              >
                Add review
              </button>
            </div>
            {showAddReview && (
              <AddReview
                setTitle={setTitle}
                setBody={setBody}
                setShowAddReview={setShowAddReview}
                onAddReview={onAddReview}
                title={title}
                body={body}
              />
            )}
            <div className='mt-4'>
              <div className='mb-6 mt-2 text-3xl font-bold'>My Reviews</div>
              {reviews.map((review: Review) => (
                <ReviewComponent
                  key={review.id}
                  review={review}
                  onSaveReview={onSaveReview}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        </section>
      ) : ( */}
      <div className='mx-auto mb-[600px] mt-24 text-center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, quibusdam, quia, quae voluptates voluptatem quod quos
        voluptatibus quidem doloribus voluptas. Quisquam voluptatum, quibusdam,
        quia, quae voluptates voluptatem quod quos voluptatibus quidem doloribus
        voluptas.
      </div>
      {/* )} */}
    </>
  );
};

export default ServerProtectedPage;
