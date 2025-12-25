import { Metadata } from "next"
import Link from "next/link"
import { Search, Filter, MoreHorizontal, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export const metadata: Metadata = {
  title: "Dossiers | Médecin",
  description: "Liste complète des dossiers médicaux.",
}

const allCases = [
  { id: "CASE-003", patient: "Jean Dupont", diag: "Suspicion AVC", status: "submitted", urgency: "critical", date: "25/12/2024" },
  { id: "CASE-002", patient: "Aminata Diallo", diag: "Fracture Fémur", status: "submitted", urgency: "high", date: "25/12/2024" },
  { id: "CASE-001", patient: "Moussa Koné", diag: "Bilan Onco", status: "quote_sent", urgency: "medium", date: "24/12/2024" },
]

export default function DoctorCasesPage() {
  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Tous les Dossiers</h2>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Rechercher par patient, ID..." className="max-w-sm" />
        <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
      </div>

      <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Réf.</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Diagnostic</TableHead>
                    <TableHead>Urgence</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allCases.map((c) => (
                    <TableRow key={c.id}>
                        <TableCell className="font-mono">{c.id}</TableCell>
                        <TableCell className="font-medium">{c.patient}</TableCell>
                        <TableCell>{c.diag}</TableCell>
                        <TableCell>
                            {c.urgency === 'critical' ? <Badge variant="destructive">Critique</Badge> : 
                             c.urgency === 'high' ? <Badge className="bg-orange-500">Élevée</Badge> : <Badge variant="secondary">Moyenne</Badge>}
                        </TableCell>
                         <TableCell>
                            {c.status === 'submitted' ? <Badge variant="outline" className="border-blue-500 text-blue-500">À Valider</Badge> : <Badge variant="outline">En cours</Badge>}
                        </TableCell>
                        <TableCell className="text-right">
                             <Button size="sm" variant="ghost" asChild>
                                <Link href={`/medecin/dossier/${c.id}`}>
                                    Ouvrir
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </div>
    </div>
  )
}
