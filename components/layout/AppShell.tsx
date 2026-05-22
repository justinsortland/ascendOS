import { Sidebar } from './Sidebar'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#06060f]">
      <Sidebar />
      <main className="ml-56 min-h-screen">{children}</main>
    </div>
  )
}
