"use client"

import { ArrowLeft, ShieldCheck, Download, FileCheck } from "lucide-react"
import { InkPillButton, OutlinedPillButton } from "@/components/ui/mastercard-design"
import { VisaDetails, TravelSubView } from "./types"

interface Props {
  visa?: VisaDetails
  onBack: () => void
  onNavigate: (view: TravelSubView) => void
}

export function VisasTravelSubView({ visa, onBack }: Props) {
  const isEngaged = visa?.isEngaged || false
  const statusLabel = isEngaged 
    ? (visa?.status === 'confirme' || visa?.status === 'traite' ? 'Délivré / Prêt' : 'En cours consulaire')
    : 'Non engagé'

  const items = [
    {
      title: "Lettre d'Invitation Médicale Officielle",
      desc: "Document hospitalier certifié émis par l'établissement de destination attestant de la prise en charge",
      status: isEngaged && visa?.invitationLetterUrl ? "Disponible" : "Non engagé",
    },
    {
      title: "Facilitation Consulaire Express",
      desc: "Liaison avec les services consulaires et consulats pour traitement prioritaire de votre visa de soins",
      status: isEngaged ? "En traitement" : "Non engagé",
    },
    {
      title: "Visa Accompagnant(s)",
      desc: "Justificatifs complémentaires pour les proches accompagnant le patient durant son séjour",
      status: "Sur demande",
    },
    {
      title: "Attestation d'Assurance Rapatriement Sanitaire",
      desc: "Garantie obligatoire conforme aux exigences d'entrée sur le territoire de destination",
      status: isEngaged ? "Synchronisé" : "Non engagé",
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
              FORMALITÉS CONSULAIRES
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight">
              Visas Médicaux & Autorisations de Séjour
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
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">État Démarche</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">{statusLabel}</span>
          <span className="text-[11px] text-[#696969] mt-1">Dossier consulaire</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Pays de Destination</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">
            {visa?.destinationCountry || "--"}
          </span>
          <span className="text-[11px] text-[#696969] mt-1">Territoire d'accueil</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Référence Visa</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">
            {visa?.consularRef || "--"}
          </span>
          <span className="text-[11px] text-[#696969] mt-1">Dossier ambassade</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Validité</span>
          <span className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight mt-3">
            {visa?.expiryDate || "--"}
          </span>
          <span className="text-[11px] text-[#696969] mt-1">Expiration</span>
        </div>
      </div>

      {/* Détail */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD7]">
          <h3 className="text-lg sm:text-xl font-medium text-[#141413] tracking-tight">
            Documents et Accréditations Consulaires
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
        <InkPillButton href="/patient?view=documents">
          <span>Téléverser mon passeport</span>
        </InkPillButton>
        <OutlinedPillButton onClick={onBack}>
          <span>Retour au récapitulatif voyage</span>
        </OutlinedPillButton>
      </div>

      {/* Note d'information */}
      <div className="p-5 rounded-[20px] bg-[#F4F2EE] border border-[#E2DDD7] flex items-start gap-3.5 text-xs text-[#696969]">
        <ShieldCheck className="w-5 h-5 text-[#CF4500] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          La lettre d'invitation médicale officielle est émise gratuitement dès la confirmation de votre date d'intervention par l'établissement de santé de destination.
        </p>
      </div>
    </div>
  )
}
