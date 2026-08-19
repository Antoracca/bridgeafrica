"use client"

import React, { useState } from "react"
import { Calculator, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react"
import { InkPillButton, EyebrowDot } from "@/components/ui/mastercard-design"

interface SpecialtyOption {
  id: string
  name: string
  destinations: {
    country: string
    code: string
    avgCost: number
    stayDays: number
  }[]
}

const SPECIALTIES: SpecialtyOption[] = [
  {
    id: "cardio",
    name: "Cardiologie & Chirurgie Vasculaire",
    destinations: [
      { country: "Tunisie", code: "TN", avgCost: 6500, stayDays: 7 },
      { country: "Maroc", code: "MA", avgCost: 7200, stayDays: 7 },
      { country: "Turquie", code: "TR", avgCost: 8100, stayDays: 8 },
      { country: "France", code: "FR", avgCost: 14500, stayDays: 7 }
    ]
  },
  {
    id: "ortho",
    name: "Orthopédie (Prothèse Hanche / Genou)",
    destinations: [
      { country: "Tunisie", code: "TN", avgCost: 5200, stayDays: 6 },
      { country: "Maroc", code: "MA", avgCost: 5800, stayDays: 6 },
      { country: "Turquie", code: "TR", avgCost: 6400, stayDays: 7 },
      { country: "France", code: "FR", avgCost: 12000, stayDays: 6 }
    ]
  },
  {
    id: "onco",
    name: "Oncologie & Chimiothérapie Ciblée",
    destinations: [
      { country: "Tunisie", code: "TN", avgCost: 7800, stayDays: 10 },
      { country: "Maroc", code: "MA", avgCost: 8500, stayDays: 10 },
      { country: "Turquie", code: "TR", avgCost: 9200, stayDays: 12 },
      { country: "France", code: "FR", avgCost: 16800, stayDays: 10 }
    ]
  },
  {
    id: "neuro",
    name: "Neurochirurgie & Rachis",
    destinations: [
      { country: "Tunisie", code: "TN", avgCost: 8900, stayDays: 9 },
      { country: "Maroc", code: "MA", avgCost: 9500, stayDays: 9 },
      { country: "Turquie", code: "TR", avgCost: 10400, stayDays: 10 },
      { country: "France", code: "FR", avgCost: 19500, stayDays: 9 }
    ]
  }
]

export function CoverageSimulator() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(SPECIALTIES[0].id)
  const [selectedCountry, setSelectedCountry] = useState<string>("TN")
  const [insuranceType, setInsuranceType] = useState<number>(0.7) // 70% par défaut

  const currentSpec = SPECIALTIES.find((s) => s.id === selectedSpecialty) || SPECIALTIES[0]
  const currentDest = currentSpec.destinations.find((d) => d.code === selectedCountry) || currentSpec.destinations[0]

  const totalCost = currentDest.avgCost
  const coveredAmount = Math.round(totalCost * insuranceType)
  const outOfPocket = totalCost - coveredAmount

  return (
    <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[40px] p-6 sm:p-10 space-y-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="space-y-1">
          <EyebrowDot text="• SIMULATEUR BUDGÉTAIRE & COUVERTURE" />
          <h3 className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight">
            Estimation de Devis & Reste à Charge
          </h3>
          <p className="text-xs sm:text-sm text-[#696969]">
            Simulez le coût moyen tout-inclus (clinique, séjour, honoraires) selon la destination et votre prise en charge.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Paramètres de simulation */}
        <div className="lg:col-span-7 space-y-5">
          {/* Spécialité */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#141413] uppercase tracking-wider block">1. Spécialité Médicale</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full h-12 px-4 rounded-[20px] bg-white border border-[#E2DDD7] text-sm text-[#141413] font-medium focus:outline-none focus:border-[#141413]"
            >
              {SPECIALTIES.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#141413] uppercase tracking-wider block">2. Destination Hospitalière</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {currentSpec.destinations.map((d) => (
                <button
                  key={d.code}
                  type="button"
                  onClick={() => setSelectedCountry(d.code)}
                  className={`p-3 rounded-[20px] border text-xs font-medium transition-all text-center ${
                    selectedCountry === d.code
                      ? "bg-[#141413] text-[#F3F0EE] border-[#141413]"
                      : "bg-white text-[#141413] border-[#E2DDD7] hover:bg-[#F3F0EE]"
                  }`}
                >
                  <p className="font-bold">{d.country}</p>
                  <p className="text-[10px] opacity-70 mt-0.5">{d.stayDays} jours moy.</p>
                </button>
              ))}
            </div>
          </div>

          {/* Niveau de couverture */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#141413] uppercase tracking-wider block">3. Prise en charge Caisse / Assurance</label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setInsuranceType(0)}
                className={`p-3 rounded-[20px] border text-xs font-medium transition-all ${
                  insuranceType === 0
                    ? "bg-[#141413] text-[#F3F0EE] border-[#141413]"
                    : "bg-white text-[#141413] border-[#E2DDD7] hover:bg-[#F3F0EE]"
                }`}
              >
                0% (Paiement Direct)
              </button>
              <button
                type="button"
                onClick={() => setInsuranceType(0.7)}
                className={`p-3 rounded-[20px] border text-xs font-medium transition-all ${
                  insuranceType === 0.7
                    ? "bg-[#141413] text-[#F3F0EE] border-[#141413]"
                    : "bg-white text-[#141413] border-[#E2DDD7] hover:bg-[#F3F0EE]"
                }`}
              >
                70% (CNAMGS / Caisse)
              </button>
              <button
                type="button"
                onClick={() => setInsuranceType(0.9)}
                className={`p-3 rounded-[20px] border text-xs font-medium transition-all ${
                  insuranceType === 0.9
                    ? "bg-[#141413] text-[#F3F0EE] border-[#141413]"
                    : "bg-white text-[#141413] border-[#E2DDD7] hover:bg-[#F3F0EE]"
                }`}
              >
                90% (Mutuelle VIP / CFE)
              </button>
            </div>
          </div>
        </div>

        {/* Résultat Mastercard Frame */}
        <div className="lg:col-span-5 bg-[#141413] text-[#F3F0EE] rounded-[32px] p-6 sm:p-7 space-y-6 shadow-lg border border-white/10">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#D1CDC7]">ESTIMATION DEVIS TOUT-INCLUS</span>
            <ShieldCheck className="w-4 h-4 text-[#F37338]" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[#D1CDC7]">Budget Médical Global</span>
              <span className="text-xl font-medium text-white">{totalCost.toLocaleString("fr-FR")} €</span>
            </div>

            <div className="flex justify-between items-baseline text-[#F37338]">
              <span className="text-xs font-bold">Prise en charge estimée ({Math.round(insuranceType * 100)}%)</span>
              <span className="text-lg font-bold">-{coveredAmount.toLocaleString("fr-FR")} €</span>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
              <span className="text-xs uppercase font-mono font-bold text-white tracking-wider">Reste à votre charge</span>
              <span className="text-3xl font-medium text-white tracking-tight">{outOfPocket.toLocaleString("fr-FR")} €</span>
            </div>
          </div>

          <div className="pt-2">
            <InkPillButton href="/patient?view=new" className="w-full bg-[#F3F0EE] text-[#141413] hover:bg-white border-transparent">
              <span>Demander un devis ferme sous 24h</span>
              <ArrowRight className="w-4 h-4" />
            </InkPillButton>
          </div>
        </div>
      </div>
    </div>
  )
}
