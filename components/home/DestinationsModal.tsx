'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { NAV_DESTINATIONS } from '@/lib/data/homepage'

interface DestinationsModalProps {
  isOpen: boolean
  onClose: () => void
}

// Données enrichies pour l'affichage visuel dans la modale
const destinationsVisuelles = {
  ma: { image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=800', link: '/destinations/maroc' },
  tn: { image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&q=80&w=800', link: '/destinations/tunisie' },
  fr: { image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', link: '/destinations/france' },
  tr: { image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&q=80&w=800', link: '/destinations/turquie' },
}

export function DestinationsModal({ isOpen, onClose }: DestinationsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay flouté */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center">
                  <MapPin size={16} className="text-brand-teal" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-slate-900 tracking-tight leading-none mb-1">
                    Hubs Internationaux
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                    Sélectionnez votre destination santé
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {NAV_DESTINATIONS.map((dest, i) => {
                  const visuel = destinationsVisuelles[dest.code as keyof typeof destinationsVisuelles]
                  return (
                    <motion.div
                      key={dest.code}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={visuel?.link || '#'}
                        onClick={onClose}
                        className="group relative block w-full aspect-[4/5] overflow-hidden bg-slate-100"
                      >
                        <Image
                          src={visuel?.image || ''}
                          alt={dest.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                        
                        <div className="absolute inset-0 p-5 flex flex-col justify-end">
                          <p className="text-[10px] text-brand-teal-light font-bold uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
                            {dest.type}
                          </p>
                          <h4 className="text-2xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                            {dest.name}
                          </h4>
                          
                          <div className="flex items-center gap-2 text-[11px] text-white font-bold uppercase tracking-wider group/btn opacity-80 group-hover:opacity-100 transition-opacity">
                            Explorer
                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                          </div>
                        </div>

                        {/* Top corner hover effect */}
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <ArrowRight size={14} className="text-white" />
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
