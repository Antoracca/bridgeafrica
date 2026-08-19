import { Suspense } from 'react'
import { PatientDashboardRouter } from './dashboard-router'
import { Loader2 } from 'lucide-react'

export const metadata = {
  title: "Tableau de bord | Pont Afrique Santé",
  description: "Vue d'ensemble de vos dossiers médicaux.",
}

export default function PatientDashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <PatientDashboardRouter />
    </Suspense>
  )
}
