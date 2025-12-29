'use client'

import { useState, useEffect, useRef } from 'react'
import { CheckCircle, Clock, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const packages = [
  {
    id: 1,
    title: "Greffe Capillaire FUE",
    subtitle: "Méthode Sapphire / DHI",
    price: "2 100 €",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop", 
    features: [
      "Vol A/R inclus",
      "Hôtel 5★ (3 nuits)",
      "Max Density (4500 greffons)",
      "PRP inclus",
      "Suivi 12 mois"
    ],
    highlight: "Best Seller",
    duration: "4 Jours",
    mobileColor: "bg-blue-50"
  },
  {
    id: 2,
    title: "Chirurgie Ortho",
    subtitle: "Prothèse Hanche / Genou",
    price: "4 500 €",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Vol A/R inclus",
      "Séjour 14 jours",
      "Prothèse FDA",
      "Rééducation incluse"
    ],
    highlight: "Populaire",
    duration: "15 Jours",
    mobileColor: "bg-white"
  },
  {
    id: 3,
    title: "Check-up Cardiaque",
    subtitle: "Bilan complet",
    price: "990 €",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Vol A/R inclus",
      "Hôtel 5★ (3 jours)",
      "Consultation Professeur",
      "Imagerie complète"
    ],
    highlight: "Express",
    duration: "3 Jours",
    mobileColor: "bg-white"
  },
  {
    id: 4,
    title: "FIV & Fertilité",
    subtitle: "Parcours PMA",
    price: "3 500 €",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Bilan complet couple",
      "Stimulation + Ponction",
      "Labo Embryologie",
      "Support psy"
    ],
    highlight: "Haute Réussite",
    duration: "21 Jours",
    mobileColor: "bg-purple-50"
  },
  {
    id: 5,
    title: "Soins Dentaires",
    subtitle: "Hollywood Smile",
    price: "Sur Devis",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "20 facettes Emax",
      "Implants Premium",
      "Radio 3D offerte",
      "Garantie 10 ans"
    ],
    highlight: null,
    duration: "5 Jours",
    mobileColor: "bg-white"
  },
  {
    id: 7,
    title: "Laser Yeux",
    subtitle: "Correction Vision",
    price: "1 200 €",
    image: "https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80&w=2940&auto=format&fit=crop",
    features: [
      "Lasik / PRK 100%",
      "Myopie / Astigmatisme",
      "Vol + Hôtel inclus"
    ],
    highlight: "Nouveau",
    duration: "3 Jours",
    mobileColor: "bg-white"
  }
]

