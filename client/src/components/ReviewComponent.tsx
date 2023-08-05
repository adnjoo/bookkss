import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineDownload,
} from 'react-icons/ai';

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
  editMode: boolean;
  setEditMode: any;
}

export const ReviewComponent: React.FC<ReviewProps> = ({
  review,
  onSaveReview,
  onDelete,
  toggleEditMode,
  editMode,
  setEditMode,
}) => {
  const [updatedBody, setUpdatedBody] = useState<any>(review.body);
  const [expanded, setExpanded] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleSaveReview = () => {
    onSaveReview(review.id, updatedBody);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setUpdatedBody(review.body);
    setEditMode(false);
  };

  const downloadMarkdown = (title: string, body: string) => {
    const content = `# ${title}\n\n${body}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.md`;
    link.click();
  };

  return (
    <div key={review.id} className='mb-4 rounded border p-4'>
      <div className='flex justify-between'>
        <h3 className='text-xl font-bold'>
          {review.title} {new Date(review.createdAt).toLocaleDateString()}
        </h3>
        <div className='flex items-center gap-2'>
          {showButtons && (
            <>
              <button
                onClick={() => downloadMarkdown(review.title, updatedBody)}
                title='Download as Markdown'
              >
                <AiOutlineDownload size={24} />
              </button>

              <button
                onClick={() => toggleEditMode(review.id)}
                title={editMode ? 'Cancel Edit' : 'Edit'}
              >
                <AiOutlineEdit
                  size={24}
                  color={editMode ? 'orange' : 'black'}
                />
              </button>
              <button onClick={() => onDelete(review.id)} title='Delete'>
                <AiOutlineDelete size={24} />
              </button>
            </>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            title={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? (
              <AiOutlineMinusSquare
                size={24}
                color='green'
                onClick={() => setShowButtons(!showButtons)}
              />
            ) : (
              <AiOutlinePlusSquare
                size={24}
                onClick={() => setShowButtons(!showButtons)}
              />
            )}
          </button>
        </div>
      </div>
      <div className='my-3 flex gap-2'>
        {editMode && (
          <>
            <button
              className='rounded bg-green-600 px-2 py-1 text-white'
              onClick={handleSaveReview}
            >
              Save
            </button>
            <button
              className='rounded bg-slate-600 px-2 py-1 text-white'
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </>
        )}
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
