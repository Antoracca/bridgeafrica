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
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Parcours de Soins</h3>
      <div className="relative space-y-0 pl-1">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1
          
          return (
            <div key={step.id} className="relative flex items-start gap-3.5 pb-6 last:pb-0">
              {/* Ligne connectrice */}
              {!isLast && (
                <div className={cn(
                  "absolute left-[9px] top-6 h-full w-[1.5px]",
                  step.status === 'completed' ? "bg-slate-950" : "bg-slate-200"
                )} />
              )}
              
              {/* Icône */}
              <div className="relative z-10 bg-white">
                {step.status === 'completed' && (
                  <CheckCircle2 className="h-5 w-5 text-slate-950" />
                )}
                {step.status === 'current' && (
                  <CircleDot className="h-5 w-5 text-slate-900 animate-pulse" />
                )}
                {step.status === 'upcoming' && (
                  <Circle className="h-5 w-5 text-slate-300" />
                )}
              </div>
              
              {/* Contenu */}
              <div className="flex flex-col gap-0.5 pt-0.5 min-w-0">
                <span className={cn(
                  "text-xs font-bold leading-tight",
                  step.status === 'completed' ? "text-slate-950" :
                  step.status === 'current' ? "text-slate-950 font-extrabold" : "text-slate-400"
                )}>
                  {step.label}
                </span>
                {step.date && (
                  <span className="text-[11px] text-slate-400 font-mono">
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

