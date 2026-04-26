'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight } from 'lucide-react'
import { OnboardingModal } from './OnboardingModal'
import { ConciergerieModal } from './ConciergerieModal'

export function FinalCTAs() {
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const [conciergerieOpen, setConciergerieOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center z-20 relative">
        <button 
          onClick={() => setOnboardingOpen(true)}
          className="w-full sm:w-auto bg-brand-teal text-white px-10 h-16 text-xs font-bold uppercase tracking-[0.1em] hover:bg-brand-teal-dark transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(72,156,140,0.2)]"
        >
          Débuter L'Étude de Dossier <ArrowRight size={14} />
        </button>
        <button 
          onClick={() => setConciergerieOpen(true)}
          className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-10 h-16 text-xs font-bold uppercase tracking-[0.1em] hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-3"
        >
          Contacter La Conciergerie
        </button>
      </div>

      {mounted && createPortal(
        <>
          <OnboardingModal isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
          <ConciergerieModal isOpen={conciergerieOpen} onClose={() => setConciergerieOpen(false)} />
        </>,
        document.body
      )}
    </>
  )
}
