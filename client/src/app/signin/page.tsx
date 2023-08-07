'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SignIn() {
  const { status } = useSession();
  if (status === 'authenticated') {
    redirect('/dashboard');
  }
  return (
    <div className='mx-4 mb-[600px] mt-12 flex justify-center'>
      <div className='mt-4'>
        <a href='/api/auth/signin'>Continue with Google</a>
      </div>
    </div>
  );
}
