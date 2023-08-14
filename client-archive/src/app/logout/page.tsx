'use client';
import { supabase } from '@/lib/supabase';
import { handleGoogleSignOut } from '@/lib/supabase';

export default function Logout() {
  return (
    <div>
      <button onClick={handleGoogleSignOut}>Sign out</button>
    </div>
  );
}
