import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { MobileMenu } from './MobileMenu';
import { logOut } from '../lib/helpers';
import Banner from './Banner';
import { useUserStore } from '../zustand/store';

export function Navbar() {
  const user = useUserStore((state: any) => state.user);
  return (
    <nav>
      <div>
        <Banner />
        <div className='mt-4 flex items-center justify-between lg:mx-64'>
          <div id='left' className='ml-4 flex flex-row items-center gap-2'>
            <MobileMenu />
            {user && (
              <>
                <Link
                  to='/dashboard'
                  className='mx-4 flex hidden gap-2 sm:flex'
                >
                  Dashboard&nbsp;
                </Link>
                <Link to='/archive' className='mx-4 flex hidden gap-2 sm:flex'>
                  Archive&nbsp;
                </Link>
              </>
            )}
            <Link to='/discover' className='mx-4 flex hidden gap-2 sm:flex'>
              Discover&nbsp;
            </Link>
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
      </div>
    </nav>
  );
}
