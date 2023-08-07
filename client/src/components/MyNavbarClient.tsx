'use client';

import { useState } from 'react';
import { AiOutlineMenu, AiOutlineLogout } from 'react-icons/ai';

export const MyNavbarClient = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className='flex justify-between lg:mx-64'>
        <div id='left' className='flex flex-row gap-4'>
          <a href='/'>
            <img src='/logo-long.png' className='hidden w-24 sm:flex' />
          </a>
          <a href='/dashboard' className='hidden sm:flex'>
            Dashboard
          </a>
          <a href='/archive' className='hidden sm:flex'>
            Archive
          </a>
          <a href='/discover' className='hidden sm:flex'>
            Discover
          </a>
          <button onClick={() => setExpanded(!expanded)}>
            <AiOutlineMenu className='flex h-6 w-6 sm:hidden' color='black' />
          </button>
        </div>
        <a href='/'>
          <img src='/logo.png' className='flex w-12 sm:hidden' />
        </a>
        <div id='right' className='flex'>
          <a href='/api/auth/signout' className='flex items-center'>
            <AiOutlineLogout className='flex h-6 w-6 sm:hidden' />
            <span className='hidden sm:flex'>Sign out</span>
          </a>
        </div>
      </div>
      {expanded && (
        <div className='flex flex-col gap-2 sm:hidden'>
          <a href='/dashboard'>Dashboard</a>
          <a href='/archive'>Archive</a>
          <a href='/discover'>Discover</a>
        </div>
      )}
    </div>
  );
};
