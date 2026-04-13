'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Video, CalendarCheck, Award, BookOpen, Globe, GraduationCap, Users, Briefcase } from 'lucide-react'
import Image from 'next/image'

export interface DoctorFull {
  id: string
  name: string
  title: string
  specialties: string[]
  specialty: string
  location: string
  country: string
  countryLabel: string
  establishment: string
  teleconsultation: boolean
  onlineBooking: boolean
  image: string
  bio: string
  experience: number
  languages: string[]
  education: string
  publications: number
  consultations: number
}

interface Props {
  isOpen: boolean
  onClose: () => void
  doctor: DoctorFull | null
  onBookRDV?: () => void
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function DoctorProfileModal({ isOpen, onClose, doctor, onBookRDV }: Props) {
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

  if (!doctor) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 left-0 h-full w-full sm:w-[540px] bg-white z-[91] flex flex-col shadow-2xl"
          >
            {/* Hero header avec photo */}
            <div className="shrink-0 relative bg-[#003B5C] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#003B5C] via-[#006994] to-[#003B5C] opacity-90" />
              <div className="relative z-10 px-6 sm:px-8 pt-6 pb-8">
                <div className="flex items-start justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1 text-[8px] font-bold text-white uppercase tracking-[0.3em]">
                    <Award size={9} />
                    Partenaire MediBridge
                  </span>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="flex items-end gap-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-[3px] border-white/20 shrink-0 shadow-xl">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="pb-1">
                    <h2
                      className="text-[22px] sm:text-[26px] text-white leading-snug tracking-tight"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {doctor.name}
                    </h2>
                    <p className="text-white/70 text-[13px] mt-1">{doctor.title}</p>
                    <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] text-white/60">
                        <MapPin size={9} />
                        {doctor.location}, {doctor.countryLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-white/60">
                        <Briefcase size={9} />
                        {doctor.establishment}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content scrollable */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              <div className="px-6 sm:px-8 py-7">

                {/* Stats bar */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: 'Années d\'expérience', value: `${doctor.experience}+` },
                    { label: 'Consultations', value: `${doctor.consultations.toLocaleString()}+` },
                    { label: 'Publications', value: `${doctor.publications}` },
                  ].map((s, i) => (
                    <div key={i} className="text-center py-3 border border-slate-100">
                      <p className="text-[20px] font-bold text-[#006994] tabular-nums" style={{ fontFamily: 'Georgia, serif' }}>{s.value}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Biographie */}
                <div className="mb-7">
                  <h4 className="text-[10px] font-bold text-[#006994] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
                    <BookOpen size={11} />
                    Biographie
                  </h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed">{doctor.bio}</p>
                </div>

                {/* Spécialités */}
                <div className="mb-7">
                  <h4 className="text-[10px] font-bold text-[#006994] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
                    <Award size={11} />
                    Spécialités & Expertises
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specialties.map(s => (
                      <span key={s} className="text-[11px] font-semibold text-slate-600 bg-[#faf8f5] border border-[#ebe5dc] px-3 py-1.5">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Formation */}
                <div className="mb-7">
                  <h4 className="text-[10px] font-bold text-[#006994] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
                    <GraduationCap size={11} />
                    Formation
                  </h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed">{doctor.education}</p>
                </div>

                {/* Langues */}
                <div className="mb-7">
                  <h4 className="text-[10px] font-bold text-[#006994] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
                    <Globe size={11} />
                    Langues parlées
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map(l => (
                      <span key={l} className="text-[11px] font-semibold text-slate-600 border border-slate-200 px-3 py-1.5">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Disponibilités */}
                <div className="mb-7">
                  <h4 className="text-[10px] font-bold text-[#006994] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
                    <Users size={11} />
                    Modalités de consultation
                  </h4>
                  <div className="space-y-2">
                    {doctor.onlineBooking && (
                      <div className="flex items-center gap-2.5 text-[12px] text-slate-600">
                        <CalendarCheck size={13} className="text-emerald-500" />
                        Prise de rendez-vous en ligne disponible
                      </div>
                    )}
                    {doctor.teleconsultation && (
                      <div className="flex items-center gap-2.5 text-[12px] text-slate-600">
                        <Video size={13} className="text-[#006994]" />
                        Téléconsultation disponible (patients hors destination)
                      </div>
                    )}
                    <div className="flex items-center gap-2.5 text-[12px] text-slate-600">
                      <MapPin size={13} className="text-slate-400" />
                      Consultation en présentiel — {doctor.establishment}, {doctor.location}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer CTA */}
            <div className="shrink-0 px-6 sm:px-8 py-4 border-t border-slate-100 bg-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 h-11 border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px] font-bold uppercase tracking-wider transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={() => { onBookRDV?.() }}
                  className="flex-1 h-11 bg-[#006994] hover:bg-[#005174] text-white text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  Prendre rendez-vous
                  <CalendarCheck size={13} />
                </button>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
