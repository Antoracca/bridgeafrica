"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ChevronDown } from "lucide-react"

interface AccordionItem {
  id: string
  number: string
  title: string
  summary: string
  details: string
}

export function LogisticsOverviewModule() {
  const [openItem, setOpenItem] = useState<string>("item-1")

  const items: AccordionItem[] = [
    {
      id: "item-1",
      number: "01",
      title: "Gestion des Vols & Billetterie",
      summary: "Réservation de vols réguliers avec assistance ou affrètement sanitaire d'urgence.",
      details: "Billetterie négociée, prise en charge prioritaire des bagages médicaux et organisation des correspondances."
    },
    {
      id: "item-2",
      number: "02",
      title: "Hébergements & Résidences Partenaires",
      summary: "Hôtels 4★/5★ et appart-hôtels PMR à proximité immédiate des cliniques.",
      details: "Tarifs négociés pour le patient et ses accompagnants avec services de restauration adaptés."
    },
    {
      id: "item-3",
      number: "03",
      title: "Transferts & Véhicules Dédiés",
      summary: "Chauffeur privé dès l'aéroport et ambulances médicalisées conventionnées.",
      details: "Accueil personnalisé en zone d'arrivée et transferts directs hôtel-clinique tout au long du séjour."
    },
    {
      id: "item-4",
      number: "04",
      title: "Visas Médicaux & Conciergerie",
      summary: "Lettre d'invitation consulaire expresse et assistance continue 24h/24.",
      details: "Facilitation des démarches de visa médical et coordination administrative complète par votre référent."
    }
  ]

  const toggleItem = (id: string) => {
    setOpenItem(prev => (prev === id ? "" : id))
  }

  return (
    <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[36px] p-8 sm:p-10 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      {/* En-tête du module */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD7] pb-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold text-[#CF4500] uppercase tracking-wider block">
            CONCIERGERIE & ASSISTANCE DE SÉJOUR
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight">
            Gestion de Vol, Hébergement, Transport & Logistique
          </h2>
          <p className="text-xs sm:text-sm text-[#696969] max-w-2xl leading-relaxed">
            Organisation complète de vos déplacements et réservations pour un parcours de soins fluide.
          </p>
        </div>

        <Link
          href="/patient?view=voyage"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#141413] text-[#F3F0EE] hover:bg-[#2c2b29] text-xs font-semibold transition-all shrink-0 self-start sm:self-center"
        >
          <span>Accéder au Pass Voyage</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Accordéon vertical épuré sans icônes */}
      <div className="space-y-3 pt-2">
        {items.map((item) => {
          const isOpen = openItem === item.id

          return (
            <div
              key={item.id}
              className={`border rounded-[24px] transition-all overflow-hidden ${
                isOpen
                  ? "bg-[#F8F7F5] border-[#141413]/20 shadow-sm"
                  : "bg-white border-[#E2DDD7] hover:border-[#141413]/30"
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                type="button"
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-[#141413] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#696969] truncate mt-0.5">
                    {item.summary}
                  </p>
                </div>

                <div className={`w-8 h-8 rounded-full bg-[#F3F0EE] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                  <ChevronDown className="w-4 h-4 text-[#141413]" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-[#E2DDD7]/60 mt-1">
                  <p className="text-xs sm:text-sm text-[#555] leading-relaxed pt-3">
                    {item.details}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
