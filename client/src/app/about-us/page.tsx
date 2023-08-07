import React from 'react';
import profilePicture from './andrew_njoo.jpg';

function AboutUs() {
  return (
    <div className='mx-4 my-10'>
      <div className='mb-10 text-center'>
        <h1 className='text-4xl font-semibold'>About Bookkss</h1>
      </div>
      <div className='mb-10 text-center'>
        <p className='text-lg text-gray-800'>
          Bookkss is an innovative app designed to help you write, share, and
          save your book reviews effortlessly.
        </p>
      </div>
      <div className='mb-4 flex flex-col justify-center gap-4'>
        <h2 className='mx-auto flex justify-center text-2xl font-semibold'>
          Meet the Founder
        </h2>
        <img
          src='/founder.jpg'
          alt='founder'
          className='mx-auto w-32 rounded-full'
        />
      </div>
      <div className='mb-10 text-center'>
        <p className='text-lg text-gray-800'>
          Bookkss was founded by Andrew Njoo, an ex-Amazon engineer with a
          passion for books. Inspired by his love for books, Andrew set out to
          create an app that enhances the way readers share their opinions and
          engage in meaningful discussions about literature.
        </p>
      </div>
      <div className='mb-10 text-center'>
        <h2 className='text-2xl font-semibold'>Why Choose Bookkss?</h2>
      </div>
      <div className='mb-10 text-center'>
        <p className='text-lg text-gray-800'>
          - Seamlessly write and save book reviews with our user-friendly
          interface.
          <br />- Connect with fellow readers who share your interests and
          discover new books to add to your reading list.
        </p>
      </div>
      <div className='mb-10 text-center'>
        <h2 className='text-2xl font-semibold'>Join Our Community Today</h2>
      </div>
      <div className='mb-10 text-center'>
        <p className='text-lg text-gray-800'>
          Become a part of the Bookkss community and learn from other readers.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
