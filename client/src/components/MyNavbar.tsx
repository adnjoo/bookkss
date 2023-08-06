import { getServerSession } from 'next-auth/next';
import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';

import { authOptions } from '../lib/auth';

export const MyNavbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session ? (
        <nav className='mx-4 mt-6 flex justify-between gap-4 lg:mx-60'>
          <div className='flex items-center gap-4'>
            <a href='/'>
              <img src='/logo-long.png' className='hidden w-24 sm:flex' />
              <img src='/logo.png' className='flex w-12 sm:hidden' />
            </a>
            {/* <a href='/dashboard'>Home</a> */}
            <a href='/archive'>Archive</a>
            <a href='/discover'>Discover</a>
          </div>
          <a href='/api/auth/signout' className='flex items-center'>
            <AiOutlineLogout className='flex h-6 w-6 sm:hidden' />
            <span className='hidden sm:flex'>Sign out</span>
          </a>
        </nav>
      ) : (
        <nav className='mx-4 mt-6 flex justify-between gap-4 lg:mx-60'>
          <div className='flex items-center gap-4'>
            <a href='/'>
              <img src='/logo-long.png' className='w-24' />
            </a>
            <a href='/discover'>Discover</a>
          </div>
          <div>
            <a href='/signin'>
              <AiOutlineLogin className='flex h-6 w-6 sm:hidden' />
              <span className='hidden sm:flex'>Sign in</span>
            </a>
          </div>
        </nav>
      )}
    </>
  );
};
