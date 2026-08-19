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
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Tableau de bord" }
  ],
  "/patient/profile": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Patient", href: "/patient" },
    { label: "Mon Profil" }
  ],
  "/patient/settings": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Patient", href: "/patient" },
    { label: "Paramètres" }
  ],
  "/patient/help": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Patient", href: "/patient" },
    { label: "Centre d'aide" }
  ],
  "/patient/notifications": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Patient", href: "/patient" },
    { label: "Notifications" }
  ],
  "/patient/messages": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Patient", href: "/patient" },
    { label: "Messagerie" }
  ],
  "/patient/dossier": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Patient", href: "/patient" },
    { label: "Mes Dossiers" }
  ],
  "/patient/dossier/new": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Patient", href: "/patient" },
    { label: "Mes Dossiers", href: "/patient/dossier" },
    { label: "Nouveau Dossier" }
  ],

  // Médecin routes
  "/medecin": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Médecin" }
  ],
  "/medecin/patients": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Médecin", href: "/medecin" },
    { label: "Mes Patients" }
  ],
  "/medecin/dossiers": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Médecin", href: "/medecin" },
    { label: "À Valider" }
  ],
  "/medecin/messages": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Médecin", href: "/medecin" },
    { label: "Messagerie" }
  ],

  // Clinique routes
  "/clinique": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Clinique" }
  ],
  "/clinique/dossiers": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Clinique", href: "/clinique" },
    { label: "Demandes Reçues" }
  ],
  "/clinique/devis": [
    { label: "Pont Afrique Santé", href: "/" },
    { label: "Espace Clinique", href: "/clinique" },
    { label: "Mes Devis" }
  ],
  "/clinique/planning": [
    { label: "Pont Afrique Santé", href: "/" },
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
    const viewLabel = viewConfig[view] || view
    return (
      <Breadcrumb>
        <BreadcrumbList className="text-xs font-semibold text-slate-500 gap-1.5 sm:gap-2">
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/" className="flex items-center gap-1 text-slate-700 hover:text-slate-900 transition-colors">
              <span className="font-bold"><span className="text-[#0284C7]">Pont</span><span className="text-[#141413]">Afrique</span><span className="text-[#CF4500]">Santé</span></span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block text-slate-300">
            <ChevronRight className="w-3.5 h-3.5" />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="hidden sm:block">
            <BreadcrumbLink
              href="/patient?view=dashboard"
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              Espace Patient
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block text-slate-300">
            <ChevronRight className="w-3.5 h-3.5" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold text-slate-900 tracking-tight max-w-[200px] truncate">
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
      <BreadcrumbList className="text-xs font-semibold text-slate-500 gap-1.5 sm:gap-2">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-1.5 sm:gap-2">
            {index > 0 && (
              <BreadcrumbSeparator className="text-slate-300">
                <ChevronRight className="w-3.5 h-3.5" />
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem className={
              index === 0 ? "hidden md:block" :
              index === 1 ? "hidden sm:block" : ""
            }>
              {crumb.href ? (
                <BreadcrumbLink
                  href={crumb.href}
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {crumb.label === "Pont Afrique Santé" ? (
                    <span className="font-bold"><span className="text-[#0284C7]">Pont</span><span className="text-[#141413]">Afrique</span><span className="text-[#CF4500]">Santé</span></span>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="font-bold text-slate-900 tracking-tight max-w-[200px] truncate">
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

