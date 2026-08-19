import Link from "next/link"
import { Calendar, User, ArrowUpRight, FileText } from "lucide-react"

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
    <div className="group bg-[#FCFBFA] rounded-[32px] border border-[#E2DDD7] p-6 flex flex-col justify-between hover:border-[#141413] transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-full bg-white border border-[#E2DDD7] flex items-center justify-center text-[#141413] group-hover:bg-[#141413] group-hover:text-white transition-colors">
            <FileText className="w-5 h-5 text-[#CF4500]" />
          </div>
          <span className="px-3 py-1 rounded-full bg-[#141413] text-[#F3F0EE] text-[11px] font-mono font-bold">
            {status}
          </span>
        </div>

        <div>
          <h3 className="font-medium text-[#141413] text-base tracking-tight line-clamp-1 group-hover:text-[#CF4500] transition-colors">
            {diagnosis}
          </h3>
          <p className="text-xs text-[#696969] font-normal mt-1">{specialty}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#E2DDD7] space-y-4">
        <div className="flex items-center justify-between text-xs text-[#696969]">
          {patientName ? (
            <div className="flex items-center gap-1.5 font-medium text-[#141413]">
              <User className="h-3.5 w-3.5 text-[#696969]" />
              <span>{patientName}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[#696969]">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(date).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          )}
          <span className="text-[11px] font-mono font-bold text-[#696969]">#{id.slice(0, 6)}</span>
        </div>

        <Link 
          href={href} 
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[20px] bg-white text-[#141413] text-xs font-medium border border-[#E2DDD7] hover:bg-[#141413] hover:text-[#F3F0EE] hover:border-[#141413] transition-all"
        >
          <span>Consulter le dossier médical</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}



