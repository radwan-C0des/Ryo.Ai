import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sideber"
import React from "react"

interface Props {
    children: React.ReactNode
}

function layout({children}:Props) {
  return (
    <SidebarProvider>
        <DashboardSidebar />
    <main className="flex flex-col h-screen w-screen bg-muted">
        {children}
    </main>
    </SidebarProvider>
  )
}

export default layout