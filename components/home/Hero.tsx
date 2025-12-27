'use client'

import { motion } from 'framer-motion'
import { Search, Sparkles, MapPin, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <Sparkles size={16} /> L'IA au service de votre santé
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-6">
              Votre Santé n'a pas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Frontières</span>.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Accédez aux meilleures cliniques du <strong>Maroc, Turquie et France</strong> depuis le Gabon, Cameroun et toute l'Afrique de l'Ouest. Une prise en charge complète, du visa au retour.
            </p>
          </motion.div>

          {/* AI Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative max-w-xl mx-auto lg:mx-0 group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2 items-center border border-slate-100">
              <div className="flex-1 flex items-center gap-3 px-4 w-full">
                <Search className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Ex: Opération du genou, budget 5000€..." 
                  className="w-full py-3 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                />
              </div>
              <Button className="w-full md:w-auto rounded-xl bg-slate-900 text-white px-8 py-6 text-base hover:bg-slate-800 transition-all shadow-lg">
                <Sparkles className="mr-2 w-4 h-4" /> Analyser
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-3 ml-2 flex items-center gap-2 justify-center lg:justify-start">
              <Activity size={12} />
              Propulsé par MediBridge AI • Analyse 300+ cliniques en temps réel
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start gap-8 mt-12"
          >
            {[
              { label: 'Cliniques Partenaires', value: '300+' },
              { label: 'Pays Couverts', value: '12' },
              { label: 'Patients Satisfaits', value: '5k+' },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual / Illustration */}
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block relative"
        >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-all duration-700">
                {/* Placeholder Image haute qualité */}
                <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Médecin avec patient" 
                    className="w-full h-auto object-cover"
                />
                
                {/* Floating Cards */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute top-8 -left-8 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 border border-slate-50"
                >
                    <div className="bg-green-100 p-2 rounded-full text-green-600"><Activity size={20}/></div>
                    <div>
                        <div className="text-xs text-slate-500">Score de Réussite</div>
                        <div className="font-bold text-slate-900">98.5%</div>
                    </div>
                </motion.div>

                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                    className="absolute bottom-8 -right-8 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 border border-slate-50"
                >
                     <div className="bg-blue-100 p-2 rounded-full text-blue-600"><MapPin size={20}/></div>
                    <div>
                        <div className="text-xs text-slate-500">Destination Top</div>
                        <div className="font-bold text-slate-900">Casablanca</div>
                    </div>
                </motion.div>
            </div>
        </motion.div>

      </div>
    </section>
  )
}
