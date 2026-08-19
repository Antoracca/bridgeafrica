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
      <div className="pt-8 sm:pt-12 pb-6 text-center px-4">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#1B433E] font-bold mb-4">
          Excellence Médicale
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1f24] leading-[1.15] tracking-tight max-w-4xl mx-auto"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
        >
          Les Établissements Qui<br className="hidden sm:block" />
          Font Notre Réseau d&apos;Exception
        </h2>
      </div>

      {/* ── Carrousel Convoyeur Majeur ── */}
      <div className="w-full flex justify-center pb-4 pt-10">
        {/* Le conteneur ne doit pas avoir d'overflow hidden pour permettre au card-in-card de déborder au besoin */}
        <div className="relative flex items-center justify-center gap-[4vw] sm:gap-[5vw] min-h-[550px]">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map(item => {
              const isCenter = item.pos === 0
              const isSide = Math.abs(item.pos) === 1
              // Les items à -2 ou +2 existent dans le DOM pour le recalcul layout, mais doivent être invisibles
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
                    // Diminution de 10-15% des largeurs. Bords stricts : pas de border-radius
                    width: isCenter ? 'clamp(280px, 30vw, 380px)' : 'clamp(170px, 19vw, 240px)',
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
                           <div className="absolute top-5 left-0 right-0 flex justify-center">
                             <div className="bg-[#1a1f24]/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                               <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-white">
                                 {item.data.tag}
                               </span>
                             </div>
                           </div>

                           {/* Gradient Sombre en bas */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                           {/* Textes de la carte */}
                           <div className="absolute inset-x-0 bottom-0 px-6 pb-14 text-center sm:text-left">
                             <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70 mb-2.5">
                               <span className="text-white">{item.data.type}</span>
                               <span className="mx-2 text-white/30">|</span>
                               <span>{item.data.date}</span>
                             </p>
                             <h3
                               className="text-xl sm:text-2xl text-white leading-snug mb-3"
                               style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
                             >
                               {item.data.name}
                             </h3>
                           </div>

                           {/* Bloc card-in-card débordant */}
                           <div className="absolute -bottom-10 left-4 right-4 pointer-events-auto shadow-2xl">
                             <div className="bg-[#f0ece9] rounded-xl px-5 py-4 border border-white/30">
                               <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#63666A] mb-1.5">
                                 {item.data.hub} <span className="mx-1 text-[#C4C4C4]">|</span> {item.data.city} <span className="mx-1 text-[#C4C4C4]">|</span> ★ {item.data.rating}
                               </p>
                               <p className="text-[13px] text-[#424242] font-serif leading-relaxed line-clamp-2">
                                 {item.data.spec}
                               </p>
                             </div>
                           </div>
                         </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Nouveau Contenu HOVER (Carte Centrale) */}
                    <AnimatePresence>
                      {isCenter && isHovered && (
                        <motion.div
                          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                          animate={{ 
                            opacity: 1, 
                            backdropFilter: 'blur(8px)', 
                            transition: { duration: 0.4, delay: 0.1 } 
                          }}
                          exit={{ 
                            opacity: 0, 
                            backdropFilter: 'blur(0px)', 
                            transition: { duration: 0.3 } 
                          }}
                          className="absolute inset-0 z-40 bg-white/20 flex flex-col pointer-events-auto"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f24] via-[#1a1f24]/50 to-transparent" />
                          <div className="relative z-50 flex flex-col h-full px-7 pt-12 pb-8 text-white">
                            <h4 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                              Détails de l'établissement
                            </h4>
                            <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-auto">
                              Découvrez nos équipements de pointe, nos parcours personnalisés et notre équipe dédiée à votre santé au sein de {item.data.name}.
                            </p>
                            <div className="flex justify-start mt-4">
                              <Link href="/cliniques" className="bg-[#1B433E] text-white hover:bg-[#122c28] px-5 py-3 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors shadow-lg">
                                En Savoir Plus <ArrowRight className="w-4 h-4 ml-1" />
                              </Link>
                            </div>
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

      {/* ── Contrôles Carrés & Espace de respiration pour le card-in-card ── */}
      {/* Modification critique : justify-start au lieu de justify-center, ramenés à gauche */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 mb-10 flex justify-start">
        <div className="flex items-center gap-[5px]">
          <button onClick={() => setPaused(!paused)} className="w-10 h-10 bg-white border border-[#E5E5E5] flex items-center justify-center transition-colors text-[#63666A] hover:text-[#1a1f24] hover:border-[#1a1f24]">
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <button onClick={prev} className="w-10 h-10 bg-white border border-[#E5E5E5] flex items-center justify-center transition-colors text-[#63666A] hover:text-[#1a1f24] hover:border-[#1a1f24]">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} className="w-10 h-10 bg-white border border-[#E5E5E5] flex items-center justify-center transition-colors text-[#63666A] hover:text-[#1a1f24] hover:border-[#1a1f24]">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Spotlight Bar ── */}
      <div className="flex justify-center pb-12 px-4">
        <div className="inline-flex items-center gap-6 sm:gap-10 px-8 py-4 bg-white border border-[#E5E5E5] shadow-sm rounded-full">
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.18em] uppercase text-[#1a1f24] shrink-0">
            Pont Afrique Santé Spotlight
          </span>
          {spotlights.map((sp, i) => (
            <Link key={i} href="#" className="text-[11px] sm:text-[13px] font-bold uppercase text-slate-800 border-b-2 border-slate-800 pb-[1px] hover:text-[#1B433E] hover:border-[#1B433E] transition-colors hidden sm:block">
              {sp}
            </Link>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="text-center pb-24 px-4">
        <button
          onClick={() => setShowCliniques(true)}
          className="h-14 px-9 bg-[#1a1f24] hover:bg-black text-white text-[13px] font-bold tracking-wide uppercase transition-all duration-300 inline-flex items-center gap-3 group rounded-none"
        >
          Visiter nos Hôpitaux et cliniques
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      <CliniquesModal isOpen={showCliniques} onClose={() => setShowCliniques(false)} />

    </section>
  )
}
