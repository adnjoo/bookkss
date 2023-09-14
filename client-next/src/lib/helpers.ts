import axios from 'axios';

import { useUserStore } from '../zustand/store';

export const SERVER_URL = 'http://localhost:3000';

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

export const saveReview = async ({
  userId,
  reviewId,
  title,
  updatedBody,
  setPrivate,
  setArchive,
  reviewDate,
  rating,
}: any) => { // TODO: saveReviewProps
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
