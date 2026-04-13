'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Stethoscope, Send, Loader2, CheckCircle2, ChevronDown } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const SPECIALTIES = [
  'Cardiologie', 'Neurologie', 'Oncologie', 'Chirurgie Bariatrique',
  'PMA & Fertilité', 'Greffe Capillaire', 'Chirurgie Esthétique',
  'Ophtalmologie', 'Orthopédie', 'Urologie', 'Dentaire & Implantologie',
  'Gynécologie', 'Gastro-entérologie', 'Endocrinologie', 'Pneumologie',
  'Dermatologie', 'Rhumatologie', 'Psychiatrie', 'Pédiatrie', 'Autre',
]

const COUNTRIES = [
  'Maroc', 'France', 'Tunisie', 'Turquie', 'Algérie', 'Sénégal',
  'Côte d\'Ivoire', 'Cameroun', 'Congo', 'Belgique', 'Suisse', 'Autre',
]

const INPUT = 'w-full h-[50px] bg-white border border-[#E1E1E1] text-slate-800 px-4 text-base sm:text-[13px] focus:outline-none focus:border-[#006994] transition-colors placeholder:text-slate-400'
const SELECT = 'appearance-none w-full h-[50px] bg-white border border-[#E1E1E1] text-slate-800 px-4 pr-10 text-base sm:text-[13px] focus:outline-none focus:border-[#006994] transition-colors cursor-pointer'
const LABEL = 'block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1.5'

