import { Inter, Poppins } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children, title, description }) {
  return (
    <>
      <html lang="en" className="bg-[#f6f8fa]">
        <head>
          {title !== undefined ? (
            <title key={title}>{`Perisai Diri Cabang Sleman | ${title}`}</title>
          ) : (
            <title key={title}>{`Perisai Diri Cabang Sleman`}</title>
          )}
          {description !== undefined ? (
            <meta name="description" content={description} key={description} />
          ) : (
            <meta
              name="description"
              content={`Pandai silat, tanpa cidera`}
              key={description}
            />
          )}
          <meta name="google-site-verification" content="kI4jOP2_e_FRUWqoxsX_-zLexifelXHisFcN4Qehh6U" />
          {/* Add other metadata tags here */}
        </head>
        <body className={poppins.className}>{children}</body>
      </html>
    </>
  );
}
