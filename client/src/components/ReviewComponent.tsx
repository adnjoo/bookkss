import { useState, useRef, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiOutlineDelete,
  AiOutlineDownload,
  AiFillLock,
  AiFillUnlock,
  AiOutlineEllipsis,
} from 'react-icons/ai';
import { BsArchive } from 'react-icons/bs';

import { downloadMarkdown } from '../lib/helpers';

export interface Review {
  archive: boolean;
  body: string;
  createdAt: string;
  id: number;
  private: boolean;
  title: string;
  userId: number;
}

export interface ReviewProps {
  review: Review;
  onSaveReview: (
    reviewId: string,
    updatedBody: string,
    setPrivate: boolean,
    setArchive: boolean
  ) => void;
  onDelete: (id: string) => void;
}

export const ReviewComponent: React.FC<ReviewProps> = ({
  review,
  onSaveReview,
  onDelete,
}) => {
  const [updatedBody, setUpdatedBody] = useState<any>(review.body);
  const [expanded, setExpanded] = useState(false);
  const [optionsTab, setOptionsTab] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<any>(review.body);

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
    onSaveReview(review.id, bodyRef.current, updatedPrivate, archive);
    setEditMode(false);
  };

  const handleSetExpanded = () => {
    setExpanded(!expanded);
    setOptionsTab(false);
  };

  return (
    <div key={review.id} className='mb-4 rounded border p-4'>
      <div className='flex justify-between'>
        <h3
          className='cursor-pointer text-xl font-bold'
          onClick={handleSetExpanded}
        >
          {review.title} {new Date(review.createdAt).toLocaleDateString()}
        </h3>
        <div className='flex items-center gap-2'>
          {expanded && !editMode && (
            <>
              <button
                onClick={() => setOptionsTab(!optionsTab)}
                title='More Options'
              >
                <AiOutlineEllipsis
                  size={24}
                  color={optionsTab ? 'green' : 'black'}
                />
              </button>
            </>
          )}
          <button
            onClick={handleSetExpanded}
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
      {optionsTab && (
        <div className='my-4 rounded border bg-white p-4'>
          <h2 className='mb-4 text-xl font-bold'>Options</h2>
          <div className='flex gap-4'>
            <button
              onClick={() => downloadMarkdown(review.title, review.body)}
              title='Download as Markdown'
            >
              <AiOutlineDownload size={24} />
              Download
            </button>
            <button
              onClick={() => handleSaveReview(!review.private)}
              title={review.private ? 'Make Public' : 'Make Private'}
            >
              {review.private ? (
                <AiFillLock size={24} color={'red'} />
              ) : (
                <AiFillUnlock size={24} />
              )}
              {review.private ? 'Make Public' : 'Make Private'}
            </button>
            <button
              onClick={() => handleSaveReview(review.private, !review.archive)}
              title='Archive'
            >
              <BsArchive size={24} color={'black'} />
              Archive
            </button>
            <button onClick={() => onDelete(review.id)} title='Delete'>
              <AiOutlineDelete size={24} />
              Delete
            </button>
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
