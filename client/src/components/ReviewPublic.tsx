import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { GrLinkNext } from 'react-icons/gr';
import { MdOutlineUnarchive } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Review } from './ReviewComponent';
import { saveReview } from '../lib/helpers';

export interface ReviewPublicProps {
  review: Review;
  archive?: boolean;
  getReviews?: () => void;
}

export const ReviewPublic = ({
  review,
  archive = false,
  getReviews = () => {},
}: ReviewPublicProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleUnarchive = async () => {
    await saveReview({
      userId: review.userId,
      reviewId: review.id,
      title: review.title,
      updatedBody: review.body,
      setPrivate: review.private,
      setArchive: false,
    });
    getReviews();
  };

  return (
    <div key={review.id} className='mb-4 rounded border p-4'>
      <div className='flex justify-between'>
        <h3
          className='cursor-pointer text-xl font-bold'
          onClick={() => setExpanded(!expanded)}
        >
          {review.title} {new Date(review.createdAt).toLocaleDateString()}
        </h3>
        <div className='flex flex-row items-center gap-4'>
          {archive && (
            <button
              onClick={handleUnarchive}
              className='mb-4 mt-4 flex items-center rounded bg-blue-500 p-2 text-white'
            >
              Unarchive
              <MdOutlineUnarchive className='ml-2 inline' />
            </button>
          )}
          <Link to={`/review/${review.id}`} className='flex gap-2'>
            View
            <GrLinkNext size={24} color='green' />
          </Link>
        </div>
      </div>
      <MDEditor.Markdown
        source={review.body.slice(0, 50).replace(/\n/g, ' ') + '...'}
        wrapperElement={{ 'data-color-mode': 'light' } as any}
      />
    </div>
  );
};
