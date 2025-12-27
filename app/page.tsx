import Link from "next/link"
import Image from "next/image"
import { 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Globe2, 
  Stethoscope, 
  Building2, 
  Phone,
  CheckCircle2,
  Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Déterminer le lien du dashboard selon le rôle
  let dashboardLink = "/login"
  if (user) {
      const role = user.user_metadata?.role
      if (role === 'medecin_referent') dashboardLink = "/medecin"
      else if (role === 'clinique') dashboardLink = "/clinique"
      else dashboardLink = "/patient"
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[128px]" />
      </div>

      {/* --- NAVBAR --- */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020817]/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Activity className="text-white h-6 w-6" />
            </div>
            <span>MediBridge<span className="text-blue-500">.</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="#reseau" className="hover:text-white transition-colors">Notre Réseau</Link>
            <Link href="#temoignages" className="hover:text-white transition-colors">Témoignages</Link>
            <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
                <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6">
                    <Link href={dashboardLink}>
                        Accéder à mon espace
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            ) : (
                <>
                    <Link href="/login" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Se connecter
                    </Link>
                    <Button asChild className="bg-white text-slate-900 hover:bg-slate-200 rounded-full px-6">
                    <Link href="/register">
                        Commencer
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    </Button>
                </>
            )}
          </div>
        </div>
      </header>
{/* ... Reste du composant inchangé ... */}

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-blue-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          La référence de l&apos;évacuation sanitaire digitale
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          L&apos;Excellence Médicale <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-600">
            Sans Frontières
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Connectez-vous instantanément aux meilleures cliniques du Maroc. 
          Une prise en charge complète, du diagnostic au rapatriement, gérée par une technologie de pointe.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20">
            <Link href="/patient/dossier/new">
              Demander une évacuation
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm">
            <Link href="/medecin">
              <Stethoscope className="mr-2 h-5 w-5" />
              Espace Médecin
            </Link>
          </Button>
        </div>

        {/* Hero Image / Visualization */}
        <div className="mt-20 relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm shadow-2xl animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden relative group">
                {/* Abstract UI Representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-8 opacity-50 transform group-hover:scale-105 transition-transform duration-700">
                         <div className="w-48 h-64 bg-white/5 rounded-2xl border border-white/10 p-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 mb-4" />
                            <div className="h-4 w-24 bg-white/10 rounded mb-2" />
                            <div className="h-3 w-32 bg-white/5 rounded" />
                         </div>
                         <div className="w-48 h-64 bg-white/10 rounded-2xl border border-blue-500/30 p-4 mt-12 shadow-2xl shadow-blue-500/10">
                            <div className="w-full h-32 bg-blue-500/10 rounded-lg mb-4 flex items-center justify-center">
                                <Activity className="text-blue-400" />
                            </div>
                            <div className="h-4 w-20 bg-blue-400/20 rounded mb-2" />
                            <div className="h-2 w-full bg-blue-400/10 rounded" />
                         </div>
                         <div className="w-48 h-64 bg-white/5 rounded-2xl border border-white/10 p-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 mb-4" />
                            <div className="h-4 w-24 bg-white/10 rounded mb-2" />
                            <div className="h-3 w-32 bg-white/5 rounded" />
                         </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />
            </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: "Partenaires Cliniques", value: "50+" },
                    { label: "Dossiers Traités", value: "1,200+" },
                    { label: "Temps de Réponse", value: "< 24h" },
                    { label: "Pays Couverts", value: "12" },
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                        <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- BENTO GRID FEATURES --- */}
      <section id="solutions" className="py-24 md:py-32 container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Une plateforme, <span className="text-blue-500">trois univers.</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
                Que vous soyez patient, médecin ou établissement de santé, MediBridge unifie le parcours de soin pour une efficacité maximale.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
            {/* CARD 1: PATIENT */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 md:col-span-2 hover:border-blue-500/50 transition-colors duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="w-8 h-8 -rotate-45" />
                </div>
                <div className="h-full flex flex-col justify-between relative z-10">
                    <div>
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                            <UserIcon className="text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Espace Patient & Famille</h3>
                        <p className="text-slate-400 max-w-md">
                            Créez votre dossier médical complet en quelques clics. Recevez des devis comparatifs, suivez votre demande de visa et organisez votre voyage, le tout depuis une interface rassurante.
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 backdrop-blur-md border border-white/10 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-4">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm font-medium">Devis reçu de Clinique Agdal</span>
                            <span className="ml-auto text-xs text-slate-500">Il y a 2m</span>
                        </div>
                    </div>
                </div>
                {/* Background Glow */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full group-hover:bg-blue-600/30 transition-all" />
            </div>

            {/* CARD 2: MEDECIN */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1221] p-8 hover:border-emerald-500/50 transition-colors duration-500">
                 <div className="h-full flex flex-col justify-between relative z-10">
                    <div>
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                            <Stethoscope className="text-emerald-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Médecins Référents</h3>
                        <p className="text-slate-400">
                            Collaborez avec vos confrères marocains. Suivez l'évolution de vos patients à l'étranger et recevez les comptes-rendus en temps réel.
                        </p>
                    </div>
                    <Button variant="link" className="text-emerald-400 p-0 h-auto justify-start group-hover:gap-4 transition-all">
                        Accéder au portail <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* CARD 3: CLINIQUE */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1221] p-8 hover:border-purple-500/50 transition-colors duration-500">
                <div className="h-full flex flex-col justify-between relative z-10">
                    <div>
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                            <Building2 className="text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Cliniques Partenaires</h3>
                        <p className="text-slate-400">
                            Recevez des dossiers qualifiés et complets. Envoyez vos devis et gérez les admissions internationales sans friction administrative.
                        </p>
                    </div>
                </div>
            </div>

            {/* CARD 4: TECH */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:col-span-2 hover:border-white/20 transition-colors duration-500">
                <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                    <div className="flex-1 z-10">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <ShieldCheck className="text-blue-500" />
                            Sécurité & Conformité
                        </h3>
                        <ul className="space-y-3 text-slate-400">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Données chiffrées de bout en bout</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Serveurs HDS (Hébergement Données Santé)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Conformité RGPD & HIPAA</li>
                        </ul>
                    </div>
                    <div className="flex-1 relative w-full h-full min-h-[200px] bg-slate-950 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl font-mono text-emerald-500 font-bold tracking-widest mb-2">100%</div>
                            <div className="text-xs text-slate-500 uppercase">Secure Transmission</div>
                        </div>
                        {/* Matrix effect lines */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,_transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:20px_20px]" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-slate-950/50">
        <div className="container mx-auto px-6">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Votre parcours, simplifié.</h2>
            </div>
            
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-900 to-transparent hidden md:block -translate-y-1/2" />
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                    {[
                        { title: "Dossier", desc: "Créez votre profil et téléchargez vos documents médicaux.", icon: FileText },
                        { title: "Validation", desc: "Un médecin référent vérifie la complétude du dossier.", icon: Stethoscope },
                        { title: "Devis", desc: "Recevez les propositions des meilleures cliniques.", icon: Building2 },
                        { title: "Départ", desc: "Voyage, Visa et Hospitalisation organisés.", icon: Globe2 },
                    ].map((step, i) => (
                        <div key={i} className="group text-center">
                            <div className="w-16 h-16 mx-auto bg-[#020817] border border-blue-900 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-300">
                                <step.icon className="text-blue-500 w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                            <p className="text-slate-400 text-sm">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-32 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-blue-900/20 to-transparent p-12 rounded-3xl border border-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Prêt à prendre soin de vous ?</h2>
            <p className="text-xl text-slate-300 mb-10 relative z-10">
                Rejoignez les milliers de patients qui ont choisi l'excellence médicale sans frontières.
            </p>
            <Button asChild size="lg" className="h-14 px-10 rounded-full text-lg bg-white text-blue-950 hover:bg-slate-100 relative z-10">
                <Link href="/register">
                    Créer mon compte gratuitement
                </Link>
            </Button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-[#010409] pt-20 pb-10">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 font-bold text-2xl mb-6">
                        <Activity className="text-blue-500 h-6 w-6" />
                        MediBridge.
                    </div>
                    <p className="text-slate-400 max-w-sm">
                        La première plateforme digitale connectant les patients d'Afrique subsaharienne aux centres d'excellence médicale du Maroc.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-lg">Plateforme</h4>
                    <ul className="space-y-4 text-slate-400">
                        <li><Link href="/patient" className="hover:text-blue-400 transition-colors">Patients</Link></li>
                        <li><Link href="/medecin" className="hover:text-blue-400 transition-colors">Médecins</Link></li>
                        <li><Link href="/clinique" className="hover:text-blue-400 transition-colors">Cliniques</Link></li>
                        <li><Link href="/login" className="hover:text-blue-400 transition-colors">Connexion</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-lg">Contact</h4>
                    <ul className="space-y-4 text-slate-400">
                        <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +212 5 22 00 00 00</li>
                        <li className="flex items-center gap-2"><Globe2 className="w-4 h-4" /> Rabat, Maroc</li>
                        <li>support@medibridge.africa</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                <p>© 2025 MediBridge Africa. Tous droits réservés.</p>
                <div className="flex gap-6">
                    <Link href="#" className="hover:text-white">Confidentialité</Link>
                    <Link href="#" className="hover:text-white">CGU</Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  )
}

// Icon helper component only used here
function FileText(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}

function UserIcon(props: any) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
}
