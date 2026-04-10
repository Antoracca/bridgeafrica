'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DestinationsModal } from './DestinationsModal'

/* ─── Data ─── */
const destinations = [
  {
    city: 'Rabat & Casablanca',
    country: 'Maroc',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1920',
    tagline: "Infrastructures de pointe et expertise médico-chirurgicale de premier plan.",
    specialties: ['Oncologie avancée', 'Maternité & PMA', 'Chirurgie bariatrique'],
  },
  {
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1920',
    tagline: "Pôle de référence mondial en traitements lourds et protocoles innovants.",
    specialties: ['Génomique', 'Oncologie Pédiatrique', 'Cardiologie'],
  },
  {
    city: 'Istanbul',
    country: 'Turquie',
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&q=80&w=1920',
    tagline: "Leader technologique de la restauration capillaire et des actes esthétiques.",
    specialties: ['Greffe DHI/FUE', 'Chirurgie Esthétique', 'Implants dentaires'],
  },
  {
    city: 'Tunis',
    country: 'Tunisie',
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&q=80&w=1920',
    tagline: "Excellence chirurgicale avérée et structures hospitalières accréditées.",
    specialties: ['Chirurgie de l\'Obésité', 'Chirurgie Générale', 'Ophtalmologie'],
  },
]

const metrics = [
  { value: '4',   suffix: 'Hubs',     desc: "d'excellence internationaux" },
  { value: '10+', suffix: 'Hôpitaux & Cliniques', desc: 'certifiés JCI & Standards ISO' },
  { value: '24/7', suffix: '',         desc: 'Conciergerie & assistance médicale' },
]

/* ─── Animated counter ─── */
function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const numericPart = value.replace(/[^0-9]/g, '')
  const hasPlus = value.endsWith('+')
  const isNumeric = numericPart.length > 0 && !value.includes('/')
  const [display, setDisplay] = useState(isNumeric ? '0' : value)

  useEffect(() => {
    if (!isInView || !isNumeric) return
    const target = parseInt(numericPart)
    const steps = 60
    let step = 0
    const timer = setInterval(() => {
      step++
      const current = Math.min(Math.round((target / steps) * step), target)
      setDisplay(current.toLocaleString('fr-FR'))
      if (step >= steps) clearInterval(timer)
    }, 2000 / steps)
    return () => clearInterval(timer)
  }, [isInView, isNumeric, numericPart])

  return (
    <span ref={ref}>
      {display}{hasPlus && isNumeric ? '+' : ''}
      {suffix && <span className="text-slate-400 font-normal ml-1.5 text-lg sm:text-xl">{suffix}</span>}
    </span>
  )
}

