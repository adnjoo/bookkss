import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@mui/material';

import { SERVER_URL } from '@/lib/helpers';
import { useLoadingStore } from '@/zustand/store';

export default function Login() {
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
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className='mx-auto mb-64 mt-16 flex justify-center'>
      <div className='mx-4 max-w-[400px]'>
        <h1 className='mb-8 text-4xl font-bold'>Login</h1>
        <form className='mb-4'>
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
          <Button onClick={login} variant='contained' sx={{ mt: 4 }}>
            Login
          </Button>
          <div className='mt-4'>
            Don't have an account?{' '}
            <Link href='/register' className='text-blue-500 hover:underline'>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
