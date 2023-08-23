import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { SERVER_URL } from '../lib/helpers';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const register = async () => {
    try {
      const res = await axios.post(`${SERVER_URL}/users/register`, {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
      }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='mx-auto mb-64 mt-16 flex justify-center'>
      <div className='mx-4 max-w-[400px]'>
        <h1 className='mb-8 text-4xl font-bold'>Register</h1>
        {errorMessage && (
          <div className='mb-4 text-red-500'>{errorMessage}</div>
        )}
        <div className='mb-4'>
          <label className='mb-2 block text-sm font-bold text-gray-700'>
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            type='email'
            placeholder='Email'
            autoComplete='email'
          />
          <label className='mb-2 block text-sm font-bold text-gray-700'>
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            type='password'
            placeholder='Password'
            autoComplete='on'
          />
          <button
            onClick={register}
            className='focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
            type='button'
          >
            Register
          </button>
          <div className='mt-4'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500 hover:text-blue-700'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
