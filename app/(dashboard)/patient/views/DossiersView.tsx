"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  InkPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import { CaseCard } from "@/components/cases/CaseCard"
import { PlusCircle, Search } from "lucide-react"

interface MedicalCase {
  id: string
  diagnosis: string
  required_specialty: string
  status: string
  created_at: string
  urgency_level?: string
}

interface DossiersViewProps {
  cases: MedicalCase[]
  loading?: boolean
}

export function DossiersView({ cases }: DossiersViewProps) {
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const filteredCases = cases.filter((c) => {
    const matchesFilter = filter === "all" || c.status.toLowerCase().includes(filter.toLowerCase())
    const matchesSearch = c.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) || c.required_specialty.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-10 w-full"
    >
      {/* En-tête Dossiers directement sur la page */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-2">
        <div className="space-y-1">
          <EyebrowDot text="SUIVI DE MES DEMANDES DE SOINS" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
            Mes Dossiers Médicaux
          </h1>
          <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Consultez le statut de chaque dossier, les avis médicaux émis par les spécialistes et les propositions de prise en charge hospitalière.
          </p>
        </div>

        <InkPillButton href="/patient?view=new" className="shrink-0">
          <PlusCircle className="w-4 h-4" />
          <span>Nouveau Dossier</span>
        </InkPillButton>
      </div>

      {/* Barre de Recherche & Filtres Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#696969] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une spécialité, diagnostic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-[20px] bg-[#FCFBFA] border border-[#E2DDD7] text-xs font-medium text-[#141413] focus:outline-none focus:border-[#141413]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["all", "en_attente", "en_cours", "termine"].map((statusKey) => (
            <button
              key={statusKey}
              type="button"
              onClick={() => setFilter(statusKey)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 ${
                filter === statusKey
                  ? "bg-[#141413] text-[#F3F0EE]"
                  : "bg-white text-[#696969] border border-[#E2DDD7] hover:bg-[#F3F0EE]"
              }`}
            >
              {statusKey === "all" ? "Tous les dossiers" : statusKey === "en_attente" ? "En attente" : statusKey === "en_cours" ? "En cours d'audit" : "Soins terminés"}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu : Liste de dossiers en cartes aérées OU Empty State directement sur le fond */}
      {filteredCases && filteredCases.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((c) => (
            <CaseCard
              key={c.id}
              id={c.id}
              diagnosis={c.diagnosis}
              specialty={c.required_specialty}
              status={c.status}
              date={c.created_at}
              role="patient"
            />
          ))}
        </div>
      ) : (
        <div className="py-12 px-4 sm:px-8 border-y border-[#E2DDD7] text-center space-y-6 max-w-2xl mx-auto">
          <div className="space-y-2">
            <h3 className="text-2xl font-medium text-[#141413] tracking-tight">
              Aucun dossier médical correspondant
            </h3>
            <p className="text-[#696969] text-sm leading-relaxed">
              Vous n'avez pas encore soumis de demande de prise en charge. Dès le dépôt de votre premier bilan, notre collège médical analysera vos examens sous 24 heures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
            <div className="p-4 rounded-[20px] bg-[#F4F2EE] border border-[#E2DDD7] space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#CF4500] uppercase block">Étape 1</span>
              <p className="font-semibold text-xs text-[#141413]">Dépôt du bilan</p>
              <p className="text-[11px] text-[#696969]">Diagnostic et imagerie médicale.</p>
            </div>

            <div className="p-4 rounded-[20px] bg-[#F4F2EE] border border-[#E2DDD7] space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#CF4500] uppercase block">Étape 2</span>
              <p className="font-semibold text-xs text-[#141413]">Audit sous 24h</p>
              <p className="text-[11px] text-[#696969]">Étude par nos médecins référents.</p>
            </div>

            <div className="p-4 rounded-[20px] bg-[#F4F2EE] border border-[#E2DDD7] space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#CF4500] uppercase block">Étape 3</span>
              <p className="font-semibold text-xs text-[#141413]">Devis & Facturation</p>
              <p className="text-[11px] text-[#696969]">Choix de la clinique et validation tarifaire.</p>
            </div>
          </div>

          <div className="pt-2">
            <InkPillButton href="/patient?view=new">
              <PlusCircle className="w-4 h-4" />
              <span>Déposer mon premier bilan médical</span>
            </InkPillButton>
          </div>
        </div>
      )}
    </motion.div>
  )
}
