import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/app/ui/header";
import Footer from '@/app/ui/footer'
import {Noto_Sans} from 'next/font/google'
import AOSProvider from "./aosinitializer";
import { Analytics } from '@vercel/analytics/next';
// import { SessionProvider } from "next-auth/react";

const notosans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets:['latin']
})
export const metadata: Metadata = {
  title: "KaziBase - Manual Work, Expanding Kazibase",
  description: "We operate in kenya, serving clients across multiple industries & counties, ensuring seamless working solutions Countrywide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <SessionProvider>
    <html lang="en">
      <body className={`${notosans.variable} antialiased`} cz-shortcut-listen='true'>
        <AOSProvider />
        <MainHeader />
        <div className="bg-white">
          {children}
          <Analytics />
        </div>
        <Footer />
      </body>
    </html>
    // </SessionProvider> 
  );
}
