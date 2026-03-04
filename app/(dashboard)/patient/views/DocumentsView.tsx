"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
    FileText, Search, Upload, Filter, Download, MoreVertical,
    FolderLock, Image as ImageIcon, FileDigit, BrainCircuit, Activity, Lock
} from "lucide-react"

export function DocumentsView() {
    const [activeTab, setActiveTab] = useState('all')

    const stats = [
        { label: "Espace Sécurisé", value: "3.2 GB", total: "15 GB", icon: FolderLock, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Analyses IA", value: "4", total: "Terminées", icon: BrainCircuit, color: "text-purple-500", bg: "bg-purple-50" },
        { label: "Fichiers Chiffrés", value: "100%", total: "AES-256", icon: Lock, color: "text-emerald-500", bg: "bg-emerald-50" }
    ]

    const documents = [
        { id: 1, name: "IRM_Cervicale_UHD_Full_Scan.dcm", type: "DICOM / Imagerie", category: "imagerie", size: "1.2 GB", date: "12 Jan 2025", status: "Analysé", icon: ImageIcon, color: "text-blue-600" },
        { id: 2, name: "Bilan_Sanguin_Complet.pdf", type: "Résultat Biologie", category: "labo", size: "2.4 MB", date: "10 Jan 2025", status: "Vérifié", icon: Activity, color: "text-purple-600" },
        { id: 3, name: "Devis_Chirurgie_Clinique_El_Manar.pdf", type: "Contrat / Finance", category: "admin", size: "1.1 MB", date: "18 Jan 2025", status: "Validé", icon: FileDigit, color: "text-emerald-600" },
        { id: 4, name: "Lettre_Recommandation_Medecin_Traitant.pdf", type: "Correspondance", category: "clinique", size: "450 KB", date: "08 Jan 2025", status: "Lu", icon: FileText, color: "text-slate-600" },
        { id: 5, name: "Passeport_Scanner_Couleur.png", type: "Identité", category: "admin", size: "4.8 MB", date: "27 Jan 2025", status: "Requis", icon: FileText, color: "text-amber-600" },
    ]

    const filteredDocs = activeTab === 'all' ? documents : documents.filter(d => d.category === activeTab)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-6 lg:space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1 flex items-center gap-3">
                        Coffre-Fort Médical <Lock className="w-5 h-5 text-emerald-500" />
                    </h1>
                    <p className="text-slate-500 font-medium tracking-wide">
                        Vos données de santé sont chiffrées de bout-en-bout (HDS) et strictement confidentielles.
                    </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" className="border-slate-200 text-slate-700 bg-white shadow-sm flex-1 md:flex-none">
                        <Download className="w-4 h-4 mr-2" /> Tout exporter
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md flex-1 md:flex-none">
                        <Upload className="w-4 h-4 mr-2" /> Déposer un fichier
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div className="flex-1">
                            <p className="text-slate-500 text-sm font-semibold">{stat.label}</p>
                            <div className="flex items-end gap-2">
                                <span className="text-xl font-bold text-slate-900">{stat.value}</span>
                                <span className="text-xs text-slate-400 mb-0.5">/ {stat.total}</span>
                            </div>
                        </div>
                        {i === 0 && <Progress value={20} className="w-16 h-1.5 [&>div]:bg-blue-500 absolute right-6 top-6" />}
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">

                {/* Left Sidebar - Filters */}
                <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50 p-6 shrink-0">
                    <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Catégories</h3>
                    <div className="space-y-1">
                        <button onClick={() => setActiveTab('all')} className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${activeTab === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>Tous les fichiers</button>
                        <button onClick={() => setActiveTab('imagerie')} className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${activeTab === 'imagerie' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>Imagerie (DICOM)</button>
                        <button onClick={() => setActiveTab('labo')} className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${activeTab === 'labo' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>Biologie & Analyses</button>
                        <button onClick={() => setActiveTab('clinique')} className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${activeTab === 'clinique' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>Dossier Clinique</button>
                        <button onClick={() => setActiveTab('admin')} className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${activeTab === 'admin' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>Administratif</button>
                    </div>
                </div>

                {/* File List */}
                <div className="flex-1 p-6 flex flex-col">
                    {/* Toolbar */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input className="pl-9 bg-slate-50 border-slate-200 focus:border-blue-400 focus:bg-white rounded-xl shadow-inner h-10" placeholder="Rechercher un document..." />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 text-slate-600 rounded-xl bg-white border-slate-200"><Filter className="w-4 h-4" /></Button>
                    </div>

                    {/* List Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl mb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <div className="col-span-6 md:col-span-5">Nom du fichier</div>
                        <div className="col-span-3 hidden md:block">Type</div>
                        <div className="col-span-3 md:col-span-2 text-center md:text-left">Date</div>
                        <div className="col-span-3 md:col-span-2 text-right">Statut</div>
                    </div>

                    {/* Files Grid */}
                    <div className="space-y-2 overflow-y-auto flex-1 pb-4">
                        <AnimatePresence>
                            {filteredDocs.map((doc, idx) => (
                                <motion.div
                                    key={doc.id}
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }}
                                    className={`grid grid-cols-12 gap-4 px-4 py-3 items-center bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer ${doc.status === 'Requis' ? 'hover:border-amber-200 bg-amber-50/10' : 'hover:border-blue-100 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="col-span-6 md:col-span-5 flex items-center gap-3 min-w-0">
                                        <div className={`w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-white`}>
                                            <doc.icon className={`w-5 h-5 ${doc.color}`} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className={`font-bold text-sm truncate ${doc.status === 'Requis' ? 'text-amber-900' : 'text-slate-900'}`}>{doc.name}</p>
                                            <p className="text-xs text-slate-500 font-medium">{doc.size}</p>
                                        </div>
                                    </div>

                                    <div className="col-span-3 hidden md:block">
                                        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{doc.type}</span>
                                    </div>

                                    <div className="col-span-3 md:col-span-2 text-slate-500 text-xs font-semibold text-center md:text-left">
                                        {doc.date}
                                    </div>

                                    <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-3">
                                        {doc.status === 'Requis' ? (
                                            <span className="shrink-0 bg-amber-100 text-amber-700 text-[10px] font-black uppercase px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                                                Requis
                                            </span>
                                        ) : (
                                            <span className="shrink-0 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold uppercase px-2 py-1 rounded-md hidden sm:block">
                                                {doc.status}
                                            </span>
                                        )}
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm border border-slate-100 rounded-full hover:text-blue-600">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
