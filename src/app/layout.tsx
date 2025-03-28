import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

import { Web3Provider } from '@/providers/Web3Provider';

export const metadata: Metadata = {
  title: 'WisdomSeed College',
  description: 'web3 college for wisdom',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistSans.className}>
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
