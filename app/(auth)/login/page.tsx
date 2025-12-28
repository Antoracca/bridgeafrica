import { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/forms/LoginForm"
import { Activity } from "lucide-react"
import { BackgroundSlideshow } from "@/components/ui/BackgroundSlideshow"
import { LottieAnimation } from "@/components/ui/LottieAnimation"
import DoctorAnimation from "@/public/Doctor.json"

export const metadata: Metadata = {
  title: "Connexion | MediBridge Africa",
  description: "Accédez à votre portail médical sécurisé.",
}

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden w-full max-w-full">

      {/* Background médical pour mobile - gradient plus léger */}
      <div className="absolute inset-0 lg:hidden">
        <BackgroundSlideshow />
        {/* Gradient overlay très subtil pour voir clairement les images */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-blue-950/30 to-slate-950/50" />
      </div>

      {/* Logo MediBridge - mobile top */}
      <div className="lg:hidden absolute top-5 left-5 z-30 flex items-center text-white drop-shadow-lg">
        <Activity className="mr-2 h-5 w-5 text-blue-400" />
        <span className="text-base font-bold tracking-tight">MediBridge</span>
      </div>

      <Link
        href="/register"
        className="absolute right-4 top-5 z-30 flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white hover:text-white hover:bg-white/20 backdrop-blur-md border border-white/30 transition-all shadow-lg lg:bg-transparent lg:border-0 lg:text-primary lg:hover:bg-muted lg:right-8 lg:top-8 lg:rounded-lg"
      >
        Créer un compte
      </Link>

      {/* Panneau gauche desktop - inchangé */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <BackgroundSlideshow />
        <div className="relative z-20 flex items-center text-xl font-bold tracking-tight">
          <Activity className="mr-2 h-6 w-6 text-blue-400" />
          MediBridge Africa
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 border-l-2 border-blue-500 pl-6 backdrop-blur-sm bg-black/10 p-4 rounded-r-lg">
            <p className="text-lg font-medium leading-relaxed">
              &ldquo;La santé n&lsquo;a pas de prix, et désormais, elle n&apos;a plus de frontières.
              Accédez aux meilleurs spécialistes internationaux depuis chez vous.&rdquo;
            </p>
            <footer className="text-sm text-blue-200">L&apos;équipe MediBridge</footer>
          </blockquote>
        </div>
      </div>

      {/* Contenu principal - tout sur un écran mobile */}
      <div className="relative z-20 flex h-screen items-center justify-center px-4 py-16 sm:px-6 lg:p-8 lg:min-h-0">
        <div className="w-full max-w-105 mx-auto flex flex-col justify-center space-y-4 lg:space-y-4">

          {/* Animation Lottie - réduite */}
          <LottieAnimation
            animationData={DoctorAnimation}
            className="w-28 h-28 sm:w-32 sm:h-32 lg:w-48 lg:h-48 mx-auto -mb-2 lg:-mb-4"
          />

          {/* Header compact */}
          <div className="flex flex-col space-y-1.5 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-white drop-shadow-lg lg:text-slate-900 lg:dark:text-white lg:drop-shadow-none">
              Bon retour
            </h1>
            <p className="text-sm lg:text-sm text-white/90 drop-shadow lg:text-muted-foreground lg:drop-shadow-none">
              Connectez-vous pour suivre vos demandes
            </p>
          </div>

          {/* Formulaire avec belle carte glassmorphism */}
          <div className="relative backdrop-blur-2xl bg-linear-to-br from-white/95 via-white/90 to-white/95 lg:bg-transparent rounded-3xl lg:rounded-none p-5 sm:p-6 lg:p-0 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] lg:shadow-none border border-white/40 lg:border-0 overflow-hidden">
            {/* Effet brillant sur la carte */}
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-50 lg:hidden" />
            <div className="relative">
              <LoginForm />
            </div>
          </div>

          {/* Footer compact */}
          <p className="text-center text-xs text-white/75 drop-shadow-sm lg:text-muted-foreground lg:drop-shadow-none px-4">
            En continuant, vous acceptez nos{" "}
            <Link href="#" className="underline underline-offset-2 hover:text-white lg:hover:text-primary transition-colors">
              CGU
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
