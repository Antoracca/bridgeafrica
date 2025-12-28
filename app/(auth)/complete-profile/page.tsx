import { Metadata } from "next"
import { CompleteProfileForm } from "@/components/forms/CompleteProfileForm"
import { Activity } from "lucide-react"
import { BackgroundSlideshow } from "@/components/ui/BackgroundSlideshow"
import { LottieAnimation } from "@/components/ui/LottieAnimation"
import OnlineDoctorAnimation from "@/public/Online Doctor.json"

export const metadata: Metadata = {
  title: "Complétez votre profil | MediBridge Africa",
  description: "Une dernière étape pour finaliser votre inscription.",
}

export default function CompleteProfilePage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <BackgroundSlideshow />
        <div className="relative z-20 flex items-center text-xl font-bold tracking-tight">
          <Activity className="mr-2 h-6 w-6 text-white" />
          MediBridge Africa
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 border-l-2 border-emerald-400 pl-6 backdrop-blur-sm bg-black/10 p-4 rounded-r-lg">
            <p className="text-lg font-medium leading-relaxed">
              &ldquo;Votre sécurité et votre bien-être sont notre priorité absolue. Nous vous accompagnons à chaque étape de votre parcours de soins.&rdquo;
            </p>
            <footer className="text-sm text-emerald-200">L&apos;équipe MediBridge</footer>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8 relative">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[380px] px-4">
          <LottieAnimation animationData={OnlineDoctorAnimation} className="w-56 h-56 mx-auto" loop={false} />
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Une dernière étape
            </h1>
            <p className="text-sm text-muted-foreground">
              Pour personnaliser votre expérience, veuillez compléter votre profil.
            </p>
          </div>
          
          <CompleteProfileForm />
          
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ces informations nous permettent de mieux vous accompagner.
          </p>
        </div>
      </div>
    </div>
  )
}
