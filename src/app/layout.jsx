import { Syncopate, Comfortaa } from 'next/font/google';
import './globals.css';

const syncopate = Syncopate({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '700'] });
const comfortaa = Comfortaa({ subsets: ['latin'], variable: '--font-body', weight: ['300', '400', '600', '700'] });

export const metadata = {
  title: 'Jingucha | Rhythm of Nature',
  description: 'Experience Plantivinia — a premium calcium elixir derived from upcycled eggshells, designed to nourish and elevate your plants.',
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syncopate.variable} ${comfortaa.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
