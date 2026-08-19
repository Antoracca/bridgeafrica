"use client"

import Link from "next/link"
import { 
  InkPillButton, 
  OutlinedPillButton 
} from "@/components/ui/mastercard-design"
import { PatientBusinessCard } from "@/components/patient/PatientBusinessCard"
import { LogisticsOverviewModule } from "@/components/patient/LogisticsOverviewModule"
import {
  FileText,
  Activity,
  Clock,
  CheckCircle2,
  PlusCircle,
  Video,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  MessageSquare,
  ArrowUpRight,
  FolderLock,
  FolderKanban,
  Lock,
  Plane
} from "lucide-react"

interface MedicalCase {
  id: string
  diagnosis: string
  required_specialty: string
  status: string
  created_at: string
  urgency_level?: string
}

interface User {
  id: string
  email: string | undefined
  user_metadata: {
    full_name?: string
    name?: string
    first_name?: string
    last_name?: string
  }
}

interface Stats {
  total: number
  en_attente: number
  en_cours: number
  termine: number
}

interface MobileDashboardProps {
  user: User
  stats: Stats
  cases?: MedicalCase[]
  displayName?: string
}

export function MobileDashboard({ user, stats, cases = [], displayName: propDisplayName }: MobileDashboardProps) {
  const displayName =
    propDisplayName ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.first_name ||
    user?.email?.split("@")[0] ||
    "Patient"

  const hasCases = cases && cases.length > 0

  return (
    <div className="pb-10 space-y-6">
      {/* Header Mobile - Carte de visite Passeport Médical */}
      <PatientBusinessCard 
        patientName={displayName}
        email={user.email}
        status="Compte actif"
      />

      {/* Stats rapides - Stadium Numbers sans points */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[24px] p-4 flex flex-col justify-between shadow-sm">
          <span className="text-[11px] font-bold text-[#696969] uppercase tracking-wider mb-2">Dossiers</span>
          <span className="text-3xl font-medium text-[#141413] tracking-tight">{stats.total}</span>
        </div>

        <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[24px] p-4 flex flex-col justify-between shadow-sm">
          <span className="text-[11px] font-bold text-[#CF4500] uppercase tracking-wider mb-2">En Attente</span>
          <span className="text-3xl font-medium text-[#CF4500] tracking-tight">{stats.en_attente}</span>
        </div>

        <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[24px] p-4 flex flex-col justify-between shadow-sm">
          <span className="text-[11px] font-bold text-[#696969] uppercase tracking-wider mb-2">En Examen</span>
          <span className="text-3xl font-medium text-[#141413] tracking-tight">{stats.en_cours}</span>
        </div>

        <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[24px] p-4 flex flex-col justify-between shadow-sm">
          <span className="text-[11px] font-bold text-[#696969] uppercase tracking-wider mb-2">Finalisés</span>
          <span className="text-3xl font-medium text-[#141413] tracking-tight">{stats.termine}</span>
        </div>
      </div>

      {/* Contenu dynamique : Dossiers réels OU Guide de démarrage */}
      {hasCases ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-[#141413] uppercase tracking-wider">Mes Prises en Charge</h2>
            <Link href="/patient?view=dossiers" className="text-xs font-bold text-[#CF4500] flex items-center gap-1">
              <span>Voir tout</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[32px] p-4 divide-y divide-[#E2DDD7] shadow-sm">
            {cases.slice(0, 4).map((c) => (
              <Link
                key={c.id}
                href={`/patient/dossier/${c.id}`}
                className="flex items-center justify-between gap-3 py-3.5 first:pt-1 last:pb-1 group"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-xs text-[#141413] truncate group-hover:text-[#CF4500] transition-colors">
                    {c.diagnosis}
                  </h3>
                  <p className="text-[11px] text-[#696969] font-medium mt-0.5">
                    {c.required_specialty} • {new Date(c.created_at).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#141413] text-[#F3F0EE] text-[10px] font-mono font-bold">{c.status}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#696969] group-hover:text-[#141413] transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          <InkPillButton href="/patient?view=new" className="w-full">
            <PlusCircle className="w-4 h-4" />
            <span>Initier un nouveau dossier</span>
          </InkPillButton>
        </div>
      ) : (
        <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[32px] p-6 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#E2DDD7] text-[#141413] flex items-center justify-center shadow-sm">
            <FolderKanban className="w-5 h-5 text-[#141413]" />
          </div>

          <div>
            <h2 className="font-medium text-[#141413] text-base mb-1">Démarrer une prise en charge</h2>
            <p className="text-xs text-[#696969] leading-relaxed">
              Déposez vos examens médicaux pour audit et comparatif hospitalier sous 24h.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#E2DDD7] text-xs text-[#696969]">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#141413] text-[#F3F0EE] font-bold flex items-center justify-center text-[10px]">1</span>
              <span>Dépôt du bilan médical sécurisé</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#141413] text-[#F3F0EE] font-bold flex items-center justify-center text-[10px]">2</span>
              <span>Étude collégiale & devis sous 24h</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#141413] text-[#F3F0EE] font-bold flex items-center justify-center text-[10px]">3</span>
              <span>Facturation des soins & voyage médical</span>
            </div>
          </div>

          <InkPillButton href="/patient?view=new" className="w-full">
            <PlusCircle className="w-4 h-4" />
            <span>Déposer mon premier bilan</span>
          </InkPillButton>
        </div>
      )}

      {/* Module Logistique de séjour Mobile */}
      <LogisticsOverviewModule />
    </div>
  )
}



