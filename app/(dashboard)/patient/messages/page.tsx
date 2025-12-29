import { Metadata } from "next"
import { MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Messagerie | MediBridge Africa",
  description: "Vos échanges avec les médecins et cliniques.",
}

export default function MessagesPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4 min-h-[50vh] text-center p-4 md:p-8 border-2 border-dashed rounded-lg">
      <div className="bg-primary/10 p-3 md:p-4 rounded-full">
        <MessageSquare className="h-10 w-10 md:h-12 md:w-12 text-primary" />
      </div>
      <h2 className="text-xl md:text-2xl font-bold tracking-tight">Messagerie Sécurisée</h2>
      <p className="text-muted-foreground max-w-sm text-sm md:text-base px-4">
        Ce module est en cours de finalisation. Vous pourrez bientôt échanger directement avec les médecins référents et les cliniques partenaires.
      </p>
    </div>
  )
}
