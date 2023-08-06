import axios from 'axios';

export interface onSaveReviewProps {
  userId: string;
  reviewId: string;
  title: string;
  updatedBody: string;
  setPrivate: boolean;
  setArchive: boolean;
}

export const saveReview = async ({
  userId,
  reviewId,
  title,
  updatedBody,
  setPrivate,
  setArchive,
}: onSaveReviewProps) => {
  let { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/upsert-review`,
    {
      id: reviewId,
      title,
      body: updatedBody,
      userId,
      setPrivate,
      setArchive,
    }
  );
  return data;
};
