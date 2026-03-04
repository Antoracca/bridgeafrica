"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    CreditCard, Download, ExternalLink, ArrowUpRight,
    ArrowDownRight, Wallet, Receipt, FileText, CheckCircle2
} from "lucide-react"

export function FinancesView() {
    const stats = [
        { label: "Reste à payer", value: "3 450 €", icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Total payé", value: "1 500 €", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Devis Initial", value: "4 950 €", icon: Receipt, color: "text-blue-600", bg: "bg-blue-50" }
    ]

    const transactions = [
        { id: 1, type: "Facture d'acompte", amount: "1 500 €", date: "15 Janvier 2025", status: "Payé", ref: "FAC-25-01-092", icon: ArrowDownRight, color: "text-emerald-500", bg: "bg-emerald-50" },
        { id: 2, type: "Frais de dossier et coordination", amount: "350 €", date: "En attente", status: "À régler", ref: "FAC-25-01-104", icon: ArrowUpRight, color: "text-amber-500", bg: "bg-amber-50" },
        { id: 3, type: "Intervention Chirurgicale (Solde)", amount: "3 100 €", date: "À venir", status: "Planifié", ref: "DEV-BA-24-991", icon: Receipt, color: "text-blue-500", bg: "bg-blue-50" }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto space-y-6 lg:space-y-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">Finances & Comptabilité</h1>
                    <p className="text-slate-500 font-medium">Gérez vos paiements, factures et téléchargez vos justificatifs.</p>
                </div>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 shadow-md transition-all">
                    <CreditCard className="w-4 h-4 mr-2" /> Effectuer un paiement
                </Button>
            </div>

            {/* Main KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white border md:border-transparent border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-slate-500 font-bold uppercase tracking-wider text-[11px] mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                            </div>
                        </div>

                        {/* Background Accent */}
                        <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full ${stat.bg} opacity-50 blur-2xl group-hover:scale-150 transition-transform duration-700`} />
                    </div>
                ))}
            </div>

            {/* Payment Progress */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Progression du financement</h3>
                        <p className="text-slate-500 text-sm">Prothèse totale du genou - ID: #BGA-09214</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-black text-blue-600">30%</span>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Réglé</p>
                    </div>
                </div>
                <Progress value={30} className="h-3 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-cyan-400" />
            </div>

            {/* Transactions Table */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                        Historique des transactions
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                                <th className="p-4 pl-6 font-medium">Description</th>
                                <th className="p-4 font-medium">Référence</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Montant</th>
                                <th className="p-4 font-medium">Statut</th>
                                <th className="p-4 pr-6 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {transactions.map(tx => (
                                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full ${tx.bg} flex items-center justify-center shrink-0`}>
                                                <tx.icon className={`w-4 h-4 ${tx.color}`} />
                                            </div>
                                            <span className="font-bold text-slate-900">{tx.type}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-500 font-mono text-xs">{tx.ref}</td>
                                    <td className="p-4 text-slate-600 font-medium">{tx.date}</td>
                                    <td className="p-4 font-bold text-slate-900">{tx.amount}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${tx.status === 'Payé' ? 'bg-emerald-100 text-emerald-700' :
                                                tx.status === 'À régler' ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200' :
                                                    'bg-slate-100 text-slate-500'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        {tx.status === 'À régler' ? (
                                            <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm h-8 font-bold">
                                                Payer
                                            </Button>
                                        ) : (
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 shadow-sm rounded-full opacity-0 group-hover:opacity-100 transition-all">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    )
}
