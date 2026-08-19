import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DynamicBreadcrumb } from "@/components/dashboard/DynamicBreadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Menu, Home } from "lucide-react"
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
    .single<{ avatar_url: string | null, first_name: string | null, last_name: string | null }>()

  return (
    <SidebarProvider>
      <AppSidebar user={user} avatarUrl={profile?.avatar_url || null} />
      <SidebarInset className="bg-[#F3F0EE] min-h-screen">
        {/* Header du Dashboard Mastercard Floating Pill Style */}
        <header className="flex h-14 md:h-16 shrink-0 items-center gap-2 border-b border-[#E2DDD7] px-3 md:px-6 bg-[#FCFBFA]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2 w-full overflow-hidden">
            {/* Bouton Menu Mobile */}
            <SidebarTrigger className="shrink-0 md:hidden h-8 w-8 rounded-full hover:bg-[#F3F0EE]">
              <Menu className="h-4 w-4 text-[#141413]" strokeWidth={2} />
            </SidebarTrigger>
            {/* Bouton Desktop */}
            <SidebarTrigger className="shrink-0 hidden md:flex rounded-full hover:bg-[#F3F0EE]" />
            
            {/* Bouton Accueil pour retourner à la page principale */}
            <Link
              href="/"
              title="Retour à l'Accueil"
              className="inline-flex items-center justify-center h-8 px-3 rounded-full text-slate-700 hover:text-slate-950 hover:bg-[#F3F0EE] transition-all text-xs font-semibold gap-1.5 border border-[#E2DDD7] bg-white shadow-xs shrink-0"
            >
              <Home className="h-3.5 w-3.5 text-[#0284C7]" />
              <span className="hidden sm:inline">Accueil</span>
            </Link>

            <Separator orientation="vertical" className="mx-1 h-3.5 bg-[#E2DDD7]" />
            <div className="flex-1 min-w-0">
              <DynamicBreadcrumb />
            </div>
          </div>
        </header>

        {/* Zone de contenu principale sur Canvas Cream */}
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 lg:p-10 max-w-full overflow-x-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


