import { Playfair_Display, DM_Sans, Lora } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', weight: ['300', '400', '500', '700'] });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', style: ['normal', 'italic'] });

export const metadata = {
  title: 'Jingucha | Rhythm of Nature',
  description: 'Experience Plantivinia — a premium plant-based calcium crafted sustainably from eggshells and nature\'s finest botanicals.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${lora.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
