import type { Metadata } from "next";
import { Inter, Passero_One } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import BannerWrapper from "./components/Banner/BannerWrapper";
import Providers from "./providers";

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
        className={`${inter.variable} ${passero.variable} antialiased inter bg-white`}
      >
        <Providers><Navbar></Navbar>

        <BannerWrapper></BannerWrapper>

        <div>{children}</div>
        <Footer></Footer></Providers>
      </body>
    </html>
  );
}
