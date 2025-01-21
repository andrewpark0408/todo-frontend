// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Todo App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-800 text-gray-100`}>
        <header className="w-full p-10 bg-gray-900 flex justify-center">
          <Image
            src="/Logo.png"
            alt="Todo App Logo"
            width={220}
            height={120}
            priority
          />
        </header>
        <main className="max-w-3xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
