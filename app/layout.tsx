import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import  SessionProvider  from "@/utils/SessionProvider";
import connect from "@/utils/db";


const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  await connect();
  return (
    
      <html lang="en">
        <body className={inter.className}>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </body>
      </html>
  );
}
