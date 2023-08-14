'use client';
import React from 'react';

import { handleGoogleSignIn } from '@/lib/supabase';

export default function Login() {
  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}
