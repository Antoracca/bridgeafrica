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
  Loader2, FileText, Calendar, Plane, CheckCircle2, Clock, AlertCircle,
  Download, Upload, MessageSquare, Video, CreditCard, ClipboardList,
  FileDigit, ArrowRight, Activity, TrendingUp, Users, DollarSign, Microscope, Pill, ShieldCheck, MapPin, Star, Users2, BrainCircuit
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

// Sparkline Component - Futuristic Neon
const Sparkline = ({ data, colorClass = "text-cyan-400" }: { data: number[], colorClass?: string }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = (max - min) || 1
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 80 - 10 // Padded
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="relative w-full h-12 overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_currentColor]" preserveAspectRatio="none">
        <motion.polyline
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={colorClass}
        />
      </svg>
      {/* Glow Effect */}
      <div className={`absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-current to-transparent opacity-10 ${colorClass}`} />
    </div>
  )
}

// Futuristic Development Placeholder
function DevelopmentPlaceholder({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 md:p-8 bg-slate-950"
    >
      <div className="max-w-2xl w-full relative">
        <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-14 text-center overflow-hidden shadow-2xl">
          <motion.div
            animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 w-64 h-64 border border-white/5 rounded-full border-dashed"
          />
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl rotate-6" />
            <div className="absolute inset-0 bg-blue-500/20 rounded-2xl -rotate-6" />
            <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg">
              <Icon className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </div>
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">{title}</h3>
          <p className="text-slate-400 text-lg leading-relaxed max-w-lg mx-auto mb-8">{description}</p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/20">
            <BrainCircuit className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="text-blue-300 font-semibold text-sm uppercase tracking-wider">Module en déploiement sur les serveurs</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Glassmorphism Card Wrapper
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={`bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl overflow-hidden hover:border-white/10 transition-colors ${className}`}
  >
    {children}
  </motion.div>
)

function DashboardContent({ user, stats }: { user: User, stats: Stats }) {
  const isMobile = useIsMobile()
  if (isMobile) return <MobileDashboard user={user} stats={stats} /> // Assuming mobile dashboard remains standard for now or can be updated separately

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || `${user?.user_metadata?.first_name || ''} ${user?.user_metadata?.last_name || ''}`.trim() || user?.email?.split('@')[0] || 'Utilisateur'

  const journeySteps = [
    { id: 1, date: "12 Jan", title: "Dossier Créé", status: "completed" },
    { id: 2, date: "14 Jan", title: "Audit d'Expert", status: "completed" },
    { id: 3, date: "18 Jan", title: "Matching Cliniques", status: "completed" },
    { id: 4, date: "25 Jan", title: "Téléconsultation VIP", status: "completed" },
    { id: 5, date: "29 Jan", title: "Sécurisation Financière", status: "completed" },
    { id: 6, date: "30 Jan", title: "Logistique Approuvée", status: "in_progress", desc: "Vol LO321 pour Istanbul" },
    { id: 7, date: "05 Fév", title: "Arrivée & Transfert", status: "upcoming" },
    { id: 8, date: "07 Fév", title: "Intervention", status: "upcoming" },
    { id: 9, date: "15 Fév", title: "Suivi Post-Op", status: "upcoming" },
  ]
  const currentStep = journeySteps.findIndex(step => step.status === 'in_progress') + 1
  const progressPercentage = ((currentStep - 1) / (journeySteps.length - 1)) * 100

  const documents = [
    { id: 1, name: "IRM Cervicale UHD", type: "DICOM", status: "Analysé", icon: FileText, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { id: 2, name: "Devis Hôpital Américain", type: "Contrat", status: "Validé", icon: FileDigit, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { id: 3, name: "Passeport Biométrique", type: "ID", status: "Requis", icon: AlertCircle, color: "text-rose-400", bg: "bg-rose-400/10" },
  ]

  const actions = [
    { label: "Canal Sécurisé", icon: MessageSquare, color: "from-blue-500 to-indigo-600", dot: true },
    { label: "Vidéo Live", icon: Video, color: "from-cyan-400 to-blue-500" },
    { label: "Paiements", icon: CreditCard, color: "from-emerald-400 to-teal-500" },
    { label: "Planning", icon: Calendar, color: "from-purple-500 to-violet-600" }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8 selection:bg-cyan-500/30 font-sans">
      {/* Animated Glowing Background grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.05),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, staggerChildren: 0.1 }}
        className="max-w-7xl mx-auto space-y-8 relative z-10"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-2"
            >
              Cockpit, <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{displayName}</span>
            </motion.h1>
            <p className="text-slate-400 text-lg font-medium flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Système synchronisé. Toutes vos données sont chiffrées.
            </p>
          </div>
          <Button className="h-12 px-8 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all hover:scale-105">
            <Upload className="w-5 h-5 mr-2" /> Nouveau Document
          </Button>
        </div>

        {/* HUD Data Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Dossiers Actifs</span>
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-4xl font-black text-white mb-4">{stats.total}</div>
            <Sparkline data={[2, 4, 3, 5, 4, 6, 7]} colorClass="text-blue-500" />
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Phase Ouverte</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-4xl font-black text-white mb-4">{stats.en_attente}</div>
            <Sparkline data={[5, 4, 3, 3, 2, 1, 1]} colorClass="text-amber-500" />
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">En Traitement</span>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-4xl font-black text-white mb-4">{stats.en_cours}</div>
            <Sparkline data={[1, 2, 3, 5, 6, 8, 9]} colorClass="text-purple-500" />
          </GlassCard>

          <GlassCard className="p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Objectif</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-4xl font-black text-white mb-4">{progressPercentage.toFixed(0)}<span className="text-2xl text-emerald-400">%</span></div>
              <Progress value={progressPercentage} className="h-2 bg-slate-800 [&>div]:bg-emerald-400" />
            </div>
          </GlassCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Timeline - Cockpit View */}
          <GlassCard className="lg:col-span-2 p-0 flex flex-col">
            <div className="p-8 border-b border-white/5 bg-gradient-to-r from-slate-900/80 to-slate-900/20">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="w-2 h-8 rounded-full bg-cyan-400 inline-block" /> Navigation du Parcours
              </h2>
              <p className="text-slate-400 mt-2 ml-5">Prothèse totale du genou - ID: #BGA-09214</p>
            </div>

            <div className="p-8 flex-1 overflow-x-auto">
              <div className="min-w-[700px] relative mt-10">
                {/* Horizontal Progress Bar Background */}
                <div className="absolute top-5 left-0 w-full h-1 bg-slate-800 rounded-full" />
                {/* Active Progress Bar */}
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 1.5, delay: 0.5 }}
                  className="absolute top-5 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                />

                <div className="relative flex justify-between z-10">
                  {journeySteps.map((step, idx) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                      className="flex flex-col items-center w-24 gap-3 group"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${step.status === 'completed' ? 'bg-slate-800 text-slate-300' :
                        step.status === 'in_progress' ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-125' :
                          'bg-slate-900/80 border border-slate-700 text-slate-600'
                        }`}>
                        {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                          step.status === 'in_progress' ? <Plane className="w-5 h-5 animate-pulse" /> :
                            <span className="font-bold text-xs">{step.id}</span>
                        }
                      </div>
                      <div className="text-center">
                        <div className={`text-xs font-bold mb-1 ${step.status === 'in_progress' ? 'text-cyan-400' : 'text-slate-400'}`}>{step.date}</div>
                        <div className={`text-xs leading-tight ${step.status === 'in_progress' ? 'text-white font-semibold' : 'text-slate-500'}`}>{step.title}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Focus on Current Step */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
                className="mt-12 bg-gradient-to-r from-blue-900/30 to-slate-900 rounded-2xl p-6 border border-blue-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shadow-inner shrink-0 text-cyan-400">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Action Requise : Logistique Vol</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">Vos billets électroniques (Vol LO321) sont en cours d'émission. Assurez-vous d'avoir téléchargé la copie de votre passeport dans le coffre-fort documentaire.</p>
                    <Button size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full">Accéder au dossier logistique</Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </GlassCard>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
              {actions.map((act, i) => (
                <GlassCard key={i} className="p-4 flex flex-col items-center justify-center text-center cursor-pointer group">
                  <div className="relative mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${act.color} p-[1px] shadow-lg group-hover:scale-110 transition-transform`}>
                      <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center">
                        <act.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    {act.dot && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 animate-pulse ring-2 ring-slate-950" />}
                  </div>
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white">{act.label}</span>
                </GlassCard>
              ))}
            </div>

            {/* Documents Vault */}
            <GlassCard className="flex-1 flex flex-col">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-bold text-white flex items-center gap-2"><FileDigit className="w-5 h-5 text-emerald-400" /> Coffre Documentaire</h3>
                <ArrowRight className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white" />
              </div>
              <div className="p-4 space-y-3">
                {documents.map(doc => (
                  <div key={doc.id} className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className={`w-10 h-10 rounded-lg ${doc.bg} flex items-center justify-center shrink-0`}>
                      <doc.icon className={`w-5 h-5 ${doc.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-200 truncate group-hover:text-white">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.type}</p>
                    </div>
                    <div className={`text-xs font-bold px-2 py-1 rounded-md bg-slate-800 ${doc.color}`}>
                      {doc.status}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 mt-auto">
                <Button variant="outline" className="w-full border-dashed border-slate-700 bg-transparent text-slate-400 hover:text-white hover:bg-white/5">
                  <Upload className="w-4 h-4 mr-2" /> Déposer un fichier
                </Button>
              </div>
            </GlassCard>
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

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-slate-950"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>
  if (!user) return <div className="flex items-center justify-center min-h-screen bg-slate-950"><p className="text-slate-400">Erreur de chargement de l'OS Médical</p></div>

  switch (view) {
    case 'new': return <MedicalCaseForm />
    case 'messages': return <DevelopmentPlaceholder icon={MessageSquare} title="Canal de Communication" description="Protocole de chiffrement bout-en-bout en cours d'initialisation. Ce canal sécurisé vous permettra d'échanger avec votre équipe médicale." />
    case 'rdv': return <DevelopmentPlaceholder icon={Calendar} title="Synchronisation Calendrier" description="Connexion aux systèmes de planification des cliniques partenaires en cours. Vos créneaux de consultation apparaîtront ici." />
    case 'documents': return <DevelopmentPlaceholder icon={FileDigit} title="Coffre-Fort DICOM" description="Interface de visualisation des imageries médicales 3D et des documents contractuels en cours de déploiement sécurisé." />
    case 'finances': return <DevelopmentPlaceholder icon={CreditCard} title="Terminal de Paiement" description="Connexion aux passerelles de paiement internationales (Stripe, SWIFT) pour sécuriser vos transactions médicales." />
    case 'voyage': return <DevelopmentPlaceholder icon={Plane} title="Module Logistique" description="API de synchronisation avec nos partenaires aériens et hôteliers en cours de routage." />
    case 'teleconsultation': return <DevelopmentPlaceholder icon={Video} title="Serveur Vidéo HD" description="Mise en place des serveurs WebRTC sécurisés (HIPAA/RGPD) pour vos futures consultations chirurgicales à distance." />
    case 'historique': return <DevelopmentPlaceholder icon={ClipboardList} title="Archive Neurologique" description="Compilation de vos données longitudinales de santé. L'historique complet sera généré dans ce module." />
    case 'dossiers': return <DevelopmentPlaceholder icon={FileText} title="Index des Dossiers" description="Structuration des arbres de décisions médicales passées." />
    case 'assurances': return <DevelopmentPlaceholder icon={ShieldCheck} title="Routage Assurances" description="Interface d'interopérabilité avec les compagnies d'assurances internationales." />
    case 'prescriptions': return <DevelopmentPlaceholder icon={Pill} title="Ordonnancier Sécurisé" description="Génération électronique des prescriptions avec validation cryptographique des médecins." />
    case 'laboratoire': return <DevelopmentPlaceholder icon={Microscope} title="Analyses Biologiques" description="Synchronisation directe avec les systèmes LIMS des laboratoires pour l'affichage de vos résultats HL7." />

    case 'dashboard':
    default:
      return <DashboardContent user={user} stats={stats} />
  }
}
