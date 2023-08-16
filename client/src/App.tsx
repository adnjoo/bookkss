import { Link } from 'react-router-dom';

import { useUserStore } from './zustand/store';

function App() {
  const user = useUserStore((state: any) => state.user);

  return (
    <div>
      <div className='mb-10 mt-20'>
        <div className='mx-4 text-center'>
          <h1 className='text-4xl font-bold text-gray-900 sm:text-6xl'>
            Expand your knowledge
          </h1>
          <p className='mt-6 text-lg text-gray-600'>
            Bookkss empowers you to track your reading and access book reviews
            for future reference.
          </p>
          <div className='mt-10 flex justify-center'>
            {!user && (
              <Link
                to='/login'
                className='rounded-xl bg-gray-500 p-3 text-white'
              >
                Login
              </Link>
            )}
            {user && (
              <Link
                to='/dashboard'
                className='rounded-xl bg-gray-500 p-3 text-white'
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className='my-4 bg-gray-100 py-10'>
        <div className='mx-auto flex max-w-3xl flex-col-reverse px-4 sm:flex-row'>
          <div className='sm:w-1/2'>
            <h2 className='mb-4 text-center text-3xl font-bold text-gray-800'>
              Book Reviews and Recommendations
            </h2>
            <p className='mx-4 my-6 text-lg text-gray-600'>
              Bookkss allows you to read and write book reviews, at your own
              leisure. Save reviews for future reference, and discover exciting
              new books to read.
            </p>
          </div>
          <div className='flex justify-center sm:w-1/2'>
            <img src='/landing-section1.png' alt='dashboard preview' />
          </div>
        </div>
      </div>
      <div className='my-4 bg-gray-100 py-10'>
        <div className='mx-auto flex max-w-3xl flex-col-reverse px-4 sm:flex-row'>
          <div className='sm:w-1/2'>
            <h2 className='mb-4 text-center text-3xl font-bold text-gray-800'>
              Discover New Books
            </h2>
            <p className='mx-4 my-6 text-lg text-gray-600'>
              Bookkss helps you to discover book reviews by other users, and
              learn from their experiences.
            </p>
          </div>
          <div className='flex justify-center sm:w-1/2'>
            <img src='/landing-section2.png' alt='discover preview' />
          </div>
        </div>
      </div>
      <div className='my-4 bg-gray-100 py-10'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-4 text-center text-3xl font-bold text-gray-800'>
            Why Read
          </h2>
          <div className='text-center'>
            <p className='text-lg text-gray-600'>
              "The more that you read, the more things you will know. The more
              that you learn, the more places you'll go." - Dr. Seuss (Author)
              <img
                src='/seuss.jpg'
                alt='seuss'
                className='mx-auto mt-2 w-14 rounded-full'
              />
            </p>
            <p className='mt-4 text-lg text-gray-600'>
              "In my whole life, I have known no wise people (over a broad
              subject matter area) who didn't read all the time -- none, zero."
              - Charlie Munger (Billionaire)
            </p>
            <img
              src='/munger.png'
              alt='munger'
              className='mx-auto mt-2 w-14 rounded-full'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
