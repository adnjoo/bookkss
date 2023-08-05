import React from 'react';
import { AiFillLinkedin } from 'react-icons/ai';

export const Footer = () => {
  return (
    <footer className='bg-gray-800 py-8 text-white'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-lg font-bold'>Bookkss</h3>
            <p className='mt-2 hidden sm:flex'>
              Helping you write and share book reviews.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-bold'>Links</h3>
            <ul className='mt-2 flex flex-col'>
              <span className='mb-1'>
                <a href='/'>Home</a>
              </span>
              <span className='mb-1'>
                <a href='/signin'>Sign In</a>
              </span>
              <span className='mb-1'>
                <a href='/dashboard'>Dashboard</a>
              </span>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-bold'>Follow Us</h3>
            <ul className='mt-2'>
              <span className='mb-1'>
                <a
                  href='https://linkedin.com/company/bookkssco'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <AiFillLinkedin size={24} />
                </a>
              </span>
            </ul>
          </div>
        </div>
        <hr className='my-4 border-gray-700' />
        <p className='text-center text-sm'>
          &copy; {new Date().getFullYear()} Bookkss. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
