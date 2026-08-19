"use client"

import { ArrowLeft, ShieldCheck } from "lucide-react"
import { BillingSubView } from "./types"

interface Props {
  onBack: () => void
  onNavigate: (view: BillingSubView) => void
}

export function MedicalBillingSubView({ onBack }: Props) {
  const items = [
    {
      id: "med-1",
      title: "Intervention Chirurgicale & Bloc Opératoire",
      desc: "Honoraires chirurgien, équipe d'anesthésie et occupation de bloc",
      amount: 0,
      covered: 0,
      patientShare: 0,
      status: "Non engagé",
    },
    {
      id: "med-2",
      title: "Séjour Hospitalier & Chambre Individuelle",
      desc: "Nuitées d'hospitalisation, soins infirmiers et surveillance continue",
      amount: 0,
      covered: 0,
      patientShare: 0,
      status: "Non engagé",
    },
    {
      id: "med-3",
      title: "Examens Pré-opératoires & Imagerie DICOM",
      desc: "Analyses de laboratoire, bilan cardiologique et scanner pré-intervention",
      amount: 0,
      covered: 0,
      patientShare: 0,
      status: "Non engagé",
    },
    {
      id: "med-4",
      title: "Médicaments & Dispositifs Médicaux Implantables",
      desc: "Traitements hospitaliers et prothèses/implants certifiés",
      amount: 0,
      covered: 0,
      patientShare: 0,
      status: "Non engagé",
    }
  ]

  return (
    <div className="space-y-8">
      {/* Barre de retour et En-tête */}
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
              Soins & Actes Hospitaliers
            </h2>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-[#696969] bg-[#F4F2EE] px-4 py-2 rounded-full self-start sm:self-auto">
          Prise en charge clinique
        </span>
      </div>

      {/* Cartes métriques carrées sur fond gris (FCFA) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Total Estimé</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0 FCFA</span>
          <span className="text-[11px] text-[#696969] mt-1">Devis clinique</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">Paiements Requis</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#CF4500] tracking-tight mt-3">0 FCFA</span>
          <span className="text-[11px] text-[#696969] mt-1">À régler</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Pris en Charge</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0 FCFA</span>
          <span className="text-[11px] text-[#696969] mt-1">Assurance / Tiers</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Reste à Charge</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0 FCFA</span>
          <span className="text-[11px] text-[#696969] mt-1">Part patient</span>
        </div>
      </div>

      {/* Détail éditorial des postes hospitaliers */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD7]">
          <h3 className="text-lg sm:text-xl font-medium text-[#141413] tracking-tight">
            Actes et Prestations Hospitalières
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
          Les tarifs hospitaliers sont établis sous forme de devis fermes après étude de vos examens par le médecin coordinateur et la clinique partenaire. Aucune avance de frais n'est requise sans validation préalable de votre part.
        </p>
      </div>
    </div>
  )
}
