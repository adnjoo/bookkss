import './globals.css';
import type { Metadata } from 'next';

import { Footer } from '@/components';
import MyNavbar from '@/components/MyNavbar';

export const metadata: Metadata = {
  title: 'bookkss',
  description: 'bookkss is a social media platform for book lovers.',
  icons: {
    icon: '/logo-nobg.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <MyNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
