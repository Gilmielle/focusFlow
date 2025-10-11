import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="grid grid-cols-[32px_1fr] w-full max-w-[1920px] min-h-screen p-8 pb-20 gap-16 sm:p-20 mx-auto">
        <SidebarTrigger />
        <main className="flex flex-col gap-[32px] items-center">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
