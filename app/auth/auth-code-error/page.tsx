'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react'
import { Suspense } from 'react'

function AuthCodeErrorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const errorCode = searchParams.get('error_code')
  const errorDescription = searchParams.get('error_description')

  // Messages personnalisés selon le type d'erreur
  const getErrorInfo = () => {
    switch (errorCode) {
      case 'otp_expired':
        return {
          title: 'Lien expiré',
          message:
            'Le lien de confirmation a expiré après 24 heures. Veuillez demander un nouvel email de confirmation.',
          action: 'Demander un nouvel email',
          actionRoute: '/register',
        }
      case 'invalid_grant':
        return {
          title: 'Lien invalide',
          message: 'Le lien de confirmation est invalide ou a déjà été utilisé.',
          action: 'Recommencer',
          actionRoute: '/register',
        }
      case 'access_denied':
        return {
          title: 'Accès refusé',
          message: 'L&apos;authentification a été refusée. Veuillez réessayer.',
          action: 'Recommencer',
          actionRoute: '/login',
        }
      default:
        return {
          title: 'Erreur d&apos;authentification',
          message: errorDescription || 'Une erreur s&apos;est produite lors de la vérification.',
          action: 'Retour',
          actionRoute: '/login',
        }
    }
  }

  const errorInfo = getErrorInfo()

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          {/* Icone */}
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-950">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Titre et description */}
          <div className="text-center">
            <CardTitle className="text-xl">{errorInfo.title}</CardTitle>
            <CardDescription className="mt-3">{errorInfo.message}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Contenu */}
          <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-900 dark:bg-red-950/30">
            <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
              Si le problème persiste, veuillez contacter le support ou réessayer ultérieurement.
            </p>
          </div>

          {/* Boutons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={() => router.push(errorInfo.actionRoute)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {errorInfo.action}
            </Button>

            <Button
              onClick={() => router.push('/login')}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la connexion
            </Button>
          </div>

          {/* Info */}
          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Les liens de confirmation expirent après 24 heures. Vous pouvez demander un nouvel email depuis la page d&apos;inscription.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthCodeErrorPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <AuthCodeErrorContent />
    </Suspense>
  )
}
