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
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      <Link
        href="/register"
        className="absolute right-4 top-4 z-20 flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white md:text-primary hover:bg-white/10 md:hover:bg-muted md:right-8 md:top-8"
      >
        Créer un compte
      </Link>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <BackgroundSlideshow />
        <div className="relative z-20 flex items-center text-xl font-bold tracking-tight">
          <Activity className="mr-2 h-6 w-6 text-blue-400" />
          MediBridge Africa
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 border-l-2 border-blue-500 pl-6 backdrop-blur-sm bg-black/10 p-4 rounded-r-lg">
            <p className="text-lg font-medium leading-relaxed">
              &ldquo;La santé n'a pas de prix, et désormais, elle n'a plus de frontières. 
              Accédez aux meilleurs spécialistes internationaux depuis chez vous.&rdquo;
            </p>
            <footer className="text-sm text-blue-200">L'équipe MediBridge</footer>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8 relative">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[380px]">
          <LottieAnimation animationData={DoctorAnimation} className="w-48 h-48 mx-auto -mb-4" />
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Bon retour
            </h1>
            <p className="text-sm text-muted-foreground">
              Connectez-vous pour suivre vos demandes d'évacuation.
            </p>
          </div>
          
          <LoginForm />
          
          <p className="px-8 text-center text-sm text-muted-foreground">
            En continuant, vous acceptez nos{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              CGU
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
