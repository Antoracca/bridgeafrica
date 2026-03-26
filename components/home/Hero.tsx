'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Plane, Brain, Star, ChevronRight, CheckCircle2, ShieldCheck, Stethoscope, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then(m => m.DotLottieReact),
  { ssr: false, loading: () => <div className="w-full h-full rounded-full bg-slate-50 animate-pulse" /> }
)

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } as const },
}

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const words = ["Frontières.", "Limites.", "Compromis."]

  const [activeLottieIndex, setActiveLottieIndex] = useState(0)

  const lottieScenes = [
    {
      id: 'doctors',
      src: '/doctors.lottie',
      cards: [
        {
          icon: <MapPin size={24} strokeWidth={2.5} />,
          color: 'from-rose-100 to-red-50 text-red-500',
          title: 'Destination Top',
          desc: 'Istanbul, Turquie',
          position: 'top-28 -left-8',
          animationY: [0, -15, 0],
          delay: 0.6
        },
        {
          icon: <Plane size={24} strokeWidth={2.5} />,
          color: 'from-blue-100 to-blue-50 text-blue-600',
          title: 'Pack Complet',
          desc: 'Soins + Vol + Hôtel',
          position: 'bottom-32 -right-4',
          animationY: [0, 15, 0],
          delay: 0.8,
          badge: <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={3} />
        }
      ]
    },
    {
      id: 'search',
      src: '/search.lottie',
      cards: [
        {
          icon: <Search size={24} strokeWidth={2.5} />,
          color: 'from-amber-100 to-amber-50 text-amber-500',
          title: 'Recherche IA',
          desc: 'Cliniques sur mesure',
          position: 'top-20 -left-6',
          animationY: [0, -12, 0],
          delay: 0.6
        },
        {
          icon: <ShieldCheck size={24} strokeWidth={2.5} />,
          color: 'from-emerald-100 to-emerald-50 text-emerald-500',
          title: '100% Vérifié',
          desc: 'Spécialistes certifiés',
          position: 'bottom-24 -right-2',
          animationY: [0, 12, 0],
          delay: 0.8
        }
      ]
    },
    {
      id: 'medical',
      src: '/Medical.lottie',
      cards: [
        {
          icon: <Stethoscope size={24} strokeWidth={2.5} />,
          color: 'from-purple-100 to-purple-50 text-purple-600',
          title: 'Expertise',
          desc: 'Top Médecins',
          position: 'top-24 -left-10',
          animationY: [0, -15, 0],
          delay: 0.6
        },
        {
          icon: <Activity size={24} strokeWidth={2.5} />,
          color: 'from-cyan-100 to-cyan-50 text-cyan-600',
          title: 'Suivi Patient',
          desc: 'Accompagnement 24/7',
          position: 'bottom-36 -right-6',
          animationY: [0, 15, 0],
          delay: 0.8
        }
      ]
    }
  ]

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 3500)

    const lottieInterval = setInterval(() => {
      setActiveLottieIndex((prev) => (prev + 1) % lottieScenes.length)
    }, 5000)

    return () => {
      clearInterval(wordInterval)
      clearInterval(lottieInterval)
    }
  }, [words.length])

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-28 pb-20 bg-white" suppressHydrationWarning>

      {/* Dynamic Backgrounds - Pure White Vibe */}
      <div className="absolute inset-0 bg-white -z-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 -z-10" />

      {/* Static Orbs - decorative background, no animation */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-tr from-blue-100 to-teal-50 rounded-full blur-[120px] opacity-20 -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-indigo-50 to-blue-50 rounded-full blur-[100px] opacity-15 -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid xl:grid-cols-12 gap-12 items-center">

        {/* === LEFT CONTENT === */}
        <div className="w-full text-center xl:text-left mx-auto max-w-3xl xl:max-w-none xl:col-span-7">
          <motion.div
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {/* Trust Badge */}
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex items-center justify-center xl:justify-start gap-4 mb-10 w-fit mx-auto xl:mx-0 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-100 shadow-sm">
              <div className="flex -space-x-4">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                ].map((img, i) => (
                  <Image key={i} src={img} alt={`Patient ${i}`} width={40} height={40} className="rounded-full border-2 border-white object-cover shadow-sm" />
                ))}
              </div>
              <div className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
                <span className="text-slate-900 font-bold ml-1">4.9/5</span> (1000+ avis)
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS} className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
              L'excellence médicale <br className="hidden md:block" />
              sans <span className="inline-grid w-[240px] sm:w-[350px] justify-center xl:justify-start">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.5 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 col-start-1 row-start-1"
                  >
                    {words[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto xl:mx-0 font-medium">
              Votre santé mérite les meilleurs experts mondiaux. De la consultation au voyage, nous organisons tout pour vous avec
              <span className="text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md mx-1.5 shadow-sm border border-blue-100">0 tracas</span>.
            </motion.p>

            {/* Interactive Search Bar */}
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="relative w-full max-w-2xl mx-auto xl:mx-0 group mb-12 cursor-text">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 rounded-[1.25rem] blur opacity-20 group-hover:opacity-40 transition duration-700"></div>

              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 flex flex-col sm:flex-row gap-2 transition-all duration-300 z-10">
                <div className="flex-1 flex items-center gap-3 px-5 h-14 sm:h-auto bg-slate-50/80 rounded-xl border border-slate-100/50 focus-within:bg-white focus-within:ring-2 ring-blue-500/20 transition-all">
                  <Search className="text-blue-500 w-5 h-5 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Intervention, pays, clinique..."
                    className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400 font-medium text-base sm:text-lg"
                    suppressHydrationWarning
                  />
                </div>
                <Button className="w-full sm:w-auto relative group/btn rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-8 h-14 text-base font-bold shadow-lg transition-all animate-none overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Explorer
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>

              {/* Quick Tags */}
              <div className="mt-5 flex flex-wrap justify-center xl:justify-start gap-2 items-center relative z-20">
                <span className="text-sm font-semibold text-slate-400 mr-2">Populaire :</span>
                {['Greffe Capillaire', 'Dentisterie', 'FIV'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 bg-white text-slate-600 text-sm font-semibold rounded-full border border-slate-200 shadow-sm cursor-pointer hover:border-blue-300 hover:text-blue-600 hover:shadow-md hover:bg-blue-50 transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Premium Stats */}
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
              {[
                { val: '300+', label: 'Cliniques certifiées' },
                { val: '-70%', label: "D'économies" },
                { val: '24/7', label: 'Assistance dédiée' },
                { val: 'JCI', label: 'Standards mondiaux' },
              ].map((stat, i) => (
                <div key={i} className="text-center xl:text-left">
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 mb-1">{stat.val}</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* === RIGHT VISUAL COMPOSITION (Lottie Animation) === */}
        <div className="hidden xl:flex col-span-5 relative h-[700px] w-full items-center justify-center">
          {/* Background decorative circles - CSS spin (GPU-composited, no JS) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[1.5px] border-dashed border-slate-200 rounded-full opacity-40 pointer-events-none animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-blue-50/50 to-cyan-50/50 rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={lottieScenes[activeLottieIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {/* Main Lottie Animation */}
              <div className="absolute w-[600px] z-10 pointer-events-none">
                <DotLottieReact src={lottieScenes[activeLottieIndex].src} loop autoplay className="w-full h-full drop-shadow-2xl" />
              </div>

              {/* Floating Cards */}
              {lottieScenes[activeLottieIndex].cards.map((card, idx) => (
                <motion.div
                  key={`${lottieScenes[activeLottieIndex].id}-card-${idx}`}
                  initial={{ opacity: 0, y: (idx % 2 === 0 ? -40 : 40) }}
                  animate={{ opacity: 1, y: card.animationY }}
                  transition={{
                    opacity: { duration: 0.6, delay: card.delay },
                    y: { repeat: Infinity, duration: 6 + idx, ease: "easeInOut", delay: card.delay }
                  }}
                  className={`absolute ${card.position} bg-white/95 backdrop-blur-xl p-4 rounded-[1.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 z-20 flex items-center gap-4 hover:scale-105 transition-transform duration-300 pointer-events-auto cursor-pointer`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                    {card.icon}
                  </div>
                  <div>
                    {card.badge ? (
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{card.title}</div>
                        {card.badge}
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">{card.title}</div>
                    )}
                    <div className="text-base font-extrabold text-slate-900">{card.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>


        </div>

      </div>
    </section>
  )
}