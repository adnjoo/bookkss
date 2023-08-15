import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import App from './App.tsx';
import './index.css';
import { Dashboard, Archive, Discover } from './pages';
import { Login, AboutUs, Footer, Navbar, Register } from './components';

const NavbarWrapper = () => {
  return (
    <>
      <Navbar />
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
