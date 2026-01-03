import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "Wealth Bento",
  description: "Navigate the Markets, Secure Your Future.",
  icons: {
    icon: "https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7/66f277be610869faeab12d72_Favicon.png",
    apple: "https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7/66f2778d6d3e24b36c798724_Webclip.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
        
        <Script
          id="webfont-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !(function (o, c) {
                var n = c.documentElement,
                  t = " w-mod-";
                (n.className += t + "js"),
                  ("ontouchstart" in o ||
                    (o.DocumentTouch && c instanceof DocumentTouch)) &&
                    (n.className += t + "touch");
              })(window, document);
            `,
          }}
        />
      </body>
    </html>
  );
}
