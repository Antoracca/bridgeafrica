"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EyebrowDot, InkPillButton, OutlinedPillButton } from "@/components/ui/mastercard-design"
import { PlusCircle, ShieldCheck, Download, Pill } from "lucide-react"

export function PrescriptionsView() {
  const [hasPrescriptions] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-10 w-full"
    >
      {/* En-tête directement sur la page */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-2">
        <div className="space-y-1">
          <EyebrowDot text="ORDONNANCES & PROTOCOLES POST-OPÉRATOIRES" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
            Prescriptions Médicales
          </h1>
          <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Accédez à vos ordonnances certifiées, protocoles de médication post-opératoire et recommandations thérapeutiques émises par les cliniques.
          </p>
        </div>

        <OutlinedPillButton href="/patient?view=messages" className="shrink-0">
          <span>Contacter mon médecin</span>
        </OutlinedPillButton>
      </div>

      {/* Cartes métriques sur fond gris */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Ordonnances Actives</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0</span>
          <span className="text-[11px] text-[#696969] mt-1">En cours de traitement</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">Protocoles Sortie</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#CF4500] tracking-tight mt-3">0</span>
          <span className="text-[11px] text-[#696969] mt-1">Suivi post-opératoire</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Traitements Antérieurs</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">0</span>
          <span className="text-[11px] text-[#696969] mt-1">Historique délivré</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Signature Électronique</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">Active</span>
          <span className="text-[11px] text-[#696969] mt-1">Certifiée HDS</span>
        </div>
      </div>

      {/* État vide directement au milieu */}
      {!hasPrescriptions && (
        <div className="py-10 px-4 sm:px-8 border-y border-[#E2DDD7] text-center space-y-4 max-w-2xl mx-auto">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">
              Aucune prescription active
            </h2>
            <p className="text-xs sm:text-sm text-[#696969] leading-relaxed">
              Dès la réalisation de votre téléconsultation ou à l'issue de votre intervention hospitalière, vos ordonnances médicales dématérialisées seront mises à disposition ici.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <InkPillButton href="/patient?view=rdv">
              <span>Prendre un rendez-vous médical</span>
            </InkPillButton>
          </div>
        </div>
      )}

      {/* Recommandations */}
      <div className="p-6 rounded-[24px] bg-[#F4F2EE] border border-[#E2DDD7] flex items-start gap-3.5 text-xs text-[#696969]">
        <ShieldCheck className="w-5 h-5 text-[#CF4500] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Toutes les prescriptions médicales délivrées par les médecins partenaires sont conformes aux réglementations sanitaires internationales et valables pour délivrance en pharmacie hospitalière.
        </p>
      </div>
    </motion.div>
  )
}
