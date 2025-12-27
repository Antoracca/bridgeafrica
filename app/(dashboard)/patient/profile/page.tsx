import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { PatientProfileForm } from "@/components/forms/PatientProfileForm"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Profil | MediBridge Africa",
  description: "Gérez vos informations personnelles et médicales de base.",
}

export default async function SettingsProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id || '')
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Mon Profil</h3>
        <p className="text-sm text-muted-foreground">
          Ces informations sont essentielles pour votre dossier d&apos;évacuation.
        </p>
      </div>
      <Separator />
      <PatientProfileForm profile={profile as any} email={user?.email} />
    </div>
  )
}
