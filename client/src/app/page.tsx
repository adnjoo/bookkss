export default function Home() {
  return (
    <div className='bg-white'>
      <div className='relative isolate px-6 pt-14 lg:px-8'>
        <div
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          aria-hidden='true'
        ></div>
        <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              The more you learn, the more you earn..
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Bookkss keeps track of your reading, and book reviews for future
              reference
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <a
                href='/login'
                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm'
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
