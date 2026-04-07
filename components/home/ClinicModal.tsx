'use client'

import { useEffect } from 'react'
import { X, MapPin, Globe, ExternalLink, Star, StarHalf } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { ClinicEntry } from '@/lib/data/homepage'

/* ── Country labels ─────────────────────────────────────────────────── */
const COUNTRY_NAMES: Record<string, string> = {
  ma: 'Maroc',
  tn: 'Tunisie',
  fr: 'France',
  tr: 'Turquie',
}

/* ── Stars ──────────────────────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  const full  = Math.floor(rating)
  const half  = rating % 1 !== 0
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: full  }).map((_, i) => <Star     key={`f${i}`} size={13} className="fill-amber-400 text-amber-400" />)}
      {half &&                                       <StarHalf              size={13} className="fill-amber-400 text-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => <Star     key={`e${i}`} size={13} className="fill-slate-200 text-slate-200" />)}
      <span className="text-[12px] font-bold text-slate-600 ml-1.5">{rating}</span>
    </span>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   CLINIC MODAL
   ══════════════════════════════════════════════════════════════════════ */
interface Props {
  clinic:  ClinicEntry | null
  onClose: () => void
}

export function ClinicModal({ clinic, onClose }: Props) {

  /* ESC to close */
  useEffect(() => {
    if (!clinic) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [clinic, onClose])

  const isHospital = clinic?.category === 'hôpital'

  return (
    <AnimatePresence>
      {clinic && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="clinic-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* ── Panel ── */}
          <motion.div
            key="clinic-panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.96, y: 16  }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[61] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[calc(100vw-2rem)] max-w-lg bg-white shadow-2xl overflow-hidden font-sans"
          >
            {/* Top accent bar */}
            <div className={`h-[3px] w-full ${isHospital ? 'bg-brand-teal' : 'bg-blue-500'}`} />

            {/* ── Header ── */}
            <div className="flex items-start justify-between px-6 pt-5 pb-4">
              <div className="flex items-start gap-4">
                {/* Flag square */}
                <div className="w-12 h-12 bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                  <Image
                    src={`https://flagcdn.com/w80/${clinic.code}.png`}
                    alt={COUNTRY_NAMES[clinic.code] || clinic.code}
                    width={32} height={22}
                    className="w-8 h-auto"
                  />
                </div>
                {/* Name + badges */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5
                      ${isHospital ? 'bg-brand-teal/10 text-brand-teal' : 'bg-blue-50 text-blue-600'}`}>
                      {isHospital ? 'Hôpital' : 'Clinique'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {COUNTRY_NAMES[clinic.code] || clinic.code}
                    </span>
                  </div>
                  <h2 className="text-[17px] font-bold text-slate-900 leading-snug">{clinic.name}</h2>
                </div>
              </div>
              {/* Close */}
              <button
                onClick={onClose}
                className="shrink-0 ml-3 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Meta (location + rating) ── */}
            <div className="px-6 pb-4 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-slate-400 shrink-0" />
                <span className="text-[13px] text-slate-600 font-medium">{clinic.loc}</span>
              </div>
              <span className="text-slate-300 select-none">|</span>
              <Stars rating={clinic.rating} />
            </div>

            <div className="h-px bg-slate-100 mx-6" />

            {/* ── Disciplines ── */}
            <div className="px-6 py-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">
                Disciplines
              </p>
              <div className="flex flex-wrap gap-2">
                {clinic.specialties.map(s => (
                  <span
                    key={s}
                    className="px-3 py-1 text-[12px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Spécialisation principale ── */}
            <div className="px-6 pb-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">
                Spécialisation principale
              </p>
              <p className="text-[13px] text-slate-600 leading-relaxed">{clinic.spec}</p>
            </div>

            <div className="h-px bg-slate-100" />

            {/* ── Footer CTA ── */}
            <div className="px-6 py-4 bg-slate-50 flex items-center justify-between gap-3">
              <Link
                href={clinic.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-brand-teal transition-colors"
              >
                <Globe size={13} />
                Site web
                <ExternalLink size={10} className="opacity-50" />
              </Link>
              <Button
                className="bg-brand-teal hover:bg-brand-teal-dark text-white px-5 h-10 text-[13px] font-bold shadow-sm rounded-none"
                onClick={onClose}
              >
                Choisir cet établissement
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
