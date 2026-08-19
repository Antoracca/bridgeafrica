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

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: { 
    label: "Brouillon", 
    className: "bg-slate-100 text-slate-600 border border-slate-200" 
  },
  submitted: { 
    label: "Soumis", 
    className: "bg-amber-50 text-amber-700 border border-amber-200/80" 
  },
  under_review: { 
    label: "En examen", 
    className: "bg-slate-900 text-white border border-slate-900" 
  },
  approved: { 
    label: "Validé", 
    className: "bg-teal-50 text-brand-teal-dark border border-brand-teal-border" 
  },
  quote_sent: { 
    label: "Devis reçu", 
    className: "bg-brand-teal text-white border border-brand-teal" 
  },
  quote_accepted: { 
    label: "Devis accepté", 
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200" 
  },
  visa_pending: { 
    label: "Visa en cours", 
    className: "bg-slate-100 text-slate-800 border border-slate-300" 
  },
  travel_booked: { 
    label: "Voyage confirmé", 
    className: "bg-slate-900 text-white border border-slate-800" 
  },
  in_treatment: { 
    label: "En soins", 
    className: "bg-brand-teal text-white border border-brand-teal font-semibold" 
  },
  completed: { 
    label: "Finalisé", 
    className: "bg-emerald-50 text-emerald-800 border border-emerald-300" 
  },
  cancelled: { 
    label: "Annulé", 
    className: "bg-rose-50 text-rose-700 border border-rose-200" 
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { 
    label: status, 
    className: "bg-slate-100 text-slate-700 border border-slate-200" 
  }
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-tight transition-colors select-none",
      config.className,
      className
    )}>
      {config.label}
    </span>
  )
}

