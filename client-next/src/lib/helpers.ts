import { useUserStore } from '../zustand/store';

export const SERVER_URL = 'http://localhost:3000';

export const logOut = () => {
  localStorage.removeItem('token');
  useUserStore.setState({ user: null });
  alert('Logged out');
  window.location.href = '/';
};
