import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MyNavbar } from '@/components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang='en'>
      <body className={inter.className}>
        <MyNavbar />
        {children}
      </body>
    </html>
  );
}
