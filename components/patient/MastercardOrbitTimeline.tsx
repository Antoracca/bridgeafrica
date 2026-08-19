"use client"

import React from "react"
import { Check } from "lucide-react"

interface OrbitStep {
  id: string
  number: string
  title: string
  description: string
  isDone: boolean
  isCurrent: boolean
}

export function MastercardOrbitTimeline({ currentStep = 2 }: { currentStep?: number }) {
  const steps: OrbitStep[] = [
    {
      id: "deposit",
      number: "01",
      title: "Transmission du Bilan",
      description: "Dépôt des scanners, IRM et comptes rendus médicaux chiffrés HDS.",
      isDone: currentStep > 1,
      isCurrent: currentStep === 1
    },
    {
      id: "audit",
      number: "02",
      title: "Collège Médical sous 24h",
      description: "Étude clinique par nos spécialistes et praticiens référents.",
      isDone: currentStep > 2,
      isCurrent: currentStep === 2
    },
    {
      id: "quotes",
      number: "03",
      title: "Devis & Choix Clinique",
      description: "Comparatif d'accueil hospitalier tout-inclus sans frais cachés.",
      isDone: currentStep > 3,
      isCurrent: currentStep === 3
    },
    {
      id: "escrow",
      number: "04",
      title: "Séquestre Bancaire Garanti",
      description: "Protection des fonds cantonnés, débloqués au rythme des soins.",
      isDone: currentStep > 4,
      isCurrent: currentStep === 4
    },
    {
      id: "travel",
      number: "05",
      title: "Évacuation & Soins",
      description: "Visa express, transfert médicalisé privé et prise en charge sur place.",
      isDone: currentStep > 5,
      isCurrent: currentStep === 5
    }
  ]

  return (
    <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[40px] p-6 sm:p-10 space-y-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#CF4500] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#CF4500]" />
          <span>• TRAJECTOIRE ORBITALE DU SÉJOUR MÉDICAL</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight">
          Protocole de Coordination Internationale
        </h3>
        <p className="text-sm text-[#696969] max-w-2xl leading-relaxed">
          Chaque étape de votre parcours de santé est orchestrée selon des normes hospitalières strictes garantissant sécurité médicale et sérénité financière.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`p-5 rounded-[24px] transition-all relative flex flex-col justify-between space-y-4 ${
              step.isCurrent 
                ? "bg-[#141413] text-[#F3F0EE] shadow-lg scale-[1.02]" 
                : step.isDone
                ? "bg-white border border-[#E2DDD7] text-[#141413]"
                : "bg-[#F3F0EE]/60 border border-transparent text-[#696969]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-mono text-xs font-bold ${step.isCurrent ? "text-[#F37338]" : "text-[#696969]"}`}>
                {step.number}
              </span>
              {step.isDone ? (
                <div className="w-6 h-6 rounded-full bg-[#141413] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              ) : step.isCurrent ? (
                <div className="w-2.5 h-2.5 rounded-full bg-[#F37338] animate-pulse" />
              ) : null}
            </div>

            <div className="space-y-1">
              <h4 className={`text-sm font-medium tracking-tight ${step.isCurrent ? "text-white" : "text-[#141413]"}`}>
                {step.title}
              </h4>
              <p className={`text-[11px] leading-relaxed ${step.isCurrent ? "text-[#D1CDC7]" : "text-[#696969]"}`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
