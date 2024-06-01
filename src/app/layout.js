import { Inter, Poppins } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" className="bg-[#f6f8fa]">
        <body className={poppins.className}>{children}</body>
      </html>
    </>
  );
}
