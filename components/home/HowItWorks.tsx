'use client'

import { motion } from 'framer-motion'
import { FileText, Calculator, Plane, HeartPulse } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: "1. Dossier Médical",
    desc: "Téléchargez vos rapports et radios. Notre IA les sécurise et les pré-analyse en 30 secondes."
  },
  {
    icon: Calculator,
    title: "2. Comparateur IA",
    desc: "Recevez 3 devis comparatifs (Maroc, Turquie, Tunisie) avec scores de réussite et budget total."
  },
  {
    icon: Plane,
    title: "3. Voyage Clé en Main",
    desc: "Visa express, billets d'avion, hôtel et chauffeur à l'arrivée. Vous ne gérez rien."
  },
  {
    icon: HeartPulse,
    title: "4. Soins & Suivi",
    desc: "Opération par des experts. Suivi post-opératoire une fois rentré chez vous via l'app."
  }
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
        {/* Ligne de fond décorative */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-50 via-blue-100 to-white -translate-x-1/2 hidden md:block" />

        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Simplissime</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
                    Votre guérison en 4 étapes
                </h2>
            </div>

            <div className="space-y-12 md:space-y-24">
                {steps.map((step, idx) => {
                    const isEven = idx % 2 === 0
                    return (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}
                        >
                            {/* Côté Image / Icone Géante */}
                            <div className="flex-1 flex justify-center">
                                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-blue-50 flex items-center justify-center relative z-10 border-4 border-white shadow-xl">
                                    <step.icon size={64} className="text-blue-600" />
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-white">
                                        {idx + 1}
                                    </div>
                                </div>
                            </div>

                            {/* Côté Texte */}
                            <div className={`flex-1 text-center md:text-left ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{step.title}</h3>
                                <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto md:mx-0 inline-block">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    </section>
  )
}
