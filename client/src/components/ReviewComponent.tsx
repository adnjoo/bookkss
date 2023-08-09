import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineDownload,
  AiFillLock,
  AiFillUnlock,
  AiOutlineEllipsis,
} from 'react-icons/ai';
import { BsArchive } from 'react-icons/bs';

export interface Review {
  archive: boolean;
  body: string;
  createdAt: string;
  id: string;
  private: boolean;
  title: string;
  userId: string;
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
  toggleEditMode: (reviewId: string) => void;
  editMode: boolean;
}

export const ReviewComponent: React.FC<ReviewProps> = ({
  review,
  onSaveReview,
  onDelete,
  toggleEditMode,
  editMode,
}) => {
  const [updatedBody, setUpdatedBody] = useState<any>(review.body);
  const [expanded, setExpanded] = useState(false);
  const [optionsTab, setOptionsTab] = useState(false);

  const handleSaveReview = (
    updatedPrivate: boolean = review.private,
    archive: boolean = review.archive
  ) => {
    onSaveReview(review.id, updatedBody, updatedPrivate, archive);
    toggleEditMode(review.id);
  };

  const handleCancelEdit = () => {
    setUpdatedBody(review.body);
    toggleEditMode(review.id);
  };

  const handleSetExpanded = () => {
    setExpanded(!expanded);
    setOptionsTab(false);
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
      <div
        className='flex cursor-pointer justify-between'
        onClick={() => handleSetExpanded()}
      >
        <h3 className='text-xl font-bold'>
          {review.title} {new Date(review.createdAt).toLocaleDateString()}
        </h3>
        <div className='flex items-center gap-2'>
          {expanded && (
            <>
              <button
                onClick={() => toggleEditMode(review.id)}
                title={editMode ? 'Cancel Edit' : 'Edit'}
              >
                <AiOutlineEdit
                  size={24}
                  color={editMode ? 'orange' : 'black'}
                />
              </button>
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
      <div className='my-3 flex gap-2'>
        {editMode && (
          <>
            <button
              className='rounded bg-green-600 px-2 py-1 text-white'
              onClick={() => handleSaveReview()}
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
