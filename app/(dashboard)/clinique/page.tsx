import { Metadata } from "next"
import Link from "next/link"
import { 
  Activity, 
  FileSpreadsheet, 
  Users, 
  CreditCard,
  ArrowRight,
  Clock
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

export const metadata: Metadata = {
  title: "Espace Clinique | MediBridge Africa",
  description: "Gestion des admissions et devis.",
}

const requests = [
  {
    id: "CASE-004",
    patient: "Sophie Mbeki",
    treatment: "Chirurgie Orthopédique",
    doctor: "Dr. Benjelloun",
    received: "Il y a 30 min",
    status: "pending_quote"
  },
  {
    id: "CASE-005",
    patient: "Paul Biya",
    treatment: "Check-up Complet",
    doctor: "Dr. Idrissi",
    received: "Il y a 4h",
    status: "pending_quote"
  },
]

export default function ClinicDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Espace Clinique</h2>
        <div className="flex items-center space-x-2">
            <Button asChild>
                <Link href="/clinique/dossiers">
                    Voir toutes les demandes
                </Link>
            </Button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Demandes Reçues
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              En attente de chiffrage
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Devis Envoyés
            </CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 en attente de réponse
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Patients Actuels
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Hospitalisés
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chiffre d&apos;Affaires
            </CardTitle>
            <CreditCard className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5k €</div>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Nouvelles Demandes</CardTitle>
            <CardDescription>
              Dossiers validés par les médecins référents, en attente de proposition financière.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Traitement demandé</TableHead>
                  <TableHead>Médecin Réf.</TableHead>
                  <TableHead>Reçu</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.patient}</TableCell>
                    <TableCell>{r.treatment}</TableCell>
                    <TableCell>{r.doctor}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{r.received}</TableCell>
                    <TableCell>
                        <Button size="sm" asChild>
                            <Link href={`/clinique/dossier/${r.id}`}>
                                Faire un devis <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Rappels</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <div className="border-l-4 border-orange-500 bg-orange-50 p-3 rounded-r-md dark:bg-orange-950/20">
                    <p className="text-sm font-medium">Devis #Q-2024-001 expire bientôt</p>
                    <p className="text-xs text-muted-foreground">Patient: M. Koné - Expire demain</p>
                </div>
                <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded-r-md dark:bg-green-950/20">
                    <p className="text-sm font-medium">Arrivée prévue demain</p>
                    <p className="text-xs text-muted-foreground">Mme. Diallo - Vol AT560 - 14:30</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
