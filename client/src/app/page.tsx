import { getServerSession } from 'next-auth/next';

import { authOptions } from '../lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div>
      <div className='mt-20'>
        <div className='mx-4 text-center'>
          <h1 className='text-4xl font-bold text-gray-900 sm:text-6xl'>
            Expand your knowledge
          </h1>
          <p className='mt-6 text-lg text-gray-600'>
            Bookkss empowers you to track your reading and access book reviews
            for future reference.
          </p>
          <div className='mt-10 flex justify-center'>
            <a href='/signin' className='rounded-xl bg-gray-500 p-3 text-white'>
              Get started
            </a>
          </div>
        </div>
      </div>
      <div className='my-20 bg-gray-100 py-20'>
        <div className='mx-auto max-w-3xl px-4'>
          <h2 className='mb-4 text-center text-3xl font-bold text-gray-800'>
            Discover New Books
          </h2>
          {/* Add your book discovery grid or carousel here */}
        </div>
      </div>
      <div className='my-20 py-20'>
        <div className='mx-auto max-w-3xl px-4'>
          <h2 className='mb-4 text-center text-3xl font-bold text-gray-800'>
            Track Reading Progress
          </h2>
          {/* Add your reading progress visualization here */}
        </div>
      </div>
      <div className='my-20 bg-gray-100 py-20'>
        <div className='mx-auto max-w-3xl px-4'>
          <h2 className='mb-4 text-center text-3xl font-bold text-gray-800'>
            Book Reviews and Recommendations
          </h2>
          {/* Add your book reviews and recommendations here */}
        </div>
      </div>
    </div>
  );
}
