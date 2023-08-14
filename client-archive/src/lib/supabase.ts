'use client';

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const handleGoogleSignIn = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error);
  }
};

export const handleGoogleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    return;
  } else {
    console.log('Signed out successfully');
    return;
  }
};
