'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, Send, Loader2, CheckCircle2, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useScrollLock } from '@/lib/hooks/useScrollLock'

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
  'Dermatologie', 'Médecine générale', 'Autre',
]

const COUNTRIES = [
  'Maroc', 'France', 'Tunisie', 'Turquie', 'Algérie', 'Belgique', 'Suisse', 'Canada',
  'Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso', 'Bénin', 'Togo', 'Guinée',
  'Cameroun', 'Congo', 'RD Congo', 'Gabon', 'République Centrafricaine', 'Tchad',
  'Madagascar', 'Rwanda', 'Djibouti', 'Mauritanie',
  'Autre',
]

const REACH = [
  'Moins de 500 patients / an',
  '500 – 1 000 patients / an',
  '1 000 – 3 000 patients / an',
  'Plus de 3 000 patients / an',
]

const INPUT = 'w-full h-[50px] bg-white border border-[#E1E1E1] text-slate-800 px-4 text-base focus:outline-none focus:border-[#4caf91] transition-colors placeholder:text-slate-400 font-light'
const SELECT = 'appearance-none w-full h-[50px] bg-white border border-[#E1E1E1] text-slate-800 px-4 pr-10 text-base focus:outline-none focus:border-[#4caf91] transition-colors cursor-pointer font-light'
const LABEL = 'block text-[11px] font-semibold text-slate-600 mb-2'

