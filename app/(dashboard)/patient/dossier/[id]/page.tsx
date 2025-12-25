import { Metadata } from "next"
import Link from "next/link"
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  Building2,
  Stethoscope,
  Paperclip
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Détail Dossier | MediBridge Africa",
  description: "Suivi détaillé de votre évacuation sanitaire.",
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  // Simulation de données (Mock)
  const caseData = {
    id: id,
    status: "quote_received",
    diagnosis: "Cardiopathie Ischémique",
    created_at: "24 Déc 2024",
    description: "Douleurs thoraciques persistantes à l'effort. ECG montre des signes d'ischémie. Coronarographie recommandée rapidement.",
    documents: [
      { name: "ECG_Repos.pdf", size: "2.4 MB", date: "24 Déc 2024" },
      { name: "Lettre_Medecin_Traitant.pdf", size: "1.1 MB", date: "24 Déc 2024" },
    ],
    doctor: {
      name: "Dr. Ahmed Benjelloun",
      role: "Cardiologue Référent",
      hospital: "Hôpital Militaire, Rabat"
    },
    clinic: {
      name: "Clinique Agdal",
      city: "Rabat, Maroc",
      quote: {
        amount: 4500,
        currency: "EUR",
        validity: "7 jours",
        details: "Hospitalisation 48h, Coronarographie, Stent si nécessaire."
      }
    }
  }

  return (
    <div className="flex flex-col space-y-6 pb-10">
      
      {/* Navigation Retour */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/patient/dossier">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">Dossier #{caseData.id}</h2>
            <Badge className="bg-blue-600">Devis Reçu</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Créé le {caseData.created_at} • {caseData.diagnosis}
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contacter Support
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLONNE PRINCIPALE (Gauche) */}
        <div className="md:col-span-2 space-y-6">
            
            {/* 1. Timeline / Statut */}
            <Card>
                <CardHeader>
                    <CardTitle>État d&apos;avancement</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative border-l border-muted ml-3 space-y-8 pb-1">
                        {/* Etape 1: Création */}
                        <div className="relative pl-8">
                            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold leading-none">Dossier Soumis</span>
                                <span className="text-xs text-muted-foreground">24 Déc 2024 - 10:30</span>
                            </div>
                        </div>
                        {/* Etape 2: Validation Médicale */}
                        <div className="relative pl-8">
                            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold leading-none">Validé par Médecin Référent</span>
                                <span className="text-xs text-muted-foreground">24 Déc 2024 - 14:15</span>
                                <div className="mt-2 rounded-md bg-muted p-3 text-sm italic text-muted-foreground">
                                    &quot;Dossier complet. Indication opératoire confirmée. Transmission aux cliniques partenaires.&quot;
                                </div>
                            </div>
                        </div>
                        {/* Etape 3: Devis (Actif) */}
                        <div className="relative pl-8">
                            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-900 animate-pulse" />
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold leading-none text-blue-600">Devis Reçu</span>
                                <span className="text-xs text-muted-foreground">Il y a 2h</span>
                                <p className="text-sm text-muted-foreground mt-1">
                                    La Clinique Agdal a envoyé une proposition. Veuillez l&apos;examiner.
                                </p>
                            </div>
                        </div>
                         {/* Etape 4: Voyage */}
                         <div className="relative pl-8 opacity-50">
                            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border border-muted bg-background" />
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold leading-none">Logistique & Visa</span>
                                <span className="text-xs text-muted-foreground">En attente validation devis</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Onglets Détails */}
            <Tabs defaultValue="medical" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="medical">Infos Médicales</TabsTrigger>
                    <TabsTrigger value="documents">Documents ({caseData.documents.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="medical" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Résumé Clinique</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Diagnostic</h4>
                                    <p className="font-medium">{caseData.diagnosis}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Urgence</h4>
                                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 mt-1">Moyenne</Badge>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Histoire de la maladie</h4>
                                <p className="text-sm leading-relaxed text-muted-foreground bg-muted/50 p-3 rounded-md">
                                    {caseData.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="documents" className="mt-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Pièces Jointes</CardTitle>
                                <Button size="sm" variant="outline">
                                    <Paperclip className="mr-2 h-4 w-4" />
                                    Ajouter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {caseData.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded bg-red-50 flex items-center justify-center text-red-500">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{doc.name}</p>
                                                <p className="text-xs text-muted-foreground">{doc.date} • {doc.size}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Download className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>

        {/* COLONNE LATERALE (Droite) */}
        <div className="space-y-6">
            
            {/* ACTION REQUISE : DEVIS */}
            <Card className="border-blue-200 bg-blue-50/30 dark:border-blue-900 dark:bg-blue-950/10 shadow-md">
                <CardHeader className="pb-3">
                    <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Proposition reçue
                    </CardTitle>
                    <CardDescription>
                        Validité : {caseData.clinic.quote.validity}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-baseline justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Total Estimé</span>
                        <span className="text-3xl font-bold text-foreground">
                            {caseData.clinic.quote.amount} €
                        </span>
                    </div>
                    <Separator />
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p className="font-medium text-foreground">{caseData.clinic.name}</p>
                        <p>{caseData.clinic.quote.details}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 pt-0">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Accepter le devis
                    </Button>
                    <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400">
                        Discuter / Négocier
                    </Button>
                </CardFooter>
            </Card>

            {/* ÉQUIPE MÉDICALE */}
            <Card>
                <CardHeader>
                    <CardTitle>Équipe Médicale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center dark:bg-slate-800">
                            <Stethoscope className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{caseData.doctor.name}</p>
                            <p className="text-xs text-muted-foreground">{caseData.doctor.role}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center dark:bg-slate-800">
                            <Building2 className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{caseData.clinic.name}</p>
                            <p className="text-xs text-muted-foreground">{caseData.clinic.city}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  )
}
