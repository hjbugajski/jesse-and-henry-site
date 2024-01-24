import './globals.css';

import type { Metadata } from 'next';
import { Alice, Lato } from 'next/font/google';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { fetchGlobals } from '@/lib/graphql';
import Toaster from '@/lib/providers/Toaster';
import { cn } from '@/lib/utils/cn';

const alice = Alice({ weight: '400', subsets: ['latin'], variable: '--font-alice' });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });

export const metadata: Metadata = {
  title: 'Jesse & Henry',
  description: 'Jesse and Henry are getting married!',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96' },
      { url: '/favicons/favicon-128x128.png', sizes: '128x128' },
      { url: '/favicons/favicon-196x196.png', sizes: '196x196' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png' },
      { url: '/favicons/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/favicons/apple-touch-icon-60x60.png', sizes: '60x60' },
      { url: '/favicons/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/favicons/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/favicons/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/favicons/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/favicons/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/favicons/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/favicons/apple-touch-icon-167x167.png', sizes: '167x167' },
    ],
    other: [
      { url: '/favicons/android-chrome-192x192.png', sizes: '192x192' },
      { url: '/favicons/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { navigation } = await fetchGlobals();

  return (
    <html lang="en">
      <body className={cn(alice.variable, lato.variable)}>
        <Navigation {...navigation} />
        <main className="flex flex-1 flex-col md:mt-16">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
