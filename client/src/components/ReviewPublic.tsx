import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';

import { Review } from '@/components/ReviewComponent';
import { saveReview } from '@/app/utils/saveReview';

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
  console.log(review);

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
        <h3 className='text-xl font-bold'>
          {review.title} {new Date(review.createdAt).toLocaleDateString()}
        </h3>
        <div className='flex items-center gap-2'>
          {archive && <button onClick={handleUnarchive}>Unarchive</button>}
          <button
            onClick={() => setExpanded(!expanded)}
            title={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? (
              <AiOutlineMinusSquare size={24} color='green' />
            ) : (
              <AiOutlinePlusSquare size={24} />
            )}
          </button>
        </div>
      </div>
      {expanded ? (
        <MDEditor.Markdown
          source={review.body}
          wrapperElement={{ 'data-color-mode': 'light' } as any}
        />
      ) : (
        <>
          <MDEditor.Markdown
            source={review.body.slice(0, 10) + '...'}
            wrapperElement={{ 'data-color-mode': 'light' } as any}
          />
        </>
      )}
    </div>
  );
};
