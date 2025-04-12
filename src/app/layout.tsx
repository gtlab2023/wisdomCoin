import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

import { Web3Provider } from '@/providers/Web3Provider';

export const metadata: Metadata = {
  title: 'WisdomSeed College',
  description: 'web3 college for wisdom',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={geistSans.className}>
      <body>
        <Web3Provider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
