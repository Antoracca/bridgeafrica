import { Metadata } from "next"
import { MedicalCaseForm } from "@/components/forms/MedicalCaseForm"

export const metadata: Metadata = {
  title: "Nouveau Dossier | MediBridge Africa",
  description: "Initiez une demande d'évacuation sanitaire.",
}

export default function NewCasePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Nouveau Dossier Médical</h2>
            <p className="text-muted-foreground">
            Remplissez ce formulaire avec précision pour faciliter l&apos;analyse par nos médecins partenaires.
            </p>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Colonne Principale : Le Formulaire */}
        <div className="lg:col-span-2">
            <MedicalCaseForm />
        </div>

        {/* Colonne Latérale : Aide & Infos */}
        <div className="space-y-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="font-semibold leading-none tracking-tight mb-4">Besoin d&apos;aide ?</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <p>
                        <strong>Diagnostic :</strong> Soyez le plus précis possible. Si vous avez un compte rendu médical, copiez la conclusion.
                    </p>
                    <p>
                        <strong>Urgence :</strong>
                        <ul className="list-disc pl-4 mt-1 space-y-1">
                            <li>Faible : Pas de risque vital, confort.</li>
                            <li>Moyenne : Soins nécessaires sous 30j.</li>
                            <li>Élevée : Soins nécessaires sous 7j.</li>
                            <li>Critique : Risque vital immédiat.</li>
                        </ul>
                    </p>
                    <p>
                        <strong>Documents :</strong> Les scanners (DICOM) et les rapports PDF sont essentiels pour obtenir un devis précis.
                    </p>
                </div>
            </div>

            <div className="rounded-lg border bg-blue-50/50 text-blue-900 border-blue-100 p-6 dark:bg-blue-900/20 dark:text-blue-100 dark:border-blue-900">
                <h3 className="font-semibold leading-none tracking-tight mb-2">Note Importante</h3>
                <p className="text-sm">
                    Toutes les informations transmises sont chiffrées et soumises au secret médical. Seuls les médecins accrédités y auront accès.
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}
