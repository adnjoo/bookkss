import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import App from './App.tsx';
import './index.css';
import { Dashboard, Archive, Discover } from './pages';
import { Login, AboutUs, Footer, Navbar, Register } from './components';
import { useLoadingStore } from './zustand/store.ts';

const NavbarWrapper = () => {
  const loading = useLoadingStore((state: any) => state.loading);
  return (
    <>
      <Navbar />
      <LoadingBar color='#3b82f6' progress={loading ? 50 : 100} height={5} />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarWrapper />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/archive',
        element: <Archive />,
      },
      {
        path: 'discover',
        element: <Discover />,
      },
      {
        path: '*',
        element: <h1>404</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
