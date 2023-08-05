'use client';

import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

import { Review, ReviewComponent } from '@/components/ReviewComponent';

interface EditModeState {
  [reviewId: string]: boolean;
}

const ServerProtectedPage = () => {
  const { data: session }: { data: any } = useSession();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editMode, setEditMode] = useState<EditModeState>({});
  const [showAddReview, setShowAddReview] = useState(false);

  // console.log('session', session);

  const getReviews = async () => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/get-user-reviews?userId=${session?.user?.id}`
    );
    // console.log(res.data);
    setReviews(res.data);
    setLoading(false);
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

  const onSaveReview = (
    reviewId: string,
    updatedBody: string,
    setPrivate: boolean
  ) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/upsert-review`, {
        id: reviewId,
        title: reviews.find((review) => review.id === reviewId)?.title, // Keep the existing title
        body: updatedBody,
        userId: session?.user?.id,
        setPrivate,
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
    <>
      {session ? (
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
              <button
                className='mt-4 w-[120px] rounded bg-blue-500 p-2 text-white'
                onClick={() => {
                  setShowAddReview(!showAddReview);
                  setTitle('');
                  setBody('');
                }}
              >
                {showAddReview ? 'Cancel' : 'Add Review'}
              </button>
            </div>
            {showAddReview && (
              <div className='mx-4 mb-12 mt-12 border p-4'>
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
                </div>
              </div>
            )}
            <div className='mt-4'>
              <div className='mb-6 mt-2 text-3xl font-bold'>My Reviews</div>
              {reviews.map((review: Review) => (
                <ReviewComponent
                  key={review.id}
                  review={review}
                  onSaveReview={onSaveReview}
                  onDelete={onDelete}
                  toggleEditMode={toggleEditMode}
                  editMode={editMode[review.id]}
                  setEditMode={setEditMode}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className='mx-auto mb-[600px] mt-24 text-center'></div>
      )}
    </>
  );
};

export default ServerProtectedPage;
