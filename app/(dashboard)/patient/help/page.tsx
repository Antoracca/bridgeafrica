import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Video,
  Search,
  ChevronDown,
  ExternalLink
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Centre d'aide | MediBridge Africa",
  description: "Trouvez des réponses à vos questions et obtenez de l'aide.",
}

const faqs = [
  {
    category: "Compte & Profil",
    questions: [
      {
        question: "Comment modifier mes informations personnelles ?",
        answer: "Allez dans votre profil, cliquez sur 'Modifier' et mettez à jour vos informations. N'oubliez pas de sauvegarder vos modifications."
      },
      {
        question: "Comment changer ma photo de profil ?",
        answer: "Dans votre profil, cliquez sur votre photo actuelle ou sur 'Ajouter une photo', puis sélectionnez une nouvelle image depuis votre appareil (max 5 MB)."
      },
      {
        question: "Comment changer mon mot de passe ?",
        answer: "Allez dans Paramètres > Sécurité, puis cliquez sur 'Changer le mot de passe'. Vous recevrez un email de confirmation."
      }
    ]
  },
  {
    category: "Rendez-vous",
    questions: [
      {
        question: "Comment prendre un rendez-vous ?",
        answer: "Allez dans 'Rendez-vous', cliquez sur 'Nouveau rendez-vous', recherchez un médecin, choisissez un créneau disponible et confirmez."
      },
      {
        question: "Puis-je annuler ou reporter un rendez-vous ?",
        answer: "Oui, vous pouvez annuler jusqu'à 24h avant. Allez dans vos rendez-vous, cliquez sur le rendez-vous concerné et sélectionnez 'Annuler' ou 'Reporter'."
      },
      {
        question: "Comment rejoindre une consultation en ligne ?",
        answer: "15 minutes avant l'heure, un bouton 'Rejoindre la consultation' apparaîtra sur votre rendez-vous. Assurez-vous d'avoir une bonne connexion internet."
      }
    ]
  },
  {
    category: "Dossier Médical",
    questions: [
      {
        question: "Qui peut voir mon dossier médical ?",
        answer: "Seuls les médecins que vous consultez peuvent accéder à votre dossier médical, et uniquement avec votre autorisation."
      },
      {
        question: "Comment ajouter un document à mon dossier ?",
        answer: "Allez dans 'Dossier Médical', cliquez sur 'Ajouter un document', sélectionnez le type de document et uploadez votre fichier."
      },
      {
        question: "Puis-je télécharger mes documents médicaux ?",
        answer: "Oui, vous pouvez télécharger tous vos documents en format PDF depuis votre dossier médical."
      }
    ]
  },
  {
    category: "Paiements",
    questions: [
      {
        question: "Quels moyens de paiement sont acceptés ?",
        answer: "Nous acceptons les cartes bancaires, Mobile Money (Orange, MTN, Moov), et les virements bancaires."
      },
      {
        question: "Les consultations sont-elles remboursées ?",
        answer: "Cela dépend de votre assurance. Contactez votre assureur avec la facture que nous vous envoyons après chaque consultation."
      },
      {
        question: "Comment obtenir une facture ?",
        answer: "Après chaque paiement, une facture est automatiquement envoyée à votre email. Vous pouvez aussi les retrouver dans 'Paiements > Historique'."
      }
    ]
  },
  {
    category: "Sécurité & Confidentialité",
    questions: [
      {
        question: "Mes données sont-elles sécurisées ?",
        answer: "Oui, toutes vos données sont chiffrées et stockées de manière sécurisée. Nous respectons les normes RGPD et HIPAA."
      },
      {
        question: "Puis-je supprimer mon compte ?",
        answer: "Oui, dans Paramètres > Données & Confidentialité, vous pouvez télécharger vos données puis supprimer votre compte. Cette action est irréversible."
      }
    ]
  }
]

export default function HelpPage() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Centre d&apos;aide
        </h3>
        <p className="text-sm md:text-base text-slate-600">
          Trouvez des réponses à vos questions ou contactez notre support
        </p>
      </div>
      <Separator className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 h-0.5" />

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Rechercher dans l'aide..."
              className="pl-10 h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-2 group-hover:bg-blue-100 transition-colors">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-base">Chat en direct</CardTitle>
            <CardDescription className="text-sm">
              Discutez avec notre équipe
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-2 group-hover:bg-green-100 transition-colors">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-base">Email</CardTitle>
            <CardDescription className="text-sm">
              support@medibridge.africa
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-2 group-hover:bg-purple-100 transition-colors">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle className="text-base">Téléphone</CardTitle>
            <CardDescription className="text-sm">
              +241 01 23 45 67
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-2 group-hover:bg-orange-100 transition-colors">
              <Video className="w-6 h-6 text-orange-600" />
            </div>
            <CardTitle className="text-base">Tutoriels vidéo</CardTitle>
            <CardDescription className="text-sm">
              Guides pas à pas
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions fréquentes
          </CardTitle>
          <CardDescription>
            Les réponses aux questions les plus courantes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {faqs.map((category, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                {category.category}
              </h4>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIdx) => (
                  <AccordionItem key={faqIdx} value={`item-${idx}-${faqIdx}`}>
                    <AccordionTrigger className="text-left text-sm md:text-base hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-slate-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Guides & Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <FileText className="w-5 h-5 text-blue-600" />
            Guides et documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-between h-auto py-4 px-4" asChild>
            <a href="#" className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium text-sm md:text-base">Guide de démarrage</div>
                  <div className="text-xs md:text-sm text-slate-500">Premiers pas sur MediBridge</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </Button>

          <Button variant="outline" className="w-full justify-between h-auto py-4 px-4" asChild>
            <a href="#" className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium text-sm md:text-base">Tutoriels vidéo</div>
                  <div className="text-xs md:text-sm text-slate-500">Apprenez en regardant</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </Button>

          <Button variant="outline" className="w-full justify-between h-auto py-4 px-4" asChild>
            <a href="#" className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-sm md:text-base">Centre de ressources</div>
                  <div className="text-xs md:text-sm text-slate-500">Articles et conseils santé</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Besoin d&apos;aide supplémentaire ?</CardTitle>
          <CardDescription>
            Notre équipe de support est disponible 24/7 pour vous aider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            <MessageCircle className="w-4 h-4 mr-2" />
            Contacter le support
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
