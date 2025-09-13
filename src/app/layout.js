import { merriweather, workSans } from './font';
import "./globals.css";


export const metadata = {
  title: 'Rokotovich Estudio Jurídico',
  description: 'Asesoramiento legal y representación profesional',
  };
  
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${merriweather.variable}`}>
        {children}
      </body>
    </html>
  );
}
