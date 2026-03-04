"use client"

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from "@/lib/supabase/client"
import { MedicalCaseForm } from "@/components/forms/MedicalCaseForm"
import { MobileDashboard } from "./dashboard-mobile"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Loader2, FileText, Calendar, Plane, CheckCircle2, Clock, AlertCircle,
  Download, Upload, MessageSquare, Video, CreditCard, ClipboardList,
  FileDigit, ArrowRight, Activity, TrendingUp, Users, DollarSign, Microscope, Pill, ShieldCheck, MapPin, Star, Users2, Sparkles
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
            <Sparkles className="w-4 h-4 text-slate-400" />
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

function DashboardContent({ user, stats }: { user: User, stats: Stats }) {
  const isMobile = useIsMobile()
  if (isMobile) return <MobileDashboard user={user} stats={stats} />

  const displayName = user?.user_metadata?.first_name || user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Utilisateur'

  const journeySteps = [
    { id: 1, date: "12 Jan", title: "Dossier Créé", status: "completed" },
    { id: 2, date: "14 Jan", title: "Audit d'Expert", status: "completed" },
    { id: 3, date: "18 Jan", title: "Matching", status: "completed" },
    { id: 4, date: "25 Jan", title: "Téléconsult.", status: "completed" },
    { id: 5, date: "29 Jan", title: "Devis Validé", status: "completed" },
    { id: 6, date: "30 Jan", title: "Logistique", status: "in_progress" },
    { id: 7, date: "05 Fév", title: "Arrivée", status: "upcoming" },
    { id: 8, date: "07 Fév", title: "Intervention", status: "upcoming" },
    { id: 9, date: "15 Fév", title: "Suivi", status: "upcoming" },
  ]
  const currentStep = journeySteps.findIndex(step => step.status === 'in_progress') + 1
  const progressPercentage = ((currentStep - 1) / (journeySteps.length - 1)) * 100

  const documents = [
    { id: 1, name: "IRM Cervicale UHD", type: "Image médicale", date: "12 Jan 2025", status: "Analysé", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, name: "Devis Hôpital Américain", type: "Administration", date: "18 Jan 2025", status: "Validé", icon: FileDigit, color: "text-emerald-600", bg: "bg-emerald-50" },
    { id: 3, name: "Passeport Biométrique", type: "Identité", date: "27 Jan 2025", status: "Requis", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
  ]

  const actions = [
    { label: "Messages", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50", badge: "2" },
    { label: "Rendez-vous", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Paiements", icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Voyage", icon: Plane, color: "text-cyan-600", bg: "bg-cyan-50" }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-4 md:p-8 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">
              Bonjour, {displayName} 👋
            </h1>
            <p className="text-slate-500 font-medium">
              Voici l'avancement de votre parcours de soins.
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 shadow-sm">
            <Upload className="w-4 h-4 mr-2" /> Nouveau Document
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <CleanCard className="p-5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-slate-500 font-medium text-sm">Dossiers Actifs</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Activity className="w-4 h-4" /></div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
            <Sparkline data={[2, 3, 2, 4, 3, 5, 4]} colorClass="text-blue-500" />
          </CleanCard>

          <CleanCard className="p-5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-slate-500 font-medium text-sm">En Attente d'Action</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-4 h-4" /></div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{stats.en_attente}</div>
            <Sparkline data={[1, 2, 1, 2, 1, 1, 1]} colorClass="text-amber-500" />
          </CleanCard>

          <CleanCard className="p-5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-slate-500 font-medium text-sm">En Cours</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><TrendingUp className="w-4 h-4" /></div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{stats.en_cours}</div>
            <Sparkline data={[1, 1, 2, 2, 3, 3, 3]} colorClass="text-purple-500" />
          </CleanCard>

          <CleanCard className="p-5">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-500 font-medium text-sm">Progression Globale</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle2 className="w-4 h-4" /></div>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <div className="text-3xl font-bold text-slate-900">{progressPercentage.toFixed(0)}%</div>
              <span className="text-sm text-emerald-600 font-medium mb-1">+ étape validée</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-slate-100 [&>div]:bg-emerald-500" />
          </CleanCard>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Timeline - Elegant View */}
          <CleanCard className="lg:col-span-2 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Parcours Actuel</h2>
                <p className="text-slate-500 text-sm mt-1">Prothèse totale du genou - ID: #BGA-09214</p>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 font-semibold text-sm rounded-full">Phase Logistique</span>
            </div>

            <div className="p-6 flex-1 overflow-x-auto">
              <div className="min-w-[650px] relative mt-4">
                {/* Line Background */}
                <div className="absolute top-4 left-6 right-6 h-[2px] bg-slate-100" />
                {/* Active Line */}
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `calc(${progressPercentage}% - 3rem)` }} transition={{ duration: 1 }}
                  className="absolute top-4 left-6 h-[2px] bg-blue-500"
                />

                <div className="relative flex justify-between z-10 px-2">
                  {journeySteps.map((step, idx) => (
                    <div key={step.id} className="flex flex-col items-center w-16 gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${step.status === 'completed' ? 'bg-blue-500 border-blue-500 text-white' :
                          step.status === 'in_progress' ? 'bg-white border-blue-500 text-blue-600 ring-4 ring-blue-50' :
                            'bg-white border-slate-200 text-slate-300'
                        }`}>
                        {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> :
                          step.status === 'in_progress' ? <div className="w-2 h-2 rounded-full bg-blue-600" /> :
                            <span className="font-semibold text-xs">{step.id}</span>
                        }
                      </div>
                      <div className="text-center mt-1">
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${step.status === 'in_progress' ? 'text-blue-600' : 'text-slate-400'}`}>{step.date}</div>
                        <div className={`text-xs leading-tight ${step.status === 'in_progress' ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>{step.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Alert */}
              <div className="mt-10 bg-blue-50 rounded-xl p-5 border border-blue-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold mb-1">Logistique : Réservation de vos billets</h3>
                  <p className="text-slate-600 text-sm mb-3">Vos billets (Vol Libreville → Tunis) sont en attente de votre passeport. Merci de le télécharger au plus vite.</p>
                  <Button size="sm" className="bg-white text-blue-600 hover:bg-white/80 border border-blue-200 shadow-sm">
                    Accéder au module logistique
                  </Button>
                </div>
              </div>
            </div>
          </CleanCard>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-3">
              {actions.map((act, i) => (
                <CleanCard key={i} className="p-4 flex flex-col items-center justify-center text-center cursor-pointer border-none bg-white hover:bg-slate-50 ring-1 ring-slate-100">
                  <div className={`w-12 h-12 rounded-full ${act.bg} flex items-center justify-center mb-3 relative`}>
                    <act.icon className={`w-5 h-5 ${act.color}`} />
                    {act.badge && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
                        {act.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{act.label}</span>
                </CleanCard>
              ))}
            </div>

            {/* Documents List */}
            <CleanCard className="flex-1">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Documents</h3>
                <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium">Tout voir</span>
              </div>
              <div className="p-2">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className={`w-10 h-10 rounded-lg ${doc.bg} flex items-center justify-center shrink-0`}>
                      <doc.icon className={`w-5 h-5 ${doc.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-900 truncate">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.type} • {doc.date}</p>
                    </div>
                    {doc.status === 'Requis' ? (
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    ) : (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CleanCard>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function PatientDashboardRouter() {
  const searchParams = useSearchParams()
  const view = searchParams.get('view') || 'dashboard'

  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stats>({ total: 0, en_attente: 0, en_cours: 0, termine: 0 })
  const [loading, setLoading] = useState(true)

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

  switch (view) {
    case 'new': return <MedicalCaseForm />
    case 'messages': return <DevelopmentPlaceholder icon={MessageSquare} title="Messagerie" description="Votre espace de communication sécurisé avec votre équipe médicale." />
    case 'rdv': return <DevelopmentPlaceholder icon={Calendar} title="Rendez-vous" description="Géolocalisez et planifiez vos prochaines consultations physiques ou en ligne." />
    case 'documents': return <DevelopmentPlaceholder icon={FileDigit} title="Documents" description="Centralisez, consultez et téléchargez tous vos rapports médicaux." />
    case 'finances': return <DevelopmentPlaceholder icon={CreditCard} title="Comptabilité" description="Suivez vos devis, paiements et téléchargez vos factures en toute transparence." />
    case 'voyage': return <DevelopmentPlaceholder icon={Plane} title="Voyage" description="Gérez la logistique de votre séjour : billets d'avion, hébergement, navettes." />
    case 'teleconsultation': return <DevelopmentPlaceholder icon={Video} title="Téléconsultation" description="Retrouvez ici le lien sécurisé pour vos appels en visio avec vos praticiens." />
    case 'historique': return <DevelopmentPlaceholder icon={ClipboardList} title="Historique" description="Accédez à la chronologie complète de vos interventions passées." />
    case 'dossiers': return <DevelopmentPlaceholder icon={FileText} title="Dossiers Médicaux" description="Liste exhaustive de vos demandes et dossiers de santé." />
    case 'assurances': return <DevelopmentPlaceholder icon={ShieldCheck} title="Assurances" description="Synchronisez vos assurances voyage et garantie de rapatriement sanitaire." />
    case 'prescriptions': return <DevelopmentPlaceholder icon={Pill} title="Ordonnances" description="Retrouvez électroniquement vos prescriptions de traitement post-opératoire." />
    case 'laboratoire': return <DevelopmentPlaceholder icon={Microscope} title="Résultats Labo" description="Vos bilans sanguins et analyses de laboratoire s'afficheront dans cet onglet." />

    case 'dashboard':
    default:
      return <DashboardContent user={user} stats={stats} />
  }
}
