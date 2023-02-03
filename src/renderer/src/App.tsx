import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import './styles/global.css'

export function App() {
  return (
    <div className="h-screen w-screen bg-rotion-900 text-rotion-100 flex">
      <Sidebar />
      <div className="flex flex-1 flex-col max-h-screen">
        <Header />
        <main className="flex flex-1 items-center justify-center text-rotion-400">
          Selecione ou crie um documento
        </main>
      </div>
    </div>
  )
}
