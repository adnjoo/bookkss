import axios from 'axios';

import { useUserStore } from '../zustand/store';

export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const logOut = () => {
  localStorage.removeItem('token');
  useUserStore.setState({ user: null });
  alert('Logged out');
  window.location.href = '/';
};

export const downloadMarkdown = (title: string, body: string) => {
  const content = `# ${title}\n\n${body}`;
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.md`;
  link.click();
};

export interface saveReviewProps {
  userId: number;
  reviewId: number;
  title: string;
  updatedBody: string;
  setPrivate: boolean;
  setArchive: boolean;
  reviewDate: string;
  rating: number;
}

export const saveReview = async ({
  userId,
  reviewId,
  title,
  updatedBody,
  setPrivate,
  setArchive,
  reviewDate,
  rating,
}: saveReviewProps) => {
  let { data } = await axios.post(`${SERVER_URL}/reviews/upsert-review`, {
    id: reviewId,
    title,
    body: updatedBody,
    userId,
    setPrivate,
    setArchive,
    reviewDate,
    rating,
  });
  return data;
};
