"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  Video,
  CreditCard,
  Plane,
  ArrowRight,
  Activity,
  TrendingUp,
  Bell,
  ChevronRight
} from "lucide-react"

interface User {
  id: string
  email: string | undefined
  user_metadata: {
    full_name?: string
    name?: string
    first_name?: string
    last_name?: string
  }
}

interface Stats {
  total: number
  en_attente: number
  en_cours: number
  termine: number
}

export function MobileDashboard({ user, stats }: { user: User, stats: Stats }) {
  const displayName = user?.user_metadata?.full_name ||
                      user?.user_metadata?.name ||
                      `${user?.user_metadata?.first_name || ''} ${user?.user_metadata?.last_name || ''}`.trim() ||
                      user?.email?.split('@')[0] ||
                      'Utilisateur'

  const firstName = user?.user_metadata?.first_name || displayName.split(' ')[0]

  // Progression simplifiée pour mobile
  const progressPercentage = 75

  return (
    <div className="pb-6 space-y-4">
      {/* Header Mobile */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-4 rounded-2xl shadow-lg">
        <h1 className="text-xl font-bold mb-1">Bonjour {firstName}</h1>
        <p className="text-sm text-blue-100">Voici votre parcours de soins</p>
      </div>

      {/* Stats rapides - Liste compacte */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-2xl font-bold text-slate-900">{stats.total}</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Total Dossiers</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-2xl font-bold text-slate-900">{stats.en_attente}</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">En Attente</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-2xl font-bold text-slate-900">{stats.en_cours}</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">En Cours</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-2xl font-bold text-slate-900">{stats.termine}</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Terminés</p>
          </CardContent>
        </Card>
      </div>

      {/* Parcours actif - Simplifié */}
      <Card className="shadow-lg border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-base font-bold">Parcours Actif</CardTitle>
            <div className="text-right">
              <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
          <CardDescription className="text-blue-100 text-xs">
            Prothèse genou - En cours
          </CardDescription>
          <Progress value={progressPercentage} className="mt-3 bg-blue-300 h-2" />
        </CardHeader>
        <CardContent className="p-4">
          {/* Étapes simplifiées - Seulement les 3 plus importantes */}
          <div className="space-y-3">
            {/* Étape complétée */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-slate-900">Devis accepté</h4>
                <p className="text-xs text-slate-600">Clinique El Manar à Tunis</p>
                <p className="text-xs text-slate-400 mt-1">27 Jan 2025</p>
              </div>
            </div>

            {/* Étape en cours */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 ring-4 ring-blue-200 animate-pulse">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-blue-600">Organisation voyage</h4>
                <p className="text-xs text-slate-600">Vol + Hôtel en cours</p>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mt-2 text-xs">
                  En cours
                </Badge>
              </div>
            </div>

            {/* Prochaine étape */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-slate-400">Arrivée à Tunis</h4>
                <p className="text-xs text-slate-400">Prise en charge aéroport</p>
                <p className="text-xs text-slate-400 mt-1">5 Fév 2025</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4 text-sm" size="sm">
            Voir tout le parcours
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Actions rapides - Grid 2 colonnes */}
      <Card>
        <CardHeader className="p-4 pb-3">
          <CardTitle className="text-base font-bold">Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="h-auto flex-col gap-2 p-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-semibold">Messages</span>
              <Badge className="bg-red-500 text-white text-xs">3</Badge>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-3">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="text-xs font-semibold">RDV</span>
              <Badge className="bg-red-500 text-white text-xs">1</Badge>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-3">
              <Video className="w-5 h-5 text-green-600" />
              <span className="text-xs font-semibold">Téléconsult.</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-3">
              <CreditCard className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-semibold">Paiements</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Voyage - Card compacte */}
      <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <CardHeader className="p-4 pb-3">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            <CardTitle className="text-base font-bold">Votre Voyage</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-xs font-semibold opacity-90 mb-1">Vol</p>
            <p className="text-sm font-bold">Libreville → Tunis</p>
            <p className="text-xs opacity-75 mt-1">5 Février 2025</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-xs font-semibold opacity-90 mb-1">Hébergement</p>
            <p className="text-sm font-bold">Hôtel Mercure Tunis</p>
            <p className="text-xs opacity-75 mt-1">7 nuits</p>
          </div>
        </CardContent>
      </Card>

      {/* Alertes/Notifications */}
      <Card className="border-l-4 border-l-amber-500">
        <CardHeader className="p-4 pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            À faire
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-2">
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm font-semibold text-amber-900">Documents manquants</p>
            <p className="text-xs text-amber-700 mt-1">Passeport + Certificat médical</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-900">Nouveau message</p>
            <p className="text-xs text-blue-700 mt-1">Dr. El Amrani vous a écrit</p>
          </div>
        </CardContent>
      </Card>

      {/* Documents récents */}
      <Card>
        <CardHeader className="p-4 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold">Documents</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              Tous
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-2">
          <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Radiographie genou</p>
              <p className="text-xs text-slate-500">12 Jan 2025</p>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
              Reçu
            </Badge>
          </div>
          <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Devis Clinique</p>
              <p className="text-xs text-slate-500">18 Jan 2025</p>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
              Reçu
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
