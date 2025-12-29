'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from "@/lib/supabase/client"
import { MedicalCaseForm } from "@/components/forms/MedicalCaseForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Loader2,
  FileText,
  Calendar,
  Plane,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Upload,
  MessageSquare,
  Video,
  CreditCard,
  ClipboardList,
  FileDigit,
  Construction,
  ArrowRight,
  Activity,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3
} from "lucide-react"

// Types
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

// Development Placeholder Component
function DevelopmentPlaceholder({
  icon: Icon,
  title,
  description
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8">
      <Card className="max-w-2xl w-full border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardContent className="p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Icon className="w-10 h-10 text-blue-600" />
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-slate-900">{title}</h3>
            <p className="text-slate-600 text-lg leading-relaxed">{description}</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
            <div className="flex items-center justify-center gap-3 text-blue-700">
              <Construction className="w-5 h-5" />
              <p className="font-semibold">Section en cours de développement</p>
            </div>
            <p className="text-sm text-blue-600 mt-2">
              Cette fonctionnalité sera bientôt disponible. Nous travaillons activement pour vous offrir la meilleure expérience possible.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main Dashboard Content Component
function DashboardContent({ user, stats }: { user: User, stats: Stats }) {
  const displayName = user?.user_metadata?.full_name ||
                      user?.user_metadata?.name ||
                      `${user?.user_metadata?.first_name || ''} ${user?.user_metadata?.last_name || ''}`.trim() ||
                      user?.email?.split('@')[0] ||
                      'Utilisateur'

  // Realistic journey timeline - 12 steps instead of 3
  const journeySteps = [
    {
      id: 1,
      date: "12 Janvier 2025",
      title: "Dossier médical créé",
      description: "Envoi de vos documents médicaux (radiographies, IRM du genou gauche)",
      status: "completed",
      time: "14:30"
    },
    {
      id: 2,
      date: "14 Janvier 2025",
      title: "Analyse par notre équipe",
      description: "Révision de votre dossier par le Dr. Amara (coordinateur médical)",
      status: "completed",
      time: "10:15"
    },
    {
      id: 3,
      date: "16 Janvier 2025",
      title: "Transmission aux cliniques partenaires",
      description: "3 cliniques en Tunisie ont reçu votre dossier",
      status: "completed",
      time: "09:00"
    },
    {
      id: 4,
      date: "18 Janvier 2025",
      title: "Réception des devis",
      description: "2 devis détaillés reçus (Clinique El Manar & Polyclinique Internationale)",
      status: "completed",
      time: "16:45"
    },
    {
      id: 5,
      date: "20 Janvier 2025",
      title: "Téléconsultation planifiée",
      description: "RDV vidéo avec le Dr. Fatima El Amrani le 25 Janvier à 15h00 (GMT+1)",
      status: "completed",
      time: "11:20"
    },
    {
      id: 6,
      date: "25 Janvier 2025",
      title: "Téléconsultation effectuée",
      description: "Discussion détaillée sur la prothèse du genou - Durée: 45 minutes",
      status: "completed",
      time: "15:00"
    },
    {
      id: 7,
      date: "27 Janvier 2025",
      title: "Sélection de la clinique",
      description: "Vous avez choisi la Clinique El Manar à Tunis",
      status: "completed",
      time: "18:30"
    },
    {
      id: 8,
      date: "29 Janvier 2025",
      title: "Paiement de l'acompte",
      description: "Acompte de 2 500€ reçu (30% du montant total)",
      status: "completed",
      time: "12:00"
    },
    {
      id: 9,
      date: "30 Janvier 2025",
      title: "Organisation du voyage",
      description: "Réservation vol Libreville → Tunis + Hôtel Mercure Tunis (7 nuits)",
      status: "in_progress",
      time: "En cours"
    },
    {
      id: 10,
      date: "5 Février 2025",
      title: "Arrivée à Tunis",
      description: "Prise en charge à l'aéroport par notre chauffeur + Installation à l'hôtel",
      status: "upcoming",
      time: "Prévu 09:00"
    },
    {
      id: 11,
      date: "6 Février 2025",
      title: "Consultation pré-opératoire",
      description: "Examens complémentaires + rencontre avec l'équipe chirurgicale",
      status: "upcoming",
      time: "Prévu 10:00"
    },
    {
      id: 12,
      date: "7 Février 2025",
      title: "Intervention chirurgicale",
      description: "Prothèse totale du genou gauche - Dr. Fatima El Amrani",
      status: "upcoming",
      time: "Prévu 08:00"
    },
  ]

  const currentStep = journeySteps.findIndex(step => step.status === 'in_progress') + 1
  const progressPercentage = ((currentStep - 1) / journeySteps.length) * 100

  // Documents with realistic statuses
  const documents = [
    { id: 1, name: "Radiographie genou gauche", type: "Image médicale", date: "12 Jan 2025", status: "Reçu", icon: FileText },
    { id: 2, name: "IRM complète", type: "Image médicale", date: "12 Jan 2025", status: "Reçu", icon: FileText },
    { id: 3, name: "Devis Clinique El Manar", type: "Document financier", date: "18 Jan 2025", status: "Reçu", icon: FileText },
    { id: 4, name: "Passeport (copie)", type: "Document d'identité", date: "27 Jan 2025", status: "En attente", icon: AlertCircle },
    { id: 5, name: "Certificat médical voyage", type: "Document médical", date: "30 Jan 2025", status: "En attente", icon: Clock },
  ]

  // Sparkline micro-graph component
  const Sparkline = ({ data, color = "blue" }: { data: number[], color?: string }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - ((value - min) / range) * 100
      return `${x},${y}`
    }).join(' ')

    return (
      <svg viewBox="0 0 100 100" className="w-full h-12" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={`var(--${color}-600)`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-${color}-600`}
        />
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">
            Bonjour, {displayName}
          </h1>
          <p className="text-slate-600 text-lg">
            Voici un aperçu de votre parcours de soins en cours
          </p>
        </div>

        {/* Stats Grid with Sparklines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-600 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                Total Dossiers
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-slate-900">{stats.total}</CardTitle>
            </CardHeader>
            <CardContent>
              <Sparkline data={[2, 3, 2, 4, 3, 5, 4]} color="blue" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                En Attente
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-slate-900">{stats.en_attente}</CardTitle>
            </CardHeader>
            <CardContent>
              <Sparkline data={[1, 2, 1, 2, 1, 1, 1]} color="amber" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-600 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                En Cours
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-slate-900">{stats.en_cours}</CardTitle>
            </CardHeader>
            <CardContent>
              <Sparkline data={[1, 1, 2, 2, 3, 3, 3]} color="purple" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-600 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Terminés
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-slate-900">{stats.termine}</CardTitle>
            </CardHeader>
            <CardContent>
              <Sparkline data={[0, 1, 1, 2, 2, 3, 4]} color="green" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Journey Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Parcours de Soins Actif */}
            <Card className="shadow-xl border-2 border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold">Parcours de Soins Actif</CardTitle>
                    <CardDescription className="text-blue-100 mt-1">
                      Prothèse totale du genou - Jean-Pierre Kengue, 52 ans
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-100">Progression</p>
                    <p className="text-3xl font-bold">{Math.round(progressPercentage)}%</p>
                  </div>
                </div>
                <Progress value={progressPercentage} className="mt-4 bg-blue-300 h-2" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {journeySteps.map((step, index) => (
                    <div key={step.id} className="relative">
                      {/* Connecting line */}
                      {index < journeySteps.length - 1 && (
                        <div className={`absolute left-4 top-10 w-0.5 h-16 ${
                          step.status === 'completed' ? 'bg-green-600' :
                          step.status === 'in_progress' ? 'bg-blue-600' :
                          'bg-slate-200'
                        }`} />
                      )}

                      <div className="flex gap-4">
                        {/* Icon */}
                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.status === 'completed' ? 'bg-green-600' :
                          step.status === 'in_progress' ? 'bg-blue-600 ring-4 ring-blue-200 animate-pulse' :
                          'bg-slate-200'
                        }`}>
                          {step.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-white" />}
                          {step.status === 'in_progress' && <Clock className="w-5 h-5 text-white" />}
                          {step.status === 'upcoming' && <div className="w-3 h-3 rounded-full bg-white" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-xs text-slate-500 mb-1">{step.date} • {step.time}</p>
                              <h4 className={`font-bold mb-1 ${
                                step.status === 'completed' ? 'text-slate-900' :
                                step.status === 'in_progress' ? 'text-blue-600' :
                                'text-slate-400'
                              }`}>
                                {step.title}
                              </h4>
                              <p className={`text-sm ${
                                step.status === 'completed' ? 'text-slate-600' :
                                step.status === 'in_progress' ? 'text-slate-700' :
                                'text-slate-400'
                              }`}>
                                {step.description}
                              </p>
                            </div>

                            {step.status === 'completed' && (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                Terminé
                              </Badge>
                            )}
                            {step.status === 'in_progress' && (
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 animate-pulse">
                                En cours
                              </Badge>
                            )}
                            {step.status === 'upcoming' && (
                              <Badge variant="outline" className="text-slate-400 border-slate-300">
                                À venir
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">Documents</CardTitle>
                    <CardDescription>Gérez vos documents médicaux et administratifs</CardDescription>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          doc.status === 'Reçu' ? 'bg-green-100' : 'bg-amber-100'
                        }`}>
                          <doc.icon className={`w-5 h-5 ${
                            doc.status === 'Reçu' ? 'text-green-600' : 'text-amber-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{doc.name}</p>
                          <p className="text-xs text-slate-500">{doc.type} • {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={doc.status === 'Reçu' ? 'default' : 'secondary'} className={
                          doc.status === 'Reçu' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                        }>
                          {doc.status}
                        </Badge>
                        {doc.status === 'Reçu' && (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-all">
                  <MessageSquare className="w-6 h-6" />
                  <span className="text-xs font-semibold">Messages</span>
                  <Badge className="bg-red-500 text-white text-xs">3</Badge>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-purple-50 hover:border-purple-600 hover:text-purple-600 transition-all">
                  <Calendar className="w-6 h-6" />
                  <span className="text-xs font-semibold">RDV</span>
                  <Badge className="bg-red-500 text-white text-xs">1</Badge>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-green-50 hover:border-green-600 hover:text-green-600 transition-all">
                  <Video className="w-6 h-6" />
                  <span className="text-xs font-semibold">Téléconsult.</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-amber-50 hover:border-amber-600 hover:text-amber-600 transition-all">
                  <CreditCard className="w-6 h-6" />
                  <span className="text-xs font-semibold">Paiements</span>
                </Button>
              </CardContent>
            </Card>

            {/* Voyage & Logistique */}
            <Card className="shadow-lg bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Plane className="w-6 h-6" />
                  <CardTitle className="text-xl font-bold">Voyage & Logistique</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold opacity-90">Vol</p>
                  <p className="text-lg font-bold">Libreville → Tunis</p>
                  <p className="text-sm opacity-75">5 Février 2025 • 09:00</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold opacity-90">Hébergement</p>
                  <p className="text-lg font-bold">Hôtel Mercure Tunis</p>
                  <p className="text-sm opacity-75">7 nuits • Chambre Premium</p>
                </div>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  Voir les détails
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="shadow-lg border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm font-semibold text-amber-900">Documents manquants</p>
                  <p className="text-xs text-amber-700 mt-1">Merci d'envoyer votre passeport et certificat médical</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900">Nouveau message</p>
                  <p className="text-xs text-blue-700 mt-1">Le Dr. El Amrani vous a envoyé un message</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-green-900">Paiement confirmé</p>
                  <p className="text-xs text-green-700 mt-1">Acompte de 2 500€ reçu avec succès</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Router Component
export function PatientDashboardRouter() {
  const searchParams = useSearchParams()
  const view = searchParams.get('view') || 'dashboard'

  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stats>({ total: 0, en_attente: 0, en_cours: 0, termine: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const supabase = createClient()
        const { data: { user: currentUser } } = await supabase.auth.getUser()

        if (currentUser) {
          setUser(currentUser as User)

          // Fetch detailed stats from medical_cases table
          const { count: total } = await supabase
            .from('medical_cases')
            .select('*', { count: 'exact', head: true })
            .eq('patient_id', currentUser.id)

          const { count: en_attente } = await supabase
            .from('medical_cases')
            .select('*', { count: 'exact', head: true })
            .eq('patient_id', currentUser.id)
            .eq('status', 'submitted')

          const { count: en_cours } = await supabase
            .from('medical_cases')
            .select('*', { count: 'exact', head: true })
            .eq('patient_id', currentUser.id)
            .in('status', ['in_review', 'matched', 'confirmed'])

          const { count: termine } = await supabase
            .from('medical_cases')
            .select('*', { count: 'exact', head: true })
            .eq('patient_id', currentUser.id)
            .eq('status', 'completed')

          setStats({
            total: total || 0,
            en_attente: en_attente || 0,
            en_cours: en_cours || 0,
            termine: termine || 0,
          })
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600">Erreur de chargement</p>
      </div>
    )
  }

  // Route based on view parameter
  switch (view) {
    case 'new':
      return <MedicalCaseForm />

    case 'messages':
      return (
        <DevelopmentPlaceholder
          icon={MessageSquare}
          title="Messagerie Sécurisée"
          description="Communiquez en toute sécurité avec vos médecins, coordinateurs et l'équipe MediBridge. Toutes vos conversations sont chiffrées et confidentielles."
        />
      )

    case 'rdv':
      return (
        <DevelopmentPlaceholder
          icon={Calendar}
          title="Gestion des Rendez-vous"
          description="Consultez et gérez tous vos rendez-vous médicaux : téléconsultations, consultations pré-opératoires, suivis post-opératoires. Recevez des rappels automatiques."
        />
      )

    case 'documents':
      return (
        <DevelopmentPlaceholder
          icon={FileDigit}
          title="Documents Partagés"
          description="Accédez à tous vos documents médicaux partagés : résultats d'examens, comptes-rendus opératoires, prescriptions. Téléchargez et partagez en toute sécurité."
        />
      )

    case 'finances':
      return (
        <DevelopmentPlaceholder
          icon={CreditCard}
          title="Factures & Paiements"
          description="Consultez l'historique de vos paiements, téléchargez vos factures, suivez les remboursements de votre assurance. Paiements sécurisés en plusieurs devises."
        />
      )

    case 'voyage':
      return (
        <DevelopmentPlaceholder
          icon={Plane}
          title="Organisation du Voyage"
          description="Gérez tous les aspects de votre voyage médical : réservations de vol, hébergement, transferts aéroport, visa médical. Notre équipe s'occupe de tout."
        />
      )

    case 'teleconsultation':
      return (
        <DevelopmentPlaceholder
          icon={Video}
          title="Téléconsultation"
          description="Rejoignez vos consultations vidéo avec vos médecins depuis n'importe où. Connexion sécurisée, qualité HD, enregistrement disponible (avec votre accord)."
        />
      )

    case 'historique':
      return (
        <DevelopmentPlaceholder
          icon={ClipboardList}
          title="Historique Médical Complet"
          description="Consultez votre dossier médical complet : antécédents, allergies, traitements en cours, vaccinations. Exportez au format PDF pour vos médecins."
        />
      )

    case 'dossiers':
      return (
        <DevelopmentPlaceholder
          icon={FileText}
          title="Mes Dossiers Médicaux"
          description="Consultez tous vos dossiers médicaux en cours et archivés. Suivez l'évolution de chaque dossier avec un historique détaillé."
        />
      )

    case 'dashboard':
    default:
      return <DashboardContent user={user} stats={stats} />
  }
}
