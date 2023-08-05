'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai';

export const MyNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <nav className='mx-4 mt-6 flex justify-between gap-4 lg:mx-60'>
            <div className='flex gap-4'>
              <img src='/logo-long.png' className='hidden w-24 sm:block' />
              <img src='/logo.png' className='w-8 sm:hidden' />
              <div className='hidden gap-4 sm:flex'>
                <a href='/'>Home</a>
                <a href='/dashboard'>Dashboard</a>
                <a href='/discover'>Discover</a>
              </div>
            </div>

            <AiOutlineMenu
              className='cursor-pointer sm:hidden'
              onClick={() => setShowMenu(!showMenu)}
            />
            <a href='/api/auth/signout' className='hidden sm:flex'>
              Sign out
            </a>
          </nav>
          <div
            className={`ml-4 mt-2 flex gap-4 ${
              showMenu ? 'flex-col' : 'hidden'
            }`}
          >
            <a href='/'>Home</a>
            <a href='/dashboard'>Dashboard</a>
            <a href='/discover'>Discover</a>
            <a href='/api/auth/signout'>Sign out</a>
          </div>
        </>
      ) : (
        <nav className='mx-4 mt-6 flex justify-between gap-4 lg:mx-60'>
          <div className='flex gap-4'>
            <a href='/'>
              <img src='/logo-long.png' className='w-24' />
            </a>
            <a href='/discover'>Discover</a>
          </div>
          <div>
            <a href='/signin'>Sign in</a>
          </div>
        </nav>
      )}
    </>
  );
};
