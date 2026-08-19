"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EyebrowDot, InkPillButton, OutlinedPillButton } from "@/components/ui/mastercard-design"
import { PlusCircle, ShieldCheck, Download, FileText } from "lucide-react"

export function InsurancesView() {
  const [hasInsurances] = useState(false)

  const guaranteeTypes = [
    {
      title: "Assistance Rapatriement Sanitaire",
      desc: "Prise en charge du rapatriement d'urgence et des frais médicaux d'urgence à l'étranger",
      status: "Conventionnée"
    },
    {
      title: "Responsabilité Civile Médicale Hospitalière",
      desc: "Couverture juridique et assurantielle des établissements de soins partenaires agréés",
      status: "Incluse d'office"
    },
    {
      title: "Garantie Annulation & Report de Soins",
      desc: "Protection financière en cas de report médical justifié par le praticien",
      status: "Sous réserve"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-10 w-full"
    >
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-2">
        <div className="space-y-1">
          <EyebrowDot text="GARANTIES & COUVERTURES DE SÉJOUR" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
            Assurances & Garanties Médicales
          </h1>
          <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Consultez les garanties de rapatriement sanitaire, assurances séjour et attestations d'assistance médicale rattachées à votre prise en charge.
          </p>
        </div>

        <OutlinedPillButton href="/patient?view=messages" className="shrink-0">
          <span>Conseiller en assurance</span>
        </OutlinedPillButton>
      </div>

      {/* Cartes métriques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Police Active</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">Non engagée</span>
          <span className="text-[11px] text-[#696969] mt-1">Séjour de soins</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">Rapatriement SOS</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#CF4500] tracking-tight mt-3">Inclus</span>
          <span className="text-[11px] text-[#696969] mt-1">Sur protocole validé</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Attestations Émises</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0</span>
          <span className="text-[11px] text-[#696969] mt-1">Pour consulat / visa</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Établissements Agréés</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">100%</span>
          <span className="text-[11px] text-[#696969] mt-1">Responsabilité couverte</span>
        </div>
      </div>

      {/* État vide */}
      {!hasInsurances && (
        <div className="py-10 px-4 sm:px-8 border-y border-[#E2DDD7] text-center space-y-4 max-w-2xl mx-auto">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">
              Aucune attestation d'assurance requise actuellement
            </h2>
            <p className="text-xs sm:text-sm text-[#696969] leading-relaxed">
              Dès la confirmation de votre date opératoire et de votre voyage médical, l'attestation officielle d'assurance rapatriement conforme aux exigences consulaires sera téléchargeable ici.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <InkPillButton href="/patient?view=new">
              <span>Initier ma prise en charge</span>
            </InkPillButton>
          </div>
        </div>
      )}

      {/* Types de garanties */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight pb-3 border-b border-[#E2DDD7]">
          Garanties Médicales & Sanitaires Incluses
        </h2>

        <div className="divide-y divide-[#E2DDD7]">
          {guaranteeTypes.map((g, idx) => (
            <div key={idx} className="py-5 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F4F2EE] rounded-[20px] transition-all">
              <div className="space-y-0.5">
                <h3 className="font-semibold text-base text-[#141413]">{g.title}</h3>
                <p className="text-xs text-[#696969]">{g.desc}</p>
              </div>
              <span className="text-xs font-mono font-medium uppercase px-3 py-1 rounded-full bg-[#F4F2EE] text-[#857F78] self-start sm:self-auto">
                {g.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Note d'information */}
      <div className="p-6 rounded-[24px] bg-[#F4F2EE] border border-[#E2DDD7] flex items-start gap-3.5 text-xs text-[#696969]">
        <ShieldCheck className="w-5 h-5 text-[#CF4500] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Toutes les cliniques et chirurgiens partenaires du réseau Pont Afrique Santé disposent d'assurances professionnelles obligatoires garantissant la prise en charge complète des actes réalisés.
        </p>
      </div>
    </motion.div>
  )
}
