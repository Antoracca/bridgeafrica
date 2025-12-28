'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

function ConfirmationContent() {
  const [countdown, setCountdown] = useState(5)
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirectPath = searchParams.get('redirect') || '/patient'

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push(redirectPath)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [redirectPath, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600 animate-in zoom-in duration-500" />
          </div>
          
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Email confirmé avec succès!
          </h1>
          
          <p className="mb-6 text-gray-600">
            Votre compte a été activé. Vous allez être redirigé automatiquement.
          </p>
          
          <div className="mb-6 flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <span className="text-sm text-gray-600">
              Redirection dans {countdown} secondes...
            </span>
          </div>
          
          <button
            onClick={() => router.push(redirectPath)}
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            Cliquez ici si vous n&apos;êtes pas redirigé automatiquement
          </button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}