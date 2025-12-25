import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { Calendar, MapPin, User } from "lucide-react"
import Link from "next/link"

interface CaseCardProps {
  id: string
  diagnosis: string
  patientName?: string
  date: string
  status: string
  specialty: string
  role: 'patient' | 'medecin' | 'medecin_referent' | 'clinique'
}

export function CaseCard({ id, diagnosis, patientName, date, status, specialty, role }: CaseCardProps) {
  const href = `/${role === 'medecin_referent' ? 'medecin' : role}/dossier/${id}`

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold leading-none tracking-tight line-clamp-1">{diagnosis}</h3>
          <p className="text-sm text-muted-foreground">{specialty}</p>
        </div>
        <StatusBadge status={status} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {patientName && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{patientName}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Créé le {new Date(date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={href}>Voir le dossier</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
