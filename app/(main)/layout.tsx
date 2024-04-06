"use client"

import { ReactNode } from "react"
import Sidebar from "../(marketing)/_components/sidebar";


const MainLayout = (
    {children}:
    {children:React.ReactNode;
    }) => {
  return (
    <div className="h-full flex dark:bg=-[#1F1F1F]">
        <main className="flex-1 h-full overflow-y-auto">
      {children}
      </main>
    </div>
  )
}

export default MainLayout
