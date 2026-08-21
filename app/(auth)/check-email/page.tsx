'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEmailVerification } from '@/hooks/use-email-verification'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Mail, CheckCircle2, Info, RefreshCw, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { Progress } from "@/components/ui/progress"

import Link from 'next/link'
import Image from 'next/image'

function CheckEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const { isVerified, isLoading, error, userRole } = useEmailVerification(email)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(45) // Cooldown initial de 45 secondes
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
          description: 'Vérifiez votre boîte de réception et vos spams.',
        })
        setCountdown(45) // Cooldown de 45 secondes
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
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-50/70">
      
      {/* Brand Header */}
      <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
        <div className="relative w-9 h-9 shrink-0">
          <Image 
            src="/FaviconFinal.png" 
            alt="Pont Afrique Santé" 
            fill
            className="object-contain group-hover:scale-105 transition-transform" 
            priority 
          />
        </div>
        <span className="text-xl font-bold tracking-tight font-sans select-none flex items-center">
          <span className="text-[#0284C7]">Pont</span><span className="text-[#141413]">Afrique</span><span className="text-[#CF4500]">Santé</span>
        </span>
      </Link>

      <Card className="w-full max-w-md border border-slate-200/80 shadow-xl bg-white rounded-2xl animate-in fade-in zoom-in duration-300">
        <CardHeader className="space-y-3 pb-2 text-center pt-8">
          <div className="mx-auto bg-blue-50 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-1">
            {isVerified ? (
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            ) : (
              <Mail className="h-8 w-8 text-brand-teal" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">
            {isVerified ? 'Compte vérifié !' : 'Vérifiez votre boîte email'}
          </CardTitle>
          <CardDescription className="text-sm text-slate-600">
            {isVerified 
              ? 'Redirection en cours vers votre espace...' 
              : <>Nous avons envoyé un lien d&apos;activation à :<br/><span className="font-semibold text-slate-900 block mt-1 text-base">{email}</span></>}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 pt-2 pb-8 px-6">
          {!isVerified && (
            <>
              {/* Information discrète et professionnelle */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-left flex items-start gap-2.5">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  Si vous ne trouvez pas l&apos;email dans votre boîte principale, pensez à vérifier votre dossier <strong>Spams</strong> ou <strong>Courriers indésirables</strong>.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                 <Button
                  onClick={handleResendEmail}
                  disabled={isResending || countdown > 0}
                  variant={countdown > 0 ? "secondary" : "default"}
                  className="w-full h-11 relative overflow-hidden transition-all bg-brand-teal hover:bg-brand-teal-dark text-white font-medium rounded-xl shadow-sm"
                >
                  {isResending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi en cours...</>
                  ) : countdown > 0 ? (
                    <span className="flex items-center text-slate-500 font-normal text-xs">
                      <RefreshCw className="mr-2 h-3.5 w-3.5 opacity-50" /> 
                      Renvoyer l&apos;email dans {countdown}s
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" /> Renvoyer un nouvel email
                    </span>
                  )}
                  
                  {countdown > 0 && (
                    <div className="absolute bottom-0 left-0 h-1 bg-brand-teal/30 w-full">
                       <div
                         className="h-full bg-brand-teal transition-all duration-1000 ease-linear"
                         style={{ width: `${(countdown / 45) * 100}%` }}
                       />
                    </div>
                  )}
                </Button>
                
                <Button variant="ghost" className="text-xs text-slate-500 hover:text-slate-900" onClick={() => router.push('/login')}>
                  Retour à la connexion
                </Button>
              </div>
            </>
          )}

          {isVerified && (
             <div className="flex flex-col items-center gap-4 py-4">
                <Loader2 className="h-7 w-7 animate-spin text-brand-teal" />
                <p className="text-sm font-medium text-slate-600">Accès à votre espace patient en cours...</p>
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
