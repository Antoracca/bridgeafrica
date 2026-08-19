import { Metadata } from "next"
import { PatientProfileForm } from "@/components/forms/PatientProfileForm"
import { createClient } from "@/lib/supabase/server"
import { EyebrowDot } from "@/components/ui/mastercard-design"

export const metadata: Metadata = {
  title: "Mon Profil | Pont Afrique Santé",
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
    <div className="max-w-4xl mx-auto space-y-10 w-full">
      <div className="space-y-1 pb-2">
        <EyebrowDot text="• PARAMÈTRES DU COMPTE & IDENTITÉ PATIENT" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
          Mon Profil Patient
        </h1>
        <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
          Gérez votre identité, vos coordonnées d'urgence et vos antécédents médicaux de référence.
        </p>
      </div>

      <PatientProfileForm profile={profile || {}} email={user?.email} />
    </div>
  )
}


