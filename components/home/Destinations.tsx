'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plane, MapPin, ArrowRight, Activity, ShieldCheck, HeartPulse } from 'lucide-react'
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

  // Rotation des groupes de pays toutes les 5 secondes
  useEffect(() => {
    const groupInterval = setInterval(() => {
      setCurrentGroup((prev) => (prev === 0 ? 1 : 0))
    }, 5000)
    return () => clearInterval(groupInterval)
  }, [])

  const sources = currentGroup === 0 ? sourcesGroup1 : sourcesGroup2
  const destinations = currentGroup === 0 ? destinationsGroup1 : destinationsGroup2

  // Animation des connexions
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % (sources.length * destinations.length))
    }, 2000)
    return () => clearInterval(interval)
  }, [sources.length, destinations.length])

  return (
    <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Dynamic Glows */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/30 rounded-full blur-[150px]"
      />

      <div className="container mx-auto px-4 relative z-10 2xl:max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-sm font-bold mb-6">
              <Activity size={16} /> Réseau Médical Mondial
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Le Pont Médical <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient-x">
                Intercontinental
              </span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Une infrastructure digitale qui connecte instantanément les patients africains aux pôles d&apos;excellence médicale mondiaux.
            </p>
          </motion.div>
        </div>

        {/* ... Mobile view kept mostly same but with dark theme colors ... */}
        {/* Mobile View - Stacked Layout */}
        <div className="lg:hidden space-y-12 mb-16">
          <div className="space-y-8 relative">

            {/* Sources */}
            <div>
              <div className="flex flex-col items-center justify-center mb-6">
                <span className="px-4 py-1.5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-widest border border-slate-700 shadow-sm">Départ</span>
              </div>
              <div className="relative h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mobile-sources-${currentGroup}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                      {sources.map((country, idx) => (
                        <div key={`${currentGroup}-mobile-${country.name}`} className="bg-slate-800/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/50 shadow-lg flex items-center gap-3">
                          <Image src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} alt={country.name} width={36} height={27} className="rounded-md shadow-sm" />
                          <span className="font-bold text-white text-sm">{country.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Globe Mobile */}
            <div className="flexjustify-center relative py-4 flex flex-col items-center">
              {/* Vertical connection line */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-blue-500/20 via-cyan-500/50 to-blue-500/20 -z-10 hidden sm:block delay-100" />
              <div className="w-56 h-56 rounded-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 flex items-center justify-center shadow-2xl shadow-blue-500/10">
                <LottieAnimation animationData={WorldAnimation} className="w-48 h-48 opacity-90 filter hue-rotate-15" />
              </div>
            </div>

            {/* Destinations */}
            <div>
              <div className="flex flex-col items-center justify-center mb-6">
                <span className="px-4 py-1.5 rounded-full bg-blue-900/50 text-blue-300 text-xs font-bold uppercase tracking-widest border border-blue-800/50 shadow-sm">Arrivée</span>
              </div>
              <div className="relative h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mobile-destinations-${currentGroup}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                      {destinations.map((country, idx) => (
                        <div key={`${currentGroup}-mobile-dest-${country.name}`} className="bg-slate-800/80 backdrop-blur-md p-3.5 rounded-2xl border border-blue-900/50 shadow-lg flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <Image src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} alt={country.name} width={28} height={21} className="rounded-md shadow-sm" />
                            <MapPin size={14} className="text-cyan-400" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm leading-tight">{country.name}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">{country.city}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* Desktop View - Advanced Glassmorphism & SVG Connections */}
        <div className="hidden lg:block relative h-[600px] xl:h-[700px] rounded-[3rem] bg-slate-800/30 backdrop-blur-3xl border border-slate-700/50 shadow-2xl mb-16 overflow-hidden">
          {/* SVG Connections Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="activeLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="inactiveLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#475569" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#64748b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#475569" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {sources.map((source, sIdx) =>
              destinations.map((dest, dIdx) => {
                const isActive = (sIdx * destinations.length + dIdx) === activeConnection
                return (
                  <g key={`connection-${source.name}-${dest.name}`}>
                    <motion.path
                      d={`M ${source.position.x}% ${source.position.y}% Q 50% 50%, ${dest.position.x}% ${dest.position.y}%`}
                      stroke="url(#inactiveLineGradient)" strokeWidth="1.5" fill="none" strokeDasharray="4,8"
                      initial={{ opacity: 0 }} animate={{ opacity: isActive ? 0 : 0.5 }}
                    />
                    {isActive && (
                      <motion.path
                        d={`M ${source.position.x}% ${source.position.y}% Q 50% 50%, ${dest.position.x}% ${dest.position.y}%`}
                        stroke="url(#activeLineGradient)" strokeWidth="3" fill="none" filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    )}
                  </g>
                )
              })
            )}
          </svg>

          {/* Grid Container for Layout */}
          <div className="grid grid-cols-12 h-full items-center relative z-10 px-8">

            {/* Left: Source Countries (Col 1-3) */}
            <div className="col-span-3 h-full relative border-r border-slate-700/50 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div key={currentGroup} className="absolute inset-0 flex flex-col justify-center gap-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Plane size={14} className="text-slate-500 rotate-45" /> Départ
                  </h3>
                  {sources.map((country, idx) => (
                    <motion.div key={`${currentGroup}-${country.name}`} whileHover={{ x: 10 }} className="bg-slate-900/50 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all flex items-center gap-4 w-[220px] shadow-lg">
                      <Image src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} alt={country.name} width={36} height={27} className="rounded border border-slate-600 shadow-sm" />
                      <span className="font-bold text-white text-base">{country.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center: Globe (Col 4-9) */}
            <div className="col-span-6 flex flex-col items-center justify-center relative">
              <div className="relative w-[450px] h-[450px] xl:w-[550px] xl:h-[550px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_60s_linear_infinite]" />
                <div className="w-full h-full rounded-full flex items-center justify-center filter drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                  <LottieAnimation animationData={WorldAnimation} className="w-[85%] h-[85%] opacity-90 filter hue-rotate-15 contrast-125 saturate-150" />
                </div>
              </div>
            </div>

            {/* Right: Destinations (Col 10-12) */}
            <div className="col-span-3 h-full relative border-l border-slate-700/50 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div key={currentGroup} className="absolute inset-0 flex flex-col justify-center items-end gap-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.5 }}>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center justify-end gap-2 w-full pr-2">
                    <MapPin size={14} className="text-slate-500" /> Arrivée
                  </h3>
                  {destinations.map((country, idx) => (
                    <motion.div key={`${currentGroup}-${country.name}`} whileHover={{ x: -10 }} className="bg-slate-900/50 backdrop-blur-xl p-3.5 rounded-2xl border border-cyan-900/50 hover:border-cyan-400/50 hover:bg-slate-800 transition-all flex items-center justify-between gap-4 w-[240px] shadow-lg">
                      <div className="text-right flex-1">
                        <div className="font-bold text-white text-base">{country.name}</div>
                        <div className="text-xs text-slate-400 font-medium">{country.city}</div>
                      </div>
                      <div className="relative">
                        <Image src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} alt={country.name} width={36} height={27} className="rounded border border-slate-600 shadow-sm relative z-10" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Floating Button for Map center Mobile */}
        <div className="flex justify-center mb-16 lg:hidden">
          <Link href="/liste-pays" className="w-full max-w-sm">
            <Button size="lg" className="w-full bg-white text-slate-900 rounded-2xl font-bold text-lg h-14 shadow-lg active:scale-95 transition-all">
              Voir toutes les destinations
            </Button>
          </Link>
        </div>

        {/* Premium Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {[
            { label: 'Pays Connectés', value: '15+', icon: <Plane className="text-blue-400" size={24} /> },
            { label: 'Cliniques Partenaires', value: '300+', icon: <ShieldCheck className="text-teal-400" size={24} /> },
            { label: 'Patients Traités', value: '5K+', icon: <HeartPulse className="text-rose-400" size={24} /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="bg-slate-800/40 backdrop-blur-md rounded-[2rem] p-8 text-center border border-slate-700/50 hover:bg-slate-800/80 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-900/80 mx-auto flex items-center justify-center mb-6 shadow-inner border border-slate-700/50">
                {stat.icon}
              </div>
              <div className="text-4xl font-extrabold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Continuous Services Ticker */}
        <div className="relative overflow-hidden bg-slate-900/80 border-y border-slate-800 py-6 -mx-4 md:rounded-3xl md:mx-0">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 hidden md:block" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 hidden md:block" />
          <motion.div
            className="flex gap-16 whitespace-nowrap px-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...services, ...services, ...services, ...services].map((service, idx) => (
              <span key={idx} className="text-slate-400 font-black text-lg tracking-wide uppercase flex items-center gap-4">
                <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                {service}
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}