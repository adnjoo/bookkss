import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';

export const ReviewPublic: React.FC<ReviewProps> = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div key={review.id} className='mb-4 rounded border p-4'>
      <div className='flex justify-between'>
        <h3 className='text-xl font-bold'>
          {review.title} {new Date(review.createdAt).toLocaleDateString()}
        </h3>
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
      {expanded ? (
        <MDEditor.Markdown
          source={review.body}
          wrapperElement={{ 'data-color-mode': 'light' } as any}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      ) : (
        <>
          <MDEditor.Markdown
            source={review.body.slice(0, 10) + '...'}
            wrapperElement={{ 'data-color-mode': 'light' } as any}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </>
      )}
    </div>
  );
};
