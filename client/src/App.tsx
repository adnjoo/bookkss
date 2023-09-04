import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Button } from '@mui/material';

import { useUserStore } from './zustand/store';
import { SERVER_URL } from './lib/helpers';
import { ReviewPublic } from './components';

function App() {
  const [reviews, setReviews] = useState([]);
  const user = useUserStore((state: any) => state.user);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/reviews/get-public-reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  return (
    <div>
      {/* Section 1 - Hero */}
      <div className='mx-4 mb-10 mt-20 text-center'>
        <h1 className='text-4xl font-bold text-gray-900 sm:text-6xl'>
          Expand your knowledge
        </h1>
        <p className='mt-6 text-lg text-gray-600'>
          Bookkss empowers you to track your reading and access book reviews for
          future reference.
        </p>
        <div className='mt-10 flex justify-center'>
          {!user && (
            <Button variant='contained' component={Link} to='/login'>
              Login
            </Button>
          )}
          {user && (
            <Button variant='contained' component={Link} to='/dashboard'>
              Go to Dashboard
            </Button>
          )}
        </div>
      </div>
      {/* Section 2 - Preview*/}
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
      {/* Section 3 - Love Books */}
      <div className='my-4 bg-gray-100 py-10'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-4 text-center text-3xl font-bold text-gray-800'>
            ❤️ Books
          </h2>
          <div className='text-center'>
            <p className='my-4 text-lg text-gray-600'>
              Bookkss is pretty good. I can store my notes for free and access
              them really easily. The platform is new and shaping up, but I have
              had a good experience with it. I am excited to see where it goes.
              Thanks Bookkss team! - Deborah Ong, Software Engineer
              <img
                src='/user1.jpg'
                alt='user1'
                className='mx-auto mt-2 w-14 rounded-full'
              />
            </p>
            {/* <p className='my-4 text-lg text-gray-600'>
              The more that you read, the more things you will know. The more
              that you learn, the more places you'll go. - Dr. Seuss (Author)
              <img
                src='/seuss.jpg'
                alt='seuss'
                className='mx-auto mt-2 w-14 rounded-full'
              />
            </p> */}
          </div>
        </div>
      </div>
      {/* Section 4 - Reviews */}
      <div className='mb-16 mt-4 bg-gray-100 py-10'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-4 text-center text-3xl font-bold text-gray-800'>
            Book Reviews
          </h2>
          <div className='flex'>
            <Slider
              arrows={false}
              infinite
              speed={2000}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay
              autoplaySpeed={5000}
              className='w-full py-16'
            >
              {reviews.map((review: any) => (
                <ReviewPublic review={review} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
