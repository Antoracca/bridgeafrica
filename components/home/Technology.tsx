'use client'

import { motion } from 'framer-motion'
import { Brain, Scan, Lock, Database } from 'lucide-react'

export function Technology() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text */}
        <div>
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold mb-6">
              <Brain size={16} /> MediBridge AI Core™
           </div>
           <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
             Une technologie qui <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">comprend votre santé.</span>
           </h2>
           <p className="text-lg text-slate-600 mb-8 leading-relaxed">
             Nous ne sommes pas une simple agence de voyage. Notre algorithme propriétaire analyse vos documents médicaux pour trouver la correspondance clinique parfaite, au meilleur prix.
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                 <div className="bg-blue-50 p-3 rounded-lg h-fit text-blue-600"><Scan size={24}/></div>
                 <div>
                    <h4 className="font-bold text-slate-900">Analyse OCR</h4>
                    <p className="text-sm text-slate-500">Lecture automatique de vos radios et rapports PDF.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="bg-purple-50 p-3 rounded-lg h-fit text-purple-600"><Database size={24}/></div>
                 <div>
                    <h4 className="font-bold text-slate-900">Big Data Médical</h4>
                    <p className="text-sm text-slate-500">Comparaison avec 5 millions de cas similaires traités.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="bg-green-50 p-3 rounded-lg h-fit text-green-600"><Lock size={24}/></div>
                 <div>
                    <h4 className="font-bold text-slate-900">Sécurité HDS</h4>
                    <p className="text-sm text-slate-500">Vos données de santé sont cryptées de bout en bout.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Visual Tech */}
        <div className="relative h-[500px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-8 border border-slate-800">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50"></div>
            
            {/* Animated Elements */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute w-[400px] h-[400px] border border-white/10 rounded-full"
            />
            <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute w-[300px] h-[300px] border border-white/20 rounded-full border-dashed"
            />

            {/* Central Card */}
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl w-full max-w-sm"
            >
               <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                  <div className="text-white font-bold">Analyse en cours...</div>
                  <div className="flex gap-1">
                     <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                     <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                     <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="h-2 bg-white/20 rounded-full w-3/4 animate-pulse"></div>
                  <div className="h-2 bg-white/20 rounded-full w-1/2 animate-pulse delay-75"></div>
                  <div className="h-2 bg-white/20 rounded-full w-5/6 animate-pulse delay-150"></div>
               </div>
               <div className="mt-6 flex justify-between items-center text-xs text-blue-300 font-mono">
                  <span>Match trouvé:</span>
                  <span className="text-green-400 font-bold text-lg">98.5%</span>
               </div>
            </motion.div>
        </div>

      </div>
    </section>
  )
}
