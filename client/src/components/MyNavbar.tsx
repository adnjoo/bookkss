import { getServerSession } from 'next-auth/next';

import { authOptions } from '../lib/auth';

export const MyNavbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session ? (
        <nav className='mx-4 mt-4 flex justify-between gap-4 lg:mx-60'>
          <div className='flex gap-4'>
            <img src='/logo-long.png' className='w-24' />
            {/* <a href='/'>bookkss</a> */}
            <a href='/'>Home</a>
            <a href='/dashboard'>Dashboard</a>
          </div>
          <div>
            <a href='/api/auth/signout'>Sign out</a>
          </div>
        </nav>
      ) : (
        <nav className='mx-4 mt-4 flex justify-between gap-4 lg:mx-60'>
          <div className='flex gap-4'>
            <img src='/logo-long.png' className='w-24' />
            {/* <a href='/'>bookkss</a> */}
            <a href='/'>Home</a>
          </div>
          <div>
            <a href='/signin'>Sign in</a>
          </div>
        </nav>
      )}
    </>
  );
};
