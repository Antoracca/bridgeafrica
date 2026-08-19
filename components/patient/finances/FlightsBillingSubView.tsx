"use client"

import { ArrowLeft, ShieldCheck } from "lucide-react"
import { BillingSubView } from "./types"

interface Props {
  onBack: () => void
  onNavigate: (view: BillingSubView) => void
}

export function FlightsBillingSubView({ onBack }: Props) {
  const items = [
    {
      id: "fl-1",
      title: "Billets d'Avion Réguliers (Aller-Retour)",
      desc: "Vols avec compagnies agréées, flexibilité de dates et modification sans frais",
      amount: 0,
      covered: 0,
      patientShare: 0,
      status: "Non engagé",
    },
    {
      id: "fl-2",
      title: "Assistance Aéroportuaire & PMR (Fauteuil / Embarquement Prioritaire)",
      desc: "Prise en charge dédiée dès l'enregistrement jusqu'au siège d'avion",
      amount: 0,
      covered: 0,
      patientShare: 0,
      status: "Inclus",
    },
    {
      id: "fl-3",
      title: "Franchise Supplémentaire Bagages Médicaux & Matériel",
      desc: "Transport sécurisé d'appareillage d'assistance respiratoire ou prothétique",
      amount: 0,
      covered: 0,
      patientShare: 0,
      status: "Non engagé",
    },
    {
      id: "fl-4",
      title: "Évacuation Sanitaire Aérienne / Avion Médicalisé (Cas d'Urgence)",
      desc: "Vol dédié avec médecin urgentiste et équipement de soins intensifs",
      amount: 0,
      covered: 0,
      patientShare: 0,
      status: "Sur protocole SOS",
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
              DÉTAIL DES POSTES
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight">
              Vols & Billetterie Sanitaire
            </h2>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-[#696969] bg-[#F4F2EE] px-4 py-2 rounded-full self-start sm:self-auto">
          Aérien & Évacuation
        </span>
      </div>

      {/* Cartes métriques (FCFA) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Total Billetterie</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0 FCFA</span>
          <span className="text-[11px] text-[#696969] mt-1">Estimation vols</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">Paiements Requis</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#CF4500] tracking-tight mt-3">0 FCFA</span>
          <span className="text-[11px] text-[#696969] mt-1">À régler</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Pris en Charge</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0 FCFA</span>
          <span className="text-[11px] text-[#696969] mt-1">Assurance rapatriement</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Reste à Charge</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0 FCFA</span>
          <span className="text-[11px] text-[#696969] mt-1">Part patient</span>
        </div>
      </div>

      {/* Détail */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD7]">
          <h3 className="text-lg sm:text-xl font-medium text-[#141413] tracking-tight">
            Prestations Aériennes & Évacuations
          </h3>
          <span className="text-xs font-mono font-bold text-[#857F78]">
            4 Postes
          </span>
        </div>

        <div className="divide-y divide-[#E2DDD7]">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-4 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-0.5 min-w-0 pr-4">
                <h4 className="text-sm font-semibold text-[#141413]">{item.title}</h4>
                <p className="text-xs text-[#696969]">{item.desc}</p>
              </div>

              <div className="flex items-center gap-6 self-end sm:self-center shrink-0">
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-[#141413] block">
                    {item.amount.toLocaleString("fr-FR")} FCFA
                  </span>
                  <span className="text-[11px] text-[#857F78]">
                    À charge : {item.patientShare.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium uppercase bg-[#F4F2EE] text-[#857F78]">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note d'information */}
      <div className="p-5 rounded-[20px] bg-[#F4F2EE] border border-[#E2DDD7] flex items-start gap-3.5 text-xs text-[#696969]">
        <ShieldCheck className="w-5 h-5 text-[#CF4500] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Les billets peuvent être réservés directement par vos soins ou inclus dans le forfait global coordonné par Pont Afrique Santé pour garantir une synchronisation parfaite avec les dates opératoires.
        </p>
      </div>
    </div>
  )
}
