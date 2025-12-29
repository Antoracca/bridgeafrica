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
    <Sidebar collapsible="icon" {...props} className="border-r border-slate-100">
      <SidebarHeader className="border-b border-slate-100 bg-gradient-to-br from-blue-50 to-cyan-50/50">
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

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Navigation Principale
          </SidebarGroupLabel>
          <SidebarGroupContent>
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
                            ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 font-medium hover:from-blue-100 hover:to-cyan-100 border border-blue-200"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }
                        `}
                    >
                      <a href={item.url} className="flex items-center gap-2 w-full">
                        <item.icon
                          className={`${isActive ? "text-white" : item.highlight ? "text-blue-600" : "text-slate-500"}`}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                        <span>{item.title}</span>
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

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Bientôt Disponible
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navComing.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                          asChild
                          tooltip={`${item.title} (Bientôt)`}
                          className="opacity-60 hover:opacity-100 text-slate-500 hover:bg-slate-50 transition-all"
                          onClick={(e) => handleComingSoon(e, item.title)}
                      >
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon className="text-slate-400" />
                          <span className="text-sm">{item.title}</span>
                          <Badge variant="outline" className="ml-auto text-[9px] bg-slate-50 text-slate-400 px-1.5 py-0 border-slate-200">
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

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Préférences
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Notifications"
                    onClick={(e) => handleComingSoon(e, "Notifications")}
                    className="text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <a href="#" className="flex items-center gap-2 relative">
                      <Bell className="text-slate-500" />
                      <span>Notifications</span>
                      <Badge className="ml-auto text-[10px] px-1.5 py-0 h-5 min-w-5 flex items-center justify-center font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-sm">
                        5
                      </Badge>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Mon Profil"
                    className="text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <a href={isMedecin ? "/medecin/profile" : isClinique ? "/clinique/profile" : "/patient/profile"}>
                      <User className="text-slate-500" />
                      <span>Mon Profil</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Paramètres"
                    onClick={(e) => handleComingSoon(e, "Paramètres")}
                    className="text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <a href="#">
                      <Settings className="text-slate-500" />
                      <span>Paramètres</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Centre d'aide"
                    onClick={(e) => handleComingSoon(e, "Centre d'aide")}
                    className="text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <a href="#">
                      <HelpCircle className="text-slate-500" />
                      <span>Centre d'Aide</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-100 bg-slate-50/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Retour à l'accueil"
              className="hover:bg-white transition-all text-slate-600 hover:text-blue-600"
            >
              <a href="/" className="flex items-center gap-2">
                <Home className="text-slate-500" />
                <span className="font-medium">Retour Accueil</span>
                <ChevronRight className="ml-auto w-4 h-4 opacity-50" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-white data-[state=open]:shadow-md border border-slate-200 rounded-xl hover:bg-white hover:shadow-sm transition-all bg-white/50"
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
                  <div className="flex items-center gap-3 px-2 py-3 text-left bg-gradient-to-br from-blue-50 to-cyan-50 rounded-t-xl border-b border-slate-100">
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
                    asChild
                    className="cursor-pointer rounded-lg hover:bg-blue-50 focus:bg-blue-50"
                  >
                    <a href={isMedecin ? "/medecin/profile" : isClinique ? "/clinique/profile" : "/patient/profile"} className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-blue-600" />
                      <span className="text-slate-700">Mon Profil</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => handleComingSoon(e, "Paramètres")}
                    className="cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50"
                  >
                    <Settings className="mr-2 h-4 w-4 text-slate-600" />
                    <span className="text-slate-700">Paramètres</span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
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
