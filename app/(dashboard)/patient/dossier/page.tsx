import { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { CaseCard } from "@/components/cases/CaseCard"

export const metadata: Metadata = {
  title: "Mes Dossiers | MediBridge Africa",
  description: "Gérez vos demandes d'évacuation sanitaire.",
}

export default async function PatientCasesPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: cases, error } = await supabase
    .from('medical_cases')
    .select('*')
    .eq('patient_id', user?.id || '')
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Mes Dossiers</h2>
        <Button asChild>
          <Link href="/patient/dossier/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Dossier
          </Link>
        </Button>
      </div>

      {error && (
        <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg">
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
              specialty={c.required_specialty}
              status={c.status}
              date={c.created_at}
              role="patient"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl">
          <div className="bg-muted rounded-full p-6 mb-4">
             <Plus className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Aucun dossier trouvé</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            Vous n&apos;avez pas encore créé de dossier médical. Commencez dès maintenant pour obtenir des devis.
          </p>
          <Button asChild>
            <Link href="/patient/dossier/new">Créer mon premier dossier</Link>
          </Button>
        </div>
      )}
    </div>
  )
}