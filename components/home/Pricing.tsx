'use client'

import { useState } from 'react'
import { Check, Minus, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PRICING_PLANS as PLANS, PRICING_FEATURES as FEATURES } from '@/lib/data/pricing'

function FeatureCell({ value, highlighted }: { value: boolean, highlighted?: boolean }) {
  if (value) {
    return <Check size={18} className={`${highlighted ? 'text-brand-teal' : 'text-slate-800'} mx-auto`} strokeWidth={2.5} />
  }
  return <Minus size={18} className="text-slate-200 mx-auto" strokeWidth={2} />
}

export function Pricing() {
  const [activePlanId, setActivePlanId] = useState<string>('serenite')
  const activePlan = PLANS.find(p => p.id === activePlanId) || PLANS[1]

  return (
    <section id="pricing" className="pt-0 pb-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14">

        {/* --- HEADER MAGISTRAL --- */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-slate-900 mb-6 md:mb-8 leading-[1.1]" style={{ fontFamily: 'Georgia, serif' }}>
            Nos Formules. <span className="block mt-2 md:mt-1 md:inline text-brand-teal italic font-light">L'accompagnement à votre mesure.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-light mx-auto max-w-2xl">
            Peu importe la maladie ou la destination, choisissez le niveau d'orchestration qui sécurise parfaitement votre séjour.
          </p>
        </div>

        {/* --- TABS MOBILE --- */}
        <div className="md:hidden flex p-1.5 bg-slate-200/50 rounded-full mx-auto max-w-sm mb-8">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActivePlanId(plan.id)}
              className={`flex-1 py-3 px-2 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all
                ${activePlanId === plan.id 
                  ? 'bg-brand-teal text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-700'
                }
              `}
            >
              {plan.name}
            </button>
          ))}
        </div>

        {/* --- PRICING MATRIX --- */}
        <div className="border border-slate-200 bg-slate-50/50 md:bg-white flex flex-col md:overflow-visible rounded-xl overflow-hidden md:rounded-none">

          {/* En-têtes (Headers) */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr]">
            <div className="hidden md:flex flex-col justify-end p-8 border-b border-slate-200 bg-slate-50/30">
              <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-slate-400">Fonctionnalités</span>
            </div>

            {PLANS.map((plan, i) => (
              <div
                key={plan.id}
                className={`
                  p-8 md:p-10 border-b border-slate-200 relative
                  ${activePlanId === plan.id ? 'block' : 'hidden md:block'}
                  ${plan.highlighted ? 'md:bg-[#f4f7f6] md:shadow-[inset_0_4px_0_0_#489c8c] bg-white' : 'bg-white'}
                  ${i < PLANS.length - 1 ? 'md:border-r md:border-slate-200' : ''}
                `}
              >
                {plan.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 md:top-4 text-[10px] uppercase tracking-widest font-bold bg-brand-teal text-white px-4 py-1.5 whitespace-nowrap shadow-sm z-20 rounded-b-lg md:rounded-b-none">
                    {plan.badge}
                  </div>
                )}
                
                <h3 className={`text-2xl mb-2 ${plan.highlighted ? 'text-brand-teal' : 'text-slate-900'}`} style={{ fontFamily: 'Georgia, serif' }}>
                  {plan.name}
                </h3>
                <p className="text-sm mb-8 leading-relaxed font-light text-slate-500 h-10">
                  {plan.tagline}
                </p>

                <div>
                  <span className={`text-3xl md:text-4xl font-extrabold tracking-tight ${plan.highlighted ? 'text-slate-900' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  <p className="text-[11px] uppercase tracking-widest mt-2 font-bold text-slate-400 h-4">
                    {plan.priceSub || ''}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Lignes de Fonctionnalités (Features) */}
          {FEATURES.map((feature, rowIdx) => (
            <div
              key={rowIdx}
              className={`grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] transition-colors hover:bg-slate-50/50
                ${rowIdx < FEATURES.length - 1 ? 'border-b border-slate-100' : ''}
              `}
            >
              <div className="hidden md:flex items-center px-8 py-5 text-[14px] font-medium text-slate-600">
                {feature.label}
              </div>

              {/* Version Mobile: Affiche le label + la valeur pour le plan ACTIF */}
              <div className="md:hidden px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white transition-colors">
                 <span className="text-[13px] text-slate-700 font-medium pr-4 leading-snug">{feature.label}</span>
                 <div className="shrink-0 flex items-center justify-center w-8">
                   <FeatureCell value={feature[activePlanId as keyof typeof feature] as boolean} highlighted={activePlan.highlighted} />
                 </div>
              </div>

              {/* Version Desktop: Les valeurs alignées */}
              {PLANS.map((plan, i) => (
                <div
                  key={plan.id}
                  className={`
                    hidden md:flex items-center justify-center py-5 transition-colors
                    ${plan.highlighted ? 'bg-[#f4f7f6]' : 'bg-transparent'}
                    ${i < PLANS.length - 1 ? 'md:border-r md:border-slate-200' : ''}
                  `}
                >
                  <FeatureCell value={feature[plan.id as keyof typeof feature] as boolean} highlighted={plan.highlighted} />
                </div>
              ))}
            </div>
          ))}

          {/* Ligne inférieure (Boutons d'action) */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr]">
            {/* Colonne 1: Explication (La bordure haute s'assure de l'alignement horizontal global) */}
            <div className="hidden md:flex items-center p-8 bg-slate-50/30 border-t border-slate-200">
              <p className="text-[13px] text-slate-400 leading-relaxed font-light">
                Tous les séjours garantissent un accès immédiat à notre réseau international d'experts cliniques et d'hôpitaux certifiés.
              </p>
            </div>
            
            {/* Colonne 2 à 4: Boutons */}
            {PLANS.map((plan, i) => (
              <div
                key={plan.id}
                className={`
                  min-w-0 p-6 md:p-8 items-center bg-white md:bg-transparent
                  ${activePlanId === plan.id ? 'flex' : 'hidden md:flex'}
                  ${plan.highlighted ? 'md:bg-[#f4f7f6] md:shadow-[inset_0_-4px_0_0_#489c8c]' : 'md:bg-white'}
                  ${i < PLANS.length - 1 ? 'md:border-r md:border-slate-200' : ''}
                `}
              >
                <Button
                  className={`w-full min-h-14 h-auto py-4 rounded-none font-bold text-xs uppercase tracking-normal text-center leading-tight transition-all shadow-none
                    ${plan.highlighted
                      ? 'bg-brand-teal hover:bg-brand-teal-dark text-white'
                      : 'bg-white text-slate-900 border-2 border-slate-200 hover:border-slate-300'
                    }
                  `}
                >
                  {plan.id === 'excellence' && <Phone size={14} className="mr-2" />}
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-6 md:mt-10 tracking-widest uppercase">
          Aucun engagement. Annulation gratuite jusqu'à 72h avant le séjour.
        </p>
      </div>
    </section>
  )
}
