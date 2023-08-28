import { useState, useRef, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { Button, Tooltip } from '@mui/material';
import {
  Archive,
  Delete,
  Download,
  ExpandMore,
  ExpandLess,
  Lock,
  LockOpen,
  Settings,
} from '@mui/icons-material';
import { useMediaQuery } from 'react-responsive';

import { downloadMarkdown } from '../lib/helpers';
import { MyDateCalendar } from './MyDateCalendar';
import { onSaveReviewProps } from '../pages';
import { Rating } from './Rating';

export interface Review {
  archive: boolean;
  body: string;
  createdAt: string;
  id: number;
  private: boolean;
  title: string;
  userId: number;
  reviewDate: string;
  rating: number;
}

export interface ReviewProps {
  review: Review;
  onSaveReview: (props: onSaveReviewProps) => void;
  onDelete: (id: number) => void;
}

export const ReviewComponent: React.FC<ReviewProps> = ({
  review,
  onSaveReview,
  onDelete,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const [updatedBody, setUpdatedBody] = useState<any>(review.body);
  const [expanded, setExpanded] = useState(false);
  const [optionsTab, setOptionsTab] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<any>(review.body);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(review.title);
  const [rating, setRating] = useState(review.rating);

  // console.log('review', review);

  function handleBodyChange(e: any) {
    setUpdatedBody(e);
    bodyRef.current = e;
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        handleSaveReview();
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [containerRef]);

  const handleSaveReview = (
    updatedPrivate: boolean = review.private,
    archive: boolean = review.archive
  ) => {
    onSaveReview({
      reviewId: review.id,
      updatedBody: bodyRef.current,
      setPrivate: updatedPrivate,
      setArchive: archive,
      reviewDate: review.reviewDate,
    });
    setEditMode(false);
  };

  const handleSetExpanded = () => {
    setExpanded(!expanded);
    setOptionsTab(false);
  };

  const handleSaveTitle = () => {
    onSaveReview({
      reviewId: review.id,
      updatedTitle: editedTitle,
      updatedBody: bodyRef.current,
      setPrivate: review.private,
      setArchive: review.archive,
      reviewDate: review.reviewDate,
    });
    setIsEditingTitle(false);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onSaveReview({
      reviewId: review.id,
      updatedBody: bodyRef.current,
      setPrivate: review.private,
      setArchive: review.archive,
      reviewDate: review.reviewDate,
      rating: newRating, // Save the updated rating to the review object
    });
  };

  return (
    <div key={review.id} className='mb-4 items-center rounded border p-4'>
      <div className='mb-4 flex justify-between border-b pb-6'>
        <span className='flex flex-col gap-4 sm:flex-row'>
          {isEditingTitle ? (
            <div className='flex gap-2'>
              <input
                className='rounded border p-1'
                type='text'
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <Button variant='contained' onClick={handleSaveTitle}>
                Save
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setIsEditingTitle(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <h3
              className='text-xl font-bold'
              onClick={() => setIsEditingTitle(true)}
            >
              {review.title}
            </h3>
          )}
          <MyDateCalendar review={review} onSaveReview={onSaveReview} />
          <Rating rating={rating} onRatingChange={handleRatingChange} />
        </span>

        <div className='gap-2'>
          {expanded && !editMode && (
            <>
              <Button
                onClick={() => setOptionsTab(!optionsTab)}
                title='More Options'
                color='inherit'
              >
                <Settings />
              </Button>
            </>
          )}
          <Tooltip
            title={expanded ? 'Collapse' : 'Expand'}
            color='inherit'
            arrow
          >
            <Button onClick={handleSetExpanded} color='inherit'>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </Button>
          </Tooltip>
        </div>
      </div>
      {optionsTab && (
        <div className='my-4 rounded border bg-white p-4'>
          <h2 className='mb-4 text-xl font-bold'>Options</h2>
          <div className='flex flex-col gap-4 sm:flex-row'>
            <Button
              onClick={() => downloadMarkdown(review.title, review.body)}
              title='Download as Markdown'
              sx={{ gap: 1 }}
              color='inherit'
            >
              <Download />
              Download
            </Button>
            <Button
              onClick={() => handleSaveReview(!review.private)}
              title={review.private ? 'Make Public' : 'Make Private'}
              sx={{ gap: 1 }}
              color='inherit'
            >
              {review.private ? <Lock /> : <LockOpen />}
              {review.private ? 'Make Public' : 'Make Private'}
            </Button>
            <Button
              onClick={() => handleSaveReview(review.private, !review.archive)}
              title='Archive'
              sx={{ gap: 1 }}
              color='inherit'
            >
              <Archive />
              Archive
            </Button>
            <Button
              onClick={() => onDelete(review.id)}
              title='Delete'
              sx={{ gap: 1 }}
              color='inherit'
            >
              <Delete />
              Delete
            </Button>
          </div>
        </div>
      )}
      {editMode ? (
        <div ref={containerRef}>
          <MDEditor
            height={600}
            data-color-mode='light'
            value={updatedBody}
            onChange={handleBodyChange}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
            preview={isMobile ? 'edit' : 'live'}
          />
        </div>
      ) : (
        <div onClick={() => setEditMode(!editMode)}>
          <MDEditor.Markdown
            source={expanded ? updatedBody : updatedBody.slice(0, 10) + '...'}
            wrapperElement={{ 'data-color-mode': 'light' } as any}
          />
        </div>
      )}
    </div>
  );
};
