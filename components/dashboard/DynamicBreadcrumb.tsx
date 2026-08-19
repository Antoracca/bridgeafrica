"use client"

import { usePathname, useSearchParams } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"

interface BreadcrumbConfig {
  label: string
  href?: string
}

const routeConfig: Record<string, BreadcrumbConfig[]> = {
  // Patient routes
  "/patient": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord" }
  ],
  "/patient/profile": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Mon Profil" }
  ],
  "/patient/settings": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Paramètres" }
  ],
  "/patient/help": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Centre d'aide" }
  ],
  "/patient/notifications": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Notifications" }
  ],
  "/patient/messages": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Messagerie" }
  ],
  "/patient/dossier": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Mes Dossiers" }
  ],
  "/patient/dossier/new": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Mes Dossiers", href: "/patient/dossier" },
    { label: "Nouveau Dossier" }
  ],

  // Médecin routes
  "/medecin": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord" }
  ],
  "/medecin/patients": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/medecin" },
    { label: "Mes Patients" }
  ],
  "/medecin/dossiers": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/medecin" },
    { label: "À Valider" }
  ],
  "/medecin/messages": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/medecin" },
    { label: "Messagerie" }
  ],

  // Clinique routes
  "/clinique": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord" }
  ],
  "/clinique/dossiers": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/clinique" },
    { label: "Demandes Reçues" }
  ],
  "/clinique/devis": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/clinique" },
    { label: "Mes Devis" }
  ],
  "/clinique/planning": [
    { label: "Accueil", href: "/" },
    { label: "Tableau de bord", href: "/clinique" },
    { label: "Planning" }
  ],
}

// Configuration pour les vues avec query params
const viewConfig: Record<string, string> = {
  dashboard: "Tableau de bord",
  dossiers: "Mes Dossiers",
  new: "Nouvelle Demande",
  messages: "Messagerie",
  rdv: "Rendez-vous",
  documents: "Documents Partagés",
  finances: "Factures & Paiements",
  voyage: "Mon Voyage",
  teleconsultation: "Téléconsultation",
  historique: "Historique Médical",
  prescriptions: "Prescriptions",
  laboratoire: "Analyses de Laboratoire",
  assurances: "Assurances Voyage",
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const view = searchParams?.get('view')

  // Si on est sur /patient avec un query param view
  if (pathname === '/patient' && view) {
    const isDashboardView = view === 'dashboard'
    const viewLabel = viewConfig[view] || view

    return (
      <Breadcrumb>
        <BreadcrumbList className="text-xs font-medium text-slate-500 gap-1.5 sm:gap-2">
          <BreadcrumbItem className="hidden sm:block">
            <BreadcrumbLink href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
              Accueil
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block text-slate-300">
            <ChevronRight className="w-3.5 h-3.5" />
          </BreadcrumbSeparator>

          {isDashboardView ? (
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-slate-900 tracking-tight">
                Tableau de bord
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/patient?view=dashboard"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Tableau de bord
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-slate-300">
                <ChevronRight className="w-3.5 h-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-slate-900 tracking-tight max-w-[200px] truncate">
                  {viewLabel}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  // Configuration par défaut basée sur le pathname
  const breadcrumbs = routeConfig[pathname || ''] || routeConfig['/patient']

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs font-medium text-slate-500 gap-1.5 sm:gap-2">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-1.5 sm:gap-2">
            {index > 0 && (
              <BreadcrumbSeparator className="text-slate-300">
                <ChevronRight className="w-3.5 h-3.5" />
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem className={
              index === 0 ? "hidden sm:block" : ""
            }>
              {crumb.href ? (
                <BreadcrumbLink
                  href={crumb.href}
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {crumb.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="font-semibold text-slate-900 tracking-tight max-w-[200px] truncate">
                  {crumb.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}


