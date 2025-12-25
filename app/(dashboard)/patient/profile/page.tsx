import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { PatientProfileForm } from "@/components/forms/PatientProfileForm"

export const metadata: Metadata = {
  title: "Profil | MediBridge Africa",
  description: "Gérez vos informations personnelles et médicales de base.",
}

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Mon Profil</h3>
        <p className="text-sm text-muted-foreground">
          Ces informations sont essentielles pour votre dossier d&apos;évacuation.
        </p>
      </div>
      <Separator />
      <PatientProfileForm />
    </div>
  )
}
