'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useScrollLock } from '@/lib/hooks/useScrollLock'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function ConciergerieModal({ isOpen, onClose }: Props) {
  const [showCallbackForm, setShowCallbackForm] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  // Rénitialiser quand la modale s'ouvre/ferme
  if (!isOpen && showCallbackForm) {
    setTimeout(() => {
      setShowCallbackForm(false)
      setSubmitted(false)
      setPhone('')
      setName('')
    }, 500)
  }

  // Lock app scroll
  useScrollLock(isOpen)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !name) return
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop sombre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[90] bg-[#0c1a17]/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel Formulaire façon Administration Médicale BCG */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 right-0 h-full w-full lg:w-[600px] z-[91] flex flex-col shadow-2xl bg-white"
          >
            {/* Header Conciergerie (style institutionnel) */}
            <div className="shrink-0 bg-[#FDFBF7] px-6 sm:px-10 pt-8 sm:pt-10 pb-6 sm:pb-8 border-b border-[#E1E1E1] relative overflow-hidden">
               {/* Decorative background element */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B433E]/5 rounded-full blur-3xl" />
               
               <div className="relative z-10 flex items-start justify-between mb-2">
                 <div>
                   <p className="text-[9px] font-bold text-[#1B433E] uppercase tracking-[0.35em] mb-3">
                     Assistance Privée & Administration
                   </p>
                   <h2 className="text-3xl lg:text-4xl text-[#1a1f24] leading-tight tracking-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                     Contact <span className="italic font-light text-slate-500">Conciergerie</span>
                   </h2>
                   <p className="text-[14px] text-slate-500 max-w-sm leading-relaxed">
                     Le département de coordination médicale et logistique est à votre stricte disposition 24h/24. Identifiez la méthode de contact souhaitée.
                   </p>
                 </div>
                 <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#1a1f24] border border-slate-200 hover:border-slate-400 bg-white shadow-sm transition-all rounded-full shrink-0"
                  >
                    <X size={20} />
                 </button>
               </div>
            </div>

            {/* Contenu Scrollable */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}>
              <div className="p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  {!showCallbackForm ? (
                    <motion.div key="options" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                      
                      <div className="space-y-4">
                        {/* 1. WhatsApp Button (Urgence / Instantané) */}
                        <a href="https://wa.me/33600000000" target="_blank" rel="noopener noreferrer" 
                           className="block p-6 sm:p-8 bg-white border border-[#E1E1E1] hover:border-[#25D366] hover:shadow-[0_10px_40px_-10px_rgba(37,211,102,0.15)] transition-all duration-300 group relative">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366] transition-colors duration-300">
                                <MessageCircle size={24} className="text-[#25D366] group-hover:text-white transition-colors duration-300" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-[17px] font-bold text-[#1a1f24] mb-1">Cellule WhatsApp 24/7</h4>
                                <p className="text-[13px] text-slate-500 leading-relaxed">Communication instantanée et encryptée. Idéal pour un contact rapide (depuis votre mobile).</p>
                              </div>
                              <ArrowRight size={20} className="text-slate-300 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" />
                           </div>
                        </a>

                        {/* 2. Formulaire Rappel (Institutionnel) */}
                        <button onClick={() => setShowCallbackForm(true)} 
                           className="w-full text-left p-6 sm:p-8 bg-white border border-[#E1E1E1] hover:border-[#1B433E] hover:shadow-[0_10px_40px_-10px_rgba(27,67,62,0.15)] transition-all duration-300 group relative">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-full bg-[#1B433E]/5 border border-[#1B433E]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1B433E] group-hover:border-[#1B433E] transition-colors duration-300">
                                <Phone size={24} className="text-[#1B433E] group-hover:text-white transition-colors duration-300" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-[17px] font-bold text-[#1a1f24] mb-1">Rappel Téléphonique Prioritaire</h4>
                                <p className="text-[13px] text-slate-500 leading-relaxed">Saisissez vos coordonnées, le standard d'assistance vous rappellera en direct d'ici 30 minutes.</p>
                              </div>
                              <ArrowRight size={20} className="text-slate-300 group-hover:text-[#1B433E] group-hover:translate-x-1 transition-all" />
                           </div>
                        </button>

                        {/* 3. Email (Corporate) */}
                        <a href="mailto:conciergerie@medibridge-africa.com" 
                           className="block p-6 sm:p-8 bg-white border border-[#E1E1E1] hover:border-slate-400 hover:shadow-lg transition-all duration-300 group relative">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-slate-800 transition-colors duration-300 text-slate-600 group-hover:text-white">
                                <Mail size={24} />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-[17px] font-bold text-[#1a1f24] mb-1">Bureau Sécurisé (Email)</h4>
                                <p className="text-[13px] text-slate-500 leading-relaxed">Transmission de dossier complexe ou institutionnel. Réponse formelle sous garantie de 24h ouvrées.</p>
                              </div>
                              <ArrowRight size={20} className="text-slate-300 group-hover:text-slate-800 group-hover:translate-x-1 transition-all" />
                           </div>
                        </a>
                      </div>

                    </motion.div>
                  ) : !submitted ? (
                    <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      
                      <button onClick={() => setShowCallbackForm(false)} className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-900 transition-colors mb-6 group">
                        <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Retour aux options
                      </button>

                      <h3 className="text-2xl text-[#1a1f24] mb-4" style={{ fontFamily: 'Georgia, serif' }}>Fiche de Rapel Direct</h3>
                      
                      <p className="text-[14px] text-slate-500 mb-8 max-w-md leading-relaxed">
                        Laissez vos coordonnées pour déclencher un appel prioritaire depuis le poste de gestion (France, Turquie, Tunisie ou Maroc).
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">Patient / Mandataire *</label>
                          <input 
                            type="text" required value={name} onChange={e => setName(e.target.value)}
                            placeholder="Entrez votre nom complet"
                            className="w-full h-14 px-4 bg-white border border-[#E1E1E1] text-[#1a1f24] text-[14px] focus:outline-none focus:border-[#1B433E] focus:ring-1 focus:ring-[#1B433E]/20 transition-all font-light"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">Ligne de Contact (avec indicatif) *</label>
                          <input 
                            type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                            placeholder="Ex: +33 6 00 00 00 00"
                            className="w-full h-14 px-4 bg-white border border-[#E1E1E1] text-[#1a1f24] text-[14px] focus:outline-none focus:border-[#1B433E] focus:ring-1 focus:ring-[#1B433E]/20 transition-all font-light"
                          />
                        </div>

                        <div className="pt-4">
                          <button type="submit" className="w-full h-14 bg-[#1B433E] hover:bg-[#112a27] text-white text-[13px] font-bold uppercase tracking-[0.15em] transition-colors shadow-lg shadow-[#1B433E]/20 flex items-center justify-center gap-3">
                            Connecter le standard <ArrowRight size={16} />
                          </button>
                        </div>
                        
                        <p className="text-[11px] text-slate-400 text-center mt-6 uppercase tracking-wider">Ligne 100% sécurisée · Secret Médical</p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center flex flex-col items-center">
                      <div className="w-20 h-20 bg-[#1B433E]/10 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={32} className="text-[#1B433E]" />
                      </div>
                      <h3 className="text-3xl text-[#1a1f24] mb-3" style={{ fontFamily: 'Georgia, serif' }}>Transmission Réussie</h3>
                      <p className="text-[15px] text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Le pôle coordinateur a accusé réception de votre requête. Vous serez contacté très rapidement sur le <strong>{phone}</strong>.
                      </p>
                      <button onClick={onClose} className="mt-10 h-12 px-8 border border-[#E1E1E1] hover:border-[#1a1f24] text-[#1a1f24] text-[12px] font-bold uppercase tracking-[0.1em] transition-all rounded-sm flex items-center justify-center gap-2">
                        Clôturer ce guichet
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
