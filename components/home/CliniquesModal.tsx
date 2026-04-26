'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Building2 } from 'lucide-react'
import { useScrollLock } from '@/lib/hooks/useScrollLock'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function CliniquesModal({ isOpen, onClose }: Props) {
  useScrollLock(isOpen)

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
            <div className="shrink-0 bg-[#FDFBF7] px-6 sm:px-8 pt-6 pb-6 border-b border-[#E1E1E1]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[8px] font-bold text-[#1B433E] uppercase tracking-[0.35em] mb-2">
                    MediBridge · Réseau Médical
                  </p>
                  <h2
                    className="text-[22px] text-[#1a1f24] leading-tight tracking-tight"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    L'Annuaire des Établissements
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 border border-transparent hover:border-[#E1E1E1] transition-all rounded-full"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <Building2 size={11} className="text-slate-500" />
                  <span className="text-[11px] font-semibold text-slate-500 tabular-nums">Accréditations JCI & ISO</span>
                </div>
                <div className="w-px h-3 bg-[#E1E1E1]" />
                <span className="text-[11px] font-semibold text-[#1a1f24] uppercase tracking-widest">Publication Imminente</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-white" style={{ overscrollBehavior: 'none' }}>
              <div className="px-6 sm:px-8 py-5 flex flex-col items-start justify-center min-h-full">

                <h3
                  className="text-[24px] tracking-tight mb-3"
                  style={{ fontFamily: 'Georgia, serif', color: '#1B433E' }}
                >
                  Certification des infrastructures.
                </h3>

                <p className="text-[13px] text-slate-500 font-light leading-relaxed mb-6 max-w-sm">
                  Notre collège indépendant vérifie activement les accréditations JCI, les plateaux techniques et la sécurisation des processus.
                </p>

                {/* Steps */}
                <div className="w-full space-y-0 border-t border-slate-100">
                  {[
                    { done: true,  text: 'Sélection des partenaires' },
                    { done: true,  text: 'Vérification accréditations' },
                    { done: false, text: 'Audit sur site' },
                    { done: false, text: 'Publication MediBridge' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 py-3 border-b border-slate-100">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-[#1B433E]' : 'border border-slate-200'}`}>
                        {step.done && (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <p className={`text-[12px] ${step.done ? 'text-slate-800 font-medium' : 'text-slate-300'}`}>
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6 w-full">
                  <button
                    onClick={onClose}
                    className="w-full h-[50px] bg-[#1B433E] hover:bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-none shadow-sm"
                  >
                    Retourner au portail
                  </button>
                  <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed italic">
                    Notification automatique dès l'ouverture<br />du registre public.
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
