import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { CaseCard } from "@/components/cases/CaseCard"
import { AlertCircle, CheckSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Dossiers à Valider | MediBridge Africa",
  description: "Revue des demandes d'évacuation.",
}

export default async function DoctorCasesPage() {
  const supabase = await createClient()
  
  // Récupérer tous les dossiers au statut 'submitted' ou 'under_review'
  const { data: cases, error } = await supabase
    .from('medical_cases')
    .select(`
        *,
        profiles:patient_id (first_name, last_name)
    `)
    .in('status', ['submitted', 'under_review'])
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dossiers à Valider</h2>
      </div>

      {error && (
        <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Erreur lors du chargement des dossiers.
        </div>
      )}

      {cases && cases.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c: any) => (
            <CaseCard
              key={c.id}
              id={c.id}
              diagnosis={c.diagnosis}
              patientName={c.profiles ? `${c.profiles.first_name} ${c.profiles.last_name}` : 'Patient Inconnu'}
              specialty={c.required_specialty}
              status={c.status}
              date={c.created_at}
              role="medecin_referent"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl">
          <div className="bg-muted rounded-full p-6 mb-4">
             <CheckSquare className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Tout est à jour !</h3>
          <p className="text-muted-foreground max-w-sm">
            Il n&apos;y a aucun nouveau dossier en attente de validation pour le moment.
          </p>
        </div>
      )}
    </div>
  )
}