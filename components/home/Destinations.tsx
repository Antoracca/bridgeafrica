'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plane, MapPin, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { LottieAnimation } from '@/components/ui/LottieAnimation'
import WorldAnimation from '@/public/world.json'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Drapeaux via country-flag-icons - 4 pays par groupe
const sourcesGroup1 = [
  { name: 'Gabon', code: 'GA', position: { x: 20, y: 45 } },
  { name: 'Cameroun', code: 'CM', position: { x: 15, y: 60 } },
  { name: 'Centrafrique', code: 'CF', position: { x: 18, y: 75 } },
  { name: 'Congo', code: 'CG', position: { x: 10, y: 90 } },
]

const sourcesGroup2 = [
  { name: 'Sénégal', code: 'SN', position: { x: 20, y: 45 } },
  { name: 'Mali', code: 'ML', position: { x: 15, y: 60 } },
  { name: 'Niger', code: 'NE', position: { x: 18, y: 75 } },
  { name: 'Burkina Faso', code: 'BF', position: { x: 10, y: 90 } },
]

const destinationsGroup1 = [
  { name: 'Maroc', code: 'MA', city: 'Casablanca', position: { x: 80, y: 45 } },
  { name: 'Turquie', code: 'TR', city: 'Istanbul', position: { x: 85, y: 60 } },
  { name: 'Tunisie', code: 'TN', city: 'Tunis', position: { x: 82, y: 75 } },
  { name: 'France', code: 'FR', city: 'Paris', position: { x: 90, y: 90 } },
]

const destinationsGroup2 = [
  { name: 'Allemagne', code: 'DE', city: 'Berlin', position: { x: 80, y: 45 } },
  { name: 'Italie', code: 'IT', city: 'Rome', position: { x: 85, y: 60 } },
  { name: 'Belgique', code: 'BE', city: 'Bruxelles', position: { x: 82, y: 75 } },
  { name: 'Suisse', code: 'CH', city: 'Genève', position: { x: 90, y: 90 } },
]

const services = [
  'Consultation médicale',
  'Chirurgie cardiaque',
  'Orthopédie',
  'Neurochirurgie',
  'Oncologie',
  'Ophtalmologie',
  'Dentisterie',
  'Dermatologie',
  'Pédiatrie',
  'Gynécologie',
  'Urologie',
  'Radiologie',
]

