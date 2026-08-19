import { Metadata } from "next"
import { MedicalCaseForm } from "@/components/forms/MedicalCaseForm"
import { EyebrowDot } from "@/components/ui/mastercard-design"

export const metadata: Metadata = {
  title: "Nouveau Dossier | Pont Afrique Santé",
  description: "Initiez une demande de prise en charge médicale.",
}

export default function NewCasePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 w-full">
      {/* Header */}
      <div className="space-y-1 pb-2">
        <EyebrowDot text="FORMULAIRE DE PRISE EN CHARGE MÉDICALE" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
          Nouveau Dossier Médical
        </h1>
        <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
          Renseignez votre situation clinique pour analyse et devis sous 24 heures par nos spécialistes partenaires.
        </p>
      </div>
      
      {/* Formulaire complet en pleine largeur */}
      <MedicalCaseForm />
    </div>
  )
}


