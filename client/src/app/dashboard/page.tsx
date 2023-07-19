import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';

const ServerProtectedPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  return (
    <section className='py-24'>
      <div className='container mx-auto flex flex-col px-4'>
        <h1 className='text-2xl font-bold'>
          This is a server-side protected page
        </h1>
        <h2 className='mt-4 font-medium'>
          You are logged in as: {session?.user?.name}
        </h2>
        {/* submit review */}
        {/* <form className='mt-8' action='/api/hello' method='post'>
          <div className='mt-4'>
            <label htmlFor='review' className='block'>
              Review
            </label>
            <textarea
              name='review'
              id='review'
              className='w-full rounded-md border border-gray-300 p-2'
              rows={5}
            ></textarea>
          </div>
          <button className='mt-4 rounded-md bg-gray-500 px-4 py-2 text-white'>
            Submit
          </button>
        </form> */}
      </div>
    </section>
  );
};

export default ServerProtectedPage;
