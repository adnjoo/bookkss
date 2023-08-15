import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { SERVER_URL } from '../lib/helpers';
import { useLoadingStore } from '../zustand/store';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setLoading = useLoadingStore((state: any) => state.setLoading);

  const login = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${SERVER_URL}/users/login`, {
        email,
        password,
      });
      if (res.data) {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className='mx-auto my-64 flex justify-center'>
      <div className='w-1/3'>
        <h1 className='mb-8 text-4xl font-bold'>Login</h1>
        <div className='mb-4'>
          <label className='mb-2 block text-sm font-bold text-gray-700'>
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            type='email'
            placeholder='Email'
          />
          <label className='mb-2 block text-sm font-bold text-gray-700'>
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            type='password'
            placeholder='Password'
          />
          <button
            onClick={login}
            className='focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
            type='button'
          >
            Login
          </button>
          <div className='mt-4'>
            Don't have an account?{' '}
            <Link to='/register' className='text-blue-500 hover:underline'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
