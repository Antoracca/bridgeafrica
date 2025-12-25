import { Metadata } from "next"
import Link from "next/link"
import { 
  Activity, 
  FileText, 
  MessageSquare, 
  Plus, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Tableau de bord | MediBridge Africa",
  description: "Vue d'ensemble de vos dossiers médicaux.",
}

export default function PatientDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/patient/dossier/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Dossier
            </Link>
          </Button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dossiers Actifs
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              +1 depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Devis Reçus
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              En attente de validation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              2 non-lus
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prochain RDV
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Jan</div>
            <p className="text-xs text-muted-foreground">
              14:00 - Téléconsultation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* RECENT FILES & ACTIVITY */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Dossiers Récents</CardTitle>
            <CardDescription>
              Vos demandes d&apos;évacuation sanitaire en cours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Item 1 */}
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                    <Activity className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Cardiologie - M. Dupont</p>
                  <p className="text-sm text-muted-foreground">
                    Clinique Agdal, Rabat
                  </p>
                </div>
                <div className="ml-auto font-medium">
                    <Badge variant="default" className="bg-orange-500 hover:bg-orange-600">En étude</Badge>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Ophtalmologie - Mme. Koffi</p>
                  <p className="text-sm text-muted-foreground">
                    Hôpital Cheikh Zaid
                  </p>
                </div>
                <div className="ml-auto font-medium">
                    <Badge variant="outline" className="border-green-600 text-green-600">Terminé</Badge>
                </div>
              </div>

               {/* Item 3 */}
               <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center dark:bg-slate-800">
                    <Clock className="h-5 w-5 text-slate-500" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Brouillon #42</p>
                  <p className="text-sm text-muted-foreground">
                    Créé le 24 Décembre
                  </p>
                </div>
                <div className="ml-auto font-medium">
                    <Badge variant="secondary">Brouillon</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Dernières mises à jour de votre dossier.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Nouveau devis reçu
                    </p>
                    <p className="text-sm text-muted-foreground">
                      La Clinique Agdal a envoyé une estimation pour votre dossier #42.
                    </p>
                    <p className="text-xs text-muted-foreground pt-1">Il y a 2h</p>
                  </div>
                </div>
                <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-orange-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Documents manquants
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Veuillez ajouter le dernier rapport de scanner.
                    </p>
                    <p className="text-xs text-muted-foreground pt-1">Hier</p>
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
