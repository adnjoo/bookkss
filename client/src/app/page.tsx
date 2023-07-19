export default function Home() {
  return (
    <div>
      <div className='mt-40'>
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
    </div>
  );
}
