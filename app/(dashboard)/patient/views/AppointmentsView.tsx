"use client"
import Link from "next/link"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar as CalendarIcon, Clock, MapPin, Video, Phone, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react"

export function AppointmentsView() {
    const upcoming = [
        {
            id: 1,
            type: "teleconsultation",
            title: "Consultation Pré-Opératoire",
            doctor: "Dr. Fatima El Amrani",
            specialty: "Chirurgien Orthopédiste",
            date: "Aujourd'hui",
            time: "15:30",
            duration: "45 min",
            status: "urgent",
            link: "#"
        },
        {
            id: 2,
            type: "physical",
            title: "Examen Clinique & Admission",
            doctor: "Equipe Accueil & Dr. Amrani",
            specialty: "Clinique El Manar, Tunis",
            date: "22 Avril 2026",
            time: "10:00",
            duration: "1h30",
            status: "confirmed",
            location: "Bd Principal, El Manar 2, 2092 Tunis"
        }
    ]

    const past = [
        {
            id: 3,
            title: "Première Consultation (Bilan)",
            doctor: "Dr. Jean Dupont",
            date: "10 Avril 2026",
            time: "14:00",
            status: "completed"
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto space-y-6 lg:space-y-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Agenda Médical</h1>
                    <p className="text-slate-500 font-medium">Gérez vos consultations et interventions programmées.</p>
                </div>
                <Button className="bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full px-6 shadow-sm transition-all">
                    <CalendarIcon className="w-4 h-4 mr-2" /> Planifier un RDV
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Left Column - Appointments List */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Prochains RDV */}
                    <section>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" /> À venir
                        </h2>
                        <div className="space-y-4">
                            {upcoming.map((apt) => (
                                <motion.div
                                    key={apt.id} whileHover={{ y: -2 }}
                                    className={`bg-white border rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all ${apt.status === 'urgent' ? 'border-brand-teal/30 ring-2 ring-brand-teal/5' : 'border-slate-200'
                                        }`}
                                >
                                    <div className="flex flex-col sm:flex-row justify-between gap-5">
                                        {/* Date Box */}
                                        <div className="flex items-center sm:flex-col sm:items-start justify-center p-4 bg-slate-50 rounded-xl shrink-0 min-w-32 text-center border border-slate-100">
                                            <CalendarIcon className="w-5 h-5 text-brand-teal mb-1 hidden sm:block mx-auto" />
                                            <span className="font-extrabold text-slate-900 text-lg">{apt.date}</span>
                                            <div className="w-px h-4 bg-slate-200 mx-3 sm:hidden" />
                                            <span className="text-brand-teal font-bold flex items-center justify-center gap-1 sm:mt-1">
                                                <Clock className="w-4 h-4" /> {apt.time}
                                            </span>
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3 className="font-extrabold text-lg text-slate-900 line-clamp-1">{apt.title}</h3>
                                                {apt.status === 'urgent' && (
                                                    <span className="shrink-0 bg-amber-100 text-amber-700 text-[10px] font-black uppercase px-2 py-1 rounded-md flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" /> Imminent
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 mb-4">
                                                <Avatar className="w-6 h-6 border shadow-sm">
                                                    <AvatarFallback className="text-[10px] bg-brand-teal/10 text-brand-teal font-bold">{apt.doctor.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <p className="text-sm font-bold text-slate-700">{apt.doctor}</p>
                                                <span className="text-xs text-slate-400 font-medium">• {apt.specialty}</span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3">
                                                {apt.type === 'teleconsultation' ? (
                                                    <Link href="/patient?view=teleconsultation">
                                                        <Button className="bg-brand-teal hover:bg-brand-teal-dark text-white shadow-sm rounded-full text-sm h-9">
                                                            <Video className="w-4 h-4 mr-2" /> Rejoindre la salle de visio
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full text-sm h-9">
                                                        <MapPin className="w-4 h-4 mr-2 text-slate-400" /> Voir l'itinéraire {apt.location && `(${apt.location.split(',')[0]})`}
                                                    </Button>
                                                )}
                                                <Button variant="ghost" className="text-slate-500 hover:text-slate-800 rounded-full h-9">
                                                    Annuler / Déplacer
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Past RDV */}
                    <section className="pt-4">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Historique</h2>
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            {past.map(apt => (
                                <div key={apt.id} className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-teal/10 group-hover:text-brand-teal transition-colors border border-slate-100">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900">{apt.title}</p>
                                            <p className="text-xs text-slate-500 font-medium">{apt.date} à {apt.time} • Avec {apt.doctor}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-teal" />
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Right Column - Mini Calendar & Info */}
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 tracking-tight">Aperçu du Mois</h3>
                        <div className="aspect-square bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center relative overflow-hidden">
                            {/* Very basic stylized minimal calendar mockup */}
                            <div className="absolute inset-0 grid grid-cols-7 grid-rows-6 gap-px bg-slate-200 p-px">
                                {Array.from({ length: 42 }).map((_, i) => (
                                    <div key={i} className={`bg-white ${i === 22 ? 'bg-brand-teal/20' : ''} ${i === 10 ? 'bg-slate-100' : ''}`} />
                                ))}
                            </div>
                            <div className="relative z-10 text-center bg-white/90 backdrop-blur-md px-8 py-5 rounded-2xl shadow-sm border border-slate-100">
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Avril</p>
                                <p className="text-4xl font-black text-slate-900 tracking-tighter">2026</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Phone className="w-24 h-24" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2 relative z-10">
                            <Phone className="w-5 h-5 text-brand-teal" /> Urgence Médicale ?
                        </h3>
                        <p className="text-sm text-slate-300 mb-6 leading-relaxed relative z-10">
                            Votre coordinatrice médicale est joignable 24h/24 et 7j/7 pour toute urgence liée à votre parcours de soins.
                        </p>
                        <Button className="w-full bg-brand-teal text-white hover:bg-brand-teal-dark font-bold rounded-full shadow-sm relative z-10">
                            Appeler le +33 1 23 45 67 89
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