export function AmbassadeurModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({
    titre: '', prenom: '', nom: '', specialty: '',
    pays: '', ville: '', etablissement: '',
    telephone: '', email: '', reach: '',
    reseauxSociaux: '', motivation: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm({ titre: '', prenom: '', nom: '', specialty: '', pays: '', ville: '', etablissement: '', telephone: '', email: '', reach: '', reseauxSociaux: '', motivation: '' })
        setSending(false)
        setSent(false)
      }, 400)
    }
  }, [isOpen])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const canSubmit = form.prenom && form.nom && form.specialty && form.pays && form.email && form.motivation

  const handleSubmit = () => {
    if (!canSubmit || sending) return
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop photographique */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[90] bg-[#0E1F1C]" // Very deep forest green
            onClick={onClose}
          >
            {/* L'image authentique */}
            <Image
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Médecins solidaires"
              fill
              className="object-cover opacity-25 mix-blend-luminosity"
              priority
            />
            {/* Dégradé doux */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E1F1C] via-[#0E1F1C]/80 to-transparent" />
            
            <div className="hidden lg:flex flex-col items-start justify-center h-full pl-10 lg:pl-16 xl:pl-24 pr-10 w-[calc(100%-600px)] xl:w-[calc(100%-680px)] select-none pointer-events-none relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
                className="max-w-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-white/50" />
                  <span className="text-[10px] xl:text-[12px] text-[#4caf91] font-semibold uppercase tracking-[0.25em]">MediBridge · Collège des Ambassadeurs</span>
                </div>
                <h1
                  className="text-3xl lg:text-4xl xl:text-5xl font-normal text-white leading-[1.2] mb-6"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Devenez le trait d'union vers l'<i className="text-white/70">excellence internationale.</i>
                </h1>
                <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
                  En rejoignant le réseau des Ambassadeurs, vous offrez à vos patients un corridor sanitaire exclusif et hautement sécurisé vers les meilleurs spécialistes mondiaux.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Panel Institutionnel (Dossier papier premium) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed top-0 right-0 h-full w-full lg:w-[600px] xl:w-[680px] bg-[#FDFBF7] z-[91] flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.15)]"
          >
            {/* Header élégant */}
            <div className="shrink-0 bg-white px-8 lg:px-12 pt-8 pb-6 border-b border-[#E1E1E1]">
              <div className="flex items-start justify-between">
                <div>
                  <h2
                    className="text-[28px] text-[#1B433E] leading-tight mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Demande de Mandat
                  </h2>
                  <p className="text-[#63666A] text-[14px] font-light leading-relaxed max-w-sm">
                    Constitution de votre dossier auprès du collège d'évaluation MediBridge.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 border border-transparent hover:border-[#E1E1E1] rounded-full transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Stats administratives (Design épuré) */}
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <Globe size={13} className="text-[#1B433E]" strokeWidth={1.5} />
                  <span className="text-[12px] font-serif italic text-slate-600">Réseau d'orientation patientèle paneuropéen et africain.</span>
                </div>
              </div>
            </div>

            {/* Content central fluide et respirant */}
            <div className="flex-1 overflow-y-auto bg-[#FDFBF7]" style={{ scrollbarWidth: 'thin', overscrollBehavior: 'none' }}>
              {sending ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] h-full px-8 py-24 text-center">
                  <Loader2 size={32} className="text-[#1B433E] animate-spin mb-6" strokeWidth={1} />
                  <p className="text-[16px] font-serif text-[#1B433E] mb-3">Traitement diplomatique de votre dossier...</p>
                  <p className="text-[13px] text-slate-500 font-light max-w-xs">
                    Cryptage sécurisé des données et transfert instantané au collège des fondateurs.
                  </p>
                </div>
              ) : sent ? (
                <div className="flex flex-col items-center justify-center min-h-[500px] px-8 lg:px-12 py-20 text-center bg-white border-b border-[#E1E1E1] shadow-inner mb-8">
                  <div className="w-20 h-20 bg-[#FDFBF7] border border-[#E1E1E1] rounded-full flex items-center justify-center mb-8 shadow-sm mx-auto">
                    <CheckCircle2 size={32} className="text-[#1B433E]" strokeWidth={1} />
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-4">Phase une validée</p>
                  <h3
                    className="text-[32px] text-[#1B433E] leading-snug mb-5"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Votre engagement a bien été enregistré.
                  </h3>
                  
                  <div className="w-full max-w-lg mt-4 text-left mx-auto">
                    <p className="text-[14px] text-slate-600 font-light leading-relaxed mb-6 text-center">
                      Ravis de constater votre attachement à l'excellence des soins pour vos patients, Dr. {form.nom}. Le comité des relations internationales examine votre candidature.
                    </p>
                    <div className="bg-[#f2f7f6] border border-[#d6ebe5] px-6 py-6 rounded-sm">
                       <p className="text-[11px] font-bold text-[#1B433E] uppercase tracking-wider mb-3">Étape Suivante : Validation Médicale</p>
                       <p className="text-[13px] text-slate-700 font-light leading-relaxed mb-3">Notre délégation régionale vous contactera sous <strong>72 heures ouvrées</strong> pour convenir d'un rendez-vous de validation.</p>
                       <p className="text-[13px] text-slate-700 font-light leading-relaxed">
                         <span className="font-semibold text-[#1B433E]">Important :</span> Il vous sera formellement demandé peu après de transmettre vos <strong>Diplômes médicaux, Attestations d'exercice légal et Accréditations professionnelles</strong> pour valider la convention d'Ambassadeur MediBridge.
                       </p>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="mt-12 h-[50px] px-10 bg-white border border-[#1B433E] text-[#1B433E] hover:bg-[#1B433E] hover:text-white transition-colors text-[12px] font-bold uppercase tracking-wider mx-auto rounded-none"
                  >
                    Retourner au site
                  </button>
                </div>
              ) : (
                <div className="px-8 lg:px-12 py-10 space-y-10">

                  {/* Section Identité */}
                  <div className="border border-[#E5E5E5] bg-white p-6 md:p-8">
                    <h3 className="text-xl text-[#1B433E] mb-6" style={{ fontFamily: 'Georgia, serif' }}>1. Qualifications de l'Émetteur</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="relative">
                        <label className={LABEL}>Titre</label>
                        <select
                          value={form.titre}
                          onChange={e => set('titre', e.target.value)}
                          className={SELECT}
                        >
                          <option value="">—</option>
                          <option>Dr</option>
                          <option>Dr méd.</option>
                          <option>Pr</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 bottom-[18px] text-slate-400 pointer-events-none" />
                      </div>
                      <div className="md:col-span-1">
                        <label className={LABEL}>Prénom <span className="text-red-400">*</span></label>
                        <input
                          type="text"
                          value={form.prenom}
                          onChange={e => set('prenom', e.target.value)}
                          className={INPUT}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={LABEL}>Nom de famille <span className="text-red-400">*</span></label>
                        <input
                          type="text"
                          value={form.nom}
                          onChange={e => set('nom', e.target.value)}
                          className={INPUT}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className={LABEL}>Discipline principale <span className="text-red-400">*</span></label>
                        <select
                          value={form.specialty}
                          onChange={e => set('specialty', e.target.value)}
                          className={SELECT}
                        >
                          <option value="">Sélectionner depuis la liste</option>
                          {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 bottom-[18px] text-slate-400 pointer-events-none" />
                      </div>
                      <div>
                        <label className={LABEL}>Clinique ou Cabinet</label>
                        <input
                          type="text"
                          value={form.etablissement}
                          onChange={e => set('etablissement', e.target.value)}
                          placeholder="Nom de votre lieu d'exercice régulier..."
                          className={INPUT}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section Lieu */}
                  <div className="border border-[#E5E5E5] bg-white p-6 md:p-8">
                    <h3 className="text-xl text-[#1B433E] mb-6" style={{ fontFamily: 'Georgia, serif' }}>2. Territoire de Délégation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="relative">
                         <label className={LABEL}>Pays d'Exercice <span className="text-red-400">*</span></label>
                         <select
                           value={form.pays}
                           onChange={e => set('pays', e.target.value)}
                           className={SELECT}
                         >
                           <option value="">Sélectionner un pays</option>
                           {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                         </select>
                         <ChevronDown size={14} className="absolute right-3 bottom-[18px] text-slate-400 pointer-events-none" />
                       </div>
                       <div>
                         <label className={LABEL}>Ville ou Région dominante</label>
                         <input
                           type="text"
                           value={form.ville}
                           onChange={e => set('ville', e.target.value)}
                           className={INPUT}
                           placeholder="Zone pour laquelle vous agirez"
                         />
                       </div>
                    </div>
                  </div>

                  {/* Contact & Réseau */}
                  <div className="border border-[#E5E5E5] bg-white p-6 md:p-8">
                    <h3 className="text-xl text-[#1B433E] mb-6" style={{ fontFamily: 'Georgia, serif' }}>3. Rayonnement du Praticien</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                         <label className={LABEL}>Email Professionnel <span className="text-red-400">*</span></label>
                         <input
                           type="email"
                           value={form.email}
                           onChange={e => set('email', e.target.value)}
                           className={INPUT}
                         />
                      </div>
                      <div>
                         <label className={LABEL}>Numéro Direct / Ligne Privée</label>
                         <input
                           type="tel"
                           value={form.telephone}
                           onChange={e => set('telephone', e.target.value)}
                           className={INPUT}
                         />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className={LABEL}>Volume Patientèle Annuelle estimé</label>
                        <select
                          value={form.reach}
                          onChange={e => set('reach', e.target.value)}
                          className={SELECT}
                        >
                          <option value="">Indiquer une tranche</option>
                          {REACH.map(r => <option key={r}>{r}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 bottom-[18px] text-slate-400 pointer-events-none" />
                      </div>
                      <div>
                        <label className={LABEL}>Profil Médical Public (Ex : LinkedIn)</label>
                        <input
                          type="text"
                          value={form.reseauxSociaux}
                          onChange={e => set('reseauxSociaux', e.target.value)}
                          placeholder="URL (optionnel)"
                          className={INPUT}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lettre de motivation */}
                  <div className="border border-[#E5E5E5] bg-white p-6 md:p-8">
                     <h3 className="text-xl text-[#1B433E] mb-6" style={{ fontFamily: 'Georgia, serif' }}>4. Manifeste de Volonté</h3>
                      <div>
                        <label className={LABEL}>Quelle est votre vision du transfert sanitaire d'excellence ? <span className="text-red-400">*</span></label>
                        <textarea
                          value={form.motivation}
                          onChange={e => set('motivation', e.target.value)}
                          placeholder="Décrivez en quelques mots pourquoi vous êtes en adéquation avec les mandats éthiques et qualitatifs de l'institution MediBridge, et quels besoins rencontrent vos patients."
                          rows={5}
                          className="w-full bg-white border border-[#E1E1E1] text-slate-800 px-4 py-3 text-base focus:outline-none focus:border-[#4caf91] transition-colors placeholder:text-slate-400 font-light resize-none"
                        />
                      </div>
                  </div>

                  {/* Clause de confidentialité et sécurité */}
                  <div className="max-w-[90%] pb-12">
                     <p className="text-[11px] text-[#a59f93] font-serif leading-relaxed">
                        <span className="text-red-400">*</span> Informations préliminaires obligatoires. Notez que vos attestations et diplômes ne sont pas requis à ce stade de prise de contact. Ils vous seront formellement demandés ultérieurement. Données soumises au secret professionnel.
                     </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!sent && !sending && (
              <div className="shrink-0 px-8 lg:px-12 py-6 border-t border-[#E1E1E1] bg-[#FDFBF7] flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="h-[52px] bg-[#1B433E] hover:bg-[#112a27] disabled:bg-[#d8d3cc] disabled:text-[#afa89c] text-white px-10 text-[12px] font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 rounded-none shadow-sm"
                >
                  <Send size={15} />
                  {canSubmit ? 'Dépôt du Mandat' : 'Dossier Incomplet'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
