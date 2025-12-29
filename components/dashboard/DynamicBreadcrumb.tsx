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
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbConfig {
  label: string
  href?: string
}

const routeConfig: Record<string, BreadcrumbConfig[]> = {
  // Patient routes
  "/patient": [
    { label: "MediBridge", href: "/" },
    { label: "Tableau de bord" }
  ],
  "/patient/profile": [
    { label: "MediBridge", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Mon Profil" }
  ],
  "/patient/settings": [
    { label: "MediBridge", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Paramètres" }
  ],
  "/patient/help": [
    { label: "MediBridge", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Centre d'aide" }
  ],
  "/patient/notifications": [
    { label: "MediBridge", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Notifications" }
  ],
  "/patient/messages": [
    { label: "MediBridge", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Messagerie" }
  ],
  "/patient/dossier": [
    { label: "MediBridge", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Dossiers Médicaux" }
  ],
  "/patient/dossier/new": [
    { label: "MediBridge", href: "/" },
    { label: "Tableau de bord", href: "/patient" },
    { label: "Dossiers", href: "/patient/dossier" },
    { label: "Nouveau Dossier" }
  ],

  // Médecin routes
  "/medecin": [
    { label: "MediBridge", href: "/" },
    { label: "Espace Médecin" }
  ],
  "/medecin/patients": [
    { label: "MediBridge", href: "/" },
    { label: "Espace Médecin", href: "/medecin" },
    { label: "Mes Patients" }
  ],
  "/medecin/dossiers": [
    { label: "MediBridge", href: "/" },
    { label: "Espace Médecin", href: "/medecin" },
    { label: "À Valider" }
  ],
  "/medecin/messages": [
    { label: "MediBridge", href: "/" },
    { label: "Espace Médecin", href: "/medecin" },
    { label: "Messagerie" }
  ],

  // Clinique routes
  "/clinique": [
    { label: "MediBridge", href: "/" },
    { label: "Espace Clinique" }
  ],
  "/clinique/dossiers": [
    { label: "MediBridge", href: "/" },
    { label: "Espace Clinique", href: "/clinique" },
    { label: "Demandes Reçues" }
  ],
  "/clinique/devis": [
    { label: "MediBridge", href: "/" },
    { label: "Espace Clinique", href: "/clinique" },
    { label: "Mes Devis" }
  ],
  "/clinique/planning": [
    { label: "MediBridge", href: "/" },
    { label: "Espace Clinique", href: "/clinique" },
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
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const view = searchParams?.get('view')

  // Si on est sur /patient avec un query param view
  if (pathname === '/patient' && view) {
    const viewLabel = viewConfig[view] || view
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>MediBridge</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block">
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="hidden sm:block">
            <BreadcrumbLink
              href="/patient?view=dashboard"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Tableau de bord
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block">
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-slate-900 max-w-[200px] truncate">
              {viewLabel}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  // Configuration par défaut basée sur le pathname
  const breadcrumbs = routeConfig[pathname || ''] || routeConfig['/patient']

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <BreadcrumbSeparator className={index === 1 ? "hidden md:block" : "hidden sm:block"}>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem className={
              index === 0 ? "hidden md:block" :
              index === 1 ? "hidden sm:block" : ""
            }>
              {crumb.href ? (
                <BreadcrumbLink
                  href={crumb.href}
                  className={`flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors ${
                    index === 0 ? 'font-medium' : ''
                  }`}
                >
                  {index === 0 && <Home className="w-3.5 h-3.5" />}
                  <span>{crumb.label}</span>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="font-semibold text-slate-900 max-w-[200px] truncate">
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
