export const serverUrl = import.meta.env.VITE_SERVER_URL;

export const logOut = () => {
  localStorage.removeItem("token");
  alert("Logged out");
};
