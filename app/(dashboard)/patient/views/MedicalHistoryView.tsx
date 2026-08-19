"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EyebrowDot, InkPillButton, OutlinedPillButton } from "@/components/ui/mastercard-design"
import { PlusCircle, ShieldCheck, Download, Clock } from "lucide-react"

export function MedicalHistoryView() {
  const [hasRecords] = useState(false)

  const sampleCategories = [
    {
      title: "Antécédents Chirurgicaux",
      desc: "Interventions antérieures, anesthésies et comptes rendus opératoires",
      count: 0
    },
    {
      title: "Pathologies & Allergies Déclarées",
      desc: "Allergies médicamenteuses, intolérances et pathologies chroniques",
      count: 0
    },
    {
      title: "Vaccinations & Prévention Sanitaire",
      desc: "Carnet vaccinal international obligatoire pour les voyages de soins",
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
      {/* En-tête directement sur le fond de page */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-2">
        <div className="space-y-1">
          <EyebrowDot text="SYNTHÈSE CLINIQUE DU PATIENT" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
            Historique Médical & Antécédents
          </h1>
          <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Consultez et complétez la synthèse de vos antécédents médicaux, chirurgicaux et traitements de fond pour orienter les praticiens.
          </p>
        </div>

        <InkPillButton href="/patient?view=new" className="shrink-0">
          <PlusCircle className="w-4 h-4" />
          <span>Ajouter un antécédent</span>
        </InkPillButton>
      </div>

      {/* Cartes métriques sur fond gris */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Antécédents</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0</span>
          <span className="text-[11px] text-[#696969] mt-1">Interventions passées</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">Allergies Connues</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#CF4500] tracking-tight mt-3">0</span>
          <span className="text-[11px] text-[#696969] mt-1">Facteurs de risque</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Traitements Chroniques</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0</span>
          <span className="text-[11px] text-[#696969] mt-1">En cours</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Groupe Sanguin</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">Non renseigné</span>
          <span className="text-[11px] text-[#696969] mt-1">Bilan sérologique</span>
        </div>
      </div>

      {/* État vide directement au milieu de page */}
      {!hasRecords && (
        <div className="py-10 px-4 sm:px-8 border-y border-[#E2DDD7] text-center space-y-4 max-w-2xl mx-auto">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">
              Aucun antécédent médical consigné
            </h2>
            <p className="text-xs sm:text-sm text-[#696969] leading-relaxed">
              Pour assurer une sécurité anesthésique et chirurgicale maximale, vous pouvez renseigner vos antécédents médicaux lors de votre première demande de soins ou les faire synchroniser par votre médecin référent.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <InkPillButton href="/patient?view=new">
              <PlusCircle className="w-4 h-4" />
              <span>Compléter mon dossier de santé</span>
            </InkPillButton>
          </div>
        </div>
      )}

      {/* Liste des pôles d'antécédents */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight pb-3 border-b border-[#E2DDD7]">
          Rubriques du Profil Médical
        </h2>

        <div className="divide-y divide-[#E2DDD7]">
          {sampleCategories.map((cat, idx) => (
            <div key={idx} className="py-5 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F4F2EE] rounded-[20px] transition-all">
              <div className="space-y-0.5">
                <h3 className="font-semibold text-base text-[#141413]">{cat.title}</h3>
                <p className="text-xs text-[#696969]">{cat.desc}</p>
              </div>
              <span className="text-xs font-mono font-medium uppercase px-3 py-1 rounded-full bg-[#F4F2EE] text-[#857F78] self-start sm:self-auto">
                Non renseigné
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Confidentialité */}
      <div className="p-6 rounded-[24px] bg-[#F4F2EE] border border-[#E2DDD7] flex items-start gap-3.5 text-xs text-[#696969]">
        <ShieldCheck className="w-5 h-5 text-[#CF4500] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Vos antécédents médicaux sont strictement protégés par le secret professionnel et hébergés selon les standards HDS.
        </p>
      </div>
    </motion.div>
  )
}
