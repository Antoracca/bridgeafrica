'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEmailVerification } from '@/hooks/use-email-verification'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Mail, CheckCircle2, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { Progress } from "@/components/ui/progress"

function CheckEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  
  const { isVerified, isLoading, error, userRole } = useEmailVerification(email)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Redirection auto quand vérifié
  useEffect(() => {
    if (isVerified && userRole) {
      let redirectUrl = '/patient'
      if (userRole === 'medecin_referent') redirectUrl = '/medecin'
      else if (userRole === 'clinique') redirectUrl = '/clinique'
      else if (userRole === 'admin') redirectUrl = '/admin'
      
      router.push(`/success?redirect=${redirectUrl}`)
    }
  }, [isVerified, userRole, router])

  // Gestion du timer pour le cooldown manuel
  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown(prev => prev <= 1 ? 0 : prev - 1)
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [countdown])

  const handleResendEmail = async () => {
    if (!email) {
      toast.error('Email manquant')
      return
    }

    setIsResending(true)

    try {
      const response = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast.success('Email envoyé', {
          description: 'Vérifiez votre boîte de réception.',
        })
        setCountdown(35) // Cooldown manuel de 35s
      } else {
        toast.error('Erreur', { description: result.error || 'Impossible de renvoyer' })
      }
    } catch (err) {
      toast.error('Erreur', { description: 'Impossible de renvoyer l\'email' })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/20">
      <Card className="w-full max-w-md border-none shadow-lg animate-in fade-in zoom-in duration-300">
        <CardHeader className="space-y-4 pb-2 text-center">
          <div className="mx-auto bg-blue-50 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-2">
            {isVerified ? (
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            ) : (
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {isVerified ? 'Compte vérifié !' : 'Vérifiez vos emails'}
          </CardTitle>
          <CardDescription className="text-base">
            {isVerified 
              ? 'Redirection en cours...' 
              : <>Nous avons envoyé un lien de confirmation à <br/><span className="font-medium text-foreground">{email}</span></>}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          {!isVerified && (
            <>
              <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-300 text-left">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Instructions :
                </p>
                <ul className="list-disc pl-5 space-y-1 opacity-90 text-xs">
                  <li>Ouvrez l&apos;email reçu de <strong>MediBridge Africa</strong>.</li>
                  <li>Cliquez sur le bouton de confirmation.</li>
                  <li>Cette page se mettra à jour automatiquement.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                 <Button
                  onClick={handleResendEmail}
                  disabled={isResending || countdown > 0}
                  variant={countdown > 0 ? "secondary" : "default"}
                  className="w-full relative overflow-hidden transition-all"
                >
                  {isResending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi en cours...</>
                  ) : countdown > 0 ? (
                    <span className="flex items-center">
                      <RefreshCw className="mr-2 h-4 w-4 opacity-50" /> 
                      Renvoyer dans {countdown}s
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" /> Renvoyer l&apos;email
                    </span>
                  )}
                  
                  {countdown > 0 && (
                    <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
                       <div 
                         className="h-full bg-primary transition-all duration-1000 ease-linear"
                         style={{ width: `${(countdown / 35) * 100}%` }}
                       />
                    </div>
                  )}
                </Button>
                
                <Button variant="ghost" className="text-xs text-muted-foreground hover:text-foreground" onClick={() => router.push('/login')}>
                  Retour à la connexion
                </Button>
              </div>
            </>
          )}

          {isVerified && (
             <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Accès au tableau de bord...</p>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <CheckEmailContent />
    </Suspense>
  )
}
