'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles, MapPin, Activity, ArrowRight, CheckCircle, Plane, Star, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-12 xl:pt-32" suppressHydrationWarning>
      
      {/* 1. Fond Sophistiqué avec Grille */}
      <div className="absolute inset-0 bg-white -z-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
      
      {/* Orbes de couleur diffus */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-100/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 -z-10" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
        
        {/* === GAUCHE : Contenu === */}
        <div className="w-full text-center lg:text-left mx-auto max-w-2xl lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge de confiance / Avatars */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
               <div className="flex -space-x-3">
                  {[
                    { bg: "bg-blue-100", text: "text-blue-600" },
                    { bg: "bg-purple-100", text: "text-purple-600" },
                    { bg: "bg-emerald-100", text: "text-emerald-600" }
                  ].map((style, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center ${style.bg} ${style.text}`}>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                  ))}
               </div>
               <div className="text-sm font-semibold text-slate-600">
                  <span className="text-blue-600 font-bold">1000+</span> patients accompagnés
               </div>
            </div>

            {/* Titre Principal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Votre Santé n&apos;a plus de <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient-x">
                Frontières
              </span>.
            </h1>

            {/* Image Mobile (Restored) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:hidden relative max-w-[280px] mx-auto mb-8"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-2 hover:rotate-0 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Médecin avec patient"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Badge Assistance Mobile */}
              <div className="absolute -bottom-4 -right-4 bg-slate-900 p-2.5 rounded-xl shadow-lg border border-slate-800 flex items-center gap-2 z-20">
                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <Activity size={16} />
                 </div>
                 <span className="text-[10px] font-bold text-white uppercase tracking-wider">24h/24 7j/7</span>
              </div>
            </motion.div>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Accédez à l&apos;excellence médicale internationale (Maroc, Turquie, France) avec une prise en charge complète : <span className="font-semibold text-slate-900">Soins + Voyage + Hébergement.</span>
            </p>
          </motion.div>

          {/* Barre de Recherche "Glassmorphism" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative w-full max-w-xl mx-auto lg:mx-0 group mb-10"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 h-12 sm:h-auto">
                <Search className="text-blue-500 w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Quelle intervention cherchez-vous ?"
                  className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium text-base sm:text-lg truncate"
                  suppressHydrationWarning
                />
              </div>
              <Button className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-12 sm:h-14 text-base font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
                Rechercher
              </Button>
            </div>
            
            {/* Tags rapides */}
            <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
               {['Greffe Capillaire', 'Chirurgie Dentaire', 'Bilan Santé'].map((tag) => (
                 <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
                    {tag}
                 </span>
               ))}
            </div>
          </motion.div>

          {/* Stats épurées */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12 border-t border-slate-100 pt-8"
          >
            {[
              { val: '300+', label: 'Cliniques' },
              { val: '-60%', label: 'Économies' },
              { val: '24h', label: 'Devis Express' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">{stat.val}</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* === DROITE : Composition Visuelle Flottante === */}
        <div className="hidden lg:block relative h-[600px] w-full">
            {/* Cercle décoratif arrière plan */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-slate-200 rounded-full opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-b from-blue-50 to-cyan-50 rounded-full" />

            {/* Image Principale (Docteur/Patient) - Masque organique */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] z-10"
            >
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                    <img 
                        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Medical Success" 
                        className="w-full h-auto object-cover"
                    />
                </div>
            </motion.div>

            {/* Carte Flottante 1 : Localisation */}
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute top-20 left-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3"
            >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <MapPin size={20} />
                </div>
                <div>
                    <div className="text-xs text-slate-500 font-semibold">Destination Top</div>
                    <div className="text-sm font-bold text-slate-900">Istanbul, Turquie</div>
                </div>
            </motion.div>

            {/* Carte Flottante 2 : Billet Avion */}
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-32 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3"
            >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Plane size={20} />
                </div>
                <div>
                    <div className="text-xs text-slate-500 font-semibold">Voyage inclus</div>
                    <div className="text-sm font-bold text-slate-900">Visa & Billet Confirmés</div>
                </div>
            </motion.div>

            {/* Carte Flottante 3 : IA Épurée */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute top-40 -right-20 bg-white/95 backdrop-blur-sm p-5 rounded-3xl shadow-xl border border-slate-100 z-30 flex flex-col items-center gap-3 min-w-[180px]"
            >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <Brain size={32} strokeWidth={1.5} />
                </div>
                <div className="text-center">
                    <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-tight">Intelligence</div>
                    <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-tight">Artificielle</div>
                    <div className="h-1 w-8 bg-blue-600 mx-auto mt-2 rounded-full" />
                    <div className="text-[9px] font-bold text-blue-600 mt-2 uppercase tracking-tighter">Analyse Expertisée</div>
                </div>
            </motion.div>
        </div>

      </div>
    </section>
  )
}