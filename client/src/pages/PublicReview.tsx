import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from '@mui/material';
import { Share } from '@mui/icons-material';

import type { Review } from '../components/ReviewComponent';
import { SERVER_URL } from '../lib/helpers';
import { useLoadingStore } from '../zustand/store';
import { Rating } from '../components/Rating';

export function PublicReview() {
  const [loading, setLoading] = useLoadingStore((state: any) => [
    state.loading,
    state.setLoading,
  ]);
  const { id } = useParams();
  const [review, setReview] = useState<Review | null>(null);

  const handleCopy = () => {
    const url = `${window.location.origin}/review/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success(`Copied link to ${review?.title} to clipboard!`);
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${SERVER_URL}/reviews/get-public-review/${id}`)
      .then((response) => {
        setReview(response.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching review:', error);
        setReview(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading review...</p>;
  }

  return (
    <div className='mx-2 mb-48 mt-12 flex items-center justify-center rounded border p-4 lg:mx-64'>
      {review ? (
        <div>
          <h2 className='text-xl font-semibold'>{review.title}</h2>
          <Rating
            rating={review.rating}
            showText={false}
            onRatingChange={() => {}}
          />
          <p className='my-2 mb-4 flex items-center text-gray-600'>
            Review date: {new Date(review?.reviewDate).toLocaleDateString()}
            <Tooltip title='Copy link to review' arrow sx={{ ml: 2 }}>
              <Button onClick={handleCopy} color='inherit'>
                <Share />
              </Button>
            </Tooltip>
          </p>
          <Link
            to={`/profile/${review.userId}`}
            title={`More reviews by user: ${review.userId}`}
          >
            <p className='mb-4 cursor-pointer text-xl text-gray-600 hover:text-blue-500'>
              More reviews by user: {review.userId}
            </p>
          </Link>
          <MDEditor.Markdown
            source={review.body}
            wrapperElement={{ 'data-color-mode': 'light' } as any}
          />
        </div>
      ) : (
        <p>Review not found.</p>
      )}
    </div>
  );
}
