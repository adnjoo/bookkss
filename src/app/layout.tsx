import './globals.css';
import type { Metadata } from 'next';

import { Provider, MyNavbar } from '@/components';

export const metadata: Metadata = {
  title: 'bookkss',
  description: 'bookkss is a social media platform for book lovers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Provider>
          <MyNavbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
