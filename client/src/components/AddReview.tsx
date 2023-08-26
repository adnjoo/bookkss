import rehypeSanitize from 'rehype-sanitize';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@mui/material';

export interface AddReviewProps {
  setTitle: any;
  setBody: any;
  setShowAddReview: any;
  onAddReview: () => void;
  title: string;
  body: string;
}

export function AddReview({
  setTitle,
  setBody,
  setShowAddReview,
  onAddReview,
  title,
  body,
}: AddReviewProps) {
  return (
    <div className='mx-4 mb-12 mt-12 border p-4'>
      <div>
        <div className='mb-2'>Title</div>
        <input
          className='w-full border p-4'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div>
        <div className='mb-2'>Body</div>
        <MDEditor
          height={600}
          data-color-mode='light'
          value={body}
          onChange={setBody}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </div>
      <div className='flex gap-2'>
        <Button variant='contained' onClick={onAddReview} sx={{ mt: 2 }}>
          Add review
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={() => setShowAddReview(false)}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
