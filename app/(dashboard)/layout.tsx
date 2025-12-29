import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DynamicBreadcrumb } from "@/components/dashboard/DynamicBreadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Menu } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Charger le profil avec l'avatar
  const { data: profile } = await supabase
    .from('profiles')
    .select('avatar_url, first_name, last_name')
    .eq('id', user?.id || '')
    .single()

  return (
    <SidebarProvider>
      <AppSidebar user={user} avatarUrl={profile?.avatar_url || null} />
      <SidebarInset>
        {/* Header du Dashboard */}
        <header className="flex h-14 md:h-16 shrink-0 items-center gap-2 border-b px-2 md:px-4 backdrop-blur-sm bg-white sticky top-0 z-10 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shadow-sm">
          <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 w-full overflow-hidden">
            {/* Bouton Menu pour Mobile */}
            <SidebarTrigger className="shrink-0 md:hidden h-9 w-9">
              <Menu className="h-5 w-5 text-slate-700" strokeWidth={2.5} />
            </SidebarTrigger>
            {/* Bouton standard pour Desktop */}
            <SidebarTrigger className="shrink-0 hidden md:flex" />
            <Separator orientation="vertical" className="mr-1 md:mr-2 h-4" />
            <div className="flex-1 min-w-0">
              <DynamicBreadcrumb />
            </div>
          </div>
        </header>

        {/* Zone de contenu principale */}
        <div className="flex flex-1 flex-col gap-4 p-3 pt-3 md:p-6 md:pt-6 lg:p-8 max-w-full overflow-x-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
