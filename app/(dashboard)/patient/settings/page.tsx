import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell, Mail, MessageSquare, Shield, Globe, Palette, Database } from "lucide-react"

export const metadata: Metadata = {
  title: "Paramètres | MediBridge Africa",
  description: "Gérez vos préférences et paramètres de compte.",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Paramètres
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Gérez vos préférences et paramètres de compte
        </p>
      </div>
      <Separator className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 h-0.5" />

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Notifications
          </CardTitle>
          <CardDescription>
            Choisissez comment vous souhaitez être notifié
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Notifications par email</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir les mises à jour par email
              </p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">Notifications SMS</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir les alertes urgentes par SMS
              </p>
            </div>
            <Switch id="sms-notifications" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="whatsapp-notifications">Notifications WhatsApp</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir les mises à jour via WhatsApp
              </p>
            </div>
            <Switch id="whatsapp-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Confidentialité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Confidentialité & Sécurité
          </CardTitle>
          <CardDescription>
            Contrôlez qui peut voir vos informations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="profile-visibility">Profil visible</Label>
              <p className="text-sm text-muted-foreground">
                Les médecins peuvent voir votre profil complet
              </p>
            </div>
            <Switch id="profile-visibility" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="share-medical-history">Partager historique médical</Label>
              <p className="text-sm text-muted-foreground">
                Partager automatiquement votre historique avec les nouveaux médecins
              </p>
            </div>
            <Switch id="share-medical-history" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
              <p className="text-sm text-muted-foreground">
                Ajouter une couche de sécurité supplémentaire (Bientôt)
              </p>
            </div>
            <Switch id="two-factor" disabled />
          </div>
        </CardContent>
      </Card>

      {/* Préférences d'affichage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-600" />
            Apparence
          </CardTitle>
          <CardDescription>
            Personnalisez l'affichage de votre interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Mode sombre</Label>
              <p className="text-sm text-muted-foreground">
                Utiliser le thème sombre (Bientôt)
              </p>
            </div>
            <Switch id="dark-mode" disabled />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact-view">Vue compacte</Label>
              <p className="text-sm text-muted-foreground">
                Afficher plus d'informations sur l'écran (Bientôt)
              </p>
            </div>
            <Switch id="compact-view" disabled />
          </div>
        </CardContent>
      </Card>

      {/* Langue & Région */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Langue & Région
          </CardTitle>
          <CardDescription>
            Configurez votre langue et fuseau horaire
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Langue de l'interface</Label>
            <p className="text-sm text-muted-foreground">Français (FR)</p>
          </div>
          <div className="space-y-2">
            <Label>Fuseau horaire</Label>
            <p className="text-sm text-muted-foreground">GMT+1 (Afrique Centrale)</p>
          </div>
        </CardContent>
      </Card>

      {/* Données */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Database className="w-5 h-5" />
            Données & Confidentialité
          </CardTitle>
          <CardDescription>
            Gérez vos données personnelles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Télécharger mes données
          </Button>
          <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
            Supprimer mon compte
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  )
}