export function Destinations() {
  const [activeConnection, setActiveConnection] = useState(0)
  const [currentGroup, setCurrentGroup] = useState(0)

  const sources = currentGroup === 0 ? sourcesGroup1 : sourcesGroup2
  const destinations = currentGroup === 0 ? destinationsGroup1 : destinationsGroup2

  // Rotation des groupes de pays toutes les 5 secondes
  useEffect(() => {
    const groupInterval = setInterval(() => {
      setCurrentGroup((prev) => (prev === 0 ? 1 : 0))
    }, 5000)
    return () => clearInterval(groupInterval)
  }, [])

  // Animation des connexions
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % (sources.length * destinations.length))
    }, 2000)
    return () => clearInterval(interval)
  }, [sources.length, destinations.length])

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Le Pont Médical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Intercontinental</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl">
              Connexions en temps réel entre l&apos;Afrique et les pôles d&apos;excellence médicale mondiaux
            </p>
          </motion.div>
        </div>

        {/* Mobile View - Stacked Layout */}
        <div className="lg:hidden space-y-8">
          {/* ... (Code mobile conservé car il fonctionne bien) ... */}
          <div className="space-y-8">
            <div>
              <div className="flex flex-col items-center mb-5">
                <h3 className="text-sm font-extrabold text-slate-800 mb-2 tracking-tight">Depuis l&apos;Afrique</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              </div>
              <div className="relative h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mobile-sources-${currentGroup}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                      {sources.map((country, idx) => (
                        <motion.div
                          key={`${currentGroup}-mobile-${country.name}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl blur-sm" />
                          <div className="relative bg-white/90 backdrop-blur-xl p-3 rounded-2xl shadow-lg border border-blue-100 flex items-center gap-2.5">
                            <div className="relative">
                              <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur" />
                              <Image
                                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                alt={country.name}
                                width={36}
                                height={27}
                                className="relative rounded-lg shadow-sm border border-white/50"
                              />
                            </div>
                            <span className="font-bold text-slate-800 text-xs">{country.name}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Globe central mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center py-4"
            >
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-cyan-600/10 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-blue-500/20">
                    <LottieAnimation
                      animationData={WorldAnimation}
                      className="w-32 h-32"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/liste-pays">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group">
                    <span className="font-semibold text-sm">Consulter la liste des pays éligibles</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div>
              <div className="flex flex-col items-center mb-5">
                <h3 className="text-sm font-extrabold text-slate-800 mb-2 tracking-tight">Destinations Principales</h3>
                <div className="h-1 w-20 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"></div>
              </div>
              <div className="relative h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mobile-destinations-${currentGroup}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                      {destinations.map((country, idx) => (
                        <motion.div
                          key={`${currentGroup}-mobile-dest-${country.name}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-2xl blur-sm" />
                          <div className="relative bg-white/90 backdrop-blur-xl p-3 rounded-2xl shadow-lg border border-cyan-100">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="relative">
                                <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur" />
                                <Image
                                  src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                  alt={country.name}
                                  width={36}
                                  height={27}
                                  className="relative rounded-lg shadow-sm border border-white/50"
                                />
                              </div>
                              <span className="font-bold text-slate-900 text-xs">{country.name}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1 ml-1">
                              <MapPin size={10} className="text-cyan-600" />
                              <span>{country.city}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View - Grid Layout (Fixed Responsiveness) */}
        <div className="hidden lg:block relative h-[600px] xl:h-[700px]">
            {/* SVG Connections Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="activeLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"><animate attributeName="stopOpacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" /></stop>
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="1"><animate attributeName="stopOpacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" /></stop>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2"><animate attributeName="stopOpacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" /></stop>
                </linearGradient>
                <linearGradient id="inactiveLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.1" />
                </linearGradient>
                <filter id="connectionGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              {sources.map((source, sIdx) =>
                destinations.map((dest, dIdx) => {
                  const isActive = (sIdx * destinations.length + dIdx) === activeConnection
                  return (
                    <g key={`connection-${source.name}-${dest.name}`}>
                      <motion.path
                        d={`M ${source.position.x}% ${source.position.y}% Q 50% 50%, ${dest.position.x}% ${dest.position.y}%`}
                        stroke="url(#inactiveLineGradient)" strokeWidth="2" fill="none" strokeDasharray="8,6"
                        initial={{ opacity: 0 }} animate={{ opacity: isActive ? 0 : 0.2 }}
                      />
                      {isActive && (
                        <motion.path
                          d={`M ${source.position.x}% ${source.position.y}% Q 50% 50%, ${dest.position.x}% ${dest.position.y}%`}
                          stroke="url(#activeLineGradient)" strokeWidth="3" fill="none" filter="url(#connectionGlow)"
                          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1 }}
                        />
                      )}
                    </g>
                  )
                })
              )}
            </svg>

            {/* Grid Container for Layout */}
            <div className="grid grid-cols-12 h-full items-center relative z-10">
                
                {/* Left: Source Countries (Col 1-3) */}
                <div className="col-span-3 h-full relative">
                    <AnimatePresence mode="wait">
                       <motion.div key={currentGroup} className="absolute inset-0 flex flex-col justify-center gap-6 pl-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Départ Afrique</h3>
                          {sources.map((country, idx) => (
                             <motion.div
                               key={`${currentGroup}-${country.name}`}
                               initial={{ x: -20, opacity: 0 }}
                               animate={{ x: 0, opacity: 1 }}
                               transition={{ delay: idx * 0.1 }}
                               whileHover={{ scale: 1.05 }}
                               className="bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-md border border-blue-100 flex items-center gap-3 w-fit cursor-default"
                             >
                                <Image src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} alt={country.name} width={32} height={24} className="rounded shadow-sm" />
                                <span className="font-bold text-slate-800 text-sm">{country.name}</span>
                             </motion.div>
                          ))}
                       </motion.div>
                    </AnimatePresence>
                </div>

                {/* Center: Globe (Col 4-9) */}
                <div className="col-span-6 flex flex-col items-center justify-center relative">
                    <div className="relative w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-blue-200/30 animate-spin-slow"></div>
                        <div className="w-full h-full rounded-full bg-gradient-to-b from-blue-50/50 to-cyan-50/50 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-blue-200/50">
                           <LottieAnimation animationData={WorldAnimation} className="w-[80%] h-[80%]" />
                        </div>
                    </div>
                    <div className="mt-8">
                       <Link href="/liste-pays">
                          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-lg hover:shadow-xl transition-all text-white px-8">
                             Voir toutes les destinations
                          </Button>
                       </Link>
                    </div>
                </div>

                {/* Right: Destinations (Col 10-12) */}
                <div className="col-span-3 h-full relative">
                    <AnimatePresence mode="wait">
                       <motion.div key={currentGroup} className="absolute inset-0 flex flex-col justify-center gap-6 items-end pr-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-right">Arrivée Monde</h3>
                          {destinations.map((country, idx) => (
                             <motion.div
                               key={`${currentGroup}-${country.name}`}
                               initial={{ x: 20, opacity: 0 }}
                               animate={{ x: 0, opacity: 1 }}
                               transition={{ delay: idx * 0.1 }}
                               whileHover={{ scale: 1.05 }}
                               className="bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-md border border-cyan-100 flex items-center justify-between gap-3 w-[200px] cursor-default"
                             >
                                <div className="text-right flex-1">
                                   <div className="font-bold text-slate-800 text-sm">{country.name}</div>
                                   <div className="text-xs text-slate-500 flex items-center justify-end gap-1">
                                      <MapPin size={10} className="text-cyan-600"/> {country.city}
                                   </div>
                                </div>
                                <Image src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} alt={country.name} width={32} height={24} className="rounded shadow-sm" />
                             </motion.div>
                          ))}
                       </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>

        {/* Stats & Services Scroll */}
        <div className="mt-12 space-y-8">
           {/* Stats */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { label: 'Pays connectés', value: '10+', color: 'text-blue-600' },
                { label: 'Prises en charge', value: '1000+', color: 'text-cyan-600' },
                { label: 'Satisfaction', value: '98%', color: 'text-emerald-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100">
                   <div className={`text-3xl font-extrabold ${stat.color} mb-1`}>{stat.value}</div>
                   <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
           </div>

           {/* Services Ticker */}
           <div className="overflow-hidden bg-slate-900 py-4 rounded-2xl relative">
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
              <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[...services, ...services, ...services].map((service, idx) => (
                  <span key={idx} className="text-slate-300 font-medium text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    {service}
                  </span>
                ))}
              </motion.div>
           </div>
        </div>

      </div>
    </section>
  )
}