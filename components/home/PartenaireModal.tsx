'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Stethoscope, Send, Loader2, CheckCircle2, ChevronDown } from 'lucide-react'
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
  'Dermatologie', 'Rhumatologie', 'Psychiatrie', 'Pédiatrie', 'Autre',
]

const COUNTRIES = [
  'Maroc', 'France', 'Tunisie', 'Turquie', 'Algérie', 'Belgique', 'Suisse', 'Canada',
  'Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso', 'Bénin', 'Togo', 'Guinée',
  'Cameroun', 'Congo', 'RD Congo', 'Gabon', 'République Centrafricaine', 'Tchad',
  'Madagascar', 'Rwanda', 'Djibouti', 'Mauritanie',
  'Autre',
]

const INPUT = 'w-full h-[50px] bg-white border border-[#E1E1E1] text-slate-800 px-4 text-base focus:outline-none focus:border-[#7c8f9c] transition-colors placeholder:text-slate-400 font-light'
const SELECT = 'appearance-none w-full h-[50px] bg-white border border-[#E1E1E1] text-slate-800 px-4 pr-10 text-base focus:outline-none focus:border-[#7c8f9c] transition-colors cursor-pointer font-light'
const LABEL = 'block text-[11px] font-semibold text-slate-600 mb-2'

export function PartenaireModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({
    titre: '', prenom: '', nom: '', specialty: '',
    sousSpecialites: '', pays: '', ville: '',
    etablissement: '', telephone: '', email: '',
    experience: '', teleconsultation: false, message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useScrollLock(isOpen)

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
          {/* Backdrop photographique, remplace le flou noir impersonnel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[90] bg-[#1a1f24]"
            onClick={onClose}
          >
            {/* L'image authentique */}
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Médecins en consultation"
              fill
              className="object-cover opacity-30 mix-blend-luminosity"
              priority
            />
            {/* Dégradé doux et chaud pour "casser" l'obscurité digitale */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f24] via-[#1a1f24]/80 to-transparent" />
            
            <div className="hidden lg:flex flex-col items-start justify-center h-full pl-10 lg:pl-16 xl:pl-24 pr-10 w-[calc(100%-600px)] xl:w-[calc(100%-680px)] select-none pointer-events-none relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
                className="max-w-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-white/50" />
                  <span className="text-[10px] xl:text-[12px] text-white/70 font-semibold uppercase tracking-[0.25em]">Pont Afrique Santé · Réseau d'Excellence</span>
                </div>
                <h1
                  className="text-3xl lg:text-4xl xl:text-5xl font-normal text-white leading-[1.2] mb-6"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Mettez votre expertise au service d'une patientèle <i className="text-white/70">internationale exigeante.</i>
                </h1>
                <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
                  Rejoindre le comité d'excellence, c'est participer activement au développement de la mobilité médicale de haute qualité.
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
                    className="text-[28px] text-[#1a1f24] leading-tight mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Demande d'affiliation
                  </h2>
                  <p className="text-[#63666A] text-[14px] font-light leading-relaxed max-w-sm">
                    Constitution de votre dossier médical auprès du comité de validation Pont Afrique Santé.
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
                  <Stethoscope size={13} className="text-[#006994]" strokeWidth={1.5} />
                  <span className="text-[12px] font-serif italic text-slate-600">Revue par le comité d'éthique restreint.</span>
                </div>
              </div>
            </div>

            {/* Content central fluide et respireant */}
            <div className="flex-1 overflow-y-auto bg-[#FDFBF7]" style={{ scrollbarWidth: 'thin', overscrollBehavior: 'none' }}>
              {sending ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] h-full px-8 py-24 text-center">
                  <Loader2 size={32} className="text-[#006994] animate-spin mb-6" strokeWidth={1} />
                  <p className="text-[16px] font-serif text-[#1a1f24] mb-3">Transmission de votre dossier en cours...</p>
                  <p className="text-[13px] text-slate-500 font-light max-w-xs">
                    Cryptage sécurisé des données et transfert instantané au comité de sélection.
                  </p>
                </div>
              ) : sent ? (
                <div className="flex flex-col items-center justify-center min-h-[500px] px-8 lg:px-12 py-20 text-center bg-white border-b border-[#E1E1E1] shadow-inner mb-8">
                  <div className="w-20 h-20 bg-[#FDFBF7] border border-[#E1E1E1] rounded-full flex items-center justify-center mb-8 shadow-sm mx-auto">
                    <CheckCircle2 size={32} className="text-[#006994]" strokeWidth={1} />
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-4">Phase une validée</p>
                  <h3
                    className="text-[32px] text-[#1a1f24] leading-snug mb-5"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Dossier réceptionné avec succès, Dr. {form.nom}.
                  </h3>
                  
                  <div className="w-full max-w-lg mt-4 text-left mx-auto">
                    <p className="text-[14px] text-slate-600 font-light leading-relaxed mb-6 text-center">
                      Le comité d'évaluation Pont Afrique Santé étudiera avec la plus grande attention votre demande de partenariat.
                    </p>
                    <div className="bg-[#f0ece9] border border-[#d6cfc5] px-6 py-6 rounded-sm">
                       <p className="text-[11px] font-bold text-[#1a1f24] uppercase tracking-wider mb-3">Étape Suivante : Vérification Médicale</p>
                       <p className="text-[13px] text-slate-700 font-light leading-relaxed mb-3">Notre secrétariat médical reviendra vers vous sous <strong>5 jours ouvrés</strong> pour organiser un premier entretien d'échanges.</p>
                       <p className="text-[13px] text-slate-700 font-light leading-relaxed">
                         <span className="font-semibold text-[#1a1f24]">Important :</span> Lors de cette prochaine étape, il vous sera demandé de fournir les justificatifs légaux stricts : <strong>Diplômes médicaux certifiés, Attestation d'inscription à l'Ordre des Médecins, et vos titres de spécialités</strong> afin de valider politiquement votre intégration au réseau.
                       </p>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="mt-12 h-[50px] px-10 bg-white border border-[#1a1f24] text-[#1a1f24] hover:bg-[#1a1f24] hover:text-white transition-colors text-[12px] font-bold uppercase tracking-wider mx-auto rounded-none"
                  >
                    Retourner au site
                  </button>
                </div>
              ) : (
                <div className="px-8 lg:px-12 py-10 space-y-10">

                  {/* Section Identité */}
                  <div className="border border-[#E5E5E5] bg-white p-6 md:p-8">
                    <h3 className="text-xl text-[#1a1f24] mb-6" style={{ fontFamily: 'Georgia, serif' }}>1. Qualifications du Praticien</h3>
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
                        <label className={LABEL}>Spécialité d'exercice <span className="text-red-400">*</span></label>
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
                        <label className={LABEL}>Expertises poussées (Mots-clés)</label>
                        <input
                          type="text"
                          value={form.sousSpecialites}
                          onChange={e => set('sousSpecialites', e.target.value)}
                          placeholder="Robotique, greffe osseuse, cœlioscopie..."
                          className={INPUT}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section Lieu */}
                  <div className="border border-[#E5E5E5] bg-white p-6 md:p-8">
                    <h3 className="text-xl text-[#1a1f24] mb-6" style={{ fontFamily: 'Georgia, serif' }}>2. Infrastructure & Localisation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={LABEL}>Clinique, Centre ou Hôpital référent</label>
                        <input
                          type="text"
                          value={form.etablissement}
                          onChange={e => set('etablissement', e.target.value)}
                          placeholder="Nom exact de la structure"
                          className={INPUT}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="relative">
                           <label className={LABEL}>Pays <span className="text-red-400">*</span></label>
                           <select
                             value={form.pays}
                             onChange={e => set('pays', e.target.value)}
                             className={SELECT}
                           >
                             <option value="">Sélectionner</option>
                             {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                           </select>
                           <ChevronDown size={14} className="absolute right-3 bottom-[18px] text-slate-400 pointer-events-none" />
                         </div>
                         <div>
                           <label className={LABEL}>Ville</label>
                           <input
                             type="text"
                             value={form.ville}
                             onChange={e => set('ville', e.target.value)}
                             className={INPUT}
                           />
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Section Contact */}
                  <div className="border border-[#E5E5E5] bg-white p-6 md:p-8">
                    <h3 className="text-xl text-[#1a1f24] mb-6" style={{ fontFamily: 'Georgia, serif' }}>3. Prise de contact sécurisée</h3>
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
                         <label className={LABEL}>Ligne directe secrétariat / mobile</label>
                         <input
                           type="tel"
                           value={form.telephone}
                           onChange={e => set('telephone', e.target.value)}
                           className={INPUT}
                         />
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="border border-[#E5E5E5] bg-white p-6 md:p-8">
                     <h3 className="text-xl text-[#1a1f24] mb-6" style={{ fontFamily: 'Georgia, serif' }}>4. Modalités Complémentaires</h3>
                     <label className="flex items-start gap-4 cursor-pointer group mb-6">
                        <input
                          type="checkbox"
                          checked={form.teleconsultation}
                          onChange={e => set('teleconsultation', e.target.checked)}
                          className="w-5 h-5 mt-0.5 border-[#E5E5E5] accent-[#006994] cursor-pointer shrink-0"
                        />
                        <div>
                          <span className="text-[14px] text-[#1a1f24] font-medium transition-colors">
                            Je dispose du matériel et de la disponibilité pour la téléconsultation.
                          </span>
                          <p className="text-[13px] text-slate-500 font-light mt-1 max-w-sm">
                            Indispensable pour statuer sur les premiers avis médicaux avec la patientèle internationale.
                          </p>
                        </div>
                      </label>

                      <div>
                        <label className={LABEL}>Note d'intention (Facultatif)</label>
                        <textarea
                          value={form.message}
                          onChange={e => set('message', e.target.value)}
                          placeholder="Points de prestige, travaux récents, motivations à intégrer Pont Afrique Santé..."
                          rows={4}
                          className="w-full bg-white border border-[#E1E1E1] text-slate-800 px-4 py-3 text-base focus:outline-none focus:border-[#7c8f9c] transition-colors placeholder:text-slate-400 font-light resize-none"
                        />
                      </div>
                  </div>

                  {/* Clause de confidentialité et sécurité */}
                  <div className="max-w-[90%] pb-12">
                     <p className="text-[11px] text-[#a59f93] font-serif leading-relaxed">
                        <span className="text-red-400">*</span> Informations préliminaires obligatoires. Notez que vos attestations et diplômes ne sont pas requis à ce stade de prise de contact. Ils vous seront formellement demandés ultérieurement. Données soumises au secret médical (RGPD).
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
                  className="h-[52px] bg-[#1a1f24] hover:bg-[#000] disabled:bg-[#d8d3cc] disabled:text-[#afa89c] text-white px-10 text-[12px] font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 rounded-none shadow-sm"
                >
                  <Send size={15} />
                  {canSubmit ? 'Soumettre au comité' : 'Dossier Incomplet'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
