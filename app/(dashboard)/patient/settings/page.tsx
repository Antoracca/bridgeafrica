import { Metadata } from "next"
import { SettingsClient } from "@/components/patient/SettingsClient"

export const metadata: Metadata = {
  title: "Paramètres | Pont Afrique Santé",
  description: "Gérez vos préférences et paramètres de compte.",
}

export default function SettingsPage() {
  return <SettingsClient />
}
