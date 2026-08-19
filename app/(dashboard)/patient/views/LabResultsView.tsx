"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EyebrowDot, InkPillButton, OutlinedPillButton } from "@/components/ui/mastercard-design"
import { PlusCircle, ShieldCheck, Download } from "lucide-react"

export function LabResultsView() {
  const [hasResults] = useState(false)

  const sampleCategories = [
    {
      title: "Bilans Sanguins & Hématologie",
      desc: "NFS, coagulation, glycémie, bilans hépatiques et rénaux",
      count: 0
    },
    {
      title: "Sérologies & Virologie Pré-opératoire",
      desc: "Dépistages réglementaires avant toute admission chirurgicale",
      count: 0
    },
    {
      title: "Anatomopathologie & Biopsies",
      desc: "Comptes rendus d'analyses tissulaires validés par les laboratoires hospitaliers",
      count: 0
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
          <EyebrowDot text="ANALYSES BIOLOGIQUES & LABORATOIRE" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
            Résultats de Laboratoire
          </h1>
          <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Consultez vos bilans biologiques pré et post-opératoires transmis par les laboratoires accrédités partenaires.
          </p>
        </div>

        <InkPillButton href="/patient?view=documents" className="shrink-0">
          <PlusCircle className="w-4 h-4" />
          <span>Téléverser une analyse</span>
        </InkPillButton>
      </div>

      {/* Cartes métriques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Bilans Reçus</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0</span>
          <span className="text-[11px] text-[#696969] mt-1">Analyses validées</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">En Attente de Labo</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#CF4500] tracking-tight mt-3">0</span>
          <span className="text-[11px] text-[#696969] mt-1">Examens transmis</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Validité Clinique</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">Conforme</span>
          <span className="text-[11px] text-[#696969] mt-1">Protocoles anesthésie</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Laboratoires Partenaires</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">Accrédités</span>
          <span className="text-[11px] text-[#696969] mt-1">Normes ISO 15189</span>
        </div>
      </div>

      {/* État vide */}
      {!hasResults && (
        <div className="py-10 px-4 sm:px-8 border-y border-[#E2DDD7] text-center space-y-4 max-w-2xl mx-auto">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">
              Aucun résultat d'analyse disponible
            </h2>
            <p className="text-xs sm:text-sm text-[#696969] leading-relaxed">
              Vos bilans d'analyses sanguines et examens complémentaires validés par les cliniques apparaîtront automatiquement dans cette rubrique dès leur traitement.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <InkPillButton href="/patient?view=documents">
              <span>Transmettre un bilan biologique</span>
            </InkPillButton>
          </div>
        </div>
      )}

      {/* Catégories de bilans */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight pb-3 border-b border-[#E2DDD7]">
          Types d'Analyses Biologiques
        </h2>

        <div className="divide-y divide-[#E2DDD7]">
          {sampleCategories.map((cat, idx) => (
            <div key={idx} className="py-5 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F4F2EE] rounded-[20px] transition-all">
              <div className="space-y-0.5">
                <h3 className="font-semibold text-base text-[#141413]">{cat.title}</h3>
                <p className="text-xs text-[#696969]">{cat.desc}</p>
              </div>
              <span className="text-xs font-mono font-medium uppercase px-3 py-1 rounded-full bg-[#F4F2EE] text-[#857F78] self-start sm:self-auto">
                0 Document
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Note d'information */}
      <div className="p-6 rounded-[24px] bg-[#F4F2EE] border border-[#E2DDD7] flex items-start gap-3.5 text-xs text-[#696969]">
        <ShieldCheck className="w-5 h-5 text-[#CF4500] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Tous les comptes rendus biologiques sont vérifiés par le collège médical avant la programmation opératoire pour prévenir toute contre-indication anesthésique.
        </p>
      </div>
    </motion.div>
  )
}
