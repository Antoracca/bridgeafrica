'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { NAV_CLINICS, NAV_SPECIALTY_DATA } from '@/lib/data/homepage'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Images de remplacement premium pour l'éditorial (car NAV_CLINICS n'a pas de vraies images)
const CLINIC_IMAGES = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1538108149393-cebb47ac1927?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2000&auto=format&fit=crop',
]

const SPECIALTIES_IMAGES = [
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop', // Cardiaque/Chirurgie
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=2000&auto=format&fit=crop', // Esthétique/Luxe
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop', // Orthopédie
  'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=2000&auto=format&fit=crop', // FIV/Maternité
  'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2000&auto=format&fit=crop', // Oncologie
]

export default function MarocDestinationPage() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollContainerRef.current = document.getElementById('app-scroll') as HTMLDivElement | null
  }, [])

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  })

  // Hero Parallax Transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 200])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])

  const clinics = NAV_CLINICS.filter(c => c.code === 'ma')
  const specialties = NAV_SPECIALTY_DATA.filter(s => s.recommended.includes('ma')).slice(0, 5) // Garder les 5 piliers
  
  const [hoveredSpec, setHoveredSpec] = useState<number | null>(0)

  return (
    <main className="bg-[#0A0F14] text-white selection:bg-[#1B433E] selection:text-white font-sans">
      
      {/* ──────────────────────────────────────────────────────────── */}
      {/* ACTE I : THE ARRIVAL (Cinematic Hero) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 w-full h-full">
          <Image 
            src="https://images.unsplash.com/photo-1549487295-849c7d427d14?auto=format&fit=crop&q=80&w=2500"
            alt="Plateforme Médicale Marocaine"
            fill
            className="object-cover opacity-40 grayscale mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F14]/40 via-[#0A0F14]/20 to-[#0A0F14]" />
        </motion.div>

        {/* Huge Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none mix-blend-soft-light opacity-10">
          <h1 className="text-[25vw] font-bold tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
            MAROC
          </h1>
        </div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center sm:items-start text-center sm:text-left mt-24"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-brand-teal" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-teal">Le Dossier Confidentiel</p>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
            className="text-5xl sm:text-7xl lg:text-[7rem] font-medium leading-[0.9] tracking-tight text-white mb-10"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Hub Médical <br/> <span className="text-slate-500 italic font-light">Royal.</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
            className="max-w-xl text-slate-400 text-lg sm:text-xl font-light leading-relaxed mb-16 border-l border-white/20 pl-6"
          >
            Un réseau clinique de pointe concentré sur l'excellence. Chirurgiens de renommée internationale, infrastructures accréditées JCI, et confidentialité absolue.
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-white rotate-90 mb-6">Découvrir</span>
          <div className="w-px h-16 bg-white/20 relative overflow-hidden">
             <motion.div 
               animate={{ y: ['-100%', '100%'] }} 
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 left-0 w-full h-full bg-brand-teal"
             />
          </div>
        </motion.div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* ACTE II : THE ARSENAL (Établissements / Asymétrie Éditoriale) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="py-32 sm:py-48 bg-[#EAE8E3] text-[#1a1f24] relative z-20">
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-32">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-teal mb-6">L'Infrastructure</p>
          <h3 className="text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Des plateaux techniques <br className="hidden sm:block"/>
            <span className="italic text-slate-500 font-light">sans compromis.</span>
          </h3>
        </div>

        <div className="flex flex-col gap-32 sm:gap-48 overflow-hidden pb-20">
          {clinics.map((clinic, index) => {
            const isEven = index % 2 === 0
            const imageStr = CLINIC_IMAGES[index % CLINIC_IMAGES.length]
            const number = (index + 1).toString().padStart(2, '0')

            return (
              <div key={clinic.name} className="relative max-w-[1400px] w-full mx-auto px-6 sm:px-12 flex flex-col">
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 relative`}>
                  
                  {/* Giant Number Behind */}
                  <div className={`absolute top-0 ${isEven ? 'right-0 lg:right-24' : 'left-0 lg:left-24'} text-[20vw] lg:text-[15vw] leading-none font-bold text-[#EAE8E3] drop-shadow-[-2px_2px_0_rgba(0,0,0,0.02)] select-none pointer-events-none z-0`} style={{ fontFamily: 'Georgia, serif' }}>
                    {number}
                  </div>

                  {/* Image container */}
                  <div className="w-full lg:w-[55%] relative z-10 group cursor-pointer perspective-1000">
                    <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] group-hover:-translate-y-2">
                       <Image 
                         src={imageStr}
                         alt={clinic.name}
                         fill
                         className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] scale-100 group-hover:scale-105"
                       />
                       {/* Overlay effect on image */}
                       <div className="absolute inset-0 bg-[#1a1f24]/20 group-hover:bg-transparent transition-colors duration-700" />
                       
                       <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex justify-between items-end">
                         <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold border border-white/30 px-3 py-1 bg-black/40 backdrop-blur-md">Certifié JCI</span>
                         <Link href={clinic.website} target="_blank" className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                           <ArrowRight size={18} />
                         </Link>
                       </div>
                    </div>
                  </div>

                  {/* Text Container */}
                  <div className="w-full lg:w-[45%] relative z-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="bg-[#1B433E] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest">{clinic.loc.toUpperCase()}</div>
                       <div className="flex text-yellow-500 text-[10px] tracking-widest">{'★'.repeat(Math.round(clinic.rating))}</div>
                    </div>
                    
                    <h4 className="text-3xl sm:text-5xl font-medium leading-[1.1] mb-8 text-[#1a1f24]" style={{ fontFamily: 'Georgia, serif' }}>
                      {clinic.name}
                    </h4>
                    
                    <div className="h-px w-full bg-black/10 mb-8" />
                    
                    <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-md">
                      {clinic.spec} L'infrastructure la plus avancée du royaume, dédiée aux patients internationaux exigeant le plus haut standard de sécurité et de confort.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                       <div className="flex flex-col gap-1">
                         <span className="text-[#1B433E]">Spécialisation</span>
                         {clinic.category}
                       </div>
                       <div className="flex flex-col gap-1">
                         <span className="text-[#1B433E]">Capacité</span>
                         Premium / VIP Suites
                       </div>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* ACTE III : THE EXPERTISE (Accordéon Interactif Cinétique) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[800px] w-full bg-[#0A0F14] overflow-hidden flex flex-col">
        
        {/* Images de Fond Dynamiques */}
        <AnimatePresence>
          {hoveredSpec !== null && (
            <motion.div 
              key={hoveredSpec}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: EASE }}
              className="absolute inset-0 pointer-events-none"
            >
              <Image 
                src={SPECIALTIES_IMAGES[hoveredSpec % SPECIALTIES_IMAGES.length]}
                alt="Expertise"
                fill
                className="object-cover mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14] via-transparent to-[#0A0F14]" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-32 w-full">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-teal mb-4">Focus</p>
          <h3 className="text-4xl sm:text-5xl font-medium text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Piliers d'Excellence.
          </h3>
        </div>

        {/* L'Accordéon Éditorial */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-12 pb-20">
          <div className="grid grid-cols-1 divide-y divide-white/10 w-full">
            {specialties.map((spec, i) => {
              const isHovered = hoveredSpec === i
              const isDimmed = hoveredSpec !== null && hoveredSpec !== i

              return (
                <div 
                  key={spec.name}
                  onMouseEnter={() => setHoveredSpec(i)}
                  onMouseLeave={() => setHoveredSpec(null)}
                  className={`group relative py-6 sm:py-8 cursor-pointer transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-10 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
                >
                  <div className="flex-1">
                    <motion.div 
                      layout
                      className="flex items-center gap-6"
                    >
                      <span className="text-[10px] font-bold text-slate-500 tracking-widest hidden sm:block">0{i + 1}</span>
                      <h4 
                        className={`text-3xl sm:text-5xl md:text-6xl font-light tracking-tight transition-all duration-500`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        <span className={isHovered ? 'text-white' : 'text-slate-400'}>{spec.name}</span>
                      </h4>
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full md:w-[400px] text-slate-300 font-light text-sm sm:text-base leading-relaxed overflow-hidden"
                      >
                        <p className="pt-4 md:pt-0">{spec.desc}</p>
                        <div className="mt-4 flex items-center gap-2 text-brand-teal text-[10px] font-bold uppercase tracking-wider">
                          Consulter les experts <ArrowRight size={14} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

      </section>

    </main>
  )
}
