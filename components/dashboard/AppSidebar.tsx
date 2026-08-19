"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { logout } from "@/lib/actions/auth"
import { toast } from "sonner"
import { useLoading } from "@/contexts/LoadingContext"
import {
  Activity,
  Calendar,
  FileText,
  Home,
  MessageSquare,
  Settings,
  User,
  LogOut,
  PlusCircle,
  Users,
  CheckSquare,
  Stethoscope,
  Building2,
  FileSpreadsheet,
  Loader2,
  Bell,
  CreditCard,
  Pill,
  Microscope,
  Plane,
  ShieldCheck,
  MapPin,
  HelpCircle,
  FileDigit,
  Sparkles,
  ChevronRight,
  HeartPulse,
  Video,
  ClipboardList,
  Star,
  Users2
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// Fonction utilitaire pour navigation (plus besoin de coming soon)

// Configuration des menus par rôle
const navConfig = {
  patient: {
    main: [
      { title: "Tableau de bord", url: "/patient?view=dashboard", icon: Home, active: true },
      { title: "Mes Dossiers", url: "/patient?view=dossiers", icon: FileText, active: true },
      { title: "Nouvelle Demande", url: "/patient?view=new", icon: PlusCircle, active: true },
      { title: "Messagerie", url: "/patient?view=messages", icon: MessageSquare, active: true },
      { title: "Rendez-vous", url: "/patient?view=rdv", icon: Calendar, active: true },
      { title: "Documents Partagés", url: "/patient?view=documents", icon: FileDigit, active: true },
      { title: "Factures & Paiements", url: "/patient?view=finances", icon: CreditCard, active: true },
      { title: "Mon Voyage", url: "/patient?view=voyage", icon: Plane, active: true },
      { title: "Téléconsultation", url: "/patient?view=teleconsultation", icon: Video, active: true },
      { title: "Historique Médical", url: "/patient?view=historique", icon: ClipboardList, active: true },
      { title: "Mes Prescriptions", url: "/patient?view=prescriptions", icon: Pill, active: true },
      { title: "Résultats Laboratoire", url: "/patient?view=laboratoire", icon: Microscope, active: true },
      { title: "Assurances Voyage", url: "/patient?view=assurances", icon: ShieldCheck, active: true },
    ],
    coming: []
  },
  medecin: {
    main: [
      { title: "Tableau de bord", url: "/medecin", icon: Activity, active: true },
      { title: "Mes Patients", url: "/medecin/patients", icon: Users, active: true },
      { title: "À Valider", url: "/medecin/dossiers", icon: CheckSquare, active: true },
      { title: "Messagerie", url: "/medecin/messages", icon: MessageSquare, active: true },
    ],
    coming: []
  },
  clinique: {
    main: [
      { title: "Tableau de bord", url: "/clinique", icon: Activity, active: true },
      { title: "Demandes Reçues", url: "/clinique/dossiers", icon: FileText, active: true },
      { title: "Mes Devis", url: "/clinique/devis", icon: FileSpreadsheet, active: true },
      { title: "Planning", url: "/clinique/planning", icon: Calendar, active: true },
    ],
    coming: []
  }
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: any
  avatarUrl?: string | null
}

export function AppSidebar({ user, avatarUrl, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
  const { showLoader, hideLoader } = useLoading()
  const isMedecin = pathname?.startsWith("/medecin")
  const isClinique = pathname?.startsWith("/clinique")

  let navMain = navConfig.patient.main
  let navComing = navConfig.patient.coming
  let roleLabel = "Espace Patient"
  let RoleIcon = Activity

  if (isMedecin) {
    navMain = navConfig.medecin.main
    navComing = navConfig.medecin.coming
    roleLabel = "Espace Médecin"
    RoleIcon = Stethoscope
  } else if (isClinique) {
    navMain = navConfig.clinique.main
    navComing = navConfig.clinique.coming
    roleLabel = "Espace Clinique"
    RoleIcon = Building2
  }

  const displayName = user?.user_metadata?.first_name
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`
    : user?.email || "Utilisateur"

  const handleLogout = async () => {
    setIsLoggingOut(true)
    showLoader("Déconnexion en cours...")

    try {
      const result = await logout()
      if (result?.error) {
        hideLoader()
        toast.error("Erreur", { description: result.error })
        setIsLoggingOut(false)
      } else {
        // Succès - cacher le loader
        hideLoader()
      }
    } catch (error) {
      hideLoader()
      toast.error("Erreur", { description: "Impossible de se déconnecter." })
      setIsLoggingOut(false)
    }
  }

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-slate-200/80 bg-white overflow-x-hidden">
      <SidebarHeader className="border-b border-slate-100 bg-white w-full px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-slate-50 transition-all rounded-2xl px-2 py-5">
              <div className="flex w-full items-center gap-3">
                <div className="relative h-10 w-10 flex items-center justify-center shrink-0">
                  <Image src="/FaviconFinal.png" alt="Pont Afrique Santé" fill className="object-contain" priority />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-extrabold tracking-tight text-[16px] select-none flex items-center">
                    <span className="text-[#0284C7]">Pont</span><span className="text-[#141413]">Afrique</span><span className="text-[#CF4500]">Santé</span>
                  </span>
                  <span className="truncate text-[10px] text-slate-500 font-bold uppercase tracking-wider">{roleLabel}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-white overflow-x-hidden w-full px-2 py-3 space-y-4">
        <SidebarGroup className="w-full p-0">
          <SidebarGroupLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 bg-white w-full">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent className="bg-[#FCFBFA] w-full overflow-x-hidden">
            <SidebarMenu className="space-y-1">
              {navMain.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className={`
                          relative transition-all duration-150 rounded-[20px] text-xs font-medium px-3.5 py-2.5
                          ${isActive
                          ? "bg-[#141413] text-[#F3F0EE] hover:bg-[#262627] shadow-none"
                          : "text-[#696969] hover:bg-[#F3F0EE] hover:text-[#141413] bg-transparent"
                        }
                        `}
                    >
                      <Link href={item.url} className="flex items-center gap-2.5 w-full min-w-0">
                        <item.icon
                          className={`${isActive ? "text-[#F37338]" : "text-[#696969] group-hover:text-[#141413]"} shrink-0 w-4 h-4`}
                          strokeWidth={isActive ? 2.2 : 1.75}
                        />
                        <span className="truncate flex-1 min-w-0">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-2 bg-[#E2DDD7]" />

        <SidebarGroup className="w-full p-0">
          <SidebarGroupLabel className="text-[11px] font-bold text-[#696969] uppercase tracking-wider px-3 mb-1 bg-[#FCFBFA] w-full">
            Compte & Préférences
          </SidebarGroupLabel>
          <SidebarGroupContent className="bg-[#FCFBFA] w-full overflow-x-hidden">
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Notifications"
                  className="rounded-[20px] text-xs font-medium px-3.5 py-2.5 text-[#696969] hover:bg-[#F3F0EE] hover:text-[#141413] bg-transparent"
                >
                  <Link href={isMedecin ? "/medecin/notifications" : isClinique ? "/clinique/notifications" : "/patient/notifications"} className="flex items-center gap-2.5 relative w-full min-w-0">
                    <Bell className="text-[#696969] group-hover:text-[#141413] shrink-0 w-4 h-4" strokeWidth={1.75} />
                    <span className="truncate flex-1 min-w-0">Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Mon Profil"
                  className="rounded-[20px] text-xs font-medium px-3.5 py-2.5 text-[#696969] hover:bg-[#F3F0EE] hover:text-[#141413] bg-transparent"
                >
                  <Link href={isMedecin ? "/medecin/profile" : isClinique ? "/clinique/profile" : "/patient/profile"} className="flex items-center gap-2.5 w-full min-w-0">
                    <User className="text-[#696969] group-hover:text-[#141413] shrink-0 w-4 h-4" strokeWidth={1.75} />
                    <span className="truncate flex-1 min-w-0">Mon Profil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Paramètres"
                  className="rounded-[20px] text-xs font-medium px-3.5 py-2.5 text-[#696969] hover:bg-[#F3F0EE] hover:text-[#141413] bg-transparent"
                >
                  <Link href={isMedecin ? "/medecin/settings" : isClinique ? "/clinique/settings" : "/patient/settings"} className="flex items-center gap-2.5 w-full min-w-0">
                    <Settings className="text-[#696969] group-hover:text-[#141413] shrink-0 w-4 h-4" strokeWidth={1.75} />
                    <span className="truncate flex-1 min-w-0">Paramètres</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Centre d'aide"
                  className="rounded-[20px] text-xs font-medium px-3.5 py-2.5 text-[#696969] hover:bg-[#F3F0EE] hover:text-[#141413] bg-transparent"
                >
                  <Link href={isMedecin ? "/medecin/help" : isClinique ? "/clinique/help" : "/patient/help"} className="flex items-center gap-2.5 w-full min-w-0">
                    <HelpCircle className="text-[#696969] group-hover:text-[#141413] shrink-0 w-4 h-4" strokeWidth={1.75} />
                    <span className="truncate flex-1 min-w-0">Centre d'Aide</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-100 bg-white w-full overflow-x-hidden p-2">
        <SidebarMenu className="w-full">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-slate-50 border border-slate-200/80 rounded-2xl hover:bg-slate-50 transition-all bg-white"
                >
                  <Avatar className="h-8 w-8 rounded-full bg-slate-900 text-white shrink-0">
                    {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                    <AvatarFallback className="rounded-full font-bold text-xs bg-slate-900 text-white">
                      {displayName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-xs leading-tight min-w-0">
                    <span className="truncate font-bold text-slate-900">{displayName}</span>
                    <span className="truncate text-[11px] text-slate-400 font-mono">{user?.email}</span>
                  </div>
                  <ChevronRight className="ml-auto size-4 text-slate-400 shrink-0" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl border-slate-200 bg-white p-1.5 shadow-lg"
                side="top"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuLabel className="p-3 font-normal border-b border-slate-100">
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="font-bold text-sm text-slate-900 truncate">{displayName}</span>
                    <span className="text-xs text-slate-400 truncate">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <div className="p-1">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-rose-600 focus:text-rose-700 focus:bg-rose-50 cursor-pointer rounded-xl font-semibold text-xs"
                  >
                    {isLoggingOut ? (
                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <LogOut className="mr-2 h-3.5 w-3.5" />
                    )}
                    {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
