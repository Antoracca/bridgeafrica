import { Metadata } from "next"
import Link from "next/link"
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  User, 
  CheckCircle2, 
  XCircle,
  MessageCircle,
  AlertTriangle,
  Send
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  
  // Mock Data pour le Médecin
  const caseData = {
    id: id,
    status: "submitted", // 'submitted' nécessite une validation
    patient: {
      name: "Jean Dupont",
      age: 45,
      gender: "M",
      origin: "Libreville, Gabon",
      history: "Hypertension (traitée), Fumeur (10 PA)"
    },
    clinical: {
      diagnosis: "Suspicion AVC Ischémique",
      symptoms: "Hémiparésie gauche brutale, aphasie transitoire. Début il y a 4h.",
      urgency: "critical"
    },
    documents: [
      { name: "IRM_Cerebrale.dcm", size: "45 MB", date: "25 Déc 2024" },
      { name: "Bilan_Sanguin.pdf", size: "0.5 MB", date: "25 Déc 2024" },
    ]
  }

  return (
    <div className="flex flex-col space-y-6 pb-10">
      
      {/* Header Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/medecin">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">Dossier #{caseData.id}</h2>
            <Badge variant="outline" className="animate-pulse border-orange-500 text-orange-500">
                En attente de validation
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Reçu le 25 Déc à 10:30 • Urgence : <span className="text-red-500 font-bold uppercase">{caseData.clinical.urgency}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLONNE GAUCHE : DONNÉES PATIENT (Lecture Seule) */}
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
                            <p className="font-medium">{caseData.patient.name}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Âge / Sexe</span>
                            <p className="font-medium">{caseData.patient.age} ans / {caseData.patient.gender}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Origine</span>
                            <p className="font-medium">{caseData.patient.origin}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Antécédents</span>
                            <p className="font-medium">{caseData.patient.history}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Données Cliniques */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle>Données Cliniques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Motif / Diagnostic Présumé</h4>
                        <p className="text-lg font-medium">{caseData.clinical.diagnosis}</p>
                    </div>
                    <Separator />
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Symptomatologie & Histoire</h4>
                        <p className="text-sm leading-relaxed bg-muted/50 p-4 rounded-md">
                            {caseData.clinical.symptoms}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* 3. Documents Viewer */}
            <Card>
                <CardHeader>
                    <CardTitle>Imagerie & Rapports</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="grid gap-2">
                        {caseData.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm group-hover:underline">{doc.name}</p>
                                        <p className="text-xs text-muted-foreground">{doc.size} • {doc.date}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
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
                        Valider la demande pour transmission aux cliniques.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Spécialité Confirmée</label>
                        <Select defaultValue="neurologie">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="neurologie">Neurologie</SelectItem>
                                <SelectItem value="neurochirurgie">Neurochirurgie</SelectItem>
                                <SelectItem value="cardio">Cardiologie</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Note au dossier (Interne)</label>
                        <Textarea placeholder="Ex: Patient stable pour transport, mais nécessite surveillance..." className="min-h-[100px]" />
                    </div>

                    <div className="space-y-2">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Valider & Transmettre
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="w-full">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Infos +
                            </Button>
                            <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30">
                                <XCircle className="mr-2 h-4 w-4" />
                                Rejeter
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* RAPPEL PROTOCOLE */}
            <Card className="bg-orange-50 border-orange-200 dark:bg-orange-950/10 dark:border-orange-900">
                <CardHeader className="pb-2">
                    <CardTitle className="text-orange-800 dark:text-orange-400 text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Protocole Critique
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-orange-800/80 dark:text-orange-400/80">
                    Pour les cas &quot;Critiques&quot; (AVC, IDM), la validation doit se faire sous <strong>2 heures</strong>. Assurez-vous que le patient est transportable.
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  )
}
