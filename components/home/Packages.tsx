'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, HeartHandshake, Landmark, BriefcaseBusiness, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { Pricing } from './Pricing'

const baseFeatures = [
  { title: "Dossier & Clinique", desc: "Constitution sécurisée (HDS), traduction et comités d'experts pour trouver l'adéquation thérapeutique exacte.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" },
  { title: "Transport & Vols", desc: "Orchestration logistique totale : gestion des visas médicaux, vols internationaux et transferts confidentiels VIP.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800" },
  { title: "Séjour & Traduction", desc: "Hébergement préférentiel luxueux. Un interprète natif dédié vous accompagne physiquement à chaque rendez-vous.", image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800" },
  { title: "Suivi Post-Opératoire", desc: "Retour sécurisé organisé avec l'aval du chirurgien. Continuité des soins par téléconsultation avec le médecin référent.", image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800" }
]

export function Packages() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  return (
    <>
    <section className="bg-[#fafafa] font-sans pb-16 pt-20 border-t border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14">
        
        {/* --- HEADER ÉDITORIAL --- */}
        <div className="mb-24 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
           <div className="w-full md:w-1/2">
             <h3 className="text-2xl md:text-3xl text-slate-400 font-light italic mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                L'Accompagnement Privilège.
             </h3>
             <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-slate-900 leading-[1.1] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
               Votre santé n'a pas de prix.<br className="hidden md:block"/>
               <span className="text-brand-teal">Votre sérénité, oui.</span>
             </h2>
             <p className="text-slate-500 text-lg lg:text-xl font-light leading-relaxed">
               Nous ne sommes pas un simple catalogue de cliniques. Nous sommes votre partenaire logistique et médical absolu. Une assistance de haut niveau, humaine et transparente, du diagnostic à votre complet rétablissement.
             </p>
           </div>
           
           <div className="w-full md:w-1/2 relative flex justify-center md:justify-end">
             {/* Effet flou (Blur) derrière l'image */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-teal/30 blur-[60px] rounded-full -z-10"></div>
             
             {/* Image avec bord droit en demi-cercle (rounded-r-full) */}
             <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-l-2xl rounded-r-full overflow-hidden shadow-2xl border-4 border-white">
               <img 
                 src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" 
                 alt="Assistance Patient MediBridge"
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-slate-900/10"></div>
             </div>
           </div>
        </div>

        {/* --- LA MÉTHODE / L'ÉCOSYSTÈME (Effet Escalier / Catalogue) --- */}
        <div className="mb-24 lg:pb-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 border-b border-slate-200 pb-6">
            <h3 className="text-2xl md:text-3xl text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>Inclus dans chaque démarche</h3>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 items-start">
             {baseFeatures.map((feat, i) => {
               const mtClasses = ["lg:mt-0", "lg:mt-8", "lg:mt-16", "lg:mt-24"];
               const isActive = activeCard === i;
               return (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1, duration: 0.6 }}
                   onClick={() => setActiveCard(isActive ? null : i)}
                   className={`relative bg-slate-900 p-4 sm:p-6 md:p-8 aspect-[4/5] lg:aspect-square flex flex-col group transition-all cursor-pointer ${isActive ? 'shadow-2xl shadow-brand-teal/20' : 'shadow-md hover:shadow-2xl hover:shadow-brand-teal/20'} ${mtClasses[i]}`}
                 >
                   {/* Container Image (overflow hidden to keep scaling strictly inside) */}
                   <div className="absolute inset-0 overflow-hidden z-0">
                     <img src={feat.image} className={`w-full h-full object-cover transition-transform duration-700 ease-out opacity-40 mix-blend-screen ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-110'}`} alt={feat.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-[#020617]/10"></div>
                     <div className={`absolute inset-0 border transition-colors ${isActive ? 'border-brand-teal/50' : 'border-slate-700/50 group-hover:border-brand-teal/50'}`}></div>
                   </div>

                   {/* Titre surélevé façon onglet de catalogue, le fond #fafafa coupe la bordure */}
                   <div className="absolute -top-3 left-2 sm:-top-3.5 sm:left-4 bg-[#fafafa] px-2 sm:px-3 z-20">
                     <h4 className="text-[12px] sm:text-[15px] font-bold text-slate-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                       {feat.title}
                     </h4>
                   </div>
                   
                   <div className="mt-auto relative z-10 pointer-events-none">
                     <div className={`w-6 sm:w-8 h-[2px] bg-brand-teal mb-3 sm:mb-4 transition-transform origin-left duration-500 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                     <p className="text-[10px] sm:text-[13px] text-slate-200 leading-snug sm:leading-relaxed font-light line-clamp-4 sm:line-clamp-none">{feat.desc}</p>
                   </div>
                 </motion.div>
               )
             })}
          </div>
        </div>

        {/* --- NOS PUBLICS CIBLES (Restored and Expanded Target Audiences) --- */}
        <div className="mb-0">
          <h3 className="text-2xl md:text-3xl text-slate-900 mb-10" style={{ fontFamily: 'Georgia, serif' }}>
            Des solutions calibrées par public
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 border border-slate-200 shadow-sm mb-8">
            
            {/* 1. Particuliers */}
            <div className="bg-white p-6 sm:p-10 lg:p-12 border-r border-b lg:border-b-0 border-slate-200 hover:bg-slate-50 transition-colors flex flex-col">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 mb-4 sm:mb-6 rounded-none">
                 <UserCircle size={24} className="text-slate-600 w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </div>
              <h4 className="text-[16px] sm:text-2xl text-slate-900 mb-3 sm:mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>Patients Particuliers</h4>
              <p className="text-[11px] sm:text-base text-slate-500 font-light leading-relaxed mb-4 sm:mb-8 flex-1">
                Que vous soyez autonome ou que vous exigiez une conciergerie All-Inclusive, accédez en privé aux meilleures normes cliniques mondiales. Choisissez votre forfait d'accompagnement plus bas.
              </p>
            </div>

            {/* 2. Entreprises & Sociétés */}
            <div className="bg-white p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-200 hover:bg-slate-50 transition-colors flex flex-col">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-brand-teal/10 mb-4 sm:mb-6 rounded-none">
                 <BriefcaseBusiness size={24} className="text-brand-teal w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </div>
              <h4 className="text-[16px] sm:text-2xl text-slate-900 mb-3 sm:mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>Entreprises & DRH</h4>
              <p className="text-[11px] sm:text-base text-slate-500 font-light leading-relaxed mb-4 sm:mb-8 flex-1">
                Fidélisez vos collaborateurs clés et vos expatriés avec un Hub de santé externe. Nous gérons leurs dossiers médicaux avec facturation B2B centralisée et confidentialité absolue.
              </p>
            </div>

            {/* 3. Assurances */}
            <div className="bg-white col-span-2 lg:col-span-1 p-6 sm:p-10 lg:p-12 hover:bg-slate-50 transition-colors flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -z-0"></div>
              <div className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 mb-4 sm:mb-6 rounded-none">
                 <HeartHandshake size={24} className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </div>
              <h4 className="text-[16px] sm:text-2xl text-slate-900 mb-3 sm:mb-4 relative z-10 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>Compagnies d'Assurance</h4>
              <p className="text-[11px] sm:text-base text-slate-500 font-light leading-relaxed mb-6 relative z-10">
                Nous sommes le réseau de Tiers-Payant international. Intégrez MediBridge pour maîtriser vos coûts sur de véritables accords cadres avec les hôpitaux.
              </p>
              
              {/* Vrais Logos Assurances */}
              <div className="flex items-center justify-between gap-4 mt-auto border-t border-slate-100 pt-5 sm:pt-6 relative z-10">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Allianz_logo.svg" alt="Allianz" className="h-3 sm:h-4 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 object-contain mix-blend-multiply" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/9/94/AXA_Logo.svg" alt="AXA" className="h-3 sm:h-4 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 object-contain mix-blend-multiply" />
                 <img src="https://upload.wikimedia.org/wikipedia/en/5/5f/Cigna_logo.svg" alt="Cigna" className="h-3 sm:h-4 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 object-contain mix-blend-multiply" />
                 <img src="https://upload.wikimedia.org/wikipedia/en/3/33/Bupa_logo.svg" alt="Bupa" className="h-4 sm:h-5 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 object-contain mix-blend-multiply" />
              </div>
            </div>

          </div>

          {/* 4. LE FORFAIT ÉTAT / GOUVERNEMENTS (Le grand bloc photo impressionnant) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-0 relative w-full overflow-hidden group shadow-xl"
          >
            {/* L'image de fond très corporative/éditoriale */}
            <div className="absolute inset-0 bg-[#0A0F14]">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-20 grayscale" 
                alt="Corporate Health Architecture" 
              />
            </div>
            
            <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row gap-8 lg:gap-24 items-center">
              
              <div className="flex-1 text-white border-l-2 border-white/20 pl-6 lg:pl-10">
                <div className="flex items-center gap-3 mb-5">
                   <Landmark size={16} className="text-white/50" />
                   <span className="text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase">
                     Gouvernements & Opérateurs d'État
                   </span>
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-[48px] mb-8 leading-[1.1]" style={{ fontFamily: 'Georgia, serif' }}>
                  Partenaire Stratégique <br className="hidden lg:block"/> des Grandes Instances.
                </h3>
                <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl mb-10">
                  De la prise en charge d'un cadre dirigeant jusqu'à la sous-traitance intégrale du protocole d'<strong>Évacuation Sanitaire (EVASAN)</strong> d'une nation africaine, MediBridge structure votre Hub de santé délocalisé.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                   <div className="flex items-start gap-3">
                     <Check size={14} className="text-brand-teal mt-1 shrink-0" />
                     <span className="text-white/80 text-[14px]">Cellule EVASAN activable H24: transfert médicalisé d'urgence.</span>
                   </div>
                   <div className="flex items-start gap-3">
                     <Check size={14} className="text-brand-teal mt-1 shrink-0" />
                     <span className="text-white/80 text-[14px]">Protocole Diplomatique : filtrage total et confidentialité.</span>
                   </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
    
    {/* La matrice de prix (sans espacement dérangeant au-dessus) */}
    <Pricing />
    </>
  )
}