/* ─── Component ─── */
export function Destinations() {
  const [active, setActive] = useState(0)
  const [destModalOpen, setDestModalOpen] = useState(false)

  const next = useCallback(() => setActive(p => (p + 1) % destinations.length), [])

  useEffect(() => {
    const id = setInterval(next, 10000)
    return () => clearInterval(id)
  }, [next])

  const dest = destinations[active]

  return (
    <section className="relative bg-brand-cream overflow-hidden">

      {/* ── Effet "Nuage de disparition" (Transition depuis fond blanc de la section Hero) ── */}
      <div className="absolute top-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-b from-white to-transparent opacity-100 z-10 pointer-events-none" />

      {/* ── Top: Section header on cream background ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 pt-8 sm:pt-14 pb-8 sm:pb-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-slate-400 font-semibold mb-4">
              Destinations
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Votre pont vers les <br className="hidden sm:block" />
              meilleurs soins au monde
            </h2>
          </div>
          <button
            onClick={() => setDestModalOpen(true)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                       bg-slate-900 text-white text-sm font-semibold
                       hover:bg-slate-800 transition-all duration-300 self-start sm:self-auto flex-shrink-0"
          >
            Toutes les destinations
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </motion.div>
      </div>

      {/* ── Full-bleed destination showcase ── */}
      <div className="relative min-h-[55vh] sm:min-h-[65vh] lg:min-h-[70vh]">

        {/* Background images — full width, integrated */}
        {destinations.map((d, idx) => (
          <motion.div
            key={idx}
            animate={{ opacity: active === idx ? 1 : 0 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
            style={{ zIndex: active === idx ? 1 : 0 }}
          >
            <Image
              src={d.image}
              alt={d.city}
              fill
              className="object-cover"
              priority={idx === 0}
              sizes="100vw"
            />
          </motion.div>
        ))}

        {/* Warm overlay — connects cream bg above to image */}
        <div className="absolute inset-0 z-[2]" style={{
          background: 'linear-gradient(to bottom, #faf9f7 0%, rgba(250,249,247,0.3) 15%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.55) 100%)'
        }} />
        <div className="absolute inset-0 z-[2]" style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)'
        }} />

        {/* Content — bottom-left */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-14 pb-12 sm:pb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`dest-${active}`}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3
                  className="font-extrabold text-white leading-[0.95] tracking-tight mb-2"
                  style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}
                >
                  {dest.city}
                </h3>
                <p className="text-base sm:text-lg text-white/60 font-medium tracking-widest uppercase mb-5">
                  {dest.country}
                </p>
                <p className="text-sm sm:text-base text-white/55 leading-relaxed max-w-md mb-5">
                  {dest.tagline}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dest.specialties.map(s => (
                    <span
                      key={s}
                      className="px-3.5 py-1.5 text-[12px] sm:text-[13px] font-medium text-white/70
                                 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Metrics Verticales & Descriptif Médical ── */}
      <div className="relative z-20 pt-16 pb-20 sm:pt-28 sm:pb-32 overflow-hidden bg-brand-cream border-t border-brand-teal/10">
        
        {/* Image de fond — mobile: plein fond centré / desktop: ancré à droite avec fondu */}
        {/* Mobile : fond absolu plein-section, centré pour montrer le cœur */}
        <div className="lg:hidden absolute inset-0 z-0 opacity-20 mix-blend-luminosity pointer-events-none">
          <Image 
            src="https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=800&auto=format&fit=crop"
            alt="Medical background"
            fill
            className="object-cover object-center"
          />
        </div>
        {/* Desktop : ancré à droite avec fondu gauche */}
        <div 
          className="hidden lg:block absolute top-0 right-0 w-[65%] h-full z-0 opacity-40 mix-blend-luminosity pointer-events-none" 
          style={{
            maskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 100%)'
          }}
        >
          <Image 
            src="https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Medical background"
            fill
            className="object-cover object-right"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24">
            
            {/* Colonne Gauche : Métriques Verticales */}
            <div className="w-full lg:w-[350px] shrink-0 border-l-2 border-brand-teal/30 pl-8 lg:pl-10 relative">
              {/* Ligne d'accentuation design */}
              <div className="absolute top-0 -left-[2px] w-[2px] h-12 bg-brand-teal" />
              
              <div className="flex flex-col gap-10">
                {metrics.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-[2.5rem] sm:text-[3rem] font-black text-brand-navy tracking-tighter leading-none mb-2 drop-shadow-sm">
                      <AnimatedCounter value={m.value} suffix={m.suffix} />
                    </p>
                    <p className="text-[13px] sm:text-[14px] text-slate-600 font-bold uppercase tracking-wider">{m.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Colonne Droite : Descriptif Médical Pro */}
            <div className="flex-1 lg:pt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-brand-navy mb-6">
                  Une sélection clinique d'une exigence absolue
                </h3>
                <div className="space-y-6 text-[15px] sm:text-base text-slate-600 leading-relaxed font-medium">
                  <p>
                    Afin de vous garantir une sécurité médicale irréprochable et des résultats thérapeutiques optimaux, le comité de sélection de MediBridge a identifié <strong className="text-brand-teal-dark font-bold">4 hubs internationaux de premier plan</strong>. Ces destinations concentrent l'élite des praticiens spécialisés ainsi que des infrastructures hospitalières rigoureusement conformes aux standards mondiaux de santé.
                  </p>
                  <p>
                    Chaque établissement de notre réseau est systématiquement audité sur des indicateurs précis : certifications internationales (JCI, ISO), maintien de l'hygiène, taux de succès cliniques, et confort post-opératoire. Nous ne laissons aucune place à l'improvisation lorsqu'il s'agit de votre intégrité physique.
                  </p>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </div>
      <DestinationsModal isOpen={destModalOpen} onClose={() => setDestModalOpen(false)} />
    </section>
  )
}
