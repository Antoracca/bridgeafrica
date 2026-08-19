"use client"

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from "@/lib/supabase/client"
import { MedicalCaseForm } from "@/components/forms/MedicalCaseForm"
import { MobileDashboard } from "./dashboard-mobile"
import { motion } from "framer-motion"
import {
  Loader2, FileText, ClipboardList,
  Microscope, Pill, ShieldCheck
} from "lucide-react"

import { DashboardOverview } from "./views/DashboardOverview"
import { DossiersView } from "./views/DossiersView"
import { MessagesView } from "./views/MessagesView"
import { AppointmentsView } from "./views/AppointmentsView"
import { DocumentsView } from "./views/DocumentsView"
import { FinancesView } from "./views/FinancesView"
import { TeleconsultationView } from "./views/TeleconsultationView"
import { TravelView } from "./views/TravelView"
import { MedicalHistoryView } from "./views/MedicalHistoryView"
import { PrescriptionsView } from "./views/PrescriptionsView"
import { LabResultsView } from "./views/LabResultsView"
import { InsurancesView } from "./views/InsurancesView"

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  return isMobile
}

interface User {
  id: string
  email: string | undefined
  user_metadata: {
    full_name?: string; name?: string; first_name?: string; last_name?: string
  }
}

interface Stats {
  total: number; en_attente: number; en_cours: number; termine: number
}

interface MedicalCase {
  id: string
  diagnosis: string
  required_specialty: string
  status: string
  created_at: string
  urgency_level?: string
}

function SectionPlaceholder({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4 md:p-8"
    >
      <div className="max-w-md w-full bg-[#FCFBFA] border border-[#E2DDD7] rounded-[40px] p-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4">
        <div className="w-16 h-16 mx-auto bg-[#F3F0EE] border border-[#E2DDD7] text-[#141413] rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-[#CF4500]" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-medium text-[#141413] tracking-tight">{title}</h3>
          <p className="text-[#696969] text-xs leading-relaxed">{description}</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F0EE] border border-[#E2DDD7] text-[#141413] font-mono text-[11px] font-bold">
          <span>SYNCHRONISATION CLINIQUE EN COURS</span>
        </div>
      </div>
    </motion.div>
  )
}

export function PatientDashboardRouter() {
  const searchParams = useSearchParams()
  const view = searchParams.get('view') || 'dashboard'

  const [user, setUser] = useState<User | null>(null)
  const [cases, setCases] = useState<MedicalCase[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, en_attente: 0, en_cours: 0, termine: 0 })
  const [loading, setLoading] = useState(true)
  const [fullName, setFullName] = useState<string>("Patient")
  const isMobile = useIsMobile()

  useEffect(() => {
    const loadData = async () => {
      try {
        const supabase = createClient()
        const { data: { user: currentUser } } = await supabase.auth.getUser()

        if (currentUser) {
          setUser(currentUser as User)

          // 1. Récupération du profil complet (Prénom et Nom complet) depuis la table profiles
          const { data: profileData } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', currentUser.id)
            .single<any>()

          let resolvedName = ""
          if (profileData?.first_name || profileData?.last_name) {
            resolvedName = `${profileData.first_name || ""} ${profileData.last_name || ""}`.trim()
          } else {
            resolvedName =
              currentUser?.user_metadata?.full_name ||
              currentUser?.user_metadata?.name ||
              (currentUser?.user_metadata?.first_name 
                ? `${currentUser.user_metadata.first_name} ${currentUser.user_metadata.last_name || ""}`.trim()
                : "") ||
              currentUser?.email?.split('@')[0] ||
              "Patient"
          }
          setFullName(resolvedName || "Patient")

          // 2. Chargement des dossiers réels du patient
          const { data: casesData } = await supabase
            .from('medical_cases')
            .select('*')
            .eq('patient_id', currentUser.id)
            .order('created_at', { ascending: false })

          const list = (casesData as MedicalCase[]) || []
          setCases(list)

          const total = list.length
          const en_attente = list.filter(c => c.status === 'submitted').length
          const en_cours = list.filter(c => ['in_review', 'matched', 'confirmed', 'under_review', 'quote_sent', 'quote_accepted'].includes(c.status)).length
          const termine = list.filter(c => c.status === 'completed').length

          setStats({ total, en_attente, en_cours, termine })
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données patient :", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-teal" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-500 font-medium">
        Session non disponible. Veuillez vous reconnecter.
      </div>
    )
  }

  if (isMobile && view === 'dashboard') {
    return <MobileDashboard user={user} stats={stats} cases={cases} displayName={fullName} />
  }

  switch (view) {
    case 'dossiers':
      return <DossiersView cases={cases} />
    case 'new':
      return <MedicalCaseForm />
    case 'messages':
      return <MessagesView />
    case 'rdv':
      return <AppointmentsView />
    case 'documents':
      return <DocumentsView />
    case 'finances':
      return <FinancesView />
    case 'voyage':
      return <TravelView />
    case 'teleconsultation':
      return <TeleconsultationView />

    case 'historique':
      return <MedicalHistoryView />
    case 'assurances':
      return <InsurancesView />
    case 'prescriptions':
      return <PrescriptionsView />
    case 'laboratoire':
      return <LabResultsView />

    default:
      return (
        <DashboardOverview
          displayName={fullName}
          stats={stats}
          cases={cases}
        />
      )
  }
}
