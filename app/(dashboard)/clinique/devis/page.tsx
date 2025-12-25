import { Metadata } from "next"
import { FileSpreadsheet } from "lucide-react"
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
  title: "Mes Devis | Clinique",
  description: "Historique des devis envoyés.",
}

const quotes = [
  { id: "Q-2024-089", patient: "Aminata Diallo", amount: "4,500 €", status: "accepted", date: "20/12/2024" },
  { id: "Q-2024-090", patient: "Moussa Koné", amount: "12,000 €", status: "pending", date: "24/12/2024" },
]

export default function ClinicQuotesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Mes Devis</h2>
      </div>

      <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Réf. Devis</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Montant Total</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Envoyé le</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {quotes.map((q) => (
                    <TableRow key={q.id}>
                        <TableCell className="font-mono">{q.id}</TableCell>
                        <TableCell className="font-medium">{q.patient}</TableCell>
                        <TableCell>{q.amount}</TableCell>
                        <TableCell>
                            {q.status === 'accepted' ? <Badge className="bg-green-600">Accepté</Badge> : <Badge variant="secondary">En attente</Badge>}
                        </TableCell>
                        <TableCell>{q.date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </div>
    </div>
  )
}