export function PartenaireModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({
    titre: '', prenom: '', nom: '', specialty: '',
    sousSpecialites: '', pays: '', ville: '',
    etablissement: '', telephone: '', email: '',
    experience: '', teleconsultation: false, message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

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

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm({ titre: '', prenom: '', nom: '', specialty: '', sousSpecialites: '', pays: '', ville: '', etablissement: '', telephone: '', email: '', experience: '', teleconsultation: false, message: '' })
        setSending(false)
        setSent(false)
      }, 400)
    }
  }, [isOpen])

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const canSubmit = form.prenom && form.nom && form.specialty && form.pays && form.email

  const handleSubmit = () => {
    if (!canSubmit || sending) return
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 2000)
  }

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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
              >
                <span className="text-[120px] lg:text-[160px] font-black text-white/6 leading-none tabular-nums block">P</span>
                <p
                  className="text-[32px] lg:text-[42px] font-black text-white/10 leading-tight uppercase"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Médecin<br />Partenaire
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 right-0 h-full w-full sm:w-[520px] bg-white z-[91] flex flex-col shadow-2xl"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#006994] to-transparent z-10" />

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
                    Devenir Médecin Partenaire
                  </h2>
                  <p className="text-white/40 text-[12px] mt-1.5 leading-relaxed max-w-xs">
                    Rejoignez notre réseau et recevez des patients internationaux qualifiés.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Stats */}
              <div className="mt-5 flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <Stethoscope size={11} className="text-white/30" />
                  <span className="text-[11px] font-semibold text-white/30">10 médecins partenaires</span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <span className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">4 pays</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-white" style={{ scrollbarWidth: 'thin' }}>
              {sending ? (
                <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#006994]/10 border border-[#006994]/20 flex items-center justify-center mb-6">
                    <Loader2 size={28} className="text-[#006994] animate-spin" strokeWidth={1.5} />
                  </div>
                  <p className="text-[10px] font-bold text-[#006994] uppercase tracking-[0.3em] mb-3">Envoi en cours</p>
                  <p className="text-[13px] text-slate-500 leading-relaxed max-w-xs">
                    Nous transmettons votre candidature à l&apos;équipe MediBridge...
                  </p>
                </div>
              ) : sent ? (
                <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6">
                    <CheckCircle2 size={28} className="text-emerald-500" strokeWidth={1.5} />
                  </div>
                  <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-[0.35em] mb-3">Candidature reçue</p>
                  <h3
                    className="text-[22px] text-slate-900 leading-snug tracking-tight mb-4"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Merci, {form.prenom} !
                  </h3>
                  <div className="w-full max-w-xs bg-slate-900 px-5 py-4 text-left mb-6">
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.25em] mb-3">Votre candidature</p>
                    <p className="text-[13px] text-white font-semibold">{form.titre} {form.prenom} {form.nom}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{form.specialty}</p>
                    <p className="text-[11px] text-slate-400">{form.ville}, {form.pays}</p>
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <p className="text-[11px] text-slate-400">{form.email}</p>
                    </div>
                  </div>
                  <div className="w-full max-w-xs bg-[#006994]/8 border border-[#006994]/20 px-5 py-4 text-left mb-8">
                    <p className="text-[10px] font-bold text-[#006994] uppercase tracking-[0.15em] mb-2">Prochaines étapes</p>
                    <p className="text-[12px] text-slate-700 leading-relaxed">
                      L&apos;équipe MediBridge vous contactera par email sous <strong>3 à 5 jours ouvrés</strong> pour valider votre profil et vous guider dans le processus d&apos;intégration.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-full max-w-xs h-11 bg-slate-900 hover:bg-[#006994] text-white text-[11px] font-bold uppercase tracking-[0.15em] transition-all"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <div className="px-6 sm:px-8 py-7 space-y-5">

                  {/* Identité */}
                  <div>
                    <p className="text-[9px] font-bold text-[#006994] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-[#006994]" />
                      Identité professionnelle
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="relative">
                        <label className={LABEL}>Titre</label>
                        <select
                          value={form.titre}
                          onChange={e => set('titre', e.target.value)}
                          className={SELECT}
                          style={{ touchAction: 'manipulation' }}
                        >
                          <option value="">—</option>
                          <option>Dr</option>
                          <option>Dr méd.</option>
                          <option>Pr</option>
                          <option>Pr Dr</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 bottom-4 text-slate-400 pointer-events-none" />
                      </div>
                      <div>
                        <label className={LABEL}>Prénom <span className="text-red-400">*</span></label>
                        <input
                          type="text"
                          value={form.prenom}
                          onChange={e => set('prenom', e.target.value)}
                          placeholder="Jean"
                          className={INPUT}
                          style={{ touchAction: 'manipulation' }}
                        />
                      </div>
                      <div>
                        <label className={LABEL}>Nom <span className="text-red-400">*</span></label>
                        <input
                          type="text"
                          value={form.nom}
                          onChange={e => set('nom', e.target.value)}
                          placeholder="Dupont"
                          className={INPUT}
                          style={{ touchAction: 'manipulation' }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <label className={LABEL}>Spécialité principale <span className="text-red-400">*</span></label>
                        <select
                          value={form.specialty}
                          onChange={e => set('specialty', e.target.value)}
                          className={SELECT}
                          style={{ touchAction: 'manipulation' }}
                        >
                          <option value="">Sélectionner</option>
                          {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 bottom-4 text-slate-400 pointer-events-none" />
                      </div>
                      <div>
                        <label className={LABEL}>Sous-spécialités</label>
                        <input
                          type="text"
                          value={form.sousSpecialites}
                          onChange={e => set('sousSpecialites', e.target.value)}
                          placeholder="Ex : Robotique, Laparoscopie..."
                          className={INPUT}
                          style={{ touchAction: 'manipulation' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Localisation */}
                  <div>
                    <p className="text-[9px] font-bold text-[#006994] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-[#006994]" />
                      Localisation & établissement
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="relative">
                        <label className={LABEL}>Pays d&apos;exercice <span className="text-red-400">*</span></label>
                        <select
                          value={form.pays}
                          onChange={e => set('pays', e.target.value)}
                          className={SELECT}
                          style={{ touchAction: 'manipulation' }}
                        >
                          <option value="">Sélectionner</option>
                          {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 bottom-4 text-slate-400 pointer-events-none" />
                      </div>
                      <div>
                        <label className={LABEL}>Ville</label>
                        <input
                          type="text"
                          value={form.ville}
                          onChange={e => set('ville', e.target.value)}
                          placeholder="Paris, Casablanca..."
                          className={INPUT}
                          style={{ touchAction: 'manipulation' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={LABEL}>Établissement / Clinique / Hôpital</label>
                      <input
                        type="text"
                        value={form.etablissement}
                        onChange={e => set('etablissement', e.target.value)}
                        placeholder="Nom de l'établissement"
                        className={INPUT}
                        style={{ touchAction: 'manipulation' }}
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <p className="text-[9px] font-bold text-[#006994] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-[#006994]" />
                      Coordonnées
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className={LABEL}>Email professionnel <span className="text-red-400">*</span></label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => set('email', e.target.value)}
                          placeholder="contact@cabinet.com"
                          className={INPUT}
                          style={{ touchAction: 'manipulation' }}
                        />
                      </div>
                      <div>
                        <label className={LABEL}>Téléphone</label>
                        <input
                          type="tel"
                          value={form.telephone}
                          onChange={e => set('telephone', e.target.value)}
                          placeholder="+33 6 12 34 56 78"
                          className={INPUT}
                          style={{ touchAction: 'manipulation' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={LABEL}>Années d&apos;expérience</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={form.experience}
                        onChange={e => set('experience', e.target.value)}
                        placeholder="Ex : 15"
                        className={INPUT}
                        style={{ touchAction: 'manipulation' }}
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div>
                    <p className="text-[9px] font-bold text-[#006994] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-[#006994]" />
                      Modalités
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer group mb-5">
                      <input
                        type="checkbox"
                        checked={form.teleconsultation}
                        onChange={e => set('teleconsultation', e.target.checked)}
                        className="w-5 h-5 mt-0.5 accent-[#006994] cursor-pointer shrink-0"
                      />
                      <div>
                        <span className="text-[13px] text-slate-700 font-medium group-hover:text-[#006994] transition-colors">
                          Je propose des téléconsultations
                        </span>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Consultations vidéo pour les patients hors de votre région
                        </p>
                      </div>
                    </label>

                    <div>
                      <label className={LABEL}>Message (optionnel)</label>
                      <textarea
                        value={form.message}
                        onChange={e => set('message', e.target.value)}
                        placeholder="Présentez votre pratique, vos motivations, vos domaines d'excellence..."
                        rows={4}
                        className="w-full bg-white border border-[#E1E1E1] text-slate-800 px-4 py-3 text-base sm:text-[13px] focus:outline-none focus:border-[#006994] transition-colors placeholder:text-slate-400 resize-none"
                        style={{ touchAction: 'manipulation' }}
                      />
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    <span className="text-red-400">*</span> Champs obligatoires. Vos informations sont confidentielles et ne seront utilisées que dans le cadre de votre candidature MediBridge.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {!sent && !sending && (
              <div className="shrink-0 px-6 sm:px-8 py-4 border-t border-slate-100 bg-white">
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="w-full h-12 bg-[#006994] hover:bg-[#005174] disabled:bg-slate-200 disabled:text-slate-400 text-white text-[11px] font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={13} />
                  {canSubmit ? 'Envoyer ma candidature' : 'Remplissez les champs obligatoires'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
