import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { MdOutlineUnarchive } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Review } from './ReviewComponent';
import { saveReview } from '../lib/helpers';

export interface ReviewPublicProps {
  review: Review;
  archive?: boolean;
  getReviews?: () => void;
  noExpand?: boolean;
}

export const ReviewPublic = ({
  review,
  archive = false,
  getReviews = () => {},
  noExpand = false,
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
      reviewDate: review.reviewDate,
    });
    getReviews();
  };

  return (
    <div
      key={review.id}
      className='mb-4 w-full max-w-[1000px] rounded border p-4'
    >
      <div className='flex items-center justify-between'>
        <span>
          <Link to={`/review/${review.id}`}>
            <h3 className='cursor-pointer text-xl font-bold'>
              {review.title} {new Date(review.reviewDate).toLocaleDateString()}{' '}
            </h3>
          </Link>
          <Link to={`/profile/${review.userId}`}>
            <p>by user: {review.userId}</p>
          </Link>
        </span>
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
          {!noExpand && (
            <button
              onClick={() => setExpanded(!expanded)}
              className='mb-4 mt-4 flex items-center rounded bg-blue-500 p-2 text-white'
            >
              {expanded ? 'Hide' : 'Expand'}
            </button>
          )}
        </div>
      </div>
      <MDEditor.Markdown
        className='max-w-[1000px] overflow-hidden'
        source={
          expanded ? review.body : review.body.slice(0, 50).replace(/\n/g, ' ')
        }
        wrapperElement={{ 'data-color-mode': 'light' } as any}
      />
    </div>
  );
};
