"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Plane, MapPin, Building2, Car, Clock, Calendar, ArrowRight,
    ShieldCheck, ArrowDownToLine, PhoneCall, ExternalLink, Ticket, X, Map, BedDouble, Wifi, Coffee
} from "lucide-react"

export function TravelView() {
    const [showHotelDetails, setShowHotelDetails] = useState(false)
    const [showDriverDetails, setShowDriverDetails] = useState(false)
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

                    {/* Flight Ticket — Royal Air Maroc */}
                    <div className="border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        {/* Background: RAM fleet photo */}
                        <div className="absolute inset-0">
                            <img
                                src="/images/royal_air_maroc.png"
                                alt="Royal Air Maroc fleet"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/70" />
                        </div>

                        {/* RAM branding badge */}
                        <div className="relative z-10 px-6 md:px-8 pt-6 pb-3 flex items-center gap-3">
                            <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm flex items-center gap-2">
                                <span className="text-red-600 font-black text-xs tracking-widest uppercase">Royal Air Maroc</span>
                            </div>
                            <span className="text-white/40 text-xs font-medium tracking-widest">AT 504</span>
                        </div>

                        <div className="relative z-10 px-6 md:px-8 pb-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Origin */}
                            <div className="w-full md:flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                                <p className="text-xs font-bold text-white/40 tracking-widest uppercase mb-1">Départ</p>
                                <p className="text-4xl sm:text-5xl font-black text-white mb-1 tracking-tight">FIH</p>
                                <p className="font-semibold text-white/70">Kinshasa</p>
                                <p className="text-sm text-white/50 mt-2 flex items-center justify-center gap-1">
                                    <Calendar className="w-4 h-4" /> 10 Avr 2026
                                </p>
                                <p className="text-sm text-white/70 font-bold">14:30</p>
                            </div>

                            {/* Divider / Airplane */}
                            <div className="w-full md:flex-1 flex flex-col items-center gap-2">
                                {/* Plane icon ABOVE the line */}
                                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-sm backdrop-blur-sm">
                                    <Plane className="w-5 h-5 rotate-90 md:rotate-0" />
                                </div>
                                {/* Dashed line */}
                                <div className="w-full flex items-center gap-1">
                                    <div className="flex-1 h-px border-t border-dashed border-white/25" />
                                </div>
                                {/* Label BELOW the line */}
                                <p className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-widest">Vol Direct • 5h15</p>
                            </div>

                            {/* Destination */}
                            <div className="w-full md:flex-1 text-center md:text-right flex flex-col items-center md:items-end">
                                <p className="text-xs font-bold text-white/40 tracking-widest uppercase mb-1">Arrivée</p>
                                <p className="text-4xl sm:text-5xl font-black text-white mb-1 tracking-tight">CMN</p>
                                <p className="font-semibold text-white/70">Casablanca</p>
                                <p className="text-sm text-white/50 mt-2 flex items-center justify-center gap-1">
                                    <Calendar className="w-4 h-4" /> 10 Avr 2026
                                </p>
                                <p className="text-sm text-white/70 font-bold">19:45</p>
                            </div>
                        </div>

                        {/* Bottom Ticket Details */}
                        <div className="relative z-10 border-t border-white/10 px-6 md:px-8 py-4 flex flex-wrap justify-between items-center gap-4">
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-0.5">Compagnie</p>
                                    <p className="text-sm font-bold text-white">Royal Air Maroc</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-0.5">Vol</p>
                                    <p className="text-sm font-bold text-white">AT 504</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-0.5">Classe</p>
                                    <p className="text-sm font-bold text-white">Économique</p>
                                </div>
                            </div>
                            <Button size="sm" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full shadow-sm backdrop-blur-sm">
                                <Ticket className="w-4 h-4 mr-2" /> E-Billet
                            </Button>
                        </div>
                    </div>

                    {/* Hotel Booking */}
                    <div className="bg-white border text-slate-800 border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-2/5 aspect-[4/3] md:aspect-auto relative overflow-hidden bg-slate-100">
                            {/* Ibis Hotel Casablanca — photo fiable via Wikimedia */}
                            <img
                                src="/images/ibis_casablanca.png"
                                alt="ibis Casablanca City Center"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                                <ShieldCheck className="w-3 h-3" /> Confirmé
                            </div>
                        </div>

                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">ibis Casablanca City Center</h3>
                                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-md text-xs font-bold border border-amber-100/50">
                                        3 <span className="opacity-70 text-[10px]">Etoiles</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 flex items-center gap-1.5 text-sm mb-6">
                                    <MapPin className="w-4 h-4 text-brand-teal" /> Angle Rue Zaid Ouhmad & Rue Sidi Belyout, Casablanca
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Check-in</p>
                                        <p className="font-bold text-slate-900 text-sm">10 Avr 2026</p>
                                        <p className="text-xs text-slate-500 font-medium mt-0.5">À partir de 14:00</p>
                                    </div>
                                    <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Check-out</p>
                                        <p className="font-bold text-slate-900 text-sm">24 Avr 2026</p>
                                        <p className="text-xs text-slate-500 font-medium mt-0.5">Jusqu'à 12:00</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 border-t border-slate-100 gap-4">
                                <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                    <BedDouble className="w-4 h-4 text-slate-400" /> 14 Nuits • Chambre Standard
                                </p>
                                <Button onClick={() => setShowHotelDetails(true)} variant="ghost" className="text-brand-teal hover:text-brand-teal-dark hover:bg-brand-teal/5 font-bold text-sm h-9 px-4 rounded-full border border-brand-teal/20 w-full sm:w-auto">
                                    Détails <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column - Transfers & Assurance */}
                <div className="space-y-6">

                    {/* VIP Transfer */}
                    <div className="bg-slate-900 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Car className="w-32 h-32 transform translate-x-4 -translate-y-4" />
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-brand-teal/20 flex items-center justify-center mb-5 backdrop-blur-sm border border-brand-teal/30">
                            <Car className="w-6 h-6 text-brand-teal" />
                        </div>
                        <h3 className="font-black text-xl mb-2 tracking-tight">Transfert VIP Inclus</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Un chauffeur privé vous attendra à votre arrivée avec une pancarte nominative.
                        </p>

                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mb-6 backdrop-blur-sm">
                            <div className="flex items-start gap-3 mb-3">
                                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Prise en charge</p>
                                    <p className="text-sm font-medium text-slate-200">Aéroport Mohamed V (CMN)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Building2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Destination</p>
                                    <p className="text-sm font-medium text-slate-200">Ibis Hotel Casablanca</p>
                                </div>
                            </div>
                        </div>

                        <Button onClick={() => setShowDriverDetails(true)} className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold rounded-xl shadow-sm transition-all h-11">
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

            {/* Modals Overlay for Hotel Details and Driver */}
            <AnimatePresence>
                {showHotelDetails && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHotelDetails(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-full">
                            <div className="relative h-48 sm:h-64 shrink-0">
                                <img src="/images/ibis_casablanca.png" alt="ibis Casablanca City Center" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6 md:p-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">Confirmé</span>
                                            <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">14 Nuits</span>
                                        </div>
                                        <h2 className="text-3xl font-black text-white tracking-tight leading-tight">ibis Casablanca City Center</h2>
                                    </div>
                                </div>
                                <Button onClick={() => setShowHotelDetails(false)} size="icon" variant="ghost" className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full border border-white/20">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                            <div className="p-6 md:p-8 overflow-y-auto">
                                <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                                    L'hôtel Ibis Casablanca bénéficie d'un emplacement stratégique près de l'océan, garantissant confort, calme et proximité avec la clinique pour votre convalescence.
                                </p>
                                
                                <h4 className="font-bold text-slate-900 text-lg mb-4">Détails de la réservation</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <Calendar className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Séjour</p>
                                            <p className="font-bold text-slate-900 text-sm">10 Avr - 24 Avr 2026</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <BedDouble className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Chambre</p>
                                            <p className="font-bold text-slate-900 text-sm">Standard Confort (PMR)</p>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="font-bold text-slate-900 text-lg mb-4">Inclus dans votre forfait</h4>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-100"><Coffee className="w-4 h-4" /> Petit-déjeuner buffet</span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-100"><Wifi className="w-4 h-4" /> Wi-Fi Très Haut Débit</span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-sm font-semibold border border-amber-100"><Building2 className="w-4 h-4" /> Accès PMR garanti</span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                                    <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold border-slate-200 hover:bg-slate-50 text-slate-700">
                                        <Map className="w-4 h-4 mr-2" /> Voir sur la carte
                                    </Button>
                                    <Button className="flex-1 h-12 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md">
                                        Télécharger la confirmation
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {showDriverDetails && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDriverDetails(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden text-center p-8">
                            <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto mb-4 border-4 border-white shadow-lg overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Chauffeur" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-black text-2xl text-slate-900 mb-1">Amine Y.</h3>
                            <p className="text-slate-500 font-medium text-sm mb-6 flex items-center justify-center gap-1.5"><Car className="w-4 h-4" /> Chauffeur Privé VIP</p>
                            
                            <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-100 mb-6">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Véhicule</p>
                                <p className="font-bold text-slate-900 mb-3">Mercedes Classe V Noir</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Immatriculation</p>
                                <div className="inline-block px-3 py-1 bg-white border border-slate-300 rounded text-slate-900 font-mono font-bold shadow-sm">
                                    A-12345-C
                                </div>
                            </div>

                            <Button className="w-full h-12 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl shadow-md font-bold mb-3">
                                <PhoneCall className="w-4 h-4 mr-2" /> Appeler (+212 600 00 00)
                            </Button>
                            <Button onClick={() => setShowDriverDetails(false)} variant="ghost" className="w-full h-10 text-slate-500 hover:text-slate-800">
                                Fermer
                            </Button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
