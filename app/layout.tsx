import type { Metadata } from "next";
import { Inter, Passero_One } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${passero.variable} antialiased inter`}
      >
        {children}
      </body>
    </html>
  );
}
