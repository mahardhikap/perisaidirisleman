import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";

// const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>Perisai Diri Cabang Sleman</title>
        <meta name="description" content="Pandai silat, tanpa cidera"/>
        <meta name="google-site-verification" content="qrhjx4oG31-_WzMue_uckzsud9098vqZz3s7YbKJgDM" />
        {/* Add other metadata tags here */}
      </Head>
      <html lang="en" className="bg-[#f6f8fa]">
        <body className={poppins.className}>{children}</body>
      </html>
    </>
  );
}
