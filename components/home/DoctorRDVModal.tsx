'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Clock, Monitor, Award, MapPin, CalendarCheck, Send, Loader2 } from 'lucide-react'
import Image from 'next/image'
import type { DoctorFull } from './DoctorProfileModal'
import { useScrollLock } from '@/lib/hooks/useScrollLock'

interface Props {
  isOpen: boolean
  onClose: () => void
  doctor: DoctorFull | null
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

/* Simulated availability — seeded from doctor id */
function getAvailability(doctorId: string, year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const avail: Record<number, string[]> = {}
  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = new Date(year, month, d).getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) continue // weekends off
    const hash = (parseInt(doctorId) * 7 + d * 13 + month * 3) % 10
    if (hash < 4) continue // ~40% unavailable
    const slotCount = 2 + (hash % 4)
    const startIdx = hash % 3
    avail[d] = SLOTS.slice(startIdx, startIdx + slotCount)
  }
  return avail
}

export function DoctorRDVModal({ isOpen, onClose, doctor }: Props) {
  const now = new Date()
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMonthOffset(0)
        setSelectedDay(null)
        setSelectedSlot(null)
        setSending(false)
        setSent(false)
      }, 400)
    }
  }, [isOpen])

  const handleConfirm = () => {
    if (!selectedDay || !selectedSlot || sending) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 2200)
  }

  const viewDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = (viewDate.getDay() + 6) % 7 // Monday = 0

  const availability = useMemo(
    () => doctor ? getAvailability(doctor.id, year, month) : {},
    [doctor, year, month]
  )

  const slotsForDay = selectedDay ? (availability[selectedDay] || []) : []

  if (!doctor) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — profil médecin à gauche */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md"
            onClick={onClose}
          >
            {/* Profil médecin sur fond gauche — desktop, centré verticalement */}
            <div className="hidden sm:flex flex-col items-start justify-center h-full pl-10 lg:pl-16 select-none pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
                className="relative max-w-md"
              >
                {/* White cloud/wave surround effect */}
                <div className="absolute -inset-8 lg:-inset-12 z-0">
                  {/* Top-left wave */}
                  <div className="absolute -top-6 -left-6 w-40 h-40 bg-gradient-to-br from-white/20 via-white/8 to-transparent rounded-full blur-2xl" />
                  {/* Right wave */}
                  <div className="absolute top-1/4 -right-8 w-32 h-48 bg-gradient-to-l from-white/15 via-white/5 to-transparent rounded-full blur-2xl" />
                  {/* Bottom wave */}
                  <div className="absolute -bottom-8 left-1/4 w-56 h-32 bg-gradient-to-t from-white/20 via-white/8 to-transparent rounded-full blur-3xl" />
                  {/* Top-right wave */}
                  <div className="absolute -top-4 right-1/4 w-36 h-28 bg-gradient-to-b from-white/12 via-white/5 to-transparent rounded-full blur-2xl" />
                  {/* Bottom-left wave */}
                  <div className="absolute bottom-1/4 -left-8 w-28 h-36 bg-gradient-to-r from-white/15 via-white/5 to-transparent rounded-full blur-2xl" />
                </div>

                {/* Green transparent glass card */}
                <div className="relative z-10 bg-[#1B433E]/60 backdrop-blur-md border border-white/20 px-8 py-8 lg:px-10 lg:py-10 shadow-2xl rounded-sm">

                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <Award size={12} className="text-[#4caf91]" />
                    <span className="text-[9px] font-bold text-[#4caf91] uppercase tracking-[0.3em]">Partenaire Pont Afrique Santé</span>
                  </div>

                  {/* Doctor info */}
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-[3px] border-white/25 shadow-xl shrink-0">
                      <Image src={doctor.image} alt="" width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-white text-[24px] lg:text-[28px] font-semibold leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                        {doctor.name}
                      </p>
                      <p className="text-white/60 text-[14px] mt-1">{doctor.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 mb-5 text-[12px] text-white/50">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={11} />
                      {doctor.establishment}
                    </span>
                    <span>{doctor.location}, {doctor.countryLabel}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {doctor.specialties.slice(0, 4).map(s => (
                      <span key={s} className="text-[10px] font-semibold text-white/50 border border-white/15 px-3 py-1.5">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Panel RDV — droite */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 right-0 h-full w-full sm:w-[460px] bg-white z-[91] flex flex-col shadow-2xl"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1B433E] to-transparent z-10" />

            {/* Header */}
            <div className="shrink-0 bg-[#FDFBF7] px-5 sm:px-7 pt-5 pb-5 border-b border-[#E1E1E1]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[8px] font-bold text-[#1B433E] uppercase tracking-[0.35em] mb-1.5">
                    Rendez-vous · {doctor.name.split(' ').pop()}
                  </p>
                  <h2
                    className="text-[20px] text-[#1a1f24] leading-tight tracking-tight"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {sent ? 'Demande envoyée' : sending ? 'Envoi en cours...' : 'Planifier un rendez-vous'}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 border border-transparent hover:border-[#E1E1E1] rounded-full transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mini doctor info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-none overflow-hidden border border-[#E1E1E1] shrink-0 shadow-sm">
                  <Image src={doctor.image} alt="" width={36} height={36} className="w-9 h-9 object-cover" />
                </div>
                <div>
                  <p className="text-[11px] text-[#1a1f24] font-bold">{doctor.name}</p>
                  <p className="text-[10px] text-slate-500 font-light italic">{doctor.specialty} · {doctor.establishment}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-white" style={{ scrollbarWidth: 'thin', overscrollBehavior: 'none' }}>

              {sending ? (
                /* ── Loading state ── */
                <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1B433E]/10 border border-[#1B433E]/20 flex items-center justify-center mb-6">
                    <Loader2 size={28} className="text-[#1B433E] animate-spin" strokeWidth={1.5} />
                  </div>
                  <p className="text-[10px] font-bold text-[#1B433E] uppercase tracking-[0.3em] mb-3">
                    Envoi en cours
                  </p>
                  <p className="text-[13px] text-slate-500 leading-relaxed max-w-xs">
                    Nous transmettons votre demande de rendez-vous au cabinet du {doctor.name.split(' ').pop()}...
                  </p>
                </div>
              ) : sent ? (
                /* ── Demande envoyée (pas confirmée) ── */
                <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1B433E]/10 border border-[#1B433E]/20 flex items-center justify-center mb-6">
                    <Send size={26} className="text-[#1B433E]" strokeWidth={1.5} />
                  </div>

                  <p className="text-[9px] font-bold text-[#1B433E] uppercase tracking-[0.35em] mb-3">
                    Demande envoyée
                  </p>
                  <h3
                    className="text-[22px] text-[#1a1f24] leading-snug tracking-tight mb-5"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Votre demande a bien été transmise
                  </h3>

                  <div className="w-full max-w-xs bg-[#FDFBF7] border border-[#E1E1E1] px-5 py-4 text-left mb-6 shadow-sm">
                    <p className="text-[8px] font-bold text-[#1B433E] uppercase tracking-[0.3em] mb-2 border-b border-[#E1E1E1] pb-2">Récapitulatif</p>
                    <p className="text-[13px] text-[#1a1f24] font-semibold" style={{ fontFamily: 'Georgia, serif' }}>{doctor.name}</p>
                    <p className="text-[11px] text-slate-500 mt-1 font-light italic">{doctor.specialty}</p>
                    <div className="mt-3 pt-3 flex items-center gap-3">
                      <CalendarCheck size={13} className="text-[#1B433E]" />
                      <span className="text-[12px] text-slate-700 font-medium">{selectedDay} {MONTHS[month]} {year} à {selectedSlot}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <Monitor size={13} className="text-[#1B433E]" />
                      <span className="text-[12px] text-slate-700 font-medium">Plateforme Pont Afrique Santé</span>
                    </div>
                  </div>

                  <div className="w-full max-w-xs bg-amber-50 border border-amber-200 px-5 py-4 text-left mb-8">
                    <p className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.15em] mb-2">En attente de confirmation</p>
                    <p className="text-[12px] text-amber-800 leading-relaxed">
                      Vous recevrez une notification dès que le médecin aura validé le créneau demandé. Ce rendez-vous n&apos;est pas encore confirmé.
                    </p>
                  </div>

                  <p className="text-[12px] text-slate-400 leading-relaxed max-w-xs mb-8">
                    Suivez l&apos;état de votre demande depuis votre <strong className="text-slate-600">Espace Patient</strong>.
                  </p>

                  <button
                    onClick={onClose}
                    className="w-full max-w-xs h-11 bg-slate-900 hover:bg-[#1B433E] text-white text-[11px] font-bold uppercase tracking-[0.15em] transition-all"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <div className="px-5 sm:px-7 py-6">

                  {/* Calendar header */}
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[14px] font-bold text-slate-800" style={{ fontFamily: 'Georgia, serif' }}>
                      {MONTHS[month]} {year}
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setMonthOffset(o => Math.max(o - 1, 0))}
                        disabled={monthOffset === 0}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() => setMonthOffset(o => o + 1)}
                        disabled={monthOffset >= 2}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Day names */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map(d => (
                      <div key={d} className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1 mb-6">
                    {/* Empty cells before first day */}
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div key={`e${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1
                      const hasSlots = !!availability[day]
                      const isSelected = selectedDay === day
                      const isPast = monthOffset === 0 && day < now.getDate()
                      const disabled = !hasSlots || isPast

                      return (
                        <button
                          key={day}
                          onClick={() => { if (!disabled) { setSelectedDay(day); setSelectedSlot(null) } }}
                          disabled={disabled}
                          className={`h-9 text-[12px] font-medium transition-all ${
                            isSelected
                              ? 'bg-[#1B433E] text-white font-bold'
                              : disabled
                                ? 'text-slate-200 cursor-not-allowed'
                                : 'text-slate-700 hover:bg-[#1B433E]/10 hover:text-[#1B433E]'
                          }`}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>

                  {/* Légende */}
                  <div className="flex items-center gap-4 mb-6 text-[9px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-[#1B433E]" />
                      Sélectionné
                    </span>
                    <span className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-slate-700 border border-slate-200" />
                      Disponible
                    </span>
                    <span className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-slate-100 border border-slate-100" />
                      Indisponible
                    </span>
                  </div>

                  {/* Time slots */}
                  {selectedDay && (
                    <div className="mb-6">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <Clock size={11} />
                        Créneaux disponibles — {selectedDay} {MONTHS[month]}
                      </h4>
                      {slotsForDay.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {slotsForDay.map(slot => (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`h-9 px-4 text-[12px] font-semibold border transition-all ${
                                selectedSlot === slot
                                  ? 'bg-[#1B433E] text-white border-[#1B433E]'
                                  : 'text-slate-600 border-slate-200 hover:border-[#1B433E] hover:text-[#1B433E]'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[12px] text-slate-400 italic">Aucun créneau disponible ce jour.</p>
                      )}
                    </div>
                  )}

                  {/* Canal */}
                  <div className="mb-6 border border-slate-100 p-4">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <Monitor size={11} />
                      Canal de consultation
                    </h4>
                    <div className="flex items-center gap-3 bg-[#1B433E]/5 border border-[#1B433E]/15 px-4 py-3">
                      <div className="w-8 h-8 bg-[#1B433E] flex items-center justify-center shrink-0">
                        <Monitor size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-slate-800">Plateforme Pont Afrique Santé</p>
                        <p className="text-[10px] text-slate-500">Via votre Espace Patient — visioconférence sécurisée</p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Footer — Confirmer */}
            {!sent && !sending && (
              <div className="shrink-0 px-5 sm:px-7 py-4 border-t border-[#E1E1E1] bg-[#FDFBF7]">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedDay || !selectedSlot}
                  className="w-full h-[50px] bg-[#1B433E] hover:bg-[#122e2a] disabled:bg-slate-100 disabled:text-slate-400 disabled:border disabled:border-slate-200 text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 rounded-none shadow-sm"
                >
                  {selectedDay && selectedSlot
                    ? `Confirmer — ${selectedDay} ${MONTHS[month]} ${selectedSlot}`
                    : 'Sélectionnez un créneau horaire'
                  }
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
