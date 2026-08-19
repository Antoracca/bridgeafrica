import { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "@/components/forms/RegisterForm"
import { Activity } from "lucide-react"
import { BackgroundSlideshow } from "@/components/ui/BackgroundSlideshow"
import { LottieAnimation } from "@/components/ui/LottieAnimation"
import OnlineDoctorAnimation from "@/public/Online Doctor.json"

export const metadata: Metadata = {
  title: "Inscription | Pont Afrique Santé",
  description: "Rejoignez le réseau d'excellence médicale.",
}

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-white lg:bg-slate-50 w-full max-w-full">

      {/* Logo Pont Afrique Santé - mobile top */}
      <div className="lg:hidden absolute top-6 left-6 z-30 flex items-center text-slate-900">
        <Activity className="mr-2 h-5 w-5 text-brand-teal" />
        <span className="text-base font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>Pont Afrique Santé</span>
      </div>

      <Link
        href="/login"
        className="absolute right-4 top-4 z-30 flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all lg:bg-white lg:border lg:border-slate-200 lg:right-8 lg:top-8 lg:shadow-sm"
      >
        Déjà un compte ?
      </Link>

      {/* Panneau gauche desktop - inchangé */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <BackgroundSlideshow />
        <div className="relative z-20 flex items-center text-xl font-bold tracking-tight">
          <Activity className="mr-2 h-6 w-6 text-white" />
          Pont Afrique Santé
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 border-l-2 border-emerald-400 pl-6 backdrop-blur-sm bg-black/10 p-4 rounded-r-lg">
            <p className="text-lg font-medium leading-relaxed">
              &ldquo;Nous avons simplifié chaque étape du parcours médical pour que vous puissiez vous concentrer sur l&apos;essentiel : votre rétablissement.&rdquo;
            </p>
            <footer className="text-sm text-emerald-200">L&apos;équipe Pont Afrique Santé</footer>
          </blockquote>
        </div>
      </div>

      {/* Contenu principal - avec padding pour que la page respire */}
      <div className="relative z-20 flex min-h-screen lg:min-h-0 h-full items-center justify-center px-4 pt-20 pb-8 sm:px-6 lg:p-8 overflow-y-auto lg:bg-white">
        <div className="w-full max-w-[420px] mx-auto flex flex-col justify-center space-y-4 my-auto">

          {/* Animation Lottie - conservée comme demandé, légèrement resserrée */}
          <LottieAnimation
            animationData={OnlineDoctorAnimation}
            className="w-24 h-24 sm:w-28 sm:h-28 mx-auto -mb-2"
            loop={false}
          />

          {/* Header moderne et strict */}
          <div className="flex flex-col space-y-2 text-center mb-4">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
              Créer un compte
            </h1>
            <p className="text-sm text-slate-500 font-light">
              Rejoignez l'écosystème Pont Afrique Santé
            </p>
          </div>

          {/* Carte ultra épurée, sans bordure visible ni ombres grossières */}
          <div className="relative bg-white rounded-none px-2 py-4 sm:px-4 lg:p-6 w-full">
            <div className="relative">
              <RegisterForm />
            </div>
          </div>

          {/* Footer ultra minimaliste */}
          <p className="text-center text-[11px] text-slate-400 px-4 mt-6">
            En cliquant sur s'inscrire, vous acceptez nos{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-slate-900 transition-colors">
              Conditions Générales
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
