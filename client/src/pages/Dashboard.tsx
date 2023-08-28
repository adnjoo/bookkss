import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { useLoadingStore, useUserStore } from '../zustand/store';
import { Review, ReviewComponent } from '../components/ReviewComponent';
import { AddReview } from '../components/AddReview';
import { saveReview, SERVER_URL } from '../lib/helpers';

export interface onSaveReviewProps {
  reviewId: number;
  updatedBody: string;
  setPrivate: boolean;
  setArchive: boolean;
  reviewDate: string;
  updatedTitle?: string;
  rating?: number;
}

export function Dashboard() {
  const setLoading = useLoadingStore((state: any) => state.setLoading);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showAddReview, setShowAddReview] = useState(false);
  const user = useUserStore((state: any) => state?.user);

  const getReviews = async () => {
    setLoading(true);
    const res = await axios.get(
      `${SERVER_URL}/reviews/get-user-reviews?userId=${user?.id}`
    );
    res.data = res.data.filter((review: Review) => !review.archive);
    setReviews(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) getReviews();
  }, [user]);

  const onAddReview = () => {
    axios
      .post(`${SERVER_URL}/reviews/upsert-review`, {
        title,
        body,
        userId: user?.id,
      })
      .then(() => {
        getReviews();
        setTitle('');
        setBody('');
        setShowAddReview(false);
      });
  };

  const onDelete = (id: number) => {
    const token = localStorage.getItem('token');
    window.confirm('Are you sure you want to delete this review?') &&
      axios
        .delete(`${SERVER_URL}/reviews/delete-review`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id,
            userId: user?.id,
          },
        })
        .then(() => getReviews());
  };

  const onSaveReview = ({
    reviewId,
    updatedBody,
    setPrivate,
    setArchive,
    reviewDate,
    updatedTitle,
    rating,
  }: onSaveReviewProps) => {
    saveReview({
      userId: user?.id,
      reviewId,
      title:
        updatedTitle ||
        (reviews.find((review: Review) => review.id === reviewId)
          ?.title as string),
      updatedBody,
      setPrivate,
      setArchive,
      reviewDate,
      rating,
    }).then(() => {
      getReviews();
      console.log('Review saved', updatedBody);
    });
  };

  return (
    <>
      {user ? (
        <section className='pb-64 pt-12'>
          <div className='container mx-auto flex flex-col px-4'>
            <h1 className='text-2xl font-bold'>Welcome to your dashboard</h1>
            <div className='flex flex-col justify-between'>
              <h2 className='mt-4 font-medium'>
                You are logged in as: user: {user?.id}, email: {user?.email}
              </h2>
              <Button
                variant='contained'
                onClick={() => {
                  if (showAddReview) return;
                  setShowAddReview(!showAddReview);
                  setTitle('');
                  setBody('');
                }}
                sx={{ width: 'fit-content', mt: 2 }}
              >
                Add review
              </Button>
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
      ) : (
        <div className='mx-auto mb-[600px] mt-24 text-center'>
          <Link to='/login' className='rounded-xl bg-gray-500 p-3 text-white'>
            Login to see your dashboard
          </Link>
        </div>
      )}
    </>
  );
}
