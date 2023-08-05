import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';

export interface Review {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface ReviewProps {
  review: Review;
  onSaveReview: (reviewId: string, updatedBody: string) => void;
  onDelete: (id: string) => void;
  toggleEditMode: (reviewId: string) => void;
}

export const ReviewComponent: React.FC<ReviewProps> = ({
  review,
  onSaveReview,
  onDelete,
  toggleEditMode,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedBody, setUpdatedBody] = useState<any>(review.body);
  const [expanded, setExpanded] = useState(false);

  const handleSaveReview = () => {
    onSaveReview(review.id, updatedBody);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setUpdatedBody(review.body);
    setEditMode(false);
  };

  return (
    <div key={review.id} className='mb-4 rounded border p-4'>
      <div className='flex justify-between'>
        <h3 className='text-xl font-bold'>
          {review.title} {new Date(review.createdAt).toLocaleDateString()}
        </h3>
        <button
          className='rounded px-2 py-1'
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <AiOutlineMinusSquare size={24} />
          ) : (
            <AiOutlinePlusSquare size={24} />
          )}
        </button>
      </div>
      <div className='flex gap-2'>
        {editMode ? (
          <>
            <button
              className='rounded bg-indigo-500 px-2 py-1 text-white'
              onClick={handleSaveReview}
            >
              Save
            </button>
            <button
              className='rounded bg-gray-500 px-2 py-1 text-white'
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          </>
        ) : (
          <button
            className='rounded bg-blue-500 px-2 py-1 text-white'
            onClick={() => toggleEditMode(review.id)}
          >
            Edit
          </button>
        )}
        <button
          className='rounded bg-red-500 px-2 py-1 text-white'
          onClick={() => onDelete(review.id)}
        >
          Delete
        </button>
      </div>
      {editMode ? (
        <MDEditor
          height={600}
          data-color-mode='light'
          value={updatedBody}
          onChange={setUpdatedBody}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      ) : (
        <>
          <MDEditor.Markdown
            source={expanded ? review.body : review.body.slice(0, 10) + '...'}
            wrapperElement={{ 'data-color-mode': 'light' } as any}
          />
        </>
      )}
    </div>
  );
};
