import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  ArrowLeft, 
  FileText, 
  User, 
  AlertTriangle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CaseActions } from "@/components/cases/CaseActions"

export const metadata: Metadata = {
  title: "Revue Médicale | MediBridge Africa",
  description: "Analyse et validation du dossier médical.",
}

export default async function MedicalReviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Récupérer le dossier avec les infos du patient (profil)
  const { data: caseData, error } = await supabase
    .from('medical_cases')
    .select(`
        *,
        patient:patient_id (first_name, last_name, birth_date, country, city, medical_history)
    `)
    .eq('id', id)
    .single() as { data: any, error: any }

  if (error || !caseData) {
    return notFound()
  }

  return (
    <div className="flex flex-col space-y-6 pb-10">
      
      {/* Header Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/medecin/dossiers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">Dossier #{caseData.id.slice(0, 8)}</h2>
            {caseData.status === 'submitted' ? (
                <Badge className="bg-orange-500 animate-pulse">Nouveau à valider</Badge>
            ) : (
                <Badge variant="outline" className="border-blue-500 text-blue-500">{caseData.status}</Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            Reçu le {format(new Date(caseData.created_at), "PPp", { locale: fr })} • Urgence : 
            <span className={`ml-1 font-bold uppercase ${caseData.urgency_level === 'critical' ? 'text-red-500' : 'text-orange-500'}`}>
                {caseData.urgency_level}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLONNE GAUCHE : DONNÉES PATIENT & CLINIQUE */}
        <div className="md:col-span-2 space-y-6">
            
            {/* 1. Identité Patient */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <User className="h-4 w-4" />
                        Identité Patient
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-muted-foreground">Nom Complet</span>
                            <p className="font-medium">{caseData.patient?.first_name} {caseData.patient?.last_name}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Origine</span>
                            <p className="font-medium">{caseData.patient?.city}, {caseData.patient?.country}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Historique</span>
                            <p className="font-medium">{caseData.patient?.medical_history || "Non renseigné"}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Données Cliniques */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle>Anamnèse & Motif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Diagnostic du Patient / Proche</h4>
                        <p className="text-lg font-medium">{caseData.diagnosis}</p>
                    </div>
                    <Separator />
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Symptomatologie détaillée</h4>
                        <p className="text-sm leading-relaxed bg-muted/50 p-4 rounded-md whitespace-pre-wrap">
                            {caseData.symptoms || "Aucune description fournie."}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* 3. Documents (Placeholder) */}
            <Card>
                <CardHeader>
                    <CardTitle>Imagerie & Rapports</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="flex flex-col items-center justify-center py-10 border border-dashed rounded-lg">
                        <FileText className="h-10 w-10 text-muted-foreground/30 mb-2" />
                        <p className="text-sm text-muted-foreground">Les documents attachés apparaîtront ici.</p>
                    </div>
                </CardContent>
            </Card>

        </div>

        {/* COLONNE DROITE : ACTIONS MÉDECIN */}
        <div className="space-y-6">
            
            {/* ACTION CARD */}
            <Card className="shadow-lg border-primary/20 sticky top-20">
                <CardHeader className="bg-muted/50 pb-3">
                    <CardTitle>Décision Médicale</CardTitle>
                    <CardDescription>
                        Analysez le dossier avant de le transmettre.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CaseActions caseId={id} />
                </CardContent>
            </Card>

            {/* RAPPEL PROTOCOLE */}
            <Card className="bg-orange-50 border-orange-200 dark:bg-orange-950/10 dark:border-orange-900">
                <CardHeader className="pb-2">
                    <CardTitle className="text-orange-800 dark:text-orange-400 text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Consignes de Triage
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-orange-800/80 dark:text-orange-400/80">
                    Vérifiez la complétude des examens complémentaires (Scanner, IRM, Bilans) avant de valider pour les cliniques marocaines.
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  )
}