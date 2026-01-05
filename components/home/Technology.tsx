'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, FileText, CheckCircle, Activity, SignalHigh, Wifi, Battery, 
  Home, MessageSquare, FolderOpen, 
  ScanLine, ArrowRight, ShieldCheck, 
  Stethoscope, Building2, Lock, FileCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// --- UTILS ---
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// --- COMPOSANT SIMULATEUR ---
const TechSimulator = () => {
  const [step, setStep] = useState<string>('dashboard')
  
  // Séquence principale améliorée et ralentie
  useEffect(() => {
    let isMounted = true
    
    const sequence = async () => {
      while(isMounted) {
        // 1. DASHBOARD (4s) - Point de départ
        setStep('dashboard')
        await wait(4000)

        // 2. SCANNING UI (4s) - Alignement du document
        setStep('scan_align')
        await wait(2000)
        setStep('scan_capture') // Capture avec flash
        await wait(800)
        
        // 3. SECURE UPLOAD (4s) - Sécurité mise en avant
        setStep('upload_secure')
        await wait(4000)

        // 4. ANALYSE IA (3s) - Extraction données
        setStep('analysis_ai')
        await wait(3500)

        // 5. EXPERT REVIEW (4s) - Validation humaine (Important)
        setStep('analysis_expert')
        await wait(4500)

        // 6. TRANSFERT CLINIQUE (3s) - Envoi au service
        setStep('transfer_clinic')
        await wait(3500)

        // 7. DEVIS (5s) - Proposition claire
        setStep('quote')
        await wait(6000)

        // 8. PAYMENT & SUCCESS (4s)
        setStep('payment')
        await wait(2000)
        setStep('success')
        await wait(5000)
      }
    }
    sequence()
    return () => { isMounted = false }
  }, [])

  return (
    // AJUSTEMENT MOBILE: Scale down sur mobile, taille normale sur desktop
    <div className="relative w-full max-w-[280px] md:max-w-[380px] mx-auto perspective-1000 transform scale-90 md:scale-100 origin-top">
      {/* CADRE IPHONE 15 PRO */}
      <div className="relative bg-black rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border-[4px] md:border-[6px] border-[#1a1a1a] ring-1 ring-white/20 overflow-hidden h-[600px] md:h-[800px] flex flex-col">
        
        {/* DYNAMIC ISLAND & STATUS BAR */}
        <div className="absolute top-0 w-full px-4 md:px-6 pt-3 z-50 flex justify-between items-start text-white mix-blend-difference">
            <div className="text-[11px] md:text-[13px] font-medium pl-1 md:pl-2">09:41</div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80px] md:w-[100px] h-[24px] md:h-[28px] bg-black rounded-full flex items-center justify-center gap-2 px-3 transition-all duration-500 z-50">
               {/* Indicateurs d'état */}
               {step === 'upload_secure' && <Lock size={10} className="text-green-500" />}
               {step === 'analysis_ai' && <Brain size={10} className="text-blue-500 animate-pulse" />}
               {step === 'transfer_clinic' && <Activity size={10} className="text-purple-500" />}
            </div>
            <div className="flex items-center gap-1 pr-1 md:pr-2">
                <SignalHigh size={12} strokeWidth={2.5} />
                <Wifi size={12} strokeWidth={2.5} />
                <Battery size={16} />
            </div>
        </div>

        {/* ECRAN PRINCIPAL */}
        <div className="flex-1 bg-white relative overflow-hidden font-sans">
          <AnimatePresence mode="wait">

            {/* --- 1. DASHBOARD --- */}
            {step === 'dashboard' && (
              <motion.div key="dash" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full bg-slate-50 flex flex-col pt-10 md:pt-12">
                 <div className="px-5 md:px-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">JP</div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">Jean-Pierre K.</h3>
                                <p className="text-[10px] text-slate-500">Premium Member</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-200 mb-6 relative overflow-hidden">
                        <h2 className="text-xl font-bold mb-2">Envoyer un dossier</h2>
                        <p className="text-blue-100 text-xs mb-4 max-w-[200px]">Scanner vos rapports médicaux pour analyse et transfert immédiat.</p>
                        <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-full h-10 px-6 text-xs font-bold w-full">
                            Nouvelle Demande <ArrowRight size={14} className="ml-2"/>
                        </Button>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mb-3">Historique</h3>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-3">
                         <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600"><CheckCircle size={18}/></div>
                         <div className="flex-1">
                             <div className="text-xs font-bold text-slate-900">Bilan Cardiologique</div>
                             <div className="text-[10px] text-slate-400">Validé par Dr. Michel • 12 Jan</div>
                         </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {/* --- 2. SCANNING (Align + Capture) --- */}
            {(step === 'scan_align' || step === 'scan_capture') && (
              <motion.div key="scan" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full bg-black relative flex flex-col">
                  {/* Fond Caméra simulé */}
                  <div className="absolute inset-0 bg-slate-900">
                     {/* Grille de composition */}
                     <div className="absolute inset-0 border-r border-white/10 w-1/3 left-0"></div>
                     <div className="absolute inset-0 border-l border-white/10 w-1/3 right-0"></div>
                     <div className="absolute inset-0 border-b border-white/10 h-1/3 top-0"></div>
                     <div className="absolute inset-0 border-t border-white/10 h-1/3 bottom-0"></div>
                  </div>

                  {/* Zone de Scan */}
                  <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-6">
                      <div className="relative">
                          {/* Le Document qui apparait */}
                          <motion.div 
                             initial={{scale: 0.8, opacity: 0, rotateX: 20}}
                             animate={{scale: 1, opacity: 1, rotateX: 0}}
                             transition={{duration: 1}}
                             className="w-48 md:w-56 h-64 md:h-72 bg-white rounded-md p-4 shadow-2xl relative overflow-hidden"
                          >
                             {/* Simulation contenu document */}
                             <div className="h-4 w-1/2 bg-slate-200 mb-4 rounded-sm"></div>
                             <div className="space-y-2">
                                <div className="h-2 w-full bg-slate-100 rounded-sm"></div>
                                <div className="h-2 w-full bg-slate-100 rounded-sm"></div>
                                <div className="h-2 w-3/4 bg-slate-100 rounded-sm"></div>
                                <div className="h-20 w-full bg-slate-50 mt-4 rounded-sm border border-slate-100"></div>
                             </div>
                             <div className="absolute bottom-4 right-4 w-12 h-12 bg-blue-100 rounded-full opacity-50"></div>
                          </motion.div>

                          {/* Cadre de visée */}
                          <motion.div 
                             animate={{ scale: step === 'scan_capture' ? 1.05 : 1, borderColor: step === 'scan_capture' ? '#22c55e' : '#ffffff' }}
                             className="absolute -inset-4 border-2 rounded-2xl transition-colors duration-300 pointer-events-none"
                          >
                             {/* Coins */}
                             <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-inherit rounded-tl-xl"></div>
                             <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-inherit rounded-tr-xl"></div>
                             <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-inherit rounded-bl-xl"></div>
                             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-inherit rounded-br-xl"></div>
                          </motion.div>
                          
                          {/* Ligne de scan */}
                          {step === 'scan_align' && (
                              <motion.div 
                                 animate={{ top: ['0%', '100%', '0%'] }}
                                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                 className="absolute left-[-10px] right-[-10px] h-0.5 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] z-20"
                              />
                          )}
                      </div>
                      
                      <div className="mt-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full">
                          <p className="text-white text-xs font-medium">
                              {step === 'scan_capture' ? 'Capture en cours...' : 'Alignez le rapport médical'}
                          </p>
                      </div>
                  </div>

                  {/* Flash Effect */}
                  {step === 'scan_capture' && (
                      <motion.div initial={{opacity:0}} animate={{opacity:[0, 1, 0]}} transition={{duration:0.2}} className="absolute inset-0 bg-white z-50 pointer-events-none"/>
                  )}
              </motion.div>
            )}

            {/* --- 3. SECURE UPLOAD --- */}
            {step === 'upload_secure' && (
               <motion.div key="upload" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full bg-slate-50 flex flex-col items-center justify-center p-8">
                   <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-6 relative">
                       <ShieldCheck size={40} className="text-green-600" />
                       <motion.div 
                         animate={{ rotate: 360 }}
                         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 border-4 border-green-100 border-t-green-500 rounded-full"
                       />
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 mb-2">Sécurisation des données</h3>
                   <p className="text-xs text-slate-500 text-center mb-6">Chiffrement de bout en bout (AES-256) avant transmission aux serveurs HDS.</p>
                   
                   <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                       <motion.div initial={{width:0}} animate={{width:'100%'}} transition={{duration: 3}} className="h-full bg-green-500" />
                   </div>
               </motion.div>
            )}

            {/* --- 4. AI ANALYSIS --- */}
            {step === 'analysis_ai' && (
               <motion.div key="ai" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full bg-slate-900 flex flex-col relative overflow-hidden p-6 pt-20">
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                   
                   <div className="flex items-center gap-3 mb-8">
                       <Brain className="text-blue-400" size={24}/>
                       <h2 className="text-white font-bold text-lg">Analyse IA</h2>
                   </div>

                   <div className="space-y-3">
                       {/* Extraction simulation */}
                       {[
                           { label: "Type", val: "Imagerie / IRM" },
                           { label: "Zone", val: "Rachis Lombaire" },
                           { label: "Date", val: "28/12/2024" }
                       ].map((item, i) => (
                           <motion.div 
                             key={i}
                             initial={{x: -20, opacity: 0}}
                             animate={{x: 0, opacity: 1}}
                             transition={{delay: i * 0.5}}
                             className="bg-white/10 border border-white/10 rounded-xl p-3 flex justify-between items-center"
                           >
                               <span className="text-slate-400 text-xs">{item.label}</span>
                               <span className="text-white text-xs font-mono">{item.val}</span>
                           </motion.div>
                       ))}
                   </div>

                   <div className="mt-auto">
                       <p className="text-blue-400 text-[10px] font-mono animate-pulse">STRUCTURING DATA...</p>
                   </div>
               </motion.div>
            )}

            {/* --- 5. EXPERT REVIEW (Human) --- */}
            {step === 'analysis_expert' && (
               <motion.div key="expert" initial={{x: 100}} animate={{x: 0}} exit={{x: -100}} className="h-full bg-white pt-14 px-6 flex flex-col">
                   <div className="flex items-center justify-center mb-6">
                       <div className="relative">
                           <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-white shadow-xl overflow-hidden">
                               <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Doctor" className="w-full h-full object-cover"/>
                           </div>
                           <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                               <CheckCircle size={12} className="text-white"/>
                           </div>
                       </div>
                   </div>

                   <div className="text-center mb-8">
                       <h2 className="text-lg font-bold text-slate-900">Dr. Sarah Cohen</h2>
                       <p className="text-xs text-blue-600 font-medium">Médecin Coordinateur</p>
                       <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold">
                           <Stethoscope size={12}/>
                           Revue du dossier en cours...
                       </div>
                   </div>

                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                       <div className="flex items-center gap-3">
                           <FileCheck size={16} className="text-slate-400"/>
                           <span className="text-xs text-slate-600">Conformité documents</span>
                           <CheckCircle size={14} className="text-green-500 ml-auto"/>
                       </div>
                       <div className="flex items-center gap-3">
                           <Activity size={16} className="text-slate-400"/>
                           <span className="text-xs text-slate-600">Urgence qualifiée</span>
                           <span className="text-[10px] font-bold text-orange-500 ml-auto">MODÉRÉE</span>
                       </div>
                   </div>
               </motion.div>
            )}

            {/* --- 6. HOSPITAL TRANSFER --- */}
            {step === 'transfer_clinic' && (
               <motion.div key="transfer" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full bg-slate-50 relative flex flex-col items-center justify-center">
                   
                   {/* Animation flux */}
                   <div className="relative w-full px-8 mb-8">
                       <div className="flex justify-between items-center mb-2">
                           <div className="flex flex-col items-center gap-2">
                               <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-200">
                                   <FolderOpen size={20} className="text-blue-500"/>
                               </div>
                               <span className="text-[10px] text-slate-500 font-medium">Dossier</span>
                           </div>
                           
                           {/* Ligne connecteur */}
                           <div className="flex-1 h-[2px] bg-slate-200 mx-4 relative overflow-hidden">
                               <motion.div 
                                 animate={{x: ['-100%', '100%']}} 
                                 transition={{duration: 1.5, repeat: Infinity, ease: "linear"}}
                                 className="absolute top-0 left-0 w-1/2 h-full bg-blue-500"
                               />
                           </div>

                           <div className="flex flex-col items-center gap-2">
                               <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-200">
                                   <Building2 size={20} className="text-blue-500"/>
                               </div>
                               <span className="text-[10px] text-slate-500 font-medium">Clinique</span>
                           </div>
                       </div>
                       <div className="text-center mt-6">
                           <span className="text-xs font-bold text-slate-900">Transmission Sécurisée</span>
                           <p className="text-[10px] text-slate-400">Service Orthopédie • Clinique Pasteur</p>
                       </div>
                   </div>
               </motion.div>
            )}

            {/* --- 7. QUOTE --- */}
            {step === 'quote' && (
              <motion.div key="quote" initial={{y:50, opacity:0}} animate={{y:0, opacity:1}} className="h-full bg-white pt-14 px-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><FileText size={16}/></div>
                      <h2 className="text-lg font-bold text-slate-900">Proposition</h2>
                  </div>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6 shadow-sm">
                      <div className="bg-slate-50 p-3 border-b border-slate-200 flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-700">Pack Chirurgie + Séjour</span>
                          <span className="text-xs font-bold text-blue-600">3 200 €</span>
                      </div>
                      <div className="p-4 space-y-3">
                          <div className="flex gap-3 text-xs text-slate-600">
                              <CheckCircle size={14} className="text-green-500 shrink-0"/>
                              <span>Intervention (Clinique Pasteur)</span>
                          </div>
                          <div className="flex gap-3 text-xs text-slate-600">
                              <CheckCircle size={14} className="text-green-500 shrink-0"/>
                              <span>Hébergement 5 jours (Pension complète)</span>
                          </div>
                          <div className="flex gap-3 text-xs text-slate-600">
                              <CheckCircle size={14} className="text-green-500 shrink-0"/>
                              <span>Transferts aéroport V.I.P</span>
                          </div>
                      </div>
                  </div>

                  <Button className="w-full h-12 bg-slate-900 rounded-xl text-sm font-bold shadow-lg">
                      Accepter et Signer
                  </Button>
              </motion.div>
            )}

            {/* --- 8. SUCCESS --- */}
            {step === 'success' && (
              <motion.div key="success" initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="h-full bg-green-600 flex flex-col items-center justify-center text-white p-8 text-center">
                   <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                       <CheckCircle size={40} className="text-white"/>
                   </div>
                   <h2 className="text-2xl font-bold mb-2">Dossier Transmis !</h2>
                   <p className="text-green-100 text-xs mb-8">
                     L&apos;équipe médicale de la Clinique Pasteur a bien reçu votre dossier complet. Votre coordinateur vous contacte sous 2h.
                   </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* BOTTOM NAV BAR */}
        <div className="h-[60px] md:h-[80px] bg-white border-t border-slate-100 flex justify-around items-start pt-3 md:pt-4 px-2 z-10 text-slate-300 relative">
            <div className="flex flex-col items-center gap-1 text-blue-600">
                <Home className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5}/>
            </div>
            <div className="flex flex-col items-center gap-1">
                <FolderOpen className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5}/>
            </div>
            <div className="absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2 bg-slate-900 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-slate-50">
                <ScanLine className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div className="flex flex-col items-center gap-1">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5}/>
            </div>
            <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5}/>
            </div>
        </div>
      </div>
    </div>
  )
}

