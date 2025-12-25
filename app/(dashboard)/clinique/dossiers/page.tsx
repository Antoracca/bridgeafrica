import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
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

export const metadata: Metadata = {
  title: "Demandes Reçues | Clinique",
  description: "Liste des demandes d'évacuation à chiffrer.",
}

const requests = [
  { id: "CASE-004", patient: "Sophie Mbeki", treatment: "Chirurgie Ortho", doctor: "Dr. Benjelloun", date: "25/12/2024" },
  { id: "CASE-005", patient: "Paul Biya", treatment: "Check-up", doctor: "Dr. Idrissi", date: "25/12/2024" },
]

export default function ClinicRequestsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Demandes Reçues</h2>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Rechercher..." className="max-w-sm" />
      </div>

      <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Réf.</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Traitement</TableHead>
                    <TableHead>Médecin Réf.</TableHead>
                    <TableHead>Reçu le</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {requests.map((r) => (
                    <TableRow key={r.id}>
                        <TableCell className="font-mono">{r.id}</TableCell>
                        <TableCell className="font-medium">{r.patient}</TableCell>
                        <TableCell>{r.treatment}</TableCell>
                        <TableCell>{r.doctor}</TableCell>
                        <TableCell>{r.date}</TableCell>
                        <TableCell className="text-right">
                             <Button size="sm" asChild>
                                <Link href={`/clinique/dossier/${r.id}`}>
                                    Traiter <ArrowRight className="ml-2 h-4 w-4" />
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
