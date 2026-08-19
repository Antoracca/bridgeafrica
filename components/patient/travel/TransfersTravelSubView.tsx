"use client"

import { ArrowLeft, ShieldCheck } from "lucide-react"
import { InkPillButton, OutlinedPillButton } from "@/components/ui/mastercard-design"
import { TransferDetails, TravelSubView } from "./types"

interface Props {
  transfer?: TransferDetails
  onBack: () => void
  onNavigate: (view: TravelSubView) => void
}

export function TransfersTravelSubView({ transfer, onBack }: Props) {
  const isEngaged = transfer?.isEngaged || false
  const statusLabel = isEngaged 
    ? (transfer?.status === 'confirme' || transfer?.status === 'traite' ? 'Planifié' : 'En cours d\'organisation')
    : 'Non engagé'

  const items = [
    {
      title: "Accueil Personnalisé en Zone d'Arrivée",
      desc: "Chauffeur privé avec pancarte nominative dès la sortie des bagages à l'aéroport",
      status: isEngaged && transfer?.airportPickup ? "Planifié" : "Non engagé",
    },
    {
      title: "Navettes Quotidiennes Clinique - Résidence",
      desc: "Liaisons privées programmées selon l'agenda des consultations et soins",
      status: isEngaged && transfer?.dailyCliniqueShuttle ? "Planifié" : "Non engagé",
    },
    {
      title: "Ambulance Médicalisée Conventionnée",
      desc: "Transport sanitaire adapté avec assistance infirmière pour les transferts post-opératoires",
      status: isEngaged && transfer?.isAmbulanceRequired ? "Prise en charge" : "Sur prescription",
    },
    {
      title: "Chauffeur Dédié & Ligne Téléphonique Directe",
      desc: "Contact direct avec votre conducteur tout au long du séjour",
      status: isEngaged && transfer?.driverPhone ? transfer.driverPhone : "Non engagé",
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
              LOGISTIQUE TERRESTRE
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight">
              Transport & Transferts sur Place
            </h2>
          </div>
        </div>

        <span className={`text-xs font-mono font-bold px-4 py-2 rounded-full self-start sm:self-auto ${
          isEngaged ? "bg-[#141413] text-white" : "bg-[#F4F2EE] text-[#696969]"
        }`}>
          Statut : {statusLabel}
        </span>
      </div>

      {/* Cartes métriques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">État Transferts</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">{statusLabel}</span>
          <span className="text-[11px] text-[#696969] mt-1">Chauffeurs privés</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Accueil Aéroport</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">
            {transfer?.airportPickup ? "Oui" : "Non"}
          </span>
          <span className="text-[11px] text-[#696969] mt-1">Arrivée</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Navettes Clinique</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">
            {transfer?.dailyCliniqueShuttle ? "Incluses" : "Non"}
          </span>
          <span className="text-[11px] text-[#696969] mt-1">Trajets quotidiens</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Ambulance</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">
            {transfer?.isAmbulanceRequired ? "Médicalisée" : "Véhicule Privé"}
          </span>
          <span className="text-[11px] text-[#696969] mt-1">Type de véhicule</span>
        </div>
      </div>

      {/* Détail */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD7]">
          <h3 className="text-lg sm:text-xl font-medium text-[#141413] tracking-tight">
            Prestations de Transferts et Véhicules Dédiés
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

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E2DDD7]">
        <InkPillButton href="/patient?view=messages">
          <span>Planifier mes transferts</span>
        </InkPillButton>
        <OutlinedPillButton onClick={onBack}>
          <span>Retour au récapitulatif voyage</span>
        </OutlinedPillButton>
      </div>

      {/* Note d'information */}
      <div className="p-5 rounded-[20px] bg-[#F4F2EE] border border-[#E2DDD7] flex items-start gap-3.5 text-xs text-[#696969]">
        <ShieldCheck className="w-5 h-5 text-[#CF4500] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Tous les chauffeurs et véhicules sont conventionnés par Pont Afrique Santé et coordonnés en direct avec l'équipe soignante pour assurer des trajets fluides et ponctuels.
        </p>
      </div>
    </div>
  )
}
