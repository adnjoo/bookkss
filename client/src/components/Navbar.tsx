import { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { logOut, SERVER_URL } from '../lib/helpers';
import Banner from './Banner';
import { useUserStore } from '../zustand/store';

export function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const user = useUserStore((state: any) => state.user);
  const setUser = useUserStore((state: any) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log(token);
    if (token) {
      axios
        .get(`${SERVER_URL}/users/is-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          // alert(res.status);
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <nav>
      <div>
        <Banner />
        <div className='mt-4 flex items-center justify-between lg:mx-64'>
          <div id='left' className='ml-4 flex flex-row items-center gap-2'>
            <Link to='/'>
              <img src='/logo-long.png' className='hidden w-24 sm:flex' />
            </Link>
            {user && (
              <div className='flex hidden gap-2 sm:flex'>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/archive'>Archive</Link>
                <Link to='/discover'>Discover</Link>
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
            {!user ? (
              <Link to='/login' className='mr-4 flex gap-2'>
                <span className='hidden sm:flex'>Login&nbsp;</span>
                <AiOutlineLogin className='flex h-6 w-6' />
              </Link>
            ) : (
              <button onClick={logOut} className='mr-2 flex gap-2'>
                <span className='hidden sm:flex'>Logout&nbsp;</span>
                <AiOutlineLogout className='flex h-6 w-6' />
              </button>
            )}
          </div>
        </div>
        {expanded && (
          <div className='flex flex-col gap-2 sm:hidden'>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/archive'>Archive</Link>
            <Link to='/discover'>Discover</Link>
            <button className='text-start' onClick={logOut}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
