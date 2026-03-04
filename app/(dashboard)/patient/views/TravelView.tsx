"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Plane, MapPin, Building2, Car, Clock, Calendar, ArrowRight,
    ShieldCheck, ArrowDownToLine, PhoneCall, ExternalLink, Ticket
} from "lucide-react"

export function TravelView() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto space-y-6 lg:space-y-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1 flex items-center gap-3">
                        Conciergerie & Voyage <Plane className="w-5 h-5 text-blue-500" />
                    </h1>
                    <p className="text-slate-500 font-medium">Logistique de votre séjour médical prise en charge de A à Z.</p>
                </div>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 shadow-md transition-all">
                    <PhoneCall className="w-4 h-4 mr-2" /> Contacter l'assistance 24/7
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Main Itinerary - Left Column */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Flight Ticket */}
                    <div className="bg-white border text-slate-800 border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        {/* Accent Bar */}
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />

                        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            {/* Origin */}
                            <div className="flex-1 text-center md:text-left">
                                <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-1">Départ</p>
                                <p className="text-3xl font-black text-slate-900 mb-1">LBV</p>
                                <p className="font-semibold">Libreville</p>
                                <p className="text-sm text-slate-500 mt-2 flex items-center justify-center md:justify-start gap-1">
                                    <Calendar className="w-4 h-4" /> 04 Fév 2025
                                </p>
                                <p className="text-sm text-slate-500 font-bold">14:30 (Heure locale)</p>
                            </div>

                            {/* Divider / Airplane */}
                            <div className="flex-1 flex flex-col items-center justify-center relative px-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-3 relative z-10">Vol Direct • 5h15</p>
                                <div className="w-full h-px bg-slate-200 absolute top-1/2 -translate-y-1/2" />
                                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-blue-600">
                                    <Plane className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Destination */}
                            <div className="flex-1 text-center md:text-right">
                                <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-1">Arrivée</p>
                                <p className="text-3xl font-black text-slate-900 mb-1">TUN</p>
                                <p className="font-semibold">Tunis Carthage</p>
                                <p className="text-sm text-slate-500 mt-2 flex items-center justify-center md:justify-end gap-1">
                                    <Calendar className="w-4 h-4" /> 04 Fév 2025
                                </p>
                                <p className="text-sm text-slate-500 font-bold">19:45 (Heure locale)</p>
                            </div>
                        </div>

                        {/* Bottom Ticket Details */}
                        <div className="bg-slate-50 border-t border-slate-100 px-6 md:px-8 py-4 flex flex-wrap justify-between items-center gap-4 border-dashed">
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Compagnie</p>
                                    <p className="text-sm font-bold text-slate-900">Tunisair</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Vol</p>
                                    <p className="text-sm font-bold text-slate-900">TU 321</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Classe</p>
                                    <p className="text-sm font-bold text-slate-900">Économique</p>
                                </div>
                            </div>
                            <Button size="sm" className="bg-white border border-slate-200 text-blue-600 hover:bg-slate-50 hover:border-blue-200 font-bold rounded-full shadow-sm">
                                <Ticket className="w-4 h-4 mr-2" /> E-Billet
                            </Button>
                        </div>
                    </div>

                    {/* Hotel Booking */}
                    <div className="bg-white border text-slate-800 border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 bg-slate-100 aspect-video md:aspect-auto relative">
                            {/* Decorative Mockup */}
                            <div className="absolute inset-0 bg-blue-900 flex items-center justify-center p-6 text-center">
                                <div className="w-full h-full border border-blue-400/30 rounded-xl bg-blue-800/20 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                                    <Building2 className="w-10 h-10 text-blue-300" />
                                    <span className="text-blue-100 font-bold text-sm uppercase tracking-widest opacity-80">Mockup Hôtel</span>
                                </div>
                            </div>
                            <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                                Confirmé
                            </div>
                        </div>

                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">Mövenpick Hotel du Lac Tunis</h3>
                                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-md text-xs font-bold">
                                        5 <span className="opacity-70 text-[10px]">Etoiles</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 flex items-center gap-1.5 text-sm mb-4">
                                    <MapPin className="w-4 h-4" /> Rue du Lac Huron, Les Berges du Lac, 1053 Tunis
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Check-in</p>
                                        <p className="font-semibold text-slate-900 text-sm">04 Fév 2025</p>
                                        <p className="text-xs text-slate-500">À partir de 14:00</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Check-out</p>
                                        <p className="font-semibold text-slate-900 text-sm">18 Fév 2025</p>
                                        <p className="text-xs text-slate-500">Jusqu'à 12:00</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <p className="font-bold text-slate-900 text-sm">14 Nuits • Chambre Classique (PMR)</p>
                                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold text-sm h-9">
                                    Détails <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column - Transfers & Assurance */}
                <div className="space-y-6">

                    {/* VIP Transfer */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 shadow-lg text-white">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 backdrop-blur-sm border border-white/5">
                            <Car className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Transfert VIP Inclus</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Un chauffeur privé vous attendra à votre arrivée avec une pancarte nominative pour vous conduire à l'hôtel ou à la clinique.
                        </p>

                        <div className="bg-slate-950/50 rounded-xl p-4 border border-white/10 mb-6">
                            <div className="flex items-start gap-3 mb-3">
                                <MapPin className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Prise en charge</p>
                                    <p className="text-sm font-medium">Aéroport Tunis Carthage (Terminal 1)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Building2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Destination</p>
                                    <p className="text-sm font-medium">Clinique El Manar</p>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-sm">
                            Voir le contact du chauffeur
                        </Button>
                    </div>

                    {/* Visa & Admin Status */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-5">Statut Administratif</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-slate-900">Visa Médical</p>
                                    <p className="text-xs text-slate-500">Délivré le 28 Jan 2025</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-slate-100 rounded-full">
                                    <ArrowDownToLine className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="w-full h-px bg-slate-100" />

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-slate-900">Assurance Rapatriement</p>
                                    <p className="text-xs text-slate-500">Europ Assistance - Validé</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-slate-100 rounded-full">
                                    <ArrowDownToLine className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}
