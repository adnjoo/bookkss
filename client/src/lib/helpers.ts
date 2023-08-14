import { useUserStore } from "../zustand/store";

export const serverUrl = import.meta.env.VITE_SERVER_URL;

export const logOut = () => {
  localStorage.removeItem("token");
  useUserStore.setState({ user: null });
  alert("Logged out");
  window.location.href = "/";
};
