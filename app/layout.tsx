import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import  SessionProvider  from "@/utils/SessionProvider";
import Navbar from "./(marketing)/_components/navbar";
import EditorContextProvider from "../components/EditorContext";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    
      <html lang="en">
        <body className={inter.className}>
          <SessionProvider session={session}>
            <Navbar/>
            <EditorContextProvider>
            {children}
            </EditorContextProvider>
          </SessionProvider>
        </body>
      </html>
  );
}
