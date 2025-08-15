import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Providers } from "./providers";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pedal Peak Events - Cycling Adventures & Community",
  description: "Discover and book cycling holidays, training camps, and weekend getaways worldwide. Find your perfect cycling adventure with Pedal Peak.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} font-satoshi antialiased`} style={{ fontFamily: 'var(--font-satoshi), system-ui, sans-serif' }}>
        <Providers>
          <Header />
          <main className="min-h-screen bg-white">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
