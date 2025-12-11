import type { Metadata } from "next";
import { Inter, Passero_One } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import BannerWrapper from "./components/Banner/BannerWrapper";
import Providers from "./providers";
import CartSync from "./components/CartSync/CartSync";
import LayoutVisibility from "./components/LayoutVisibility/LayoutVisibility";
import QueryProvider from "./QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const passero = Passero_One({
  variable: "--font-passero",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KitStruck",
  description: "",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${inter.variable} ${passero.variable} antialiased inter bg-base-200`}
      >
        <QueryProvider>
          <Providers>
            <LayoutVisibility>
              <Navbar />
              <BannerWrapper/>
            </LayoutVisibility>
              <div><CartSync/>{children}</div>
            <LayoutVisibility>
              <Footer></Footer>
            </LayoutVisibility>
          </Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
