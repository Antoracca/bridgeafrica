'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { LottieAnimation } from '@/components/ui/LottieAnimation'
import SuccessAnimation from '@/public/success.json'

function SuccessPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('redirect') || '/patient'
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      router.push(redirectPath)
    }
  }, [countdown, router, redirectPath])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4 max-w-lg w-full flex flex-col items-center">
        
        {/* Animation Lottie */}
        <div className="w-48 h-48 md:w-64 md:h-64 mb-6">
          <LottieAnimation 
            animationData={SuccessAnimation} 
            loop={false} 
            className="w-full h-full" 
          />
        </div>

        {/* Titre & Description */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Bienvenue sur MediBridge
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-sm mx-auto leading-relaxed">
            Votre inscription est confirmée. Votre espace santé est prêt.
          </p>
        </div>

        {/* Action & Timer */}
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <Button 
            onClick={() => router.push(redirectPath)} 
            className="w-full h-12 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            Accéder à mon espace <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <p className="text-xs text-muted-foreground font-medium animate-pulse">
            Redirection automatique dans {countdown}s
          </p>
        </div>

      </div>

      {/* Footer discret */}
      <div className="absolute bottom-8 text-center text-xs text-muted-foreground opacity-50">
        MediBridge Africa &copy; {new Date().getFullYear()}
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Chargement...</div>}>
      <SuccessPageContent />
    </Suspense>
  )
}