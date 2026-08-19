"use client"

import { ArrowLeft, ShieldCheck, ArrowRight } from "lucide-react"
import { InkPillButton, OutlinedPillButton } from "@/components/ui/mastercard-design"
import { FlightDetails, TravelSubView } from "./types"

interface Props {
  flight?: FlightDetails
  onBack: () => void
  onNavigate: (view: TravelSubView) => void
}

export function FlightsTravelSubView({ flight, onBack }: Props) {
  const isEngaged = flight?.isEngaged || false
  const statusLabel = isEngaged 
    ? (flight?.status === 'confirme' ? 'Confirmé' : flight?.status === 'en_cours' ? 'En cours de traitement' : 'Traité')
    : 'Non engagé'

  const items = [
    {
      title: "Vols Aller-Retour Réguliers",
      desc: "Réservation de billets avec flexibilité de modification de dates et synchronisation hospitalière",
      status: isEngaged ? (flight?.airline ? `Compagnie : ${flight.airline}` : "En traitement") : "Non engagé",
    },
    {
      title: "Assistance Aéroportuaire & PMR",
      desc: "Prise en charge au départ et à l'atterrissage (fauteuil roulant, porteur bagages)",
      status: isEngaged && flight?.hasPMRSupport ? "Planifié" : "Sur demande",
    },
    {
      title: "Franchise Spécifique Bagages Médicaux",
      desc: "Transport sécurisé d'appareillage médical, traitements et matériels orthopédiques",
      status: isEngaged && flight?.medicalLuggageDeclared ? "Déclaré" : "Sur déclaration",
    },
    {
      title: "Protocole Évacuation Sanitaire SOS (Si requis)",
      desc: "Vol dédié avec assistance médicale et équipement de réanimation d'urgence",
      status: "Sous réserve d'urgence vitale",
    }
  ]

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2DDD7]">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full border border-[#E2DDD7] bg-[#FCFBFA] flex items-center justify-center hover:bg-[#141413] hover:text-white transition-colors shrink-0"
            title="Retour à la synthèse"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[11px] font-mono font-bold text-[#CF4500] uppercase tracking-wider block">
              LOGISTIQUE AÉRIENNE
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight">
              Billetterie & Vols Médicalisés
            </h2>
          </div>
        </div>

        <span className={`text-xs font-mono font-bold px-4 py-2 rounded-full self-start sm:self-auto ${
          isEngaged ? "bg-[#141413] text-white" : "bg-[#F4F2EE] text-[#696969]"
        }`}>
          Statut : {statusLabel}
        </span>
      </div>

      {/* Cartes métriques carrées sur fond gris */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">État Billetterie</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">{statusLabel}</span>
          <span className="text-[11px] text-[#696969] mt-1">Liaison aérienne</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Liaison</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">
            {flight?.origin && flight?.destination ? `${flight.origin} → ${flight.destination}` : "--"}
          </span>
          <span className="text-[11px] text-[#696969] mt-1">Aéroports</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Date de Départ</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">
            {flight?.departureDate || "--"}
          </span>
          <span className="text-[11px] text-[#696969] mt-1">Aller</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Date de Retour</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">
            {flight?.returnDate || "--"}
          </span>
          <span className="text-[11px] text-[#696969] mt-1">Retour post-opératoire</span>
        </div>
      </div>

      {/* Détail des prestations aériennes */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD7]">
          <h3 className="text-lg sm:text-xl font-medium text-[#141413] tracking-tight">
            Prestations et Options Aériennes
          </h3>
          <span className="text-xs font-mono font-bold text-[#857F78]">
            4 Postes
          </span>
        </div>

        <div className="divide-y divide-[#E2DDD7]">
          {items.map((item, idx) => (
            <div key={idx} className="py-4 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0 pr-4">
                <h4 className="text-sm font-semibold text-[#141413]">{item.title}</h4>
                <p className="text-xs text-[#696969]">{item.desc}</p>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium uppercase bg-[#F4F2EE] text-[#857F78]">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E2DDD7]">
        <InkPillButton href="/patient?view=messages">
          <span>Demander une assistance billetterie</span>
        </InkPillButton>
        <OutlinedPillButton onClick={onBack}>
          <span>Retour au récapitulatif voyage</span>
        </OutlinedPillButton>
      </div>

      {/* Note d'information */}
      <div className="p-5 rounded-[20px] bg-[#F4F2EE] border border-[#E2DDD7] flex items-start gap-3.5 text-xs text-[#696969]">
        <ShieldCheck className="w-5 h-5 text-[#CF4500] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          La billetterie médicale prend en compte les impératifs cliniques (temps de convalescence recommandé par les chirurgiens avant tout vol de retour).
        </p>
      </div>
    </div>
  )
}
