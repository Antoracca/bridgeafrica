"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
    Stethoscope,
    BrainCircuit,
    Globe2,
    Scale,
    PlaneTakeoff,
    HeartHandshake,
    ShieldCheck,
    ArrowRight,
    ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";

const processSteps = [
    {
        id: "01",
        title: "Audit Clinique Approfondi",
        subtitle: "L'expertise avant la décision",
        description: "Avant toute recommandation, notre comité médical pluridisciplinaire examine minutieusement votre dossier. Nous évaluons vos antécédents, vos examens récents et qualifions l'urgence et la complexité de votre pathologie.",
        icon: Stethoscope,
        highlights: ["Comité d'experts indépendants", "Analyse sécurisée des données", "Qualification du besoin (Urgence / Électif)"],
        color: "from-blue-500 to-indigo-600",
        glow: "bg-blue-500/20"
    },
    {
        id: "02",
        title: "Algorithme de Matching Global",
        subtitle: "La puissance de la donnée",
        description: "Nous croisons votre profil médical avec notre base de données mondiale de plus de 300 établissements d'excellence. Notre IA propriétaire prend en compte les taux de réussite, l'expertise chirurgicale, la disponibilité et vos contraintes budgétaires.",
        icon: BrainCircuit,
        highlights: ["Scan de 300+ centres JCI/HAS", "Matching sur 50+ critères médicaux", "Analyse prédictive des budgets"],
        color: "from-cyan-400 to-blue-500",
        glow: "bg-cyan-500/20"
    },
    {
        id: "03",
        title: "Transparence & Décision",
        subtitle: "Zéro frais caché, zéro surprise",
        description: "Nous vous restituons un rapport comparatif détaillé (Shortlist). Vous visualisez clairement les devis médicaux, les coûts logistiques, les profils des chirurgiens et les plannings possibles. Vous gardez le contrôle total sur la décision finale.",
        icon: Scale,
        highlights: ["Devis chirurgicaux garantis", "Comparatif objectif qualité/prix", "Téléconsultation pré-départ"],
        color: "from-emerald-400 to-teal-500",
        glow: "bg-emerald-500/20"
    },
    {
        id: "04",
        title: "Conciergerie Médicale VIP",
        subtitle: "Voyagez l'esprit tranquille",
        description: "Une fois la destination choisie, notre équipe 'Care' prend le relais. Gestion des visas médicaux, réservation des vols, hébergement adapté, interprète dédié et transferts aéroport-clinique-hôtel en véhicule privé.",
        icon: PlaneTakeoff,
        highlights: ["Fast-track consulaire (Visa)", "Hébergement médicalisé", "Interprète et chauffeur privé"],
        color: "from-violet-500 to-fuchsia-600",
        glow: "bg-violet-500/20"
    },
    {
        id: "05",
        title: "Suivi Post-Opératoire Continu",
        subtitle: "Le lien n'est jamais rompu",
        description: "De retour chez vous en Afrique, la convalescence continue. Nous organisons les téléconsultations de suivi avec votre chirurgien et assurons la liaison avec un médecin traitant local pour un rétablissement optimal.",
        icon: HeartHandshake,
        highlights: ["Télé-monitoring à distance", "Coordination avec médecins locaux", "Archivage sécurisé du dossier"],
        color: "from-rose-400 to-orange-500",
        glow: "bg-rose-500/20"
    }
];

export default function NotreProcessus() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
            {/* --- HERO SECTION --- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 blur-[100px] mix-blend-screen pointer-events-none" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

                <div className="container px-4 mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
                    >
                        <ShieldCheck className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-semibold tracking-widest uppercase text-slate-300">Méthode Certifiée ISO 9001</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8"
                    >
                        L'Ingénierie de la <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                            Santé Sans Frontière.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-16"
                    >
                        Découvrez comment notre processus rigoureux en 5 étapes garantit votre accès aux meilleurs soins mondiaux, en toute sécurité.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-slate-500"
                    >
                        <span className="text-sm tracking-widest uppercase">Défilez pour découvrir</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                            <ChevronDown className="w-6 h-6" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- TIMELINE SECTION --- */}
            <section ref={containerRef} className="py-32 relative">
                <div className="container mx-auto px-4 max-w-6xl relative">

                    {/* Timeline SVG Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5">
                        <div className="absolute inset-0 bg-slate-800/50 rounded-full" />
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-cyan-400 to-purple-500 rounded-full origin-top"
                            style={{ scaleY: pathLength }}
                        />
                    </div>

                    <div className="space-y-32">
                        {processSteps.map((step, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <div key={step.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                    {/* Center Node (Dot) */}
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-900 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ type: "spring", delay: 0.2 }}
                                            className={`w-4 h-4 rounded-full bg-gradient-to-br ${step.color} shadow-lg`}
                                        />
                                    </div>

                                    {/* Empty space for alternating layout */}
                                    <div className="hidden md:block w-1/2" />


                                    {/* Content Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                        className="w-full md:w-1/2 pl-16 md:pl-0"
                                    >
                                        <div className="relative group">
                                            {/* Glow Behind Card */}
                                            <div className={`absolute -inset-1 ${step.glow} rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                                            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/60 p-8 md:p-12 rounded-[2rem] shadow-2xl hover:bg-slate-900/80 transition-colors duration-500">

                                                <div className="flex items-center gap-6 mb-8">
                                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-[2px] shadow-lg`}>
                                                        <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                                                            <step.icon className="w-7 h-7 text-white" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${step.color} opacity-30 absolute top-8 right-8`}>
                                                            {step.id}
                                                        </span>
                                                        <h4 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-1">{step.subtitle}</h4>
                                                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{step.title}</h3>
                                                    </div>
                                                </div>

                                                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                                                    {step.description}
                                                </p>

                                                <div className="space-y-4">
                                                    {step.highlights.map((highlight, i) => (
                                                        <div key={i} className="flex items-start gap-4">
                                                            <div className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`} />
                                                            <span className="text-slate-200 font-medium">{highlight}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <Globe2 className="w-20 h-20 text-blue-500 mx-auto mb-8 opacity-50" />
                    <h2 className="text-4xl md:text-6xl font-black mb-8">
                        Prêt à démarrer <span className="text-blue-400">votre parcours</span> ?
                    </h2>
                    <p className="text-xl text-slate-400 mb-12">
                        Créez votre profil patient gratuitement et en toute confidentialité. Nos experts vous contacteront sous 24h.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/register">
                            <Button className="w-full sm:w-auto h-16 px-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.7)] transition-all hover:scale-105 group">
                                Créer mon dossier
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-full bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200 text-lg font-bold transition-all">
                                J'ai déjà un compte
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
