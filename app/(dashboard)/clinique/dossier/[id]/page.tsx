import { Metadata } from "next"
import Link from "next/link"
import { 
  ArrowLeft, 
  User, 
  FileText,
  Calendar,
  Download
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { QuoteForm } from "@/components/forms/QuoteForm"

export const metadata: Metadata = {
  title: "Nouveau Devis | Clinique",
  description: "Établir une proposition financière.",
}

export default async function ClinicQuotePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Mock Data (simulating data validated by Doctor)
  const caseData = {
    id: id,
    received_at: "25 Déc 2024 - 11:30",
    patient: {
      name: "Sophie Mbeki",
      age: 28,
      origin: "Cameroun",
    },
    medical: {
      diagnosis: "Rupture Ligaments Croisés (Genou D)",
      doctor_note: "Indication opératoire confirmée (Ligamentoplastie sous arthroscopie). Patient jeune, sportif. Pas de comorbidités.",
      documents: ["IRM_Genou.pdf", "Lettre_Ortho.pdf"]
    }
  }

  return (
    <div className="flex flex-col space-y-6 pb-10">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/clinique">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">Dossier #{caseData.id}</h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Demande de Devis
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Reçu le {caseData.received_at}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT: MEDICAL CONTEXT */}
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Patient & Médical
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-sm text-muted-foreground">Patient</span>
                            <p className="font-medium">{caseData.patient.name}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Origine</span>
                            <p className="font-medium">{caseData.patient.origin}</p>
                        </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                        <span className="text-sm text-muted-foreground">Diagnostic</span>
                        <p className="font-medium text-lg">{caseData.medical.diagnosis}</p>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-md">
                        <span className="text-sm font-semibold flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4" />
                            Note du Médecin Référent
                        </span>
                        <p className="text-sm text-muted-foreground italic">
                            &quot;{caseData.medical.doctor_note}&quot;
                        </p>
                    </div>

                    <div>
                        <span className="text-sm text-muted-foreground block mb-2">Pièces Jointes</span>
                        <div className="flex flex-wrap gap-2">
                            {caseData.medical.documents.map((doc, i) => (
                                <Badge key={i} variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-muted">
                                    <Download className="mr-2 h-3 w-3" />
                                    {doc}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* RIGHT: QUOTE FORM */}
        <div className="space-y-6">
            <Card className="border-blue-200 dark:border-blue-900 shadow-lg">
                <CardHeader className="bg-blue-50/50 dark:bg-blue-950/20 border-b border-blue-100 dark:border-blue-900">
                    <CardTitle className="text-blue-700 dark:text-blue-400">Établir le Devis</CardTitle>
                    <CardDescription>
                        Remplissez les détails financiers et logistiques pour le patient.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <QuoteForm />
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  )
}
