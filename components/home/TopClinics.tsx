'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CliniquesModal } from './CliniquesModal'

/* ─── 12 établissements — uniques, avec vraies images Unsplash ─── */
const CLINICS = [
  // MAROC
  { hub: 'MAROC', city: 'Rabat', name: 'Hôpital International Cheikh Zaid', tag: 'HUB MAROC', spec: 'Pluridisciplinaire: Oncologie, Cardiologie', rating: '4.9', type: 'RAPPORT', date: 'MARS 2026', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' },
  { hub: 'MAROC', city: 'Casablanca', name: 'Clinique Dar Salam', tag: 'HUB MAROC', spec: 'Maternité & PMA, Préservation', rating: '4.7', type: 'ÉTUDE', date: 'AVRIL 2026', image: 'https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' },
  { hub: 'MAROC', city: 'Marrakech', name: 'Clinique Vinci Maroc', tag: 'HUB MAROC', spec: 'Chirurgie Esthétique & Réparative', rating: '4.8', type: 'ANALYSE', date: 'AOÛT 2026', image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' },
  
  // TURQUIE
  { hub: 'TURQUIE', city: 'Istanbul', name: 'Acibadem Hospital', tag: 'HUB TURQUIE', spec: 'Greffe Capillaire (DHI/FUE)', rating: '4.9', type: 'ARTICLE', date: 'JANV. 2026', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' },
  { hub: 'TURQUIE', city: 'Istanbul', name: 'Memorial Sisli', tag: 'HUB TURQUIE', spec: 'Oncologie & Radiothérapie', rating: '4.8', type: 'RAPPORT', date: 'FÉVR. 2026', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' },
  { hub: 'TURQUIE', city: 'Ankara', name: 'Medicana International', tag: 'HUB TURQUIE', spec: 'Chirurgie Robotique & Greffes', rating: '4.7', type: 'ÉTUDE', date: 'JUIN 2026', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' },
  
  // TUNISIE
  { hub: 'TUNISIE', city: 'Tunis', name: 'Clinique Pasteur', tag: 'HUB TUNISIE', spec: 'Affections Digestives & Bariatrique', rating: '4.9', type: 'RAPPORT', date: 'MAI 2026', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' },
  { hub: 'TUNISIE', city: 'Tunis', name: 'Clinique Hannibal', tag: 'HUB TUNISIE', spec: 'Cardiologie Interventionnelle', rating: '4.8', type: 'ANALYSE', date: 'JUILLET 2026', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' },
  { hub: 'TUNISIE', city: 'Sousse', name: 'Clinique Les Oliviers', tag: 'HUB TUNISIE', spec: 'Chirurgie Orthopédique & Traumatologie', rating: '4.7', type: 'ARTICLE', date: 'SEPT. 2026', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' },
  
  // FRANCE
  { hub: 'FRANCE', city: 'Paris', name: 'Hôpital Américain', tag: 'HUB FRANCE', spec: 'Neurochirurgie, Traitement AVC, Spine', rating: '5.0', type: 'ÉTUDE', date: 'OCT. 2026', image: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' },
  { hub: 'FRANCE', city: 'Paris', name: 'Institut Curie', tag: 'HUB FRANCE', spec: 'Recherche clinique & Cancérologie', rating: '4.9', type: 'RAPPORT', date: 'NOV. 2026', image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' },
  { hub: 'FRANCE', city: 'Lyon', name: 'Hôpital Mermoz', tag: 'HUB FRANCE', spec: 'Oncologie, Hépato-gastro & Orthopédie', rating: '4.8', type: 'ARTICLE', date: 'DÉC. 2026', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90' }
]

const spotlights = ['MAROC', 'TURQUIE', 'TUNISIE', 'FRANCE']

export function TopClinics() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showCliniques, setShowCliniques] = useState(false)
  const len = CLINICS.length

  const next = useCallback(() => setActive(a => (a + 1) % len), [len])
  const prev = useCallback(() => setActive(a => (a - 1 + len) % len), [len])

  useEffect(() => {
    if (paused || isHovered) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next, paused, isHovered])

  // Détermination de la fenêtre visible de 5 éléments pour animer doucement les entrées/sorties
  const positions = [-2, -1, 0, 1, 2]
  const visibleItems = positions.map(pos => {
    const idx = (active + pos + len) % len
    return { pos, idx, data: CLINICS[idx] }
  })

  return (
    <section className="bg-[#f5f5f5] overflow-hidden">
      {/* ── Titre ── */}
      <div className="pt-8 sm:pt-12 pb-4 sm:pb-6 text-center px-4">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#1B433E] font-bold mb-2 sm:mb-4">
          Excellence Médicale
        </p>
        <h2
          className="text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl text-[#1a1f24] leading-[1.15] tracking-tight max-w-4xl mx-auto"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
        >
          Les Établissements Qui<br className="hidden sm:block" />
          Font Notre Réseau d&apos;Exception
        </h2>
      </div>

      {/* ── Carrousel Convoyeur Majeur ── */}
      <div className="w-full flex justify-center pb-4 pt-6 sm:pt-10 overflow-hidden">
        {/* Le conteneur ne doit pas avoir d'overflow hidden pour permettre au card-in-card de déborder au besoin */}
        <div className="relative flex items-center justify-center gap-[3vw] sm:gap-[5vw] min-h-[460px] sm:min-h-[550px] max-w-full">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map(item => {
              const isCenter = item.pos === 0
              const isHidden = Math.abs(item.pos) > 1

              return (
                <motion.div
                  layout // Active le déplacement "conveyor belt" hyper fluide en flexbox
                  key={item.idx} // La clé reste constante pour qu'un item glisse physiquement
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: isHidden ? 0 : 1, // Les cartes de côté ne sont plus assombries/translucides
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{
                    duration: 1.2, // Slow-motion majestueux
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  onMouseEnter={() => { if (isCenter) setIsHovered(true) }}
                  onMouseLeave={() => { if (isCenter) setIsHovered(false) }}
                  className="shrink-0 relative cursor-pointer"
                  style={{
                    width: isCenter ? 'clamp(260px, min(85vw, 360px), 380px)' : 'clamp(130px, 18vw, 240px)',
                    aspectRatio: isCenter ? '4/5' : '3/4',
                    zIndex: isCenter ? 30 : isHidden ? 0 : 10
                  }}
                  onClick={() => {
                    if (item.pos === 1) next()
                    if (item.pos === -1) prev()
                  }}
                >
                  <div className="relative w-full h-full">
                    {/* Bords totalement CARRÉS selon la demande (pas de rounded) */}
                    <Image
                      src={item.data.image}
                      alt={item.data.name}
                      fill
                      className="object-cover object-center"
                      sizes="440px"
                      priority={isCenter}
                    />

                    {/* Contenu de la carte centrale (Normal vs Hover) */}
                    <AnimatePresence>
                      {isCenter && !isHovered && (
                         <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ 
                             opacity: 1, 
                             transition: { duration: 0.8, delay: 0.35, ease: [0.32, 0.72, 0, 1] } 
                           }}
                           exit={{ 
                             opacity: 0, 
                             transition: { duration: 0.3, ease: 'linear' } 
                           }}
                           className="absolute inset-0 z-20 pointer-events-none"
                         >
                           {/* Badge Supérieur - Capsule, arrondie */}
                           <div className="absolute top-4 sm:top-5 left-0 right-0 flex justify-center px-2">
                             <div className="bg-white/90 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-xs border border-white/40">
                               <span className="w-1.5 h-1.5 rounded-full bg-[#1B433E]" />
                               <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-[#1a1f24] truncate">
                                 {item.data.hub}
                               </span>
                             </div>
                           </div>

                           {/* Infos Inférieures */}
                           <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                             <div className="text-[10px] sm:text-xs text-white/75 font-medium uppercase tracking-wider mb-1">
                               {item.data.city}
                             </div>
                             <div className="text-base sm:text-lg font-bold text-white leading-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                               {item.data.name}
                             </div>
                             <div className="text-[11px] sm:text-xs text-white/90 line-clamp-2">
                               {item.data.spec}
                             </div>
                           </div>
                         </motion.div>
                      )}

                      {/* État Survolé (Hover) */}
                      {isCenter && isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-[#1a1f24]/90 backdrop-blur-sm z-20 p-5 sm:p-7 flex flex-col justify-between text-white"
                        >
                          <div>
                            <div className="text-[10px] tracking-widest text-[#489C8C] font-bold uppercase mb-2">
                              {item.data.tag}
                            </div>
                            <h4 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                              Détails de l'établissement
                            </h4>
                            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                              Découvrez nos équipements de pointe, nos parcours personnalisés et notre équipe dédiée à votre santé au sein de {item.data.name}.
                            </p>
                          </div>
                          <div className="pt-4">
                            <button onClick={() => setShowCliniques(true)} className="bg-[#1B433E] text-white hover:bg-[#122c28] px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors shadow-lg">
                              En Savoir Plus <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Contrôles Carrés ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 sm:mt-12 mb-6 sm:mb-10 flex justify-start">
        <div className="flex items-center gap-[5px]">
          <button onClick={() => setPaused(!paused)} aria-label={paused ? 'Play' : 'Pause'} className="w-9 h-9 sm:w-10 sm:h-10 bg-white border border-[#E5E5E5] flex items-center justify-center transition-colors text-[#63666A] hover:text-[#1a1f24] hover:border-[#1a1f24]">
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
          <button onClick={prev} aria-label="Précédent" className="w-9 h-9 sm:w-10 sm:h-10 bg-white border border-[#E5E5E5] flex items-center justify-center transition-colors text-[#63666A] hover:text-[#1a1f24] hover:border-[#1a1f24]">
            <ChevronLeft size={15} />
          </button>
          <button onClick={next} aria-label="Suivant" className="w-9 h-9 sm:w-10 sm:h-10 bg-white border border-[#E5E5E5] flex items-center justify-center transition-colors text-[#63666A] hover:text-[#1a1f24] hover:border-[#1a1f24]">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* ── Spotlight Bar ── */}
      <div className="flex justify-center pb-8 sm:pb-12 px-4">
        <div className="inline-flex items-center gap-4 sm:gap-10 px-5 sm:px-8 py-3 sm:py-4 bg-white border border-[#E5E5E5] shadow-xs rounded-full max-w-full overflow-x-auto">
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.18em] uppercase text-[#1a1f24] shrink-0">
            Pont Afrique Santé Spotlight
          </span>
          {spotlights.map((sp, i) => (
            <span key={i} className="text-[11px] sm:text-[13px] font-bold uppercase text-slate-800 border-b-2 border-slate-800 pb-[1px] hover:text-[#1B433E] hover:border-[#1B433E] transition-colors hidden sm:block shrink-0">
              {sp}
            </span>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="text-center pb-16 sm:pb-24 px-4">
        <button
          onClick={() => setShowCliniques(true)}
          className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-9 bg-[#1a1f24] hover:bg-black text-white text-xs sm:text-[13px] font-bold tracking-wide uppercase transition-all duration-300 inline-flex items-center justify-center gap-3 group rounded-none shadow-md"
        >
          Visiter nos Hôpitaux et cliniques
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      <CliniquesModal isOpen={showCliniques} onClose={() => setShowCliniques(false)} />

    </section>
  )
}
