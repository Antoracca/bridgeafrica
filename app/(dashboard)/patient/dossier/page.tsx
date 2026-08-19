import { Metadata } from "next"
import Link from "next/link"
import { PlusCircle, FileText, Stethoscope } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { 
  InkPillButton, 
  OutlinedPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import { CaseCard } from "@/components/cases/CaseCard"

export const metadata: Metadata = {
  title: "Mes Dossiers | Pont Afrique Santé",
  description: "Gérez vos demandes de prise en charge médicale.",
}

export default async function PatientCasesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: cases, error } = await supabase
    .from('medical_cases')
    .select('*')
    .eq('patient_id', user?.id || '')
    .order('created_at', { ascending: false })
    .returns<any[]>()

  return (
    <div className="max-w-7xl mx-auto space-y-10 w-full">
      {/* En-tête Mastercard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-2">
        <div className="space-y-1">
          <EyebrowDot text="SUIVI DE MES DEMANDES DE SOINS" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
            Mes Dossiers Médicaux
          </h1>
          <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Suivez l'évaluation clinique et les propositions de prise en charge de vos demandes de soins.
          </p>
        </div>

        <InkPillButton href="/patient/dossier/new" className="shrink-0">
          <PlusCircle className="w-4 h-4" />
          <span>Nouveau Dossier</span>
        </InkPillButton>
      </div>

      {error && (
        <div className="p-4 border border-[#CF4500]/20 bg-[#CF4500]/5 text-[#CF4500] rounded-[20px] text-xs font-medium">
          Erreur lors du chargement des dossiers médicaux. Veuillez rafraîchir la page.
        </div>
      )}

      {cases && cases.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
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
        <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[40px] p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="w-16 h-16 mx-auto bg-[#F3F0EE] border border-[#E2DDD7] rounded-full flex items-center justify-center text-[#141413]">
            <Stethoscope className="w-8 h-8 text-[#CF4500]" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl font-medium text-[#141413] tracking-tight">
              Aucun dossier médical enregistré
            </h3>
            <p className="text-[#696969] text-sm leading-relaxed">
              Vous n'avez pas encore soumis de demande de soins. Dès la création de votre premier dossier, notre équipe médicale analysera votre situation sous 24h et vous recevrez les devis personnalisés de nos cliniques partenaires.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
            <div className="p-4 rounded-[20px] bg-white border border-[#E2DDD7] space-y-1">
              <span className="w-6 h-6 rounded-full bg-[#141413] text-[#F3F0EE] font-bold flex items-center justify-center text-xs mb-2">1</span>
              <p className="font-medium text-xs text-[#141413]">Dépôt du dossier</p>
              <p className="text-[11px] text-[#696969]">Diagnostic et imagerie médicale.</p>
            </div>

            <div className="p-4 rounded-[20px] bg-white border border-[#E2DDD7] space-y-1">
              <span className="w-6 h-6 rounded-full bg-[#141413] text-[#F3F0EE] font-bold flex items-center justify-center text-xs mb-2">2</span>
              <p className="font-medium text-xs text-[#141413]">Audit sous 24h</p>
              <p className="text-[11px] text-[#696969]">Examen par les médecins référents.</p>
            </div>

            <div className="p-4 rounded-[20px] bg-white border border-[#E2DDD7] space-y-1">
              <span className="w-6 h-6 rounded-full bg-[#141413] text-[#F3F0EE] font-bold flex items-center justify-center text-xs mb-2">3</span>
              <p className="font-medium text-xs text-[#141413]">Devis & Facturation</p>
              <p className="text-[11px] text-[#696969]">Choix de la clinique et validation tarifaire.</p>
            </div>
          </div>

          <div className="pt-2">
            <InkPillButton href="/patient/dossier/new">
              <PlusCircle className="w-4 h-4" />
              <span>Créer mon premier dossier médical</span>
            </InkPillButton>
          </div>
        </div>
      )}
    </div>
  )
}


