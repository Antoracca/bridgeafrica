"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  InkPillButton, 
  OutlinedPillButton 
} from "@/components/ui/mastercard-design"
import { PatientBusinessCard } from "@/components/patient/PatientBusinessCard"
import { LogisticsOverviewModule } from "@/components/patient/LogisticsOverviewModule"
import { 
  PlusCircle, 
  ChevronRight,
  ArrowUpRight,
  FolderKanban
} from "lucide-react"

interface MedicalCase {
  id: string
  diagnosis: string
  required_specialty: string
  status: string
  created_at: string
}

interface Stats {
  total: number
  en_attente: number
  en_cours: number
  termine: number
}

interface DashboardOverviewProps {
  displayName: string
  stats: Stats
  cases?: MedicalCase[]
}

export function DashboardOverview({ displayName, stats, cases = [] }: DashboardOverviewProps) {
  const hasCases = cases && cases.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-12 w-full max-w-7xl mx-auto"
    >
      {/* 1. HERO DIRECTEMENT INTÉGRÉ SUR LA PAGE (MIX PAGE & CARTE DE VISITE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-2">
        {/* Colonne Gauche : Titre et Actions sur fond de page */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight leading-[1.15]">
              Bienvenue, <br />
              <span className="font-semibold">{displayName}</span>
            </h1>
            <p className="text-[#696969] text-sm sm:text-base max-w-lg leading-relaxed pt-1">
              Votre portail de coordination médicale internationale, de suivi de vos dossiers cliniques et de conciergerie de séjour.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <InkPillButton href="/patient?view=new">
              <PlusCircle className="w-4 h-4" />
              <span>Initier une prise en charge</span>
            </InkPillButton>

            <OutlinedPillButton href="/patient?view=messages">
              <span>Coordinateur Référent</span>
              <ArrowUpRight className="w-4 h-4" />
            </OutlinedPillButton>
          </div>
        </div>

        {/* Colonne Droite : Carte de visite Passeport Médical en relief */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <PatientBusinessCard 
            patientName={displayName}
            status="Compte actif"
          />
        </div>
      </div>

      {/* 2. STATISTIQUES ÉPURÉES SUR FOND GRIS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Total Demandes</span>
          <span className="text-3xl sm:text-4xl font-medium text-[#141413] tracking-tight mt-3">{stats.total}</span>
          <span className="text-xs text-[#696969] mt-2">Dossiers déposés</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">En Attente</span>
          <span className="text-3xl sm:text-4xl font-medium text-[#CF4500] tracking-tight mt-3">{stats.en_attente}</span>
          <span className="text-xs text-[#696969] mt-2">Audits cliniques</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">En Examen</span>
          <span className="text-3xl sm:text-4xl font-medium text-[#141413] tracking-tight mt-3">{stats.en_cours}</span>
          <span className="text-xs text-[#696969] mt-2">Cliniques partenaires</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Prises en Charge</span>
          <span className="text-3xl sm:text-4xl font-medium text-[#141413] tracking-tight mt-3">{stats.termine}</span>
          <span className="text-xs text-[#696969] mt-2">Soins finalisés</span>
        </div>
      </div>

      {/* 3. DOSSIERS RÉELS OU ÉTAT AUCUNE PRISE EN CHARGE (DIRECTEMENT INTÉGRÉ AU FOND) */}
      {hasCases ? (
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-end pb-4 border-b border-[#E2DDD7]">
            <div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">Dossiers Médicaux en Cours</h2>
              <p className="text-xs text-[#696969] mt-0.5">Données sécurisées transmises aux établissements hospitaliers accrédités</p>
            </div>
            <OutlinedPillButton href="/patient?view=dossiers" className="text-xs py-2 px-4">
              <span>Voir tout l'historique</span>
            </OutlinedPillButton>
          </div>

          <div className="divide-y divide-[#E2DDD7]">
            {cases.map((c) => (
              <Link 
                key={c.id}
                href={`/patient/dossier/${c.id}`}
                className="flex items-center justify-between py-4 hover:bg-[#F4F2EE] px-3 rounded-[20px] transition-all group"
              >
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-[#141413] group-hover:text-[#CF4500] transition-colors">{c.diagnosis}</h4>
                  <p className="text-xs text-[#696969] mt-0.5">{c.required_specialty} • {new Date(c.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#141413] text-[#F3F0EE] text-xs font-mono font-bold">{c.status}</span>
                  <ChevronRight className="w-4 h-4 text-[#696969] group-hover:text-[#141413] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-8 px-4 sm:px-8 border-y border-[#E2DDD7] text-center space-y-4 max-w-2xl mx-auto">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">
              Aucune prise en charge active
            </h2>
            <p className="text-xs sm:text-sm text-[#696969] leading-relaxed">
              Déposez votre bilan médical pour recevoir sous 24 heures les propositions de soins et devis de nos cliniques partenaires spécialisées.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <InkPillButton href="/patient?view=new">
              <PlusCircle className="w-4 h-4" />
              <span>Créer une demande de soins</span>
            </InkPillButton>
            <OutlinedPillButton href="/patient?view=messages">
              <span>Contacter mon référent</span>
            </OutlinedPillButton>
          </div>
        </div>
      )}

      {/* 4. MODULE CONCIERGERIE & SÉJOUR */}
      <LogisticsOverviewModule />
    </motion.div>
  )
}
