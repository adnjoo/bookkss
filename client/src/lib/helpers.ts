import axios from "axios";

import { useUserStore } from "../zustand/store";

export const serverUrl = import.meta.env.VITE_SERVER_URL;

export const logOut = () => {
  localStorage.removeItem("token");
  useUserStore.setState({ user: null });
  alert("Logged out");
  window.location.href = "/";
};

export const downloadMarkdown = (title: string, body: string) => {
  const content = `# ${title}\n\n${body}`;
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title}.md`;
  link.click();
};

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
    `${process.env.SERVER_URL}/reviews/upsert-review`,
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
