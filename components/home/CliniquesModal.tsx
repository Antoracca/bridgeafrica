'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Building2 } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function CliniquesModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md"
            onClick={onClose}
          >
            <div className="hidden sm:flex flex-col items-start justify-center h-full pl-10 lg:pl-16 select-none pointer-events-none">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
                className="text-[130px] lg:text-[160px] font-black text-white/8 leading-none tabular-nums"
              >
                0
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
                className="text-[28px] lg:text-[36px] font-black text-white/12 leading-tight uppercase"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Hôpitaux<br />& Cliniques
              </motion.p>
            </div>
          </motion.div>

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-[91] flex flex-col shadow-2xl"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1B433E] to-transparent z-10" />

            {/* Header */}
            <div className="shrink-0 bg-[#060a0d] px-6 sm:px-8 pt-6 pb-6 border-b border-white/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[8px] font-bold text-[#4caf91] uppercase tracking-[0.35em] mb-2">
                    MediBridge · Réseau Médical
                  </p>
                  <h2
                    className="text-[22px] text-white leading-tight tracking-tight"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Hôpitaux &amp; Cliniques
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all rounded-sm"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="mt-5 flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <Building2 size={11} className="text-white/35" />
                  <span className="text-[11px] font-semibold text-white/35 tabular-nums">0 établissement</span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <span className="text-[11px] font-semibold text-white/35 uppercase tracking-widest">En construction</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-white">
              <div className="px-8 pt-12 pb-16 flex flex-col items-start">

                {/* Status pill */}
                <div className="inline-flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-sm mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.25em]">En préparation</span>
                </div>

                <h3
                  className="text-[26px] text-slate-900 leading-snug tracking-tight mb-4"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Notre annuaire<br />d&apos;établissements arrive
                </h3>

                <p className="text-[13px] text-slate-400 leading-relaxed mb-12 max-w-sm">
                  Accréditations, équipes médicales, tarifs et logistique de séjour. Tout sera centralisé ici pour vous guider vers les meilleurs soins.
                </p>

                {/* Steps */}
                <div className="w-full space-y-0 border-t border-slate-100">
                  {[
                    { done: true,  text: 'Sélection des établissements partenaires' },
                    { done: true,  text: 'Vérification des accréditations médicales' },
                    { done: false, text: 'Rédaction des fiches détaillées' },
                    { done: false, text: 'Mise en ligne sur MediBridge' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 py-4 border-b border-slate-100">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-[#1B433E]' : 'border-2 border-slate-200'}`}>
                        {step.done && (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <p className={`text-[12.5px] ${step.done ? 'text-slate-800 font-medium' : 'text-slate-350'}`}
                         style={!step.done ? { color: '#c0c7d0' } : {}}>
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-10 w-full">
                  <button
                    onClick={onClose}
                    className="w-full h-12 bg-slate-900 hover:bg-[#1B433E] text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
                  >
                    Fermer
                  </button>
                  <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed">
                    Vous serez notifié(e) dès la mise en ligne<br />via votre espace MediBridge.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
