import { Metadata } from "next"
import Link from "next/link"
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar,
  MoreHorizontal,
  ArrowRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Mes Dossiers | MediBridge Africa",
  description: "Consultez et gérez vos dossiers médicaux.",
}

// Données fictives pour la démo UI
const cases = [
  {
    id: "CASE-2025-001",
    diagnosis: "Cardiopathie Ischémique",
    doctor: "Dr. Ahmed Benjelloun",
    clinic: "Clinique Agdal, Rabat",
    status: "quote_received",
    lastUpdate: "Il y a 2h",
    urgency: "high"
  },
  {
    id: "CASE-2024-089",
    diagnosis: "Cataracte Oeil Gauche",
    doctor: "Dr. Sarah Idrissi",
    clinic: "Hôpital Cheikh Zaid",
    status: "completed",
    lastUpdate: "14 Déc 2024",
    urgency: "low"
  },
  {
    id: "CASE-2025-002",
    diagnosis: "Contrôle Post-Opératoire",
    doctor: "En attente d'assignation",
    clinic: "-",
    status: "submitted",
    lastUpdate: "À l'instant",
    urgency: "medium"
  }
]

export default function CasesListPage() {
  return (
    <div className="flex flex-col space-y-6">
      
      {/* Header avec Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mes Dossiers</h2>
          <p className="text-muted-foreground">
            Suivez l&apos;avancement de vos évacuations sanitaires.
          </p>
        </div>
        <Button asChild>
          <Link href="/patient/dossier/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Dossier
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b bg-muted/40 p-4">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Rechercher un dossier par ID, médecin..."
                    className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                    />
                </div>
                {/* Filtres futurs ici */}
            </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Référence</TableHead>
                <TableHead>Diagnostic</TableHead>
                <TableHead className="hidden md:table-cell">Clinique / Médecin</TableHead>
                <TableHead className="hidden md:table-cell">Urgence</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Dernière MàJ</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((c) => (
                <TableRow key={c.id} className="group cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium text-primary">
                    <Link href={`/patient/dossier/${c.id}`} className="hover:underline">
                        {c.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{c.diagnosis}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="text-sm">{c.clinic}</div>
                    <div className="text-xs text-muted-foreground">{c.doctor}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {c.urgency === 'high' && <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">Élevée</Badge>}
                    {c.urgency === 'medium' && <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400">Moyenne</Badge>}
                    {c.urgency === 'low' && <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">Faible</Badge>}
                  </TableCell>
                  <TableCell>
                    {c.status === 'quote_received' && <Badge className="bg-blue-600">Devis Reçu</Badge>}
                    {c.status === 'completed' && <Badge variant="outline" className="border-green-600 text-green-600">Terminé</Badge>}
                    {c.status === 'submitted' && <Badge variant="secondary">En attente</Badge>}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {c.lastUpdate}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/patient/dossier/${c.id}`}>Voir les détails</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Voir le devis</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
