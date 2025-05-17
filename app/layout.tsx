// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans } from 'next/font/google';
import AOSProvider from "./aosinitializer";
import LayoutShell from "./LayoutShell";
import { Analytics } from '@vercel/analytics/next';

const notosans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "KaziBase - Manual Work, Expanding Kazibase",
  description: "We operate in kenya, serving clients across multiple industries & counties, ensuring seamless working solutions Countrywide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notosans.variable} antialiased`} cz-shortcut-listen='true'>
        <AOSProvider />
        <LayoutShell>
          {children}
        </LayoutShell>
        <Analytics />
      </body>
    </html>
  );
}
