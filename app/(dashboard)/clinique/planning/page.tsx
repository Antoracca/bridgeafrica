import { Metadata } from "next"
import { Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Planning | Clinique",
  description: "Gestion des admissions.",
}

export default function ClinicPlanningPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4 min-h-[50vh] text-center border-2 border-dashed rounded-lg p-8">
      <div className="bg-primary/10 p-4 rounded-full">
        <Calendar className="h-12 w-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Planning des Admissions</h2>
      <p className="text-muted-foreground max-w-sm">
        Ce module permettra de gérer les dates d&apos;arrivée, les réservations de chambres et le bloc opératoire.
      </p>
    </div>
  )
}
