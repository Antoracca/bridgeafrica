import { Metadata } from "next"
import { Users, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const metadata: Metadata = {
  title: "Mes Patients | Médecin",
  description: "Répertoire des patients.",
}

const patients = [
    { name: "Jean Dupont", age: 45, city: "Libreville", lastCase: "25/12/2024" },
    { name: "Aminata Diallo", age: 32, city: "Dakar", lastCase: "25/12/2024" },
    { name: "Moussa Koné", age: 58, city: "Abidjan", lastCase: "24/12/2024" },
]

export default function PatientsListPage() {
  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-bold tracking-tight">Mes Patients</h2>
        <p className="text-muted-foreground">Annuaire des patients ayant soumis un dossier.</p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8" placeholder="Rechercher un patient..." />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((p, i) => (
            <Card key={i} className="hover:bg-muted/50 cursor-pointer transition-colors">
                <CardContent className="p-4 flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarFallback>{p.name.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <p className="font-medium leading-none">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{p.age} ans • {p.city}</p>
                        <p className="text-xs text-muted-foreground mt-1">Dernier dossier: {p.lastCase}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  )
}
