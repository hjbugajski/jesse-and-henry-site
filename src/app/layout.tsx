import Navigation from '@/components/Navigation';
import { classes } from '@/utils/classes';

import { alice, lato } from './fonts';

import '@/styles/main.scss';

export const metadata = {
  title: 'Jesse & Henry',
  description: 'Jesse and Henry are getting married!',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png'
      }
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={classes(alice.variable, lato.variable)}>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
