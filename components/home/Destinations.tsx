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
  { name: 'Gabon', code: 'GA', position: { x: 30, y: 45 } },
  { name: 'Cameroun', code: 'CM', position: { x: 20, y: 60 } },
  { name: 'Centrafrique', code: 'CF', position: { x: 25, y: 75 } },
  { name: 'Congo', code: 'CG', position: { x: 15, y: 90 } },
]

const sourcesGroup2 = [
  { name: 'Sénégal', code: 'SN', position: { x: 30, y: 45 } },
  { name: 'Mali', code: 'ML', position: { x: 20, y: 60 } },
  { name: 'Niger', code: 'NE', position: { x: 25, y: 75 } },
  { name: 'Burkina Faso', code: 'BF', position: { x: 15, y: 90 } },
]

const destinationsGroup1 = [
  { name: 'Maroc', code: 'MA', city: 'Casablanca', position: { x: 70, y: 45 } },
  { name: 'Turquie', code: 'TR', city: 'Istanbul', position: { x: 80, y: 60 } },
  { name: 'Tunisie', code: 'TN', city: 'Tunis', position: { x: 75, y: 75 } },
  { name: 'France', code: 'FR', city: 'Paris', position: { x: 85, y: 90 } },
]

const destinationsGroup2 = [
  { name: 'Allemagne', code: 'DE', city: 'Berlin', position: { x: 70, y: 45 } },
  { name: 'Italie', code: 'IT', city: 'Rome', position: { x: 80, y: 60 } },
  { name: 'Belgique', code: 'BE', city: 'Bruxelles', position: { x: 75, y: 75 } },
  { name: 'Suisse', code: 'CH', city: 'Genève', position: { x: 85, y: 90 } },
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
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-6 xl:mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-slate-900 mb-4">
              Le Pont Médical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Intercontinental</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl px-4">
              Connexions en temps réel entre l'Afrique et les pôles d'excellence médicale mondiaux
            </p>
          </motion.div>
        </div>

        {/* Mobile View - Stacked Layout */}
        <div className="lg:hidden space-y-8">
          {/* Countries mobile - Nouveau design */}
          <div className="space-y-8">
            <div>
              <div className="flex flex-col items-center mb-5">
                <h3 className="text-sm font-extrabold text-slate-800 mb-2 tracking-tight">Depuis l&apos;Afrique</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              </div>
              {/* Container avec hauteur fixe pour éviter layout shift - 2x2 = 4 pays */}
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
                          {/* Gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl blur-sm" />

                          {/* Card content */}
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

            {/* Globe central mobile - Entre les deux sections */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center py-4"
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                {/* Rotating rings */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full rounded-full border-2 border-blue-400/30 border-dashed" />
                </motion.div>
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full rounded-full border-2 border-cyan-400/30 border-dashed" />
                </motion.div>

                {/* Globe Lottie */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-cyan-600/10 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-blue-500/20">
                    <LottieAnimation
                      animationData={WorldAnimation}
                      className="w-32 h-32 sm:w-40 sm:h-40"
                    />
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-blue-400"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg">
                <Plane className="inline w-4 h-4 mr-2" />
                Réseau Mondial
              </div>

              {/* Bouton Liste des pays - Mobile */}
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
              {/* Container avec hauteur fixe pour éviter layout shift - 2x2 = 4 pays */}
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
                          {/* Gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-2xl blur-sm" />

                          {/* Card content */}
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

        {/* Desktop View - Globe with connections */}
        <div className="hidden lg:block">
          <div className="relative w-full max-w-[95vw] xl:max-w-[95vw] 2xl:max-w-[95vw] mx-auto h-[900px] xl:h-[1000px] 2xl:h-[1100px]">
            {/* Animated connection lines - Nouvel effet */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                {/* Gradient animé pour les lignes actives */}
                <linearGradient id="activeLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2">
                    <animate attributeName="stopOpacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="1">
                    <animate attributeName="stopOpacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2">
                    <animate attributeName="stopOpacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>

                {/* Gradient pour lignes inactives */}
                <linearGradient id="inactiveLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.1" />
                </linearGradient>

                {/* Effet de glow amélioré */}
                <filter id="connectionGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Effet de pulse pour particules */}
                <radialGradient id="particleGradient">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Lignes de connexion */}
              {sources.map((source, sIdx) =>
                destinations.map((dest, dIdx) => {
                  const index = sIdx * destinations.length + dIdx
                  const isActive = index === activeConnection

                  return (
                    <g key={`connection-${source.name}-${dest.name}`}>
                      {/* Ligne de fond (toujours visible) */}
                      <motion.path
                        d={`M ${source.position.x}% ${source.position.y}% Q 50% 30%, ${dest.position.x}% ${dest.position.y}%`}
                        stroke="url(#inactiveLineGradient)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="8,6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 0 : 0.4 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Ligne active animée */}
                      {isActive && (
                        <motion.path
                          d={`M ${source.position.x}% ${source.position.y}% Q 50% 30%, ${dest.position.x}% ${dest.position.y}%`}
                          stroke="url(#activeLineGradient)"
                          strokeWidth="4"
                          fill="none"
                          filter="url(#connectionGlow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        />
                      )}
                    </g>
                  )
                })
              )}

              {/* Particules animées multiples */}
              {sources.map((source, sIdx) =>
                destinations.map((dest, dIdx) => {
                  const index = sIdx * destinations.length + dIdx
                  const isActive = index === activeConnection

                  if (!isActive) return null

                  return (
                    <g key={`particles-${source.name}-${dest.name}`}>
                      {/* Particule principale */}
                      <motion.circle
                        r="6"
                        fill="url(#particleGradient)"
                        filter="url(#connectionGlow)"
                      >
                        <animateMotion
                          dur="2s"
                          repeatCount="indefinite"
                          path={`M ${source.position.x}% ${source.position.y}% Q 50% 30%, ${dest.position.x}% ${dest.position.y}%`}
                        />
                      </motion.circle>

                      {/* Particule secondaire (plus rapide) */}
                      <motion.circle
                        r="4"
                        fill="#3b82f6"
                        opacity="0.6"
                        filter="url(#connectionGlow)"
                      >
                        <animateMotion
                          dur="1.5s"
                          repeatCount="indefinite"
                          path={`M ${source.position.x}% ${source.position.y}% Q 50% 30%, ${dest.position.x}% ${dest.position.y}%`}
                          begin="0.3s"
                        />
                      </motion.circle>

                      {/* Particule tertiaire (traînée) */}
                      <motion.circle
                        r="3"
                        fill="#06b6d4"
                        opacity="0.4"
                      >
                        <animateMotion
                          dur="2.5s"
                          repeatCount="indefinite"
                          path={`M ${source.position.x}% ${source.position.y}% Q 50% 30%, ${dest.position.x}% ${dest.position.y}%`}
                          begin="0.6s"
                        />
                      </motion.circle>
                    </g>
                  )
                })
              )}
            </svg>

            {/* Central Globe with Lottie - 50% plus grand */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 360 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ zIndex: 5 }}
            >
              <div className="relative">
                {/* Rotating rings */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-[28rem] xl:w-[36rem] 2xl:w-[44rem] h-[28rem] xl:h-[36rem] 2xl:h-[44rem] rounded-full border-2 xl:border-3 border-blue-400/30 border-dashed" />
                </motion.div>
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-[28rem] xl:w-[36rem] 2xl:w-[44rem] h-[28rem] xl:h-[36rem] 2xl:h-[44rem] rounded-full border-2 xl:border-3 border-cyan-400/30 border-dashed" />
                </motion.div>

                {/* Globe core with Lottie - Encore plus grand */}
                <div className="relative w-[28rem] xl:w-[36rem] 2xl:w-[44rem] h-[28rem] xl:h-[36rem] 2xl:h-[44rem] rounded-full bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-cyan-600/10 backdrop-blur-sm shadow-2xl shadow-blue-500/30 flex items-center justify-center overflow-hidden border border-blue-200/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LottieAnimation
                      animationData={WorldAnimation}
                      className="w-[30rem] xl:w-[38rem] 2xl:w-[46rem] h-[30rem] xl:h-[38rem] 2xl:h-[46rem]"
                    />
                  </div>

                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-blue-400"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </div>

                {/* Label */}
                <div className="absolute -bottom-14 xl:-bottom-16 2xl:-bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 xl:px-8 2xl:px-10 py-2.5 xl:py-3 2xl:py-4 rounded-full text-sm xl:text-base 2xl:text-lg font-bold shadow-xl">
                  <Plane className="inline w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 mr-2" />
                  Réseau Mondial
                </div>

                {/* Bouton Liste des pays - Desktop - Beaucoup plus visible */}
                <div className="absolute -bottom-32 xl:-bottom-40 2xl:-bottom-48 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <Link href="/liste-pays">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 xl:px-12 2xl:px-16 py-4 xl:py-5 2xl:py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all group text-base xl:text-xl 2xl:text-2xl font-bold">
                      <span>Consulter la liste des pays éligibles</span>
                      <ArrowRight className="ml-3 xl:ml-4 w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Source countries (left) - Nouveau design - Bien écarté du globe */}
            <div className="absolute left-0 xl:-left-24 2xl:-left-32 top-1/2 -translate-y-1/2 w-56 xl:w-72 2xl:w-80" style={{ zIndex: 10 }}>
              <div className="mb-6">
                <h3 className="text-sm xl:text-base 2xl:text-lg font-extrabold text-slate-800 mb-1 tracking-tight">Depuis l&apos;Afrique</h3>
                <div className="h-1 xl:h-1.5 2xl:h-2 w-16 xl:w-20 2xl:w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              </div>
              {/* Container avec hauteur fixe pour éviter layout shift */}
              <div className="relative h-[340px] xl:h-[420px] 2xl:h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentGroup}
                    className="absolute inset-0 space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {sources.map((country, idx) => (
                      <motion.div
                        key={`${currentGroup}-${country.name}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.08, x: 8 }}
                        className="relative group cursor-pointer"
                      >
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/5 rounded-2xl blur-sm group-hover:blur-md transition-all" />

                        {/* Card content */}
                        <div className="relative bg-white/90 backdrop-blur-xl px-4 xl:px-5 2xl:px-6 py-3 xl:py-4 2xl:py-5 rounded-2xl shadow-lg group-hover:shadow-2xl border border-blue-100 group-hover:border-blue-300 transition-all flex items-center gap-3 xl:gap-4 2xl:gap-5">
                          <div className="relative">
                            <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur group-hover:blur-md transition-all" />
                            <Image
                              src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                              alt={country.name}
                              width={48}
                              height={36}
                              className="relative rounded-lg shadow-md group-hover:scale-105 transition-transform border border-white/50 xl:w-14 xl:h-11 2xl:w-16 2xl:h-12"
                            />
                          </div>
                          <span className="font-bold text-slate-800 text-sm xl:text-base 2xl:text-lg group-hover:text-blue-700 transition-colors">{country.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Destination countries (right) - Nouveau design - Bien écarté du globe */}
            <div className="absolute right-0 xl:-right-24 2xl:-right-32 top-1/2 -translate-y-1/2 w-64 xl:w-80 2xl:w-96" style={{ zIndex: 10 }}>
              <div className="mb-6 flex flex-col items-end">
                <h3 className="text-sm xl:text-base 2xl:text-lg font-extrabold text-slate-800 mb-1 tracking-tight">Destinations Principales</h3>
                <div className="h-1 xl:h-1.5 2xl:h-2 w-20 xl:w-24 2xl:w-28 bg-gradient-to-l from-cyan-600 to-cyan-400 rounded-full"></div>
              </div>
              {/* Container avec hauteur fixe pour éviter layout shift */}
              <div className="relative h-[360px] xl:h-[440px] 2xl:h-[520px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentGroup}
                    className="absolute inset-0 space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {destinations.map((country, idx) => (
                      <motion.div
                        key={`${currentGroup}-${country.name}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.08, x: -8 }}
                        className="relative group cursor-pointer"
                      >
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/10 to-cyan-600/5 rounded-2xl blur-sm group-hover:blur-md transition-all" />

                        {/* Card content */}
                        <div className="relative bg-white/90 backdrop-blur-xl px-4 xl:px-5 2xl:px-6 py-3 xl:py-4 2xl:py-5 rounded-2xl shadow-lg group-hover:shadow-2xl border border-cyan-100 group-hover:border-cyan-300 transition-all flex items-center justify-between gap-3 xl:gap-4 2xl:gap-5">
                          <div className="flex-1 text-right">
                            <div className="font-bold text-slate-900 text-sm xl:text-base 2xl:text-lg group-hover:text-cyan-700 transition-colors">{country.name}</div>
                            <div className="text-xs xl:text-sm 2xl:text-base text-slate-500 flex items-center justify-end gap-1 mt-0.5">
                              <MapPin size={12} className="text-cyan-600 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5" />
                              <span>{country.city}</span>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur group-hover:blur-md transition-all" />
                            <Image
                              src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                              alt={country.name}
                              width={48}
                              height={36}
                              className="relative rounded-lg shadow-md group-hover:scale-105 transition-transform border border-white/50 xl:w-14 xl:h-11 2xl:w-16 2xl:h-12"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-4 md:mt-6 xl:mt-4 space-y-3"
        >
          <div className="grid grid-cols-3 gap-3 sm:gap-4 xl:gap-6 2xl:gap-8 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
            {[
              { label: 'Pays connectés', value: '9+', color: 'from-blue-500 to-blue-600' },
              { label: 'Trajets/an', value: '500+', color: 'from-cyan-500 to-cyan-600' },
              { label: 'Satisfaction', value: '98%', color: 'from-emerald-500 to-emerald-600' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl xl:rounded-3xl p-3 sm:p-4 md:p-5 xl:p-6 2xl:p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm xl:text-base 2xl:text-lg text-slate-600 mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Objectif en cours */}
          <div className="text-center">
            <p className="text-xs sm:text-sm xl:text-base 2xl:text-lg text-slate-500 font-medium">
              <span className="inline-flex items-center gap-2 xl:gap-3 px-3 xl:px-4 2xl:px-5 py-1.5 xl:py-2 2xl:py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-200">
                <span className="w-2 h-2 xl:w-2.5 xl:h-2.5 2xl:w-3 2xl:h-3 bg-blue-500 rounded-full animate-pulse"></span>
                Objectif en cours : 50+ pays d&apos;ici 2026
              </span>
            </p>
          </div>
        </motion.div>

        {/* Bandeau défilant des services */}
        <div className="mt-6 xl:mt-6 overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 py-3 xl:py-4 2xl:py-5 relative">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <motion.div
            className="flex gap-8 xl:gap-12 2xl:gap-16 whitespace-nowrap relative z-10"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...services, ...services].map((service, idx) => (
              <span key={idx} className="text-white font-semibold text-sm xl:text-base 2xl:text-lg flex items-center gap-2 xl:gap-3">
                <span className="w-1.5 h-1.5 xl:w-2 xl:h-2 2xl:w-2.5 2xl:h-2.5 bg-white rounded-full"></span>
                {service}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
