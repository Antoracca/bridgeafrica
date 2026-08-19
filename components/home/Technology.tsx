'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Activity, Lock, Wifi, BatteryMedium, BrainCircuit, Hospital, CheckCircle2, Loader2, SignalHigh } from 'lucide-react'
import Image from 'next/image'

// --- LE COMPOSANT DU SIMULATEUR QUI TOURNE EN BOUCLE (Z-10) ---
// Design : Ultra Minimaliste, "Swiss Design", Noir & Blanc/Gris.
// Aéré, aucun overflow (typos très petites).
const SimulatorContent = () => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const timings = [5000, 3500, 4000, 6000]; // Temps ajustés pour laisser le temps de lire le contenu dense
    timeout = setTimeout(() => {
      setStep((prev) => (prev + 1) % 4)
    }, timings[step]);
    return () => clearTimeout(timeout)
  }, [step])

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden font-sans">
      <div className="flex-1 w-full h-full flex flex-col pt-8 pb-4 px-3">
        <AnimatePresence mode="wait">
          
          {/* STEP 0 : SAISIE EPUREE & CONSTANTES VITALES */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex flex-col h-full">
              <div className="text-[7.5px] uppercase tracking-widest text-[#006994] font-bold mb-3 text-center">
                Patient Dashboard
              </div>
              
              <div className="space-y-3 flex-1 flex flex-col">
                 
                 {/* Vital Signs Grid */}
                 <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-1.5 mb-1">
                    <div className="bg-slate-50 p-1.5 rounded flex flex-col justify-between border border-slate-100">
                       <div className="text-[5px] text-slate-400 uppercase font-bold flex justify-between items-center">
                          <span>Heart Rate</span>
                          <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></span>
                       </div>
                       <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-[12px] font-bold text-slate-800 tracking-tighter">102</span>
                          <span className="text-[5px] text-slate-500 font-medium">BPM</span>
                       </div>
                    </div>
                    
                    <div className="bg-slate-50 p-1.5 rounded flex flex-col justify-between border border-slate-100">
                       <div className="text-[5px] text-slate-400 uppercase font-bold flex justify-between items-center">
                          <span>Blood Press.</span>
                          <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                       </div>
                       <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-[12px] font-bold text-slate-800 tracking-tighter">140/90</span>
                          <span className="text-[5px] text-slate-500 font-medium">mmHg</span>
                       </div>
                    </div>
                 </motion.div>

                 {/* Profil Clinique */}
                 <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="bg-slate-50 p-1.5 rounded border border-slate-100">
                    <div className="text-[6px] text-black/40 uppercase tracking-widest mb-1 font-bold">Clinical Case Profile</div>
                    <div className="text-[8px] text-black font-semibold flex justify-between items-center mb-1">
                       <span>Marc D. (54y, Male)</span>
                       <span className="bg-rose-100 text-rose-700 px-[3px] py-[2px] rounded text-[4.5px] uppercase font-bold tracking-wider">High Priority</span>
                    </div>
                    <div className="text-[6.5px] text-slate-700 leading-tight">
                       Suspected acute coronary syndrome with ST-segment elevation. Requesting urgent bypass architecture.
                    </div>
                 </motion.div>

                 {/* Fichiers */}
                 <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }} className="bg-slate-50 p-1.5 rounded border border-slate-100">
                    <div className="text-[6px] text-black/40 uppercase tracking-widest mb-1 font-bold">Attached Neuro-Data</div>
                    <div className="flex items-center gap-1.5 mb-[2px]">
                       <div className="w-3 h-3 bg-blue-100 rounded-[2px] flex items-center justify-center"><Activity size={6} className="text-blue-600"/></div>
                       <div className="flex-1 flex justify-between items-center">
                          <span className="text-[7px] text-black font-medium">ECG_Telemetry_Live</span>
                          <span className="text-[5px] text-slate-400">Stream</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <div className="w-3 h-3 bg-indigo-100 rounded-[2px] flex items-center justify-center"><BrainCircuit size={6} className="text-indigo-600"/></div>
                       <div className="flex-1 flex justify-between items-center">
                          <span className="text-[7px] text-black font-medium">Angiography_3D.dcm</span>
                          <span className="text-[5px] text-slate-400">512 MB</span>
                       </div>
                    </div>
                 </motion.div>
              </div>

               {/* Loader submission avec bouton stylisé */}
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }} className="mt-auto">
                 <div className="w-full bg-[#111] text-white rounded-[4px] py-2 flex justify-center items-center gap-2 shadow-md">
                    <Loader2 size={8} className="animate-spin" />
                    <span className="text-[7px] font-bold uppercase tracking-widest">Transmit to AI</span>
                 </div>
              </motion.div>
            </motion.div>
          )}

          {/* STEP 1 : TRAITEMENT IA DENSE RADAR */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center h-full text-center relative">
              
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                 <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #006994 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
              </div>

              <div className="relative w-14 h-14 mb-4">
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-dashed border-[#006994]/30" />
                 <motion.div animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-1 rounded-full border-2 border-transparent border-t-[#006994] border-r-[#006994]/50" />
                 <div className="absolute inset-0 flex items-center justify-center text-[#006994]">
                    <Shield size={12} strokeWidth={2.5}/>
                 </div>
              </div>
              
              <div className="h-10 relative w-full flex flex-col items-center justify-center gap-1.5">
                 <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} className="text-[6.5px] text-[#006994] font-mono tracking-widest uppercase bg-[#006994]/10 px-2 py-0.5 rounded-full">
                    AES-256 Auth Active
                 </motion.div>
                 <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} className="text-[5.5px] text-slate-500 font-mono tracking-widest uppercase">
                    Cross-referencing 420 clinics...
                 </motion.div>
                 <motion.div animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="text-[5.5px] text-slate-500 font-mono tracking-widest uppercase">
                    Analyzing JCI compliance...
                 </motion.div>
              </div>
            </motion.div>
          )}

          {/* STEP 2 : CONCORDANCE TROUVEE (Match Clinique - Data Room) */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4 }} className="flex flex-col h-full px-1">
              <div className="flex items-center justify-between mb-3 mt-2 border-b border-slate-100 pb-2">
                 <div className="text-[7px] text-emerald-600 font-bold uppercase tracking-widest">Match Verified</div>
                 <div className="text-[6px] font-mono text-slate-400">99.8% ACCURACY</div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                    <Hospital size={14} strokeWidth={2}/>
                 </div>
                 <div>
                    <div className="text-[12px] text-[#111111] leading-tight font-bold" style={{ fontFamily: 'Georgia, serif' }}>Hôpital Cheikh Khalifa</div>
                    <div className="text-[6px] text-slate-500 uppercase tracking-widest mt-0.5">Casablanca, Maroc</div>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                 <div className="bg-[#FAFAFA] p-1.5 rounded border border-slate-100">
                    <div className="text-[5px] text-slate-400 uppercase font-bold mb-0.5">Time to Surgery</div>
                    <div className="text-[8px] text-slate-800 font-bold">&lt; 4 Hours</div>
                 </div>
                 <div className="bg-[#FAFAFA] p-1.5 rounded border border-slate-100">
                    <div className="text-[5px] text-slate-400 uppercase font-bold mb-0.5">Specialist</div>
                    <div className="text-[8px] text-slate-800 font-bold">Dr. Alaoui, M.D.</div>
                 </div>
                 <div className="bg-[#FAFAFA] p-1.5 rounded border border-slate-100 col-span-2 flex justify-between items-center">
                    <div className="text-[5px] text-slate-400 uppercase font-bold">Facility Rating</div>
                    <div className="text-[7px] text-amber-500 font-bold">★★★★★ (JCI)</div>
                 </div>
              </div>

               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-auto">
                 <div className="w-full bg-emerald-600 text-white rounded-[4px] py-1.5 flex justify-center items-center gap-1.5 shadow-md">
                    <CheckCircle2 size={8} strokeWidth={3} />
                    <span className="text-[6px] font-bold uppercase tracking-widest">Accept & Transfer</span>
                 </div>
              </motion.div>
            </motion.div>
          )}

          {/* STEP 3 : VALIDATION & HUMAIN (Vidéo/Photo Finale) */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex flex-col h-full bg-black relative rounded-md overflow-hidden">
              
              {/* Photo Clinique Unsplash Premium en Cover */}
              <div className="absolute inset-0 z-0">
                 <img
                    src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=600&auto=format&fit=crop"
                    alt="Medical Team"
                    className="w-full h-full object-cover opacity-60"
                    loading="eager"
                 />
                 {/* Dark gradient overlay for text readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              <div className="relative z-10 flex flex-col h-full justify-end p-3 text-center">
                 <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: 'spring' }} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mx-auto mb-2">
                    <CheckCircle2 size={16} strokeWidth={2.5}/>
                 </motion.div>
                 
                 <div className="text-[10px] text-white font-bold mb-1">Dossier Réceptionné</div>
                 <div className="text-[6px] text-white/80 leading-relaxed font-medium mb-1">
                   L'équipe du Professeur Alaoui prépare<br/>actuellement le protocole.
                 </div>
                 
                 <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="mt-2 text-[5px] text-emerald-400 uppercase tracking-widest font-bold">
                    Communication Sécurisée
                 </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

export function Technology() {
  return (
    <section className="bg-[#070C14] py-24 md:py-32 font-sans overflow-hidden relative">
      {/* Fond global — gradient bleu nuit */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #0d2a3f 0%, transparent 60%), radial-gradient(circle at 80% 30%, #0a1929 0%, transparent 50%)' }} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12 relative z-10">
        
        {/* ══ LAYOUT MOBILE : Titre → Image → Description (lg:hidden) ══ */}
        <div className="flex flex-col gap-0 lg:hidden">

          {/* 1. Label + Titre */}
          <div className="mb-8">
            <div className="text-[#38BDF8] font-semibold tracking-widest uppercase text-xs mb-6">
              Architecture Pont Afrique Santé
            </div>
            <h2 className="text-[34px] font-medium leading-[1.1] text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              L&apos;Intelligence Clinique.
              <br />
              <span className="text-white/40">La Sécurité Absolue.</span>
            </h2>
          </div>

          {/* 2. Image Téléphone — wrapper py-20 pour absorber le débordement du trou noir */}
          <div className="w-full py-20">
            <div className="relative aspect-square max-w-[320px] mx-auto">
              {/* Effet Trou Noir — limité à 100% sur mobile pour ne pas déborder */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,20,40,0.90) 65%, #070C14 100%)' }} />
                <div className="absolute inset-[15%] rounded-full" style={{ boxShadow: '0 0 50px 15px rgba(0, 105, 148, 0.18), 0 0 100px 30px rgba(0, 105, 148, 0.07)', background: 'transparent' }} />
              </div>
              {/* Simulateur */}
              <div className="absolute z-10 bg-white shadow-2xl overflow-hidden"
                   style={{ left: '24%', top: '1%', width: '34%', height: '71%', borderRadius: '8% / 4%' }}>
                <SimulatorContent />
              </div>
              {/* Image iPhone */}
              <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)] flex items-center justify-center" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                <Image src="/ImageFinal.png" width={320} height={320} className="w-full h-full object-contain" alt="Mockup iPhone dans la main" priority />
              </div>
              {/* Reflet */}
              <div className="absolute z-30 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/20"
                   style={{ left: '24%', top: '1%', width: '34%', height: '71%', borderRadius: '8% / 4%' }} />
            </div>
          </div>

          {/* 3. Description + Stats */}
          <div className="mt-0">
            <p className="text-lg text-white/50 font-light leading-relaxed mb-10">
              Le traitement de vos données de santé n&apos;est pas confié au hasard. Notre écosystème fusionne un cryptage inviolable avec une puissance de routing capable de cibler l&apos;établissement le plus pertinent selon vos pathologies en quelques fractions de seconde.
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/10 pt-10">
              <div>
                <div className="text-[28px] font-light text-white mb-2 tracking-tighter">AES-256</div>
                <p className="text-white/40 leading-relaxed text-sm font-light">Chiffrement intégral &quot;zéro-connaissance&quot;. Seul votre médecin coordinateur accède au dossier.</p>
              </div>
              <div>
                <div className="text-[28px] font-light text-white mb-2 tracking-tighter">0.8s</div>
                <p className="text-white/40 leading-relaxed text-sm font-light">Vitesse d&apos;interrogation de notre base de données neuronale pour une pré-concordance clinique.</p>
              </div>
              <div>
                <div className="text-[28px] font-light text-white mb-2 tracking-tighter">100%</div>
                <p className="text-white/40 leading-relaxed text-sm font-light">Hébergement certifié HDS garantissant une imperméabilité totale de vos données.</p>
              </div>
              <div>
                <div className="text-[28px] font-light text-white mb-2 tracking-tighter">Humain</div>
                <p className="text-white/40 leading-relaxed text-sm font-light">La machine propose, l&apos;humain dispose. Chaque recommandation est revalidée par notre comité.</p>
              </div>
            </div>
          </div>

        </div>

        {/* ══ LAYOUT DESKTOP : Téléphone gauche | Texte droite (hidden lg:flex) ══ */}
        <div className="hidden lg:flex flex-row items-center gap-24">

          {/* Zone Téléphone avec l'effet Trou Noir */}
          <div className="w-1/2 flex justify-center items-center relative aspect-square max-w-[650px] mx-auto">
            {/* Effet Trou Noir */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] z-0 pointer-events-none">
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,20,40,0.95) 70%, #070C14 100%)' }} />
              <div className="absolute inset-[15%] rounded-full" style={{ boxShadow: '0 0 80px 30px rgba(0, 105, 148, 0.20), 0 0 160px 60px rgba(0, 105, 148, 0.08)', background: 'transparent' }} />
              <div className="absolute inset-[25%] rounded-full blur-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(0,80,120,0.12) 0%, transparent 70%)' }} />
            </div>
            {/* Simulateur */}
            <div className="absolute z-10 bg-white shadow-2xl overflow-hidden"
                 style={{ left: '24%', top: '1%', width: '34%', height: '71%', borderRadius: '8% / 4%' }}>
              <SimulatorContent />
            </div>
            {/* Image iPhone */}
            <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)] flex items-center justify-center" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
              <Image src="/ImageFinal.png" width={650} height={650} className="w-full h-full object-contain" alt="Mockup iPhone dans la main" priority />
            </div>
            {/* Reflet */}
            <div className="absolute z-30 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/20"
                 style={{ left: '24%', top: '1%', width: '34%', height: '71%', borderRadius: '8% / 4%' }} />
          </div>

          {/* Texte complet — Label + Titre + Description + Stats */}
          <div className="w-7/12">
            <div className="max-w-xl">
              <div className="text-[#38BDF8] font-semibold tracking-widest uppercase text-xs mb-8">
                Architecture Pont Afrique Santé
              </div>
              <h2 className="text-[52px] font-medium leading-[1.1] text-white mb-8 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                L&apos;Intelligence Clinique.
                <br />
                <span className="text-white/40">La Sécurité Absolue.</span>
              </h2>
              <p className="text-xl text-white/50 font-light leading-relaxed mb-14">
                Le traitement de vos données de santé n&apos;est pas confié au hasard. Notre écosystème fusionne un cryptage inviolable avec une puissance de routing capable de cibler l&apos;établissement le plus pertinent selon vos pathologies en quelques fractions de seconde.
              </p>
              <div className="grid grid-cols-2 gap-x-16 gap-y-12 border-t border-white/10 pt-12">
                <div>
                  <div className="text-[36px] font-light text-white mb-3 tracking-tighter">AES-256</div>
                  <p className="text-white/40 leading-relaxed text-sm font-light">Chiffrement intégral &quot;zéro-connaissance&quot;. Seul votre médecin coordinateur accède à l&apos;intégralité du dossier.</p>
                </div>
                <div>
                  <div className="text-[36px] font-light text-white mb-3 tracking-tighter">0.8s</div>
                  <p className="text-white/40 leading-relaxed text-sm font-light">Vitesse d&apos;interrogation de notre base de données neuronale pour établir une pré-concordance clinique.</p>
                </div>
                <div>
                  <div className="text-[36px] font-light text-white mb-3 tracking-tighter">100%</div>
                  <p className="text-white/40 leading-relaxed text-sm font-light">Hébergement certifié HDS (Hébergeur de Données de Santé) garantissant une imperméabilité totale.</p>
                </div>
                <div>
                  <div className="text-[36px] font-light text-white mb-3 tracking-tighter">Humain</div>
                  <p className="text-white/40 leading-relaxed text-sm font-light">La machine propose, l&apos;humain dispose. Chaque recommandation est revalidée par notre comité médical.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
