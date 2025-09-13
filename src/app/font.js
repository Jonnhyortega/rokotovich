import { Merriweather, Work_Sans } from 'next/font/google';

export const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'], 
  style: ['normal', 'italic'],   
  variable: '--font-serif',
  display: 'swap',
});

export const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  variable: '--font-sans',
  display: 'swap',
});
