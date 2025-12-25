import { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "@/components/forms/RegisterForm"

export const metadata: Metadata = {
  title: "Inscription | MediBridge Africa",
  description: "Créez votre compte patient, médecin ou clinique.",
}

export default function RegisterPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      {/* Bouton Connexion */}
      <Link
        href="/login"
        className="absolute right-4 top-4 z-20 flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-primary hover:bg-muted md:right-8 md:top-8"
      >
        Se connecter
      </Link>

      {/* Colonne GAUCHE : Visuel Immersif */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/0" />
        
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6 text-primary"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          MediBridge Africa
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;La première étape vers la guérison commence ici. 
              Une prise en charge complète, transparente et humaine.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>

      {/* Colonne DROITE : Formulaire */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Créer un compte
            </h1>
            <p className="text-sm text-muted-foreground">
              Sélectionnez votre profil pour commencer.
            </p>
          </div>
          
          <RegisterForm />
          
          <p className="px-8 text-center text-sm text-muted-foreground">
            En cliquant sur continuer, vous acceptez nos{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Conditions de service
            </Link>{" "}
            et notre{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
