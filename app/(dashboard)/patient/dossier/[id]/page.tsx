import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  Building2,
  Stethoscope,
  Paperclip,
  AlertTriangle
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
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export const metadata: Metadata = {
  title: "Détail Dossier | MediBridge Africa",
  description: "Suivi détaillé de votre évacuation sanitaire.",
}

const statusConfig: Record<string, { label: string, color: string }> = {
  draft: { label: "Brouillon", color: "bg-slate-500" },
  submitted: { label: "Soumis", color: "bg-orange-500" },
  under_review: { label: "En cours d'examen", color: "bg-blue-500" },
  approved: { label: "Approuvé", color: "bg-green-500" },
  quote_sent: { label: "Devis reçu", color: "bg-purple-500" },
  quote_accepted: { label: "Devis accepté", color: "bg-emerald-600" },
  completed: { label: "Terminé", color: "bg-green-700" },
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Récupérer les données du dossier
  const { data: caseData, error } = await supabase
    .from('medical_cases')
    .select(`
        *,
        doctor:referent_doctor_id (first_name, last_name, specialty),
        clinic:assigned_clinic_id (clinic_name, clinic_address)
    `)
    .eq('id', id)
    .single() as { data: any, error: any }

  if (error || !caseData) {
    return notFound()
  }

  // Récupérer le devis (si présent)
  const { data: quote } = await supabase
    .from('quotes')
    .select('*')
    .eq('case_id', id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single() as { data: any }

  const status = statusConfig[caseData.status] || { label: caseData.status, color: "bg-gray-500" }

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
            <h2 className="text-2xl font-bold tracking-tight">Dossier #{caseData.id.slice(0, 8)}</h2>
            <Badge className={status.color}>{status.label}</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Créé le {format(new Date(caseData.created_at), "d MMMM yyyy", { locale: fr })} • {caseData.diagnosis}
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" asChild>
                <Link href="/patient/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contacter Support
                </Link>
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLONNE PRINCIPALE (Gauche) */}
        <div className="md:col-span-2 space-y-6">
            
            {/* 1. Timeline / Statut Simplifiée */}
            <Card>
                <CardHeader>
                    <CardTitle>État d&apos;avancement</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative border-l border-muted ml-3 space-y-8 pb-1">
                        <div className="relative pl-8">
                            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold leading-none">Dossier Soumis</span>
                                <span className="text-xs text-muted-foreground">{format(new Date(caseData.created_at), "PPp", { locale: fr })}</span>
                            </div>
                        </div>
                        
                        {caseData.status !== 'submitted' && (
                             <div className="relative pl-8">
                                <span className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full ring-4 ring-background ${['under_review', 'approved', 'quote_sent'].includes(caseData.status) ? 'bg-primary' : 'bg-muted'}`} />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold leading-none text-muted-foreground">Examen médical</span>
                                    <span className="text-xs text-muted-foreground">En cours...</span>
                                </div>
                            </div>
                        )}

                        <div className="relative pl-8 opacity-50">
                            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border border-muted bg-background" />
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold leading-none text-muted-foreground">Logistique & Visa</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Onglets Détails */}
            <Tabs defaultValue="medical" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="medical">Infos Médicales</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
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
                                    <Badge variant="secondary" className="mt-1">
                                        {caseData.urgency_level === 'critical' ? 'Critique' : 
                                         caseData.urgency_level === 'high' ? 'Élevée' : 
                                         caseData.urgency_level === 'medium' ? 'Moyenne' : 'Faible'}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Détails / Symptômes</h4>
                                <p className="text-sm leading-relaxed text-muted-foreground bg-muted/50 p-3 rounded-md whitespace-pre-wrap">
                                    {caseData.symptoms || "Aucun détail supplémentaire fourni."}
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
                            <div className="flex flex-col items-center justify-center py-10 border border-dashed rounded-lg bg-muted/10">
                                <FileText className="h-10 w-10 text-muted-foreground/40 mb-2" />
                                <p className="text-sm text-muted-foreground">Chargement des documents du dossier...</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>

        {/* COLONNE LATERALE (Droite) */}
        <div className="space-y-6">
            
            {/* ACTION REQUISE : DEVIS */}
            {quote && quote.created_at ? (
                <Card className="border-blue-200 bg-blue-50/30 dark:border-blue-900 dark:bg-blue-950/10 shadow-md">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Proposition reçue
                        </CardTitle>
                        <CardDescription>
                            Dernière mise à jour : {format(new Date(quote.created_at), "PP", { locale: fr })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Total Estimé</span>
                            <span className="text-3xl font-bold text-foreground">
                                {quote.total_cost} {quote.currency}
                            </span>
                        </div>
                        <Separator />
                        <div className="text-sm text-muted-foreground space-y-1">
                            <p className="font-medium text-foreground">Clinique Partenaire</p>
                            <p>{quote.treatment_description}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 pt-0">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Accepter le devis
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Statut du Devis</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center py-6 text-center">
                        <Clock className="h-8 w-8 text-muted-foreground mb-2 animate-pulse" />
                        <p className="text-sm text-muted-foreground">
                            En attente d&apos;examen par nos cliniques partenaires.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* ÉQUIPE MÉDICALE */}
            <Card>
                <CardHeader>
                    <CardTitle>Intervenants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {caseData.doctor ? (
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center dark:bg-slate-800">
                                <Stethoscope className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Dr. {caseData.doctor.first_name} {caseData.doctor.last_name}</p>
                                <p className="text-xs text-muted-foreground">{caseData.doctor.specialty || "Médecin Référent"}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-xs text-muted-foreground italic text-center">Aucun médecin assigné</p>
                    )}
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  )
}