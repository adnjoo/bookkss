import { getServerSession } from 'next-auth/next';
import { AiOutlineLogin } from 'react-icons/ai';

import { MyNavbarClient } from './MyNavbarClient';
import { authOptions } from '../lib/auth';

export const MyNavbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      {/* <div className='rounded bg-yellow-400 text-xs'>
        Currently in Alpha Mode - there may be bugs!
      </div> */}
      {session ? (
        <nav className='mx-4 mt-6'>
          <MyNavbarClient />
        </nav>
      ) : (
        <nav className='mx-4 mt-6 flex justify-between gap-4 lg:mx-60'>
          <div className='flex items-center gap-4'>
            <a href='/'>
              <img src='/logo-long.png' className='hidden w-24 sm:flex' />
              <img src='/logo.png' className='flex w-12 sm:hidden' />
            </a>
            <a href='/discover'>Discover</a>
          </div>
          <div className='flex items-center'>
            <a href='/api/auth/signin'>
              <AiOutlineLogin className='flex h-6 w-6 sm:hidden' />
              <span className='hidden sm:flex'>Sign in</span>
            </a>
          </div>
        </nav>
      )}
    </>
  );
};