// --- MAIN COMPONENT ---
export function Technology() {
  return (
    <section className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* GAUCHE: TEXTE & ACTIONS (PREMIER SUR MOBILE) */}
          <div className="text-left space-y-6 md:space-y-8 order-1">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-bold backdrop-blur-sm">
                <Brain size={18} /> Technologie MediBridge™
             </div>
             
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
               L&apos;excellence médicale <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">à portée de main.</span>
             </h2>
             
             <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
               Plus qu&apos;une simple application, MediBridge orchestre votre parcours de soins avec une précision chirurgicale. De la numérisation sécurisée à la validation par nos médecins experts.
             </p>

             <ul className="space-y-3 md:space-y-4 text-slate-300">
                <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20"><ShieldCheck size={16}/></div>
                    <span className="text-sm md:text-base">Données de santé chiffrées (HDS & AES-256)</span>
                </li>
                <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20"><Stethoscope size={16}/></div>
                    <span className="text-sm md:text-base">Double validation : IA + Médecins Experts</span>
                </li>
                <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20"><Building2 size={16}/></div>
                    <span className="text-sm md:text-base">Transmission directe aux services hospitaliers</span>
                </li>
             </ul>

             <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 py-6 text-lg font-bold shadow-lg transition-all hover:scale-105 active:scale-95">
                   Faire une demande de démo
                </Button>
                <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-105 active:scale-95">
                   Comprendre notre algorithme
                </Button>
             </div>
          </div>

          {/* DROITE: SIMULATEUR (DEUXIEME SUR MOBILE) */}
          <div className="relative flex justify-center lg:justify-end order-2">
             <TechSimulator />
          </div>

        </div>

        {/* Footer de section: Powered by */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-white/5 text-center">
           <p className="text-slate-600 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              Powered by <span className="text-blue-500">MedBridge</span> Technologie
           </p>
        </div>
      </div>
    </section>
  )
}