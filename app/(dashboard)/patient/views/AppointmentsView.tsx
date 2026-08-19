"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  InkPillButton, 
  OutlinedPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import {
  Calendar as CalendarIcon,
  Video,
  PlusCircle,
  ShieldCheck,
  FileText,
  HelpCircle,
  Camera,
  ArrowUpRight,
  Clock
} from "lucide-react"

interface Appointment {
  id: string
  title: string
  doctorName: string
  specialty: string
  date: string
  time: string
  type: "teleconsultation" | "physical"
  status: "scheduled" | "completed" | "cancelled"
  link?: string
  location?: string
}

interface AppointmentsViewProps {
  appointments?: Appointment[]
}

export function AppointmentsView({ appointments = [] }: AppointmentsViewProps) {
  const hasAppointments = appointments && appointments.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-10 w-full"
    >
      {/* En-tête Mastercard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-2">
        <div className="space-y-1">
          <EyebrowDot text="• AGENDA CLINIQUE & SÉANCES D'ÉVALUATION" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
            Agenda Médical & Rendez-vous
          </h1>
          <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Planifiez et suivez vos téléconsultations pré-opératoires ainsi que vos consultations d'admission en clinique partenaire.
          </p>
        </div>

        <InkPillButton href="/patient?view=new" className="shrink-0">
          <PlusCircle className="w-4 h-4" />
          <span>Demander une consultation</span>
        </InkPillButton>
      </div>

      {hasAppointments ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[32px] p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between">
                <span className="font-medium text-base text-[#141413]">{apt.title}</span>
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#141413] text-[#F3F0EE]">
                  {apt.status === "scheduled" ? "PROGRAMMÉ" : apt.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-[#696969]">Dr. {apt.doctorName} • {apt.specialty}</p>
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#141413] pt-2 border-t border-[#E2DDD7]">
                <CalendarIcon className="w-3.5 h-3.5 text-[#CF4500]" /> 
                <span>{apt.date} à {apt.time}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[40px] p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="w-16 h-16 mx-auto bg-[#F3F0EE] border border-[#E2DDD7] rounded-full flex items-center justify-center text-[#141413]">
            <CalendarIcon className="w-8 h-8 text-[#CF4500]" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl font-medium text-[#141413] tracking-tight">
              Aucun rendez-vous médical programmé
            </h3>
            <p className="text-[#696969] text-sm leading-relaxed">
              Dès la confirmation de votre créneau avec le praticien référent ou la clinique partenaire, les accès directs et détails d'admission s'afficheront ici.
            </p>
          </div>

          {/* Cartes d'aide et préparation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto pt-2">
            <div className="p-6 rounded-[24px] bg-white border border-[#E2DDD7] flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#141413] text-[#F3F0EE] flex items-center justify-center">
                  <Camera className="w-4 h-4 text-[#F37338]" />
                </div>
                <h4 className="font-medium text-xs text-[#141413]">Tester vos flux vidéo WebRTC</h4>
                <p className="text-[11px] text-[#696969] leading-relaxed">
                  Vérifiez le bon fonctionnement de votre micro et caméra avant l'entretien.
                </p>
              </div>
              <OutlinedPillButton href="/patient?view=teleconsultation" className="py-2 px-4 text-xs w-fit">
                <Video className="w-3.5 h-3.5" />
                <span>Tester ma caméra</span>
              </OutlinedPillButton>
            </div>

            <div className="p-6 rounded-[24px] bg-white border border-[#E2DDD7] flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#141413] text-[#F3F0EE] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#F37338]" />
                </div>
                <h4 className="font-medium text-xs text-[#141413]">Compléter vos examens</h4>
                <p className="text-[11px] text-[#696969] leading-relaxed">
                  Assurez-vous d'avoir déposé vos scanners récents dans votre coffre-fort.
                </p>
              </div>
              <OutlinedPillButton href="/patient?view=documents" className="py-2 px-4 text-xs w-fit">
                <FileText className="w-3.5 h-3.5" />
                <span>Coffre-fort HDS</span>
              </OutlinedPillButton>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <InkPillButton href="/patient?view=new">
              <PlusCircle className="w-4 h-4" />
              <span>Initier une demande de soins</span>
            </InkPillButton>
            <OutlinedPillButton href="/patient/help">
              <HelpCircle className="w-4 h-4" />
              <span>Guide des consultations</span>
            </OutlinedPillButton>
          </div>
        </div>
      )}
    </motion.div>
  )
}


