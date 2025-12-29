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
    .select('first_name, last_name, phone, country, city, allergies, blood_type, medical_history, notification_preference, avatar_url')
    .eq('id', user?.id || '')
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Mon Profil
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Gérez vos informations personnelles et médicales en toute sécurité
        </p>
      </div>
      <Separator className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 h-0.5" />
      <PatientProfileForm profile={profile as any} email={user?.email} />
    </div>
  )
}
