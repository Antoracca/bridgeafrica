import { Metadata } from "next"
import { MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Messagerie | Médecin",
  description: "Echanges professionnels.",
}

export default function DoctorMessagesPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4 min-h-[50vh] text-center border-2 border-dashed rounded-lg p-8">
      <div className="bg-primary/10 p-4 rounded-full">
        <MessageSquare className="h-12 w-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Messagerie Sécurisée</h2>
      <p className="text-muted-foreground max-w-sm">
        Module de communication crypté pour échanger avec les cliniques et les patients sur les cas en cours.
      </p>
    </div>
  )
}
