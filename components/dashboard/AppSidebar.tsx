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
  Users2,
  ArrowRight
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

      <SidebarFooter className="border-t border-slate-100 bg-white w-full overflow-x-hidden p-3 space-y-2">
        <Link
          href="/"
          className="flex items-center justify-between gap-3 w-full p-2.5 rounded-2xl bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/80 text-slate-800 transition-all group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs shrink-0 group-hover:bg-slate-50 transition-colors">
              <Home className="w-3.5 h-3.5 text-slate-700" strokeWidth={1.8} />
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">Retour à l'Accueil</p>
              <p className="text-[10px] text-slate-500 truncate">Page principale du site</p>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0" />
        </Link>

        {/* Bouton de déconnexion */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center justify-center gap-2 w-full py-1.5 px-3 rounded-xl text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          {isLoggingOut ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <LogOut className="h-3.5 w-3.5" />
          )}
          <span>{isLoggingOut ? "Déconnexion..." : "Se déconnecter"}</span>
        </button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
