import { Metadata } from "next"
import Link from "next/link"
import { 
  Activity, 
  Users, 
  CheckSquare, 
  Clock,
  AlertTriangle,
  ArrowRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatsCard } from "@/components/dashboard/StatsCard"

export const metadata: Metadata = {
  title: "Espace Médecin | MediBridge Africa",
  description: "Gérez les demandes d'évacuation sanitaire.",
}

const pendingCases = [
  {
    id: "CASE-2025-003",
    patient: "Jean Dupont",
    diagnosis: "Suspicion AVC Ischémique",
    urgency: "critical",
    received: "Il y a 10 min",
  },
  {
    id: "CASE-2025-002",
    patient: "Aminata Diallo",
    diagnosis: "Fracture complexe fémur",
    urgency: "high",
    received: "Il y a 1h",
  },
  {
    id: "CASE-2025-001",
    patient: "Moussa Koné",
    diagnosis: "Bilan oncologique",
    urgency: "medium",
    received: "Il y a 3h",
  },
]

export default function DoctorDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Espace Médecin</h2>
        <div className="flex items-center space-x-2">
          <Button disabled variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Historique
          </Button>
          <Button asChild>
            <Link href="/medecin/dossiers">
                <CheckSquare className="mr-2 h-4 w-4" />
                Voir tous les dossiers
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="À Valider" 
          value="5" 
          description="+2 depuis votre dernière connexion" 
          icon={CheckSquare} 
        />
        <StatsCard 
          title="Urgences Critiques" 
          value="1" 
          description="Action immédiate requise" 
          icon={AlertTriangle} 
          className="border-red-500/50 bg-red-50 dark:bg-red-950/20"
        />
        <StatsCard 
          title="Patients Actifs" 
          value="12" 
          description="En cours de traitement" 
          icon={Users} 
        />
        <StatsCard 
          title="Taux d&apos;acceptation" 
          value="92%" 
          description="Dossiers validés ce mois" 
          icon={Activity} 
        />
      </div>

      {/* TRIAGE LIST */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>File d'attente (Triage)</CardTitle>
            <CardDescription>
              Derniers dossiers soumis nécessitant une revue médicale.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Diagnostic Présumé</TableHead>
                  <TableHead>Urgence</TableHead>
                  <TableHead className="text-right">Reçu</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingCases.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.patient}</TableCell>
                    <TableCell>{c.diagnosis}</TableCell>
                    <TableCell>
                        {c.urgency === 'critical' && <Badge variant="destructive" className="animate-pulse">Critique</Badge>}
                        {c.urgency === 'high' && <Badge className="bg-orange-500 hover:bg-orange-600">Élevée</Badge>}
                        {c.urgency === 'medium' && <Badge variant="secondary">Moyenne</Badge>}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">{c.received}</TableCell>
                    <TableCell>
                        <Button size="sm" variant="ghost" asChild>
                            <Link href={`/medecin/dossier/${c.id}`}>
                                Revue <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* RECENT ACTIVITY / NOTIFICATIONS */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
            <CardDescription>
              Mises à jour des cliniques et paiements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
                <div className="flex items-center">
                    <span className="relative flex h-2 w-2 mr-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Clinique Agdal - Devis envoyé</p>
                        <p className="text-sm text-muted-foreground">Pour le dossier #2025-001 (M. Koné)</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="h-2 w-2 mr-4 rounded-full bg-green-500" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Paiement Reçu</p>
                        <p className="text-sm text-muted-foreground">Dossier #2024-089 (Mme. Diallo) - 4500€</p>
                    </div>
                </div>
                 <div className="flex items-center">
                    <div className="h-2 w-2 mr-4 rounded-full bg-gray-300" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Nouveau message</p>
                        <p className="text-sm text-muted-foreground">Dr. Idrissi demande des précisions.</p>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}