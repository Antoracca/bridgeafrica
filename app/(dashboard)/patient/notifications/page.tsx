import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Calendar,
  FileText,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Clock,
  X,
  Settings,
  Filter
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Notifications | MediBridge Africa",
  description: "Consultez vos notifications et alertes.",
}

const notifications = [
  {
    id: 1,
    type: "appointment",
    icon: Calendar,
    color: "blue",
    title: "Rendez-vous confirmé",
    message: "Votre rendez-vous avec Dr. Sarah Koumba est confirmé pour demain à 14h30",
    time: "Il y a 5 minutes",
    read: false
  },
  {
    id: 2,
    type: "document",
    icon: FileText,
    color: "green",
    title: "Nouveau document disponible",
    message: "Vos résultats d'analyse sanguine sont maintenant disponibles dans votre dossier médical",
    time: "Il y a 1 heure",
    read: false
  },
  {
    id: 3,
    type: "message",
    icon: MessageSquare,
    color: "purple",
    title: "Nouveau message",
    message: "Dr. Marc Ondongo a répondu à votre question concernant votre traitement",
    time: "Il y a 3 heures",
    read: false
  },
  {
    id: 4,
    type: "reminder",
    icon: Clock,
    color: "orange",
    title: "Rappel de prise de médicament",
    message: "N'oubliez pas de prendre votre traitement pour l'hypertension (Amlodipine 5mg)",
    time: "Il y a 5 heures",
    read: true
  },
  {
    id: 5,
    type: "alert",
    icon: AlertCircle,
    color: "red",
    title: "Rendez-vous annulé",
    message: "Votre rendez-vous du 25/01 a été annulé. Veuillez reprendre rendez-vous.",
    time: "Hier à 18:30",
    read: true
  },
  {
    id: 6,
    type: "success",
    icon: CheckCircle2,
    color: "green",
    title: "Paiement confirmé",
    message: "Votre paiement de 25 000 FCFA a été reçu avec succès",
    time: "Hier à 10:15",
    read: true
  },
  {
    id: 7,
    type: "appointment",
    icon: Calendar,
    color: "blue",
    title: "Nouveau créneau disponible",
    message: "Dr. Sarah Koumba a ouvert de nouveaux créneaux pour la semaine prochaine",
    time: "Il y a 2 jours",
    read: true
  },
  {
    id: 8,
    type: "document",
    icon: FileText,
    color: "green",
    title: "Ordonnance renouvelée",
    message: "Votre ordonnance pour le traitement du diabète a été renouvelée pour 3 mois",
    time: "Il y a 3 jours",
    read: true
  }
]

const getIconColor = (color: string, read: boolean) => {
  const opacity = read ? "50" : "100"
  const bgOpacity = read ? "50" : "100"

  const colors: Record<string, string> = {
    blue: `text-blue-600/${opacity} bg-blue-${bgOpacity}`,
    green: `text-green-600/${opacity} bg-green-${bgOpacity}`,
    purple: `text-purple-600/${opacity} bg-purple-${bgOpacity}`,
    orange: `text-orange-600/${opacity} bg-orange-${bgOpacity}`,
    red: `text-red-600/${opacity} bg-red-${bgOpacity}`
  }

  return colors[color] || colors.blue
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Notifications
          </h3>
          <p className="text-sm md:text-base text-slate-600 mt-1">
            {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtrer</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Paramètres</span>
          </Button>
        </div>
      </div>
      <Separator className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 h-0.5" />

      {/* Actions rapides */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="sm" className="justify-start sm:justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Tout marquer comme lu
        </Button>
        <Button variant="ghost" size="sm" className="justify-start sm:justify-center text-slate-600 hover:text-slate-700">
          <X className="w-4 h-4 mr-2" />
          Effacer toutes les notifications
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="all" className="text-xs sm:text-sm py-2">
            Toutes
            <Badge variant="secondary" className="ml-2 text-xs">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread" className="text-xs sm:text-sm py-2">
            Non lues
            <Badge variant="secondary" className="ml-2 text-xs">
              {unreadCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="important" className="text-xs sm:text-sm py-2">
            Importantes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon
            return (
              <Card
                key={notification.id}
                className={`transition-all hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-blue-600 bg-blue-50/30' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${
                      notification.read ? 'bg-slate-100' :
                      notification.color === 'blue' ? 'bg-blue-100' :
                      notification.color === 'green' ? 'bg-green-100' :
                      notification.color === 'purple' ? 'bg-purple-100' :
                      notification.color === 'orange' ? 'bg-orange-100' :
                      'bg-red-100'
                    } flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        notification.read ? 'text-slate-400' :
                        notification.color === 'blue' ? 'text-blue-600' :
                        notification.color === 'green' ? 'text-green-600' :
                        notification.color === 'purple' ? 'text-purple-600' :
                        notification.color === 'orange' ? 'text-orange-600' :
                        'text-red-600'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-sm sm:text-base font-semibold ${
                          notification.read ? 'text-slate-700' : 'text-slate-900'
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                        )}
                      </div>
                      <p className={`text-xs sm:text-sm ${
                        notification.read ? 'text-slate-500' : 'text-slate-600'
                      } line-clamp-2`}>
                        {notification.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </span>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2">
                              Marquer comme lu
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-600 hover:text-slate-700 px-2">
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="unread" className="mt-6 space-y-3">
          {notifications.filter(n => !n.read).map((notification) => {
            const Icon = notification.icon
            return (
              <Card
                key={notification.id}
                className="border-l-4 border-l-blue-600 bg-blue-50/30 transition-all hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="flex gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${
                      notification.color === 'blue' ? 'bg-blue-100' :
                      notification.color === 'green' ? 'bg-green-100' :
                      notification.color === 'purple' ? 'bg-purple-100' :
                      notification.color === 'orange' ? 'bg-orange-100' :
                      'bg-red-100'
                    } flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        notification.color === 'blue' ? 'text-blue-600' :
                        notification.color === 'green' ? 'text-green-600' :
                        notification.color === 'purple' ? 'text-purple-600' :
                        notification.color === 'orange' ? 'text-orange-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          {notification.title}
                        </h4>
                        <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </span>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2">
                          Marquer comme lu
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="important" className="mt-6">
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                Aucune notification importante
              </h4>
              <p className="text-sm text-slate-500">
                Les notifications marquées comme importantes apparaîtront ici
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
