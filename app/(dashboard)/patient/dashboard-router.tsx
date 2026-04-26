"use client"

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from "@/lib/supabase/client"
import { MedicalCaseForm } from "@/components/forms/MedicalCaseForm"
import { MobileDashboard } from "./dashboard-mobile"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Loader2, FileText, Calendar, Plane, ClipboardList,
  FileDigit, MessageSquare, Video, CreditCard,
  Microscope, Pill, ShieldCheck, Sparkles
} from "lucide-react"

// Hook pour détecter si on est sur mobile
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

// Sparkline Component - Clean & Minimal
const Sparkline = ({ data, colorClass = "text-blue-500" }: { data: number[], colorClass?: string }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = (max - min) || 1
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 80 - 10
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="relative w-full h-10 overflow-hidden mt-2">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <motion.polyline
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={colorClass}
        />
      </svg>
      <div className={`absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-current to-transparent opacity-5 ${colorClass}`} />
    </div>
  )
}

// Simple & Elegant Placeholder
function DevelopmentPlaceholder({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 md:p-8 bg-slate-50/50"
    >
      <div className="max-w-xl w-full">
        <div className="bg-white border border-slate-100 rounded-2xl p-8 md:p-12 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Icon className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">{description}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100">
            <span className="text-slate-600 font-medium text-sm">Module en cours d'intégration</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Clean Card Wrapper
const CleanCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
    className={`bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
)

// ... [Previous Imports Left Intact]
import { DashboardOverview } from "./views/DashboardOverview"
import { MessagesView } from "./views/MessagesView"
import { AppointmentsView } from "./views/AppointmentsView"
import { DocumentsView } from "./views/DocumentsView"
import { FinancesView } from "./views/FinancesView"
import { TeleconsultationView } from "./views/TeleconsultationView"
import { TravelView } from "./views/TravelView"

export function PatientDashboardRouter() {
  const searchParams = useSearchParams()
  const view = searchParams.get('view') || 'dashboard'

  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stats>({ total: 0, en_attente: 0, en_cours: 0, termine: 0 })
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    const loadData = async () => {
      try {
        const supabase = createClient()
        const { data: { user: currentUser } } = await supabase.auth.getUser()

        if (currentUser) {
          setUser(currentUser as User)
          const { count: total } = await supabase.from('medical_cases').select('*', { count: 'exact', head: true }).eq('patient_id', currentUser.id)
          const { count: en_attente } = await supabase.from('medical_cases').select('*', { count: 'exact', head: true }).eq('patient_id', currentUser.id).eq('status', 'submitted')
          const { count: en_cours } = await supabase.from('medical_cases').select('*', { count: 'exact', head: true }).eq('patient_id', currentUser.id).in('status', ['in_review', 'matched', 'confirmed'])
          const { count: termine } = await supabase.from('medical_cases').select('*', { count: 'exact', head: true }).eq('patient_id', currentUser.id).eq('status', 'completed')

          setStats({ total: total || 0, en_attente: en_attente || 0, en_cours: en_cours || 0, termine: termine || 0 })
        }
      } catch (error) { console.error(error) } finally { setLoading(false) }
    }
    loadData()
  }, [])

  if (loading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
  if (!user) return <div className="flex items-center justify-center min-h-screen text-slate-500">Erreur de chargement de l'espace patient</div>

  const displayName = user?.user_metadata?.first_name || user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Utilisateur'

  if (isMobile && view === 'dashboard') {
    return <MobileDashboard user={user} stats={stats} />
  }

  // Route to the appropriate High-End SaaS View
  switch (view) {
    case 'new': return <MedicalCaseForm />
    case 'messages': return <MessagesView />
    case 'rdv': return <AppointmentsView />
    case 'documents': return <DocumentsView />
    case 'finances': return <FinancesView />
    case 'voyage': return <TravelView />
    case 'teleconsultation': return <TeleconsultationView />

    // Remaining placeholders
    case 'historique': return <DevelopmentPlaceholder icon={ClipboardList} title="Historique" description="Accédez à la chronologie complète de vos interventions passées." />
    case 'dossiers': return <DevelopmentPlaceholder icon={FileText} title="Dossiers Médicaux" description="Liste exhaustive de vos demandes et dossiers de santé." />
    case 'assurances': return <DevelopmentPlaceholder icon={ShieldCheck} title="Assurances" description="Synchronisez vos assurances voyage et garantie de rapatriement sanitaire." />
    case 'prescriptions': return <DevelopmentPlaceholder icon={Pill} title="Ordonnances" description="Retrouvez électroniquement vos prescriptions de traitement post-opératoire." />
    case 'laboratoire': return <DevelopmentPlaceholder icon={Microscope} title="Résultats Labo" description="Vos bilans sanguins et analyses de laboratoire s'afficheront dans cet onglet." />

    case 'dashboard':
    default:
      return <DashboardOverview displayName={displayName} stats={stats} />
  }
}
