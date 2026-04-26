"use client"

import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    FileText, Calendar, Plane, CheckCircle2, Clock, AlertCircle,
    Download, Upload, MessageSquare, Video, CreditCard, Activity,
    TrendingUp, FileDigit
} from "lucide-react"

// Types
interface Stats {
    total: number; en_attente: number; en_cours: number; termine: number
}

// Removed Sparkline Component

// Clean Card Wrapper (Transparent, simple)
const CleanCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        whileHover={{ y: -2 }} transition={{ duration: 0.2 }}
        className={`bg-transparent ${className}`}
    >
        {children}
    </motion.div>
)

export function DashboardOverview({ displayName, stats }: { displayName: string, stats: Stats }) {
    const journeySteps = [
        { id: 1, date: "12 Jan", title: "Dossier Créé", status: "completed" },
        { id: 2, date: "14 Jan", title: "Audit Expert", status: "completed" },
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
        { id: 1, name: "IRM Cervicale UHD", type: "Image médicale", date: "12 Jan", status: "Analysé", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
        { id: 2, name: "Devis Hôpital Américain", type: "Administration", date: "18 Jan", status: "Validé", icon: FileDigit, color: "text-emerald-600", bg: "bg-emerald-50" },
        { id: 3, name: "Passeport Biométrique", type: "Identité", date: "27 Jan", status: "Requis", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
    ]

    const actions = [
        { label: "Messages", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50", badge: "2" },
        { label: "Rendez-vous", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Paiements", icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Voyage", icon: Plane, color: "text-cyan-600", bg: "bg-cyan-50" }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="max-w-7xl mx-auto space-y-6"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">
                        Bonjour, {displayName}
                    </h1>
                    <p className="text-slate-500 font-medium tracking-wide">
                        Tableau de bord patient • <span className="text-brand-teal font-semibold">Parcours Premium</span>
                    </p>
                </div>
                <Button className="bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full px-6 shadow-md transition-all">
                    <Upload className="w-4 h-4 mr-2" /> Nouveau Document
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 border-b border-slate-200/60 pb-8">
                <CleanCard className="flex flex-col border-l-2 border-brand-teal/40 pl-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-500 font-medium text-sm">Dossiers Actifs</span>
                        <Activity className="w-4 h-4 text-brand-teal" />
                    </div>
                    <div className="text-4xl font-bold text-slate-900 tracking-tight">{stats.total}</div>
                </CleanCard>

                <CleanCard className="flex flex-col border-l-2 border-slate-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-500 font-medium text-sm">Actions Requises</span>
                        <Clock className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="text-4xl font-bold text-slate-900 tracking-tight">{stats.en_attente}</div>
                </CleanCard>

                <CleanCard className="flex flex-col border-l-2 border-slate-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-500 font-medium text-sm">En Cours</span>
                        <TrendingUp className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="text-4xl font-bold text-slate-900 tracking-tight">{stats.en_cours}</div>
                </CleanCard>

                <CleanCard className="flex flex-col border-l-2 border-brand-teal pl-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-700 font-bold text-sm">Progression Globale</span>
                        <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                        <div className="text-4xl font-bold text-slate-900 tracking-tight">{progressPercentage.toFixed(0)}%</div>
                    </div>
                    <Progress value={progressPercentage} className="h-1.5 bg-slate-200 [&>div]:bg-brand-teal" />
                </CleanCard>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* RESTORED PREMIUM TIMELINE (Light Mode Adapted) */}
                <CleanCard className="lg:col-span-2 flex flex-col p-0">
                    <div className="p-8 pb-4 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="text-2xl font-extrabold flex items-center gap-3 text-slate-900">
                            <span className="w-1.5 h-6 rounded-full bg-brand-teal inline-block" /> Parcours Actuel
                        </h2>
                        <p className="text-slate-500 mt-2 ml-5 font-medium">Prothèse totale du genou - ID: <span className="text-brand-teal font-bold">#BGA-09214</span></p>
                    </div>

                    <div className="p-8 flex-1 overflow-x-auto">
                        <div className="min-w-[750px] relative mt-8 mb-12">
                            {/* Horizontal Progress Bar Background */}
                            <div className="absolute top-5 left-0 w-full h-1.5 bg-slate-100 rounded-full" />
                            {/* Active Progress Bar - Premium Glow */}
                            <motion.div
                                initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 1.5, delay: 0.2 }}
                                className="absolute top-5 left-0 h-1.5 bg-brand-teal rounded-full"
                            />

                            <div className="relative flex justify-between z-10">
                                {journeySteps.map((step, idx) => (
                                    <motion.div
                                        key={step.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                                        className="flex flex-col items-center w-24 gap-3 relative group"
                                    >
                                        <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${step.status === 'completed' ? 'bg-brand-teal text-white shadow-sm' :
                                                step.status === 'in_progress' ? 'bg-white text-brand-teal ring-2 ring-brand-teal shadow-md scale-110 z-20' :
                                                    'bg-white border-2 border-slate-200 text-slate-400'
                                            }`}>
                                            {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-brand-teal" /> :
                                                step.status === 'in_progress' ? <Plane className="w-5 h-5" /> :
                                                    <span className="font-bold text-sm">{step.id}</span>
                                            }
                                        </div>
                                        <div className="text-center pt-2">
                                            <div className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${step.status === 'in_progress' ? 'text-brand-teal' : 'text-slate-400'}`}>{step.date}</div>
                                            <div className={`text-[13px] leading-tight ${step.status === 'in_progress' ? 'text-slate-900 font-extrabold' : 'text-slate-600 font-medium'}`}>{step.title}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Focus on Current Step - Light Mode Premium */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
                            className="mt-6 bg-slate-50 rounded-2xl p-6 border border-slate-200"
                        >
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 text-brand-teal border border-slate-100">
                                    <Plane className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-extrabold text-lg mb-2">Action Requise : Logistique Vol</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">Vos billets électroniques (Vol LO321) sont en cours d'émission. Assurez-vous d'avoir téléchargé la copie de votre passeport dans le coffre-fort documentaire afin d'éviter tout retard.</p>
                                    <Button className="bg-brand-teal hover:bg-brand-teal-dark text-white font-bold rounded-full px-6 shadow-sm transition-all">
                                        Accéder au dossier voyage
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </CleanCard>

                {/* Right Column */}
                <div className="space-y-6 flex flex-col">
                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {actions.map((act, i) => (
                            <CleanCard key={i} className="p-4 flex flex-col items-center justify-center text-center cursor-pointer border-none bg-white hover:bg-slate-50 ring-1 ring-slate-100 transition-all hover:-translate-y-1">
                                <div className={`w-14 h-14 rounded-2xl ${act.bg} flex items-center justify-center mb-3 relative shadow-inner`}>
                                    <act.icon className={`w-6 h-6 ${act.color}`} />
                                    {act.badge && (
                                        <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white shadow-sm ring-2 ring-white">
                                            {act.badge}
                                        </span>
                                    )}
                                </div>
                                <span className="text-sm font-bold text-slate-700">{act.label}</span>
                            </CleanCard>
                        ))}
                    </div>

                    {/* Documents List */}
                    <CleanCard className="flex-1 flex flex-col">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
                                <FileDigit className="w-5 h-5 text-blue-600" /> Documents Récents
                            </h3>
                            <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-bold">Tout voir</span>
                        </div>
                        <div className="p-3 space-y-2 flex-1">
                            {documents.map(doc => (
                                <div key={doc.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100">
                                    <div className={`w-12 h-12 rounded-xl ${doc.bg} flex items-center justify-center shrink-0`}>
                                        <doc.icon className={`w-6 h-6 ${doc.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm text-slate-900 truncate group-hover:text-blue-600 transition-colors">{doc.name}</p>
                                        <p className="text-xs text-slate-500 font-medium">{doc.type}</p>
                                    </div>
                                    {doc.status === 'Requis' ? (
                                        <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                                    ) : (
                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 group-hover:text-blue-600 bg-white shadow-sm border border-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                            <Button variant="outline" className="w-full border-dashed border-slate-300 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-300 font-semibold">
                                <Upload className="w-4 h-4 mr-2" /> Déposer un fichier
                            </Button>
                        </div>
                    </CleanCard>
                </div>
            </div>
        </motion.div>
    )
}
