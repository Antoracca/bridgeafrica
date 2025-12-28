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
  Globe,
  Loader2
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

// ... imports existants

// Configuration des menus par rôle (Garder navConfig inchangé pour l'instant)
const navConfig = {
  // ... (code existant)
  patient: [
    {
      title: "Mon Espace",
      url: "/patient",
      icon: Home,
    },
    {
      title: "Mes Dossiers",
      url: "/patient/dossier",
      icon: FileText,
    },
    {
      title: "Nouveau Dossier",
      url: "/patient/dossier/new",
      icon: PlusCircle,
    },
    {
      title: "Messagerie",
      url: "/patient/messages",
      icon: MessageSquare,
    },
    {
      title: "Rendez-vous",
      url: "/patient/appointments", // Correction potentielle: cette route n'existait pas dans l'arborescence, à créer ou supprimer
      icon: Calendar,
    },
  ],
  medecin: [
    {
        title: "Tableau de bord",
        url: "/medecin",
        icon: Activity,
    },
    {
        title: "Mes Patients",
        url: "/medecin/patients",
        icon: Users,
    },
    {
        title: "À Valider",
        url: "/medecin/dossiers",
        icon: CheckSquare,
    },
    {
        title: "Messagerie",
        url: "/medecin/messages",
        icon: MessageSquare,
    },
  ],
  clinique: [
    {
        title: "Tableau de bord",
        url: "/clinique",
        icon: Activity,
    },
    {
        title: "Demandes Reçues",
        url: "/clinique/dossiers",
        icon: FileText,
    },
    {
        title: "Mes Devis",
        url: "/clinique/devis",
        icon: FileSpreadsheet,
    },
    {
        title: "Planning",
        url: "/clinique/planning",
        icon: Calendar,
    },
  ]
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user?: any // Typage loose pour l'instant pour accepter l'objet User Supabase
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
  const isMedecin = pathname?.startsWith("/medecin")
  const isClinique = pathname?.startsWith("/clinique")
  
  let navMain = navConfig.patient
  let roleLabel = "Espace Patient"
  let RoleIcon = Activity

  if (isMedecin) {
    navMain = navConfig.medecin
    roleLabel = "Espace Médecin"
    RoleIcon = Stethoscope
  } else if (isClinique) {
    navMain = navConfig.clinique
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
        toast.error("Erreur de déconnexion", {
          description: result.error,
        })
        setIsLoggingOut(false)
      }
      // Si succès, la fonction logout() redirige automatiquement
    } catch (error) {
      toast.error("Erreur inattendue", {
        description: "Impossible de se déconnecter. Veuillez réessayer.",
      })
      setIsLoggingOut(false)
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* ... Header identique ... */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <RoleIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">MediBridge</span>
                  <span className="truncate text-xs">{roleLabel}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Compte</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Mon Profil">
                    <a href={isMedecin ? "/medecin/profile" : isClinique ? "/clinique/profile" : "/patient/profile"}>
                      <User />
                      <span>Mon Profil</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Paramètres">
                    <a href="#">
                      <Settings />
                      <span>Paramètres</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Retour à l'accueil">
              <a href="/">
                <Globe />
                <span>Retour à l'accueil</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="" alt={displayName} />
                    <AvatarFallback className="rounded-lg">{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{displayName}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <User className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="" alt={displayName} />
                      <AvatarFallback className="rounded-lg">{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{displayName}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
                  {isLoggingOut ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" />
                  )}
                  {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
