import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusType = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'approved' 
  | 'quote_sent' 
  | 'quote_accepted' 
  | 'visa_pending' 
  | 'travel_booked' 
  | 'in_treatment' 
  | 'completed' 
  | 'cancelled'

interface StatusBadgeProps {
  status: StatusType | string
  className?: string
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; className?: string }> = {
  draft: { label: "Brouillon", variant: "outline", className: "text-muted-foreground border-dashed" },
  submitted: { label: "Soumis", variant: "secondary", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
  under_review: { label: "En Examen", variant: "secondary", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
  approved: { label: "Approuvé", variant: "default", className: "bg-green-600 hover:bg-green-700" },
  quote_sent: { label: "Devis Reçu", variant: "secondary", className: "bg-purple-100 text-purple-800" },
  quote_accepted: { label: "Devis Accepté", variant: "default", className: "bg-purple-600" },
  visa_pending: { label: "Visa en cours", variant: "outline", className: "border-orange-500 text-orange-600" },
  travel_booked: { label: "Voyage Réservé", variant: "outline", className: "border-blue-500 text-blue-600" },
  in_treatment: { label: "En Traitement", variant: "default", className: "bg-red-600 animate-pulse" },
  completed: { label: "Terminé", variant: "outline", className: "border-green-600 text-green-600" },
  cancelled: { label: "Annulé", variant: "destructive", className: "" },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: "secondary" }
  
  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}
