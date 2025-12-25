import { CheckCircle2, Circle, CircleDot } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineStep {
  id: string
  label: string
  status: 'completed' | 'current' | 'upcoming'
  date?: string
}

interface CaseTimelineProps {
  steps: TimelineStep[]
  className?: string
}

export function CaseTimeline({ steps, className }: CaseTimelineProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="font-semibold mb-4">Parcours de Soins</h3>
      <div className="relative space-y-0 pl-2">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1
          
          return (
            <div key={step.id} className="relative flex items-start gap-4 pb-8 last:pb-0">
              {/* Ligne connectrice */}
              {!isLast && (
                <div className={cn(
                  "absolute left-[11px] top-8 h-full w-[2px]",
                  step.status === 'completed' ? "bg-primary" : "bg-muted"
                )} />
              )}
              
              {/* Icône */}
              <div className="relative z-10 bg-background">
                {step.status === 'completed' && (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                )}
                {step.status === 'current' && (
                  <CircleDot className="h-6 w-6 text-blue-600 animate-pulse" />
                )}
                {step.status === 'upcoming' && (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              
              {/* Contenu */}
              <div className="flex flex-col gap-1 pt-0.5">
                <span className={cn(
                  "text-sm font-medium leading-none",
                  step.status === 'upcoming' && "text-muted-foreground"
                )}>
                  {step.label}
                </span>
                {step.date && (
                  <span className="text-xs text-muted-foreground">
                    {step.date}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
