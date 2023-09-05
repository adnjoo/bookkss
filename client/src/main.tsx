import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer } from 'react-toastify';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';
import {
  Dashboard,
  AboutUs,
  Archive,
  Blog,
  Discover,
  Login,
  Profile,
  PublicReview,
  Register,
  Test,
} from './pages';
import { Footer, Navbar } from './components';
import { useLoadingStore } from './zustand/store.ts';

const NavbarWrapper = () => {
  const loading = useLoadingStore((state: any) => state.loading);
  return (
    <>
      <Navbar />
      <LoadingBar color='#333333' progress={loading ? 50 : 100} height={5} />
      <Outlet />
      <Footer />
      <ToastContainer position='bottom-left' autoClose={2000} />
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
        path: '/discover',
        element: <Discover />,
      },
      {
        path: '/review/:id',
        element: <PublicReview />,
      },
      {
        path: '/profile/:id',
        element: <Profile />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/test',
        element: <Test />,
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
