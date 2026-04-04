'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Activity, Lock, Wifi, BatteryMedium, BrainCircuit, Hospital, CheckCircle2, Loader2, SignalHigh } from 'lucide-react'

// --- LE COMPOSANT DU SIMULATEUR QUI TOURNE EN BOUCLE (Z-10) ---
// Design : Ultra Minimaliste, "Swiss Design", Noir & Blanc/Gris.
// Aéré, aucun overflow (typos très petites).
const SimulatorContent = () => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const timings = [4500, 3000, 3000, 2500]; // Saisie plus longue pour tout lire
    timeout = setTimeout(() => {
      setStep((prev) => (prev + 1) % 4)
    }, timings[step]);
    return () => clearTimeout(timeout)
  }, [step])

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden font-sans">
      <div className="flex-1 w-full h-full flex flex-col pt-8 pb-4 px-4">
        <AnimatePresence mode="wait">
          
          {/* STEP 0 : SAISIE EPUREE & ENRICHIE */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex flex-col h-full">
              <div className="text-[7px] uppercase tracking-widest text-[#006994] font-bold mb-4 text-center">
                New Admission
              </div>
              
              <div className="space-y-3 px-1 flex-1">
                 {/* Profil */}
                 <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <div className="text-[5.5px] text-black/40 uppercase tracking-widest mb-0.5">Patient Profile</div>
                    <div className="text-[8px] text-black font-medium pb-1 border-b border-black/10 flex justify-between">
                       <span>Marc D. (54y)</span>
                       <span className="text-black/50">Rabat, MA</span>
                    </div>
                 </motion.div>

                 {/* Pathologie */}
                 <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                    <div className="text-[5.5px] text-black/40 uppercase tracking-widest mb-0.5">Requirement</div>
                    <div className="text-[8px] text-black font-medium pb-1 border-b border-black/10 flex justify-between items-center">
                       <span>Cardiovascular / Bypass</span>
                       <span className="bg-rose-50 text-rose-600 px-1 py-[1px] rounded text-[5px] uppercase font-bold">Urgent</span>
                    </div>
                 </motion.div>

                 {/* Upload */}
                 <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }}>
                    <div className="text-[5.5px] text-black/40 uppercase tracking-widest mb-0.5">Clinical File</div>
                    <div className="text-[8px] text-black font-medium pb-1 border-b border-black/10 flex justify-between">
                       <span>MRI_Thorax_Full.dcm</span>
                       <span className="text-black/40">128 MB</span>
                    </div>
                 </motion.div>
                 
                 {/* Preferences */}
                 <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.0 }}>
                    <div className="text-[5.5px] text-black/40 uppercase tracking-widest mb-0.5">Hospital Filters</div>
                    <div className="text-[8px] text-black font-medium pb-1 border-b border-black/10 flex gap-2">
                       <span className="bg-black/5 px-1.5 py-0.5 rounded">Robotique</span>
                       <span className="bg-black/5 px-1.5 py-0.5 rounded">Fast-Track</span>
                    </div>
                 </motion.div>
              </div>

               {/* Loader submission */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="mt-auto flex justify-center items-center gap-2">
                 <div className="w-2.5 h-2.5 border-[1px] border-[#006994]/20 border-t-[#006994] rounded-full animate-spin" />
                 <span className="text-[6.5px] text-[#006994] font-bold uppercase tracking-widest">Processing Data</span>
              </motion.div>
            </motion.div>
          )}

          {/* STEP 1 : TRAITEMENT IA */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center h-full text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-10 h-10 rounded-full border-[1.5px] border-[#006994]/10 border-t-[#006994] mb-6"/>
              
              <div className="h-8 relative w-full">
                 <motion.div initial={{ opacity:0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, times: [0, 0.2, 1] }} className="absolute w-full left-0 flex flex-col items-center">
                    <div className="text-[9px] text-[#006994] font-bold tracking-widest uppercase mb-1">AES-256 Auth</div>
                 </motion.div>
                 
                 <motion.div initial={{ opacity:0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 1.5, duration: 1.5, times: [0, 0.2, 1] }} className="absolute w-full left-0 flex flex-col items-center">
                    <div className="text-[9px] text-[#006994] font-bold tracking-widest uppercase mb-1">Routing Network Global</div>
                 </motion.div>
              </div>
            </motion.div>
          )}

          {/* STEP 2 : CONCORDANCE TROUVEE (Match Clinique - Maroc) */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, filter: 'blur(3px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex flex-col h-full items-center justify-center text-center px-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                 <Hospital size={16} strokeWidth={2}/>
              </div>
              
              <div className="text-[14px] text-[#111111] mb-1 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>Hôpital<br/>Cheikh Khalifa</div>
              <div className="text-[6.5px] text-black/50 uppercase tracking-widest mb-4 mt-0.5">Casablanca, Maroc</div>
              
              <div className="flex gap-2">
                 <div className="bg-emerald-50 border border-emerald-100 px-2 py-1 rounded">
                    <div className="text-[6px] text-emerald-700 uppercase tracking-widest font-bold">Match IA: 99.4%</div>
                 </div>
                 <div className="bg-[#006994]/5 border border-[#006994]/10 px-2 py-1 rounded">
                    <div className="text-[6px] text-[#006994] uppercase tracking-widest font-bold">Dispo. 48h</div>
                 </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 : VALIDATION & ENVOI FINAL */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white mb-4">
                 <CheckCircle2 size={16} strokeWidth={2}/>
              </div>
              
              <div className="text-[11px] text-black font-semibold mb-2">Dossier Verrouillé</div>
              <div className="text-[7.5px] text-black/50 leading-relaxed px-4">
                 Transfert chiffré vers<br/>le médecin coordinateur.
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
    <section className="bg-white py-24 md:py-32 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* L'image du vrai téléphone avec la Main (Couche supérieure) */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative aspect-square max-w-[500px] lg:max-w-[650px] mx-auto mt-8 lg:mt-0">
            
            {/* Effet d'irradiation douce arrière plan */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#006994]/10 blur-[80px] rounded-full z-0 pointer-events-none" />

            {/* 1. LAYER INFERIEUR : Le simulateur codé (z-10) */}
            {/* Marges configurées sur-mesure pour "iphone13.png" */}
            <div className="absolute z-10 bg-white shadow-2xl overflow-hidden"
                 style={{ 
                   left: '24%', 
                   top: '1%', 
                   width: '34%', 
                   height: '71%',
                   borderRadius: '8% / 4%' 
                 }}>
              <SimulatorContent />
            </div>

            {/* 2. LAYER SUPERIEUR : L'image PNG avec la main (z-20) */}
            <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)] flex items-center justify-center">
               <img 
                  src="/ImageFinal.png" 
                  className="w-full h-full object-contain"
                  alt="Mockup iPhone dans la main"
               />
            </div>
               
            {/* Reflet esthétique par-dessus tout l'écran (z-30) */}
            <div className="absolute z-30 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/20"
                 style={{ left: '24%', top: '1%', width: '34%', height: '71%', borderRadius: '8% / 4%' }} />
          </div>

          {/* Le Manifeste Apple-like de droite */}
          <div className="w-full lg:w-7/12 mt-10 lg:mt-0">
            <div className="max-w-xl">
              
              <div className="text-[#006994] font-semibold tracking-widest uppercase text-xs mb-8">
                Architecture MediBridge
              </div>
              
              <h2 className="text-[38px] md:text-[52px] font-medium leading-[1.1] text-[#111111] mb-8 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                L'Intelligence Clinique.
                <br />
                <span className="text-[#888888]">La Sécurité Absolue.</span>
              </h2>
              
              <p className="text-xl text-[#555555] font-light leading-relaxed mb-14">
                Le traitement de vos données de santé n'est pas confié au hasard. Notre écosystème fusionne un cryptage inviolable avec une puissance de routing capable de cibler l'établissement le plus pertinent selon vos pathologies en quelques fractions de seconde.
              </p>

              {/* Grille typographique stricte - "Manifeste Magazine" */}
              <div className="grid sm:grid-cols-2 gap-x-16 gap-y-12 border-t border-slate-200 pt-12">
                 <div>
                    <div className="text-[36px] font-light text-[#111111] mb-3 tracking-tighter">AES-256</div>
                    <p className="text-[#666666] leading-relaxed text-sm font-light">
                      Chiffrement intégral "zéro-connaissance". Seul votre médecin coordinateur accède à l'intégralité du dossier.
                    </p>
                 </div>
                 
                 <div>
                    <div className="text-[36px] font-light text-[#111111] mb-3 tracking-tighter">0.8s</div>
                    <p className="text-[#666666] leading-relaxed text-sm font-light">
                      Vitesse d'interrogation de notre base de données neuronale pour établir une pré-concordance clinique.
                    </p>
                 </div>
                 
                 <div>
                    <div className="text-[36px] font-light text-[#111111] mb-3 tracking-tighter">100%</div>
                    <p className="text-[#666666] leading-relaxed text-sm font-light">
                      Hébergement certifié HDS (Hébergeur de Données de Santé) garantissant une imperméabilité totale.
                    </p>
                 </div>

                 <div>
                    <div className="text-[36px] font-light text-[#111111] mb-3 tracking-tighter">Humain</div>
                    <p className="text-[#666666] leading-relaxed text-sm font-light">
                      La machine propose, l'humain dispose. Chaque recommandation est revalidée par notre comité médical.
                    </p>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
