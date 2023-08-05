'use client';

import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Review, ReviewComponent } from '@/components/ReviewComponent';

interface EditModeState {
  [reviewId: string]: boolean;
}

const ServerProtectedPage = () => {
  const { data: session }: { data: any } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editMode, setEditMode] = useState<EditModeState>({});
  const [showAddReview, setShowAddReview] = useState(false);

  // console.log('session', session);

  const getReviews = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/get-user-reviews?userId=${session?.user?.id}`
    );
    // console.log(res.data);
    setReviews(res.data);
  };

  useEffect(() => {
    if (session) getReviews();
  }, [session]);

  const onAddReview = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/upsert-review`, {
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

  const onDelete = (id: string) => {
    window.confirm('Are you sure you want to delete this review?') &&
      axios
        .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/delete-review`, {
          data: {
            id,
            userId: session?.user?.id,
          },
        })
        .then(() => getReviews());
  };

  const toggleEditMode = (reviewId: string) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [reviewId]: !prevEditMode[reviewId],
    }));
  };

  const onSaveReview = (reviewId: string, updatedBody: string) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/upsert-review`, {
        id: reviewId,
        title: reviews.find((review) => review.id === reviewId)?.title, // Keep the existing title
        body: updatedBody,
        userId: session?.user?.id,
      })
      .then(() => {
        getReviews();
        setEditMode((prevEditMode) => ({
          ...prevEditMode,
          [reviewId]: false, // Turn off edit mode after saving
        }));
      });
  };

  return (
    <section className='pb-64 pt-12'>
      <div className='container mx-auto flex flex-col px-4'>
        <h1 className='text-2xl font-bold'>Welcome to your dashboard</h1>
        <h2 className='mt-4 font-medium'>
          You are logged in as: {session?.user?.name}
        </h2>
        <button
          className='mt-4 w-[120px] rounded bg-blue-500 p-2 text-white'
          onClick={() => setShowAddReview((prev) => !prev)}
        >
          {showAddReview ? 'Hide Add Review' : 'Add Review'}
        </button>

        {showAddReview && (
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
        )}
        <div className='mt-4'>
          <div className='mb-2'>Reviews</div>
          {reviews.map((review: Review) => (
            <ReviewComponent
              key={review.id}
              review={review}
              onSaveReview={onSaveReview}
              onDelete={onDelete}
              toggleEditMode={toggleEditMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServerProtectedPage;
