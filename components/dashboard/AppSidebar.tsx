"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { logout } from "@/lib/actions/auth"
import { toast } from "sonner"
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

// Fonction utilitaire pour les liens en développement
const handleComingSoon = (e: React.MouseEvent, title: string) => {
  e.preventDefault()
  toast.info("🚀 Bientôt disponible", {
    description: `La fonctionnalité "${title}" est en cours de développement et sera disponible très prochainement.`
  })
}

// Configuration des menus par rôle
const navConfig = {
  patient: {
    main: [
      { title: "Tableau de bord", url: "/patient?view=dashboard", icon: Home, active: true },
      { title: "Mes Dossiers", url: "/patient?view=dossiers", icon: FileText, active: true, badge: 1 },
      { title: "Nouvelle Demande", url: "/patient?view=new", icon: PlusCircle, active: true, highlight: true },
      { title: "Messagerie", url: "/patient?view=messages", icon: MessageSquare, active: true, badge: 3 },
      { title: "Rendez-vous", url: "/patient?view=rdv", icon: Calendar, active: true, badge: 1 },
      { title: "Documents Partagés", url: "/patient?view=documents", icon: FileDigit, active: true },
      { title: "Factures & Paiements", url: "/patient?view=finances", icon: CreditCard, active: true },
      { title: "Mon Voyage", url: "/patient?view=voyage", icon: Plane, active: true },
      { title: "Téléconsultation", url: "/patient?view=teleconsultation", icon: Video, active: true },
      { title: "Historique Médical", url: "/patient?view=historique", icon: ClipboardList, active: true },
    ],
    coming: [
      { title: "Mes Prescriptions", url: "#", icon: Pill, active: false },
      { title: "Résultats Laboratoire", url: "#", icon: Microscope, active: false },
      { title: "Assurances Voyage", url: "#", icon: ShieldCheck, active: false },
      { title: "Pharmacies Partenaires", url: "#", icon: MapPin, active: false },
      { title: "Programme Fidélité", url: "#", icon: Star, active: false },
      { title: "Parrainage", url: "#", icon: Users2, active: false },
    ]
  },
  medecin: {
    main: [
      { title: "Tableau de bord", url: "/medecin", icon: Activity, active: true },
      { title: "Mes Patients", url: "/medecin/patients", icon: Users, active: true },
      { title: "À Valider", url: "/medecin/dossiers", icon: CheckSquare, active: true, badge: 5 },
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
    try {
      const result = await logout()
      if (result?.error) {
        toast.error("Erreur", { description: result.error })
        setIsLoggingOut(false)
      }
    } catch (error) {
      toast.error("Erreur", { description: "Impossible de se déconnecter." })
      setIsLoggingOut(false)
    }
  }

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-slate-300 bg-white/95 backdrop-blur-sm overflow-x-hidden w-full max-w-[280px]">
      <SidebarHeader className="border-b border-slate-300 bg-white w-full">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-white/80 transition-all">
              <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30 group-data-[collapsible=icon]:size-8">
                <HeartPulse className="size-5 group-data-[collapsible=icon]:size-4" strokeWidth={2.5} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  MediBridge
                </span>
                <span className="truncate text-xs text-slate-500 font-medium">{roleLabel}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-white overflow-x-hidden w-full">
        <SidebarGroup className="w-full">
          <SidebarGroupLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider px-2 bg-white w-full">
            Navigation Principale
          </SidebarGroupLabel>
          <SidebarGroupContent className="bg-white w-full overflow-x-hidden">
            <SidebarMenu>
              {navMain.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                        className={`
                          relative transition-all duration-200
                          ${isActive
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md hover:shadow-lg"
                            : item.highlight
                            ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 font-semibold hover:from-blue-100 hover:to-cyan-100 border border-blue-300"
                            : "text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold bg-white"
                          }
                        `}
                    >
                      <a href={item.url} className="flex items-center gap-2 w-full min-w-0">
                        <item.icon
                          className={`${isActive ? "text-white" : item.highlight ? "text-blue-700" : "text-slate-700"} shrink-0`}
                          strokeWidth={isActive ? 2.5 : 2.5}
                        />
                        <span className="font-semibold truncate flex-1 min-w-0">{item.title}</span>
                        {item.badge && item.badge > 0 && (
                          <Badge
                            className={`ml-auto text-[10px] px-1.5 py-0 h-5 min-w-5 flex items-center justify-center font-bold ${
                              isActive
                                ? "bg-white/20 text-white border-white/30"
                                : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 shadow-sm"
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {navComing.length > 0 && (
          <>
            <SidebarSeparator className="mx-4 my-2" />

            <SidebarGroup className="w-full">
              <SidebarGroupLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 px-2 bg-white w-full">
                <Sparkles className="w-3 h-3 text-slate-600" />
                Bientôt Disponible
              </SidebarGroupLabel>
              <SidebarGroupContent className="bg-white w-full overflow-x-hidden">
                <SidebarMenu>
                  {navComing.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                          asChild
                          tooltip={`${item.title} (Bientôt)`}
                          className="text-slate-700 hover:bg-slate-100 transition-all font-semibold bg-white hover:text-slate-900"
                          onClick={(e) => handleComingSoon(e, item.title)}
                      >
                        <a href={item.url} className="flex items-center gap-2 w-full min-w-0">
                          <item.icon className="text-slate-600 shrink-0" strokeWidth={2.5} />
                          <span className="text-sm font-semibold truncate flex-1 min-w-0">{item.title}</span>
                          <Badge variant="outline" className="ml-auto text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0 border-slate-400 font-bold shrink-0">
                            Bientôt
                          </Badge>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        <SidebarSeparator className="mx-4 my-2" />

        <SidebarGroup className="w-full">
          <SidebarGroupLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider px-2 bg-white w-full">
            Préférences
          </SidebarGroupLabel>
          <SidebarGroupContent className="bg-white w-full overflow-x-hidden">
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Notifications"
                    className="text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold bg-white"
                  >
                    <a href={isMedecin ? "/medecin/notifications" : isClinique ? "/clinique/notifications" : "/patient/notifications"} className="flex items-center gap-2 relative w-full min-w-0">
                      <Bell className="text-slate-700 shrink-0" strokeWidth={2.5} />
                      <span className="truncate flex-1 min-w-0">Notifications</span>
                      <Badge className="ml-auto text-[10px] px-1.5 py-0 h-5 min-w-5 flex items-center justify-center font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-sm shrink-0">
                        3
                      </Badge>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Mon Profil"
                    className="text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold bg-white"
                  >
                    <a href={isMedecin ? "/medecin/profile" : isClinique ? "/clinique/profile" : "/patient/profile"} className="flex items-center gap-2 w-full min-w-0">
                      <User className="text-slate-700 shrink-0" strokeWidth={2.5} />
                      <span className="truncate flex-1 min-w-0">Mon Profil</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Paramètres"
                    className="text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold bg-white"
                  >
                    <a href={isMedecin ? "/medecin/settings" : isClinique ? "/clinique/settings" : "/patient/settings"} className="flex items-center gap-2 w-full min-w-0">
                      <Settings className="text-slate-700 shrink-0" strokeWidth={2.5} />
                      <span className="truncate flex-1 min-w-0">Paramètres</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Centre d'aide"
                    className="text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold bg-white"
                  >
                    <a href={isMedecin ? "/medecin/help" : isClinique ? "/clinique/help" : "/patient/help"} className="flex items-center gap-2 w-full min-w-0">
                      <HelpCircle className="text-slate-700 shrink-0" strokeWidth={2.5} />
                      <span className="truncate flex-1 min-w-0">Centre d'Aide</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-300 bg-white w-full overflow-x-hidden">
        <SidebarMenu className="w-full">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Retour à l'accueil"
              className="hover:bg-slate-100 transition-all text-slate-800 hover:text-blue-600 font-semibold bg-white"
            >
              <a href="/" className="flex items-center gap-2 w-full min-w-0">
                <Home className="text-slate-700 shrink-0" strokeWidth={2.5} />
                <span className="font-semibold truncate flex-1 min-w-0">Retour Accueil</span>
                <ChevronRight className="ml-auto w-4 h-4 text-slate-600 shrink-0" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-white data-[state=open]:shadow-md border border-slate-200 rounded-xl hover:bg-white hover:shadow-sm transition-all bg-white"
                >
                  <Avatar className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 border-2 border-white shadow-sm">
                    {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                    <AvatarFallback className="rounded-xl font-bold text-sm">
                      {displayName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-bold text-slate-900">{displayName}</span>
                    <span className="truncate text-xs text-slate-500">{user?.email}</span>
                  </div>
                  <ChevronRight className="ml-auto size-4 text-slate-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl shadow-2xl border-slate-200 bg-white"
                side="bottom"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-3 px-3 py-3 text-left bg-gradient-to-br from-blue-50 to-cyan-50 rounded-t-xl">
                    <Avatar className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white border-2 border-white shadow-md">
                      {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                      <AvatarFallback className="rounded-xl font-bold">
                        {displayName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-bold text-slate-900">{displayName}</span>
                      <span className="truncate text-xs text-slate-500">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <div className="p-1">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer rounded-lg font-medium"
                  >
                    {isLoggingOut ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <LogOut className="mr-2 h-4 w-4" />
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
