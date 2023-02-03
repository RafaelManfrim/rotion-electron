import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

export function Default() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <Collapsible.Root
      className="h-screen w-screen bg-rotion-900 text-rotion-100 flex"
      onOpenChange={setIsSidebarOpen}
      defaultOpen
    >
      <Sidebar />
      <div className="flex flex-1 flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </Collapsible.Root>
  )
}
