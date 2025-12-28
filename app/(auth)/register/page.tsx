import { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "@/components/forms/RegisterForm"
import { Activity } from "lucide-react"
import { BackgroundSlideshow } from "@/components/ui/BackgroundSlideshow"
import { LottieAnimation } from "@/components/ui/LottieAnimation"
import OnlineDoctorAnimation from "@/public/Online Doctor.json"

export const metadata: Metadata = {
  title: "Inscription | MediBridge Africa",
  description: "Rejoignez le réseau d'excellence médicale.",
}

export default function RegisterPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden w-full max-w-full">

      {/* Background médical pour mobile - gradient plus léger */}
      <div className="absolute inset-0 lg:hidden">
        <BackgroundSlideshow />
        {/* Gradient overlay très subtil pour voir clairement les images */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-emerald-950/30 to-slate-950/50" />
      </div>

      {/* Logo MediBridge - mobile top */}
      <div className="lg:hidden absolute top-5 left-5 z-30 flex items-center text-white drop-shadow-lg">
        <Activity className="mr-2 h-5 w-5 text-emerald-400" />
        <span className="text-base font-bold tracking-tight">MediBridge</span>
      </div>

      <Link
        href="/login"
        className="absolute right-4 top-4 z-30 flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white hover:text-white hover:bg-white/20 backdrop-blur-md border border-white/30 transition-all shadow-lg lg:bg-transparent lg:border-0 lg:text-primary lg:hover:bg-muted lg:right-8 lg:top-8 lg:rounded-lg"
      >
        Déjà un compte ?
      </Link>

      {/* Panneau gauche desktop - inchangé */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <BackgroundSlideshow />
        <div className="relative z-20 flex items-center text-xl font-bold tracking-tight">
          <Activity className="mr-2 h-6 w-6 text-white" />
          MediBridge Africa
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 border-l-2 border-emerald-400 pl-6 backdrop-blur-sm bg-black/10 p-4 rounded-r-lg">
            <p className="text-lg font-medium leading-relaxed">
              &ldquo;Nous avons simplifié chaque étape du parcours médical pour que vous puissiez vous concentrer sur l&apos;essentiel : votre rétablissement.&rdquo;
            </p>
            <footer className="text-sm text-emerald-200">L&apos;équipe MediBridge</footer>
          </blockquote>
        </div>
      </div>

      {/* Contenu principal - avec padding pour que la page respire */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-2 py-12 sm:px-4 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-none mx-auto flex flex-col justify-center space-y-3 lg:space-y-4 my-auto lg:max-w-115">

          {/* Animation Lottie - compacte avec espace */}
          <LottieAnimation
            animationData={OnlineDoctorAnimation}
            className="w-24 h-24 lg:w-48 lg:h-48 mx-auto -mb-1 lg:mb-0"
            loop={false}
          />

          {/* Header moderne */}
          <div className="flex flex-col space-y-1 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white drop-shadow-lg lg:text-slate-900 lg:dark:text-white lg:drop-shadow-none">
              Créer un compte
            </h1>
            <p className="text-sm text-white/90 drop-shadow lg:text-muted-foreground lg:drop-shadow-none">
              Rejoignez MediBridge
            </p>
          </div>

          {/* Carte moderne avec glassmorphism élégant */}
          <div className="relative backdrop-blur-xl bg-white/97 lg:bg-transparent rounded-3xl lg:rounded-2xl px-5 py-6 sm:px-6 lg:p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] lg:shadow-xl border-2 border-white/60 lg:border-border overflow-hidden">
            {/* Effet de brillance subtil */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/3 via-transparent to-emerald-500/3 pointer-events-none lg:hidden" />

            {/* Pattern décoratif subtil */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-emerald-500 to-blue-500 rounded-t-3xl lg:hidden" />

            <div className="relative">
              <RegisterForm />
            </div>
          </div>

          {/* Footer - visible sur mobile et desktop */}
          <p className="text-center text-xs text-white/75 drop-shadow-sm lg:text-muted-foreground lg:drop-shadow-none px-4">
            En cliquant sur s&apos;inscrire, vous acceptez nos{" "}
            <Link href="#" className="underline underline-offset-2 hover:text-white lg:hover:text-primary transition-colors">
              Conditions Générales
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
