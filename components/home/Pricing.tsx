'use client'

import { Check, Minus, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FEATURES = [
  { label: 'Accès à la plateforme MediBridge', essentiel: true, serenite: true, excellence: true },
  { label: 'Mise en relation avec une clinique', essentiel: true, serenite: true, excellence: true },
  { label: 'Devis médical personnalisé', essentiel: true, serenite: true, excellence: true },
  { label: 'Coordinateur dédié (WhatsApp + Email)', essentiel: false, serenite: true, excellence: true },
  { label: 'Organisation du voyage (vols + hôtel)', essentiel: false, serenite: true, excellence: true },
  { label: 'Transferts aéroport & clinique', essentiel: false, serenite: true, excellence: true },
  { label: 'Interprète médical sur place', essentiel: false, serenite: true, excellence: true },
  { label: 'Assurance annulation & rapatriement', essentiel: false, serenite: true, excellence: true },
  { label: 'Suivi post-opératoire (3 mois)', essentiel: false, serenite: true, excellence: true },
  { label: 'Concierge 24/7 pendant le séjour', essentiel: false, serenite: false, excellence: true },
  { label: 'Accompagnateur personnel en clinique', essentiel: false, serenite: false, excellence: true },
  { label: 'Accès VIP aux meilleurs chirurgiens', essentiel: false, serenite: false, excellence: true },
  { label: 'Hébergement 5★ sélectionné', essentiel: false, serenite: false, excellence: true },
  { label: 'Suivi post-opératoire (12 mois)', essentiel: false, serenite: false, excellence: true },
]

const PLANS = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    tagline: 'Pour commencer votre démarche',
    price: 'Gratuit',
    priceSub: null,
    badge: null,
    highlighted: false,
    cta: 'Choisir',
  },
  {
    id: 'serenite',
    name: 'Sérénité',
    tagline: 'Le parcours complet, clé en main',
    price: 'Dès 490 €',
    priceSub: 'par séjour médical',
    badge: 'La plus demandée',
    highlighted: true,
    cta: 'Choisir Sérénité',
  },
  {
    id: 'excellence',
    name: 'Excellence',
    tagline: 'La prise en charge absolue',
    price: 'Sur mesure',
    priceSub: 'devis personnalisé',
    badge: null,
    highlighted: false,
    cta: 'Contact VIP',
  },
]

function FeatureCell({ value, highlighted }: { value: boolean, highlighted?: boolean }) {
  if (value) {
    return <Check size={18} className={`${highlighted ? 'text-brand-teal' : 'text-slate-800'} mx-auto`} strokeWidth={2.5} />
  }
  return <Minus size={18} className="text-slate-200 mx-auto" strokeWidth={2} />
}

export function Pricing() {
  return (
    <section id="pricing" className="pt-0 pb-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14">

        {/* --- HEADER MAGISTRAL --- */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-slate-900 mb-8 leading-[1.05]" style={{ fontFamily: 'Georgia, serif' }}>
            Nos Formules. <br className="hidden md:block"/>
            <span className="text-brand-teal italic font-light">L'accompagnement à votre mesure.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-light mx-auto max-w-2xl">
            Peu importe la maladie ou la destination, choisissez le niveau d'orchestration qui sécurise parfaitement votre séjour.
          </p>
        </div>

        {/* --- PRICING MATRIX --- */}
        <div className="border border-slate-200 bg-white flex flex-col md:overflow-visible">

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
                  ${plan.highlighted ? 'bg-[#f4f7f6] shadow-[inset_0_4px_0_0_#489c8c]' : 'bg-white'}
                  ${i < PLANS.length - 1 ? 'md:border-r md:border-slate-200' : ''}
                `}
              >
                {plan.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-4 sm:translate-y-0 text-[10px] uppercase tracking-widest font-bold bg-brand-teal text-white px-4 py-1.5 whitespace-nowrap shadow-sm z-20">
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

              {/* Version Mobile: Affiche le label + 3 valeurs en ligne */}
              <div className="md:hidden px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <p className="text-[14px] text-slate-800 font-bold mb-4">{feature.label}</p>
                <div className="grid grid-cols-3 text-center gap-4">
                  {PLANS.map((plan) => (
                    <div key={plan.id} className="flex flex-col items-center gap-2">
                       <span className="text-[10px] uppercase font-bold text-slate-400">{plan.name}</span>
                       <FeatureCell value={feature[plan.id as keyof typeof feature] as boolean} highlighted={plan.highlighted} />
                    </div>
                  ))}
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
                  min-w-0 p-8 flex items-center border-t border-slate-200
                  ${plan.highlighted ? 'bg-[#f4f7f6] shadow-[inset_0_-4px_0_0_#489c8c]' : 'bg-white'}
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
