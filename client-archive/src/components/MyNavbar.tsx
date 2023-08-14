'use client';
import { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';

import { supabase } from '@/lib/supabase';

export default function MyNavbar() {
  const [user, setUser] = useState<any>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      console.log('user', user);
    };

    getData();
  }, []);

  return (
    <div>
      <div className='fixed bottom-0 left-0 flex h-8 w-full items-center justify-center bg-black text-white'>
        Currently in Alpha mode - please report any bugs to{' '}
        linkedin.com/in/adnjoo
      </div>
      <div className='mt-4 flex justify-between lg:mx-64'>
        <div id='left' className='flex flex-row gap-4'>
          <button onClick={() => setExpanded(!expanded)}>
            <img src='/logo-long.png' className='hidden w-24 sm:flex' />
          </button>
          {expanded && user && (
            <div className='flex hidden gap-2 sm:flex'>
              <a href='/dashboard'>Dashboard</a>
              <a href='/archive'>Archive</a>
              <a href='/discover'>Discover</a>
            </div>
          )}
          {expanded && !user && (
            <div className='flex hidden gap-2 sm:flex'>
              <a href='/discover'>Discover</a>
            </div>
          )}
          <button onClick={() => setExpanded(!expanded)}>
            <AiOutlineMenu className='flex h-6 w-6 sm:hidden' color='black' />
          </button>
        </div>
        <a href='/'>
          <img src='/logo.png' className='flex w-12 sm:hidden' />
        </a>
        <div id='right' className='flex'>
          <a
            href={user === null ? '/login' : '/logout'}
            className='flex items-center'
          >
            <AiOutlineLogout className='flex h-6 w-6' />
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
}
