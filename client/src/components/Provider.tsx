'use client';

import { SessionProvider } from 'next-auth/react';

export const Provider = ({ children }: { children: any }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
