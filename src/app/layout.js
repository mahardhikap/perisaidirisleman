import { Inter, Poppins } from 'next/font/google';
import './globals.css';

// const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Perisai Diri Cabang Sleman',
  description: 'Pandai silat, tanpa cidera',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#f8f1ec]">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
