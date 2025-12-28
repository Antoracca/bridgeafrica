'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles, MapPin, Activity, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 xl:pt-28 2xl:pt-32" suppressHydrationWarning>
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 xl:gap-40 2xl:gap-56 items-center">
        
        {/* Text Content */}
        <div className="w-full text-center lg:text-left mx-auto lg:mx-0 xl:-ml-10 2xl:-ml-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-6">
              <Activity size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Votre pont santé Afrique-Monde</span>
              <span className="sm:hidden">Pont Afrique-Monde</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold text-slate-900 leading-[1.15] mb-4 xl:mb-5">
              Votre Santé n&apos;a pas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Frontières</span>.
            </h1>

            {/* Image mobile uniquement - entre titre et description */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{
                opacity: [0, 0.5, 1],
                scale: [0.3, 1.3, 1]
              }}
              transition={{
                duration: 2.5,
                delay: 0.5,
                times: [0, 0.7, 1],
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="lg:hidden relative max-w-[200px] mx-auto mb-6"
            >
              <div className="relative z-10 rounded-xl overflow-hidden shadow-lg border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Médecin avec patient"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <p className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl text-slate-600 mb-6 xl:mb-7 leading-relaxed">
              Accédez aux meilleures cliniques du <strong>Maroc, Turquie et France</strong> depuis le <strong>Gabon, Cameroun, Centrafrique</strong> et plusieurs pays d&apos;Afrique. Une prise en charge complète, du visa au retour.
            </p>
          </motion.div>

          {/* AI Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative w-full mx-auto lg:mx-0 group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-2 xl:p-3 flex flex-col md:flex-row gap-2 items-center border border-slate-100">
              <div className="flex-1 flex items-center gap-3 px-4 xl:px-6 w-full">
                <Search className="text-slate-400 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex: Opération du genou, budget 5000€..."
                  className="w-full py-3 xl:py-4 2xl:py-5 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium xl:text-lg 2xl:text-xl"
                  suppressHydrationWarning
                />
              </div>
              <Button className="w-full md:w-auto rounded-xl bg-slate-900 text-white px-8 xl:px-10 2xl:px-12 py-6 xl:py-7 2xl:py-8 text-base xl:text-lg 2xl:text-xl hover:bg-slate-800 transition-all shadow-lg">
                Analyser <ArrowRight className="ml-2 w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
              </Button>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-3 ml-2 flex items-center gap-1.5 sm:gap-2 justify-center lg:justify-start">
              <Activity size={12} className="hidden sm:block" />
              <span className="hidden sm:inline">Propulsé par MediBridge AI • Analyse 300+ cliniques en temps réel</span>
              <span className="sm:hidden">300+ cliniques • Réponse rapide</span>
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 mt-8 xl:mt-10"
          >
            {[
              { label: 'Cliniques Partenaires', value: '300+' },
              { label: 'Objectif 2026', value: '50k', subtext: 'patients' },
              { label: 'Pays Couverts', value: '50+', subtext: 'bientôt' },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-slate-900">
                  {stat.value}
                  {stat.subtext && <span className="text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl ml-1 font-semibold text-slate-500">{stat.subtext}</span>}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm xl:text-base 2xl:text-lg text-slate-500 font-medium leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual / Illustration - Desktop uniquement */}
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block relative xl:scale-110 2xl:scale-125"
        >
            <div className="relative z-10 rounded-2xl lg:rounded-3xl xl:rounded-[2rem] overflow-visible shadow-xl lg:shadow-2xl border-2 lg:border-4 xl:border-[6px] border-white rotate-1 lg:rotate-2 hover:rotate-0 transition-all duration-700">
                {/* Placeholder Image haute qualité */}
                <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Médecin avec patient"
                    className="w-full h-auto object-cover rounded-xl lg:rounded-2xl xl:rounded-[1.8rem]"
                />

                {/* Floating Cards - Hidden on mobile, visible on desktop */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="hidden lg:flex absolute top-4 xl:top-6 2xl:top-8 -left-6 xl:-left-8 2xl:-left-10 bg-white p-3 xl:p-4 2xl:p-5 rounded-xl xl:rounded-2xl shadow-2xl border border-slate-100"
                >
                    <div className="flex items-start gap-2.5 xl:gap-3 2xl:gap-4">
                        <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-2 xl:p-3 2xl:p-4 rounded-lg xl:rounded-xl mt-0.5">
                            <Sparkles className="text-emerald-600" size={18} />
                        </div>
                        <div>
                            <div className="text-xs xl:text-sm 2xl:text-base font-medium text-slate-500 leading-tight">Économisez jusqu&apos;à</div>
                            <div className="text-base xl:text-xl 2xl:text-2xl font-extrabold text-emerald-600">60%</div>
                            <div className="text-[10px] xl:text-xs 2xl:text-sm font-medium text-slate-400 leading-tight">en temps et procédure</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                    className="hidden lg:flex absolute bottom-4 xl:bottom-6 2xl:bottom-8 -right-6 xl:-right-8 2xl:-right-10 bg-white p-3.5 xl:p-5 2xl:p-6 rounded-xl xl:rounded-2xl shadow-2xl items-center gap-3 xl:gap-4 2xl:gap-5 border border-slate-100"
                >
                     <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-2.5 xl:p-3 2xl:p-4 rounded-lg xl:rounded-xl">
                        <Activity className="text-blue-600" size={20} />
                     </div>
                    <div>
                        <div className="text-xs xl:text-sm 2xl:text-base font-medium text-slate-500">Réponse sous</div>
                        <div className="text-lg xl:text-2xl 2xl:text-3xl font-extrabold text-blue-600">24h</div>
                    </div>
                </motion.div>
            </div>
        </motion.div>

      </div>
    </section>
  )
}
