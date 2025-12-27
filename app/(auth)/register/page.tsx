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
    <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      {/* Mobile only header link */}
      <div className="md:hidden w-full flex justify-end p-4">
        <Link
          href="/login"
          className="text-sm font-medium text-primary hover:underline"
        >
          Déjà un compte ? Se connecter
        </Link>
      </div>

      <Link
        href="/login"
        className="absolute right-4 top-4 z-20 hidden md:flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white md:text-primary hover:bg-white/10 md:hover:bg-muted md:right-8 md:top-8"
      >
        Déjà un compte ? Se connecter
      </Link>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <BackgroundSlideshow />
        <div className="relative z-20 flex items-center text-xl font-bold tracking-tight">
          <Activity className="mr-2 h-6 w-6 text-white" />
          MediBridge Africa
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 border-l-2 border-emerald-400 pl-6 backdrop-blur-sm bg-black/10 p-4 rounded-r-lg">
            <p className="text-lg font-medium leading-relaxed">
              &ldquo;Nous avons simplifié chaque étape du parcours médical pour que vous puissiez vous concentrer sur l'essentiel : votre rétablissement.&rdquo;
            </p>
            <footer className="text-sm text-emerald-200">L&apos;équipe MediBridge</footer>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8 relative">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[380px]">
          <LottieAnimation animationData={OnlineDoctorAnimation} className="w-56 h-56 mx-auto" loop={false} />
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Créer un compte
            </h1>
            <p className="text-sm text-muted-foreground">
              Rejoignez MediBridge en quelques secondes pour accéder aux meilleurs soins.
            </p>
          </div>
          
          <RegisterForm />
          
          <p className="px-8 text-center text-sm text-muted-foreground">
            En cliquant sur s'inscrire, vous acceptez nos{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Conditions Générales
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
