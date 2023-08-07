import React from 'react';

function AboutUs() {
  return (
    <div className='mx-4 my-10'>
      <div className='mb-10 text-center'>
        <h1 className='text-4xl font-semibold'>About Bookkss</h1>
      </div>
      <div className='mb-4 flex flex-col justify-center gap-4'>
        <img
          src='/founder.jpg'
          alt='founder'
          className='mx-auto w-32 rounded-full'
        />
      </div>
      <div className='mb-10 text-center'>
        <p className='text-lg text-gray-800'>
          Bookkss was founded by Andrew Njoo, an ex-Amazon engineer. Inspired by
          his love for books, Andrew set out to create an app that helps people
          to write and share their book reviews.
        </p>
      </div>
      <div className='mb-10 text-center'>
        <h2 className='text-2xl font-semibold'>Why Use Bookkss?</h2>
      </div>
      <div className='mb-10 text-center text-lg text-gray-800'>
        <p className=''>
          - Seamlessly write and save book reviews with our user-friendly
          interface.
        </p>
        <p>
          - Connect with fellow readers who share your interests and discover
          new books to add to your reading list.
        </p>
      </div>
      <div className='mb-10 text-center'>
        <h2 className='text-2xl font-semibold'>Join Our Community Today</h2>
      </div>
      <div className='mb-10 text-center'>
        <p className='text-lg text-gray-800'>
          Keep track of your reading progress, and improve your writing skills
          today for free!
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