export function Packages() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  // Gestion du scroll automatique centré
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoScroll && window.innerWidth < 768) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const nextIndex = (activeIndex + 1) % packages.length
          setActiveIndex(nextIndex)
          
          const container = scrollRef.current
          const cardWidth = container.children[0].clientWidth // Largeur d'une carte
          const gap = 16 // Gap de 4 (1rem) = 16px
          
          // Calcul pour centrer: (index * (width + gap)) - (containerWidth/2 - cardWidth/2)
          // Simplifié pour scrollLeft basic vers l'élément
          const scrollPosition = nextIndex * (cardWidth + gap)
          
          container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          })
        }
      }, 2500)
    }
    return () => clearInterval(interval)
  }, [autoScroll, activeIndex])

  // Détection manuelle du scroll pour mettre à jour l'index actif
  const handleScroll = () => {
     if (scrollRef.current) {
        const container = scrollRef.current
        const center = container.scrollLeft + (container.clientWidth / 2)
        const cardWidth = container.children[0].clientWidth + 16
        const newIndex = Math.floor(center / cardWidth)
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < packages.length) {
           setActiveIndex(newIndex)
        }
     }
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/50 -skew-x-12 translate-x-32 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-100/50 -skew-x-12 -translate-x-32 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 border-blue-600 text-blue-600 px-4 py-1 text-sm font-medium rounded-full">
            Offres Exclusives
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            Nos Packages <span className="text-blue-600">Tout Inclus</span>
          </h2>
          <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
            Voyagez sereinement. Nous gérons tout.
          </p>
        </div>

        {/* --- MOBILE CAROUSEL (Horizontal Scroll Centered) --- */}
        <div className="md:hidden relative w-full">
           {/* Scroll Container */}
           <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 px-[10%] scrollbar-hide"
              onTouchStart={() => setAutoScroll(false)} 
              onTouchEnd={() => setTimeout(() => setAutoScroll(true), 5000)}
              style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
           >
              {packages.map((pkg, index) => (
                 <div 
                    key={pkg.id} 
                    className={`
                       min-w-[85%] snap-center rounded-3xl overflow-hidden border shadow-lg flex flex-col h-[400px] transition-all duration-300
                       ${index === activeIndex ? 'scale-100 opacity-100 border-blue-200 shadow-xl' : 'scale-95 opacity-70 border-slate-100'}
                       ${pkg.mobileColor}
                    `}
                 >
                    {/* Image Compacte */}
                    <div className="relative h-[150px] shrink-0">
                       <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                       {pkg.highlight && (
                          <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                             {pkg.highlight}
                          </span>
                       )}
                       <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="font-bold text-lg leading-none shadow-black drop-shadow-md">{pkg.title}</h3>
                          <div className="flex items-center gap-1 text-[10px] opacity-90 mt-1">
                             <Clock size={10} /> {pkg.duration}
                          </div>
                       </div>
                    </div>

                    {/* Content Compact */}
                    <div className="p-4 flex flex-col flex-1">
                       <p className="text-xs text-slate-500 font-medium mb-3 line-clamp-1">{pkg.subtitle}</p>
                       <ul className="space-y-2 mb-4 flex-1">
                          {pkg.features.slice(0, 4).map((f, i) => (
                             <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle size={12} className="text-blue-500 shrink-0 mt-0.5" />
                                <span className="leading-tight line-clamp-2">{f}</span>
                             </li>
                          ))}
                       </ul>
                       <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100/50">
                          <div>
                             <div className="text-[9px] text-slate-400 font-bold uppercase">À partir de</div>
                             <div className="text-lg font-bold text-slate-900">{pkg.price}</div>
                          </div>
                          <Button size="sm" className="rounded-full bg-slate-900 h-8 px-4 text-xs">
                             Réserver
                          </Button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
           
           {/* Indicateur de position (Dots) */}
           <div className="flex justify-center gap-1.5 mt-2">
              {packages.map((_, i) => (
                 <div 
                   key={i} 
                   className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-4 bg-blue-600' : 'w-1.5 bg-slate-300'}`}
                 ></div>
              ))}
           </div>
        </div>


        {/* --- DESKTOP GRID (Hidden on Mobile) --- */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-min">
          {packages.map((pkg) => (
            <div 
                key={pkg.id} 
                className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-2"
            >
              <div className="relative overflow-hidden w-full h-[220px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                     <div className="bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        <Clock size={12} className="text-blue-600" /> {pkg.duration}
                     </div>
                </div>
                {pkg.highlight && (
                  <div className="absolute top-4 right-4 z-20 bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-blue-400">
                    {pkg.highlight}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <h3 className="font-bold text-2xl text-white leading-tight mb-1 shadow-black drop-shadow-md">{pkg.title}</h3>
                   <p className="text-slate-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{pkg.subtitle}</p>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 bg-white relative">
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <CheckCircle size={12} strokeWidth={3} />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-slate-100 mt-auto flex items-end justify-between">
                   <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">À partir de</span>
                      <span className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{pkg.price}</span>
                   </div>
                   <Button size="sm" className="rounded-full bg-slate-900 text-white hover:bg-blue-600 font-bold px-5 h-10 shadow-lg transition-all hover:scale-105 active:scale-95">
                     Réserver
                   </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 md:mt-20 text-center">
            <p className="text-slate-500 text-xs md:text-sm inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white rounded-full shadow-lg shadow-slate-200/50 border border-slate-100">
               <ShieldCheck size={16} className="text-green-500"/>
               <span>
                 <strong>Garantie MediBridge™ :</strong> Assurance annulation et rapatriement incluse.
               </span>
            </p>
        </div>
      </div>
    </section>
  )
}