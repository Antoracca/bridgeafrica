"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  Globe2,
  MapPin,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Award,
  Star
} from "lucide-react";

import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Button } from "@/components/ui/button";

type Clinic = {
  name: string;
  city: string;
  country: string;
  logoDomain: string;
  category: string;
  summary: string;
  facts: string[];
  website: string;
  source: string;
};

type CountrySection = {
  id: string;
  name: string;
  code: string;
  title: string;
  subtitleEn: string;
  context: string;
  heroImage: string;
  clinics: Clinic[];
};

const countrySections: CountrySection[] = [
  {
    id: "maroc",
    name: "Maroc",
    code: "ma",
    title: "Le Hub d'Excellence Africain",
    subtitleEn: "Premium Medical Hub in Africa",
    context:
      "Une sélection d'établissements de pointe à Casablanca, Rabat, Marrakech et Fès. Des soins de standards internationaux, accessibles et de très haute qualité.",
    heroImage:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=2000",
    clinics: [
      {
        name: "Hôpital Universitaire International Cheikh Khalifa",
        city: "Casablanca",
        country: "Maroc",
        logoDomain: "hck.ma",
        category: "Hôpital universitaire",
        summary:
          "Établissement pluridisciplinaire d'envergure avec parcours patient dédié pour l'international.",
        facts: [
          "Pôles d'excellence multidisciplinaires.",
          "Plateforme de prise en charge instantanée.",
        ],
        website: "https://www.hck.ma/fr/",
        source: "https://www.hck.ma/fr/",
      },
      {
        name: "Hôpital Universitaire International Cheikh Zaid",
        city: "Rabat",
        country: "Maroc",
        logoDomain: "hcz.ma",
        category: "Hôpital universitaire",
        summary:
          "Institution de référence à Rabat avec services médicaux et chirurgicaux avancés.",
        facts: [
          "Institution médicale de prestige (1998).",
          "Haute technologie et sécurité patient.",
        ],
        website: "https://www.hcz.ma/hopital/",
        source: "https://www.hcz.ma/hopital/",
      },
      {
        name: "CHU Mohammed VI",
        city: "Marrakech",
        country: "Maroc",
        logoDomain: "chumarrakech.ma",
        category: "CHU public",
        summary:
          "Unité hospitalo-universitaire leader couvrant la région Marrakech-Safi.",
        facts: [
          "Volume d'expertise massif (centaines de milliers de patients).",
          "Recherche et innovation médicale.",
        ],
        website: "https://www.chumarrakech.ma/",
        source: "https://www.chumarrakech.ma/",
      },
    ],
  },
  {
    id: "france",
    name: "France",
    code: "fr",
    title: "L'Élite Médicale Européenne",
    subtitleEn: "World-class European Healthcare",
    context:
      "Le summum de la recherche et du soin. Accédez aux centres de référence mondiaux à Paris et sa région, réputés pour les cas les plus complexes.",
    heroImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=2000",
    clinics: [
      {
        name: "Hôpital Européen Georges-Pompidou (AP-HP)",
        city: "Paris",
        country: "France",
        logoDomain: "aphp.fr",
        category: "Hôpital public (AP-HP)",
        summary:
          "Fleuron de l'AP-HP avec des unités majeures en cardiologie, traumatologie et oncologie.",
        facts: [
          "Technologies de pointe et robotique.",
          "Leadership européen en recherche clinique.",
        ],
        website: "https://www.aphp.fr/hopitaux/hopital-europeen-georges-pompidou-hegp",
        source: "https://www.aphp.fr/hopitaux/hopital-europeen-georges-pompidou-hegp",
      },
      {
        name: "Gustave Roussy",
        city: "Villejuif",
        country: "France",
        logoDomain: "gustaveroussy.fr",
        category: "Institut de Cancérologie",
        summary:
          "1er centre européen de lutte contre le cancer. L'expertise absolue en oncologie et essais cliniques.",
        facts: [
          "1er centre européen d'oncologie.",
          "3200 professionnels mobilisés contre le cancer.",
        ],
        website: "https://www.gustaveroussy.fr/en",
        source: "https://www.gustaveroussy.fr/en",
      },
      {
        name: "American Hospital of Paris",
        city: "Neuilly-sur-Seine",
        country: "France",
        logoDomain: "american-hospital.org",
        category: "Hôpital Privé Premium",
        summary:
          "L'excellence franco-américaine. Une institution internationale multi-spécialités offrant une prise en charge VIP.",
        facts: [
          "Double accréditation JCI et HAS.",
          "Parcours VIP et conciergerie multilingue.",
        ],
        website: "https://www.american-hospital.org/en/about-us",
        source: "https://www.american-hospital.org/en/about-us",
      },
    ],
  },
  {
    id: "turquie",
    name: "Turquie",
    code: "tr",
    title: "La Puissance Technologique",
    subtitleEn: "Global Medical Tourism Pioneer",
    context:
      "Des infrastructures privées gigantesques et ultramodernes, combinant luxe, technologie de pointe et tarifs hautement compétitifs.",
    heroImage:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&q=80&w=2000",
    clinics: [
      {
        name: "Acibadem Maslak Hospital",
        city: "Istanbul",
        country: "Turquie",
        logoDomain: "acibadem.com.tr",
        category: "Groupe Hospitalier Privé",
        summary:
          "Le joyau technologique du groupe Acibadem, pensé spécifiquement pour l'excellence et les patients internationaux.",
        facts: [
          "106 000 m² d'infrastructures ultra-modernes.",
          "Accréditation internationale JCI.",
        ],
        website: "https://www.acibademinternational.com/hospital/maslak/",
        source: "https://www.acibademinternational.com/hospital/maslak/",
      },
      {
        name: "Memorial Şişli Hospital",
        city: "Istanbul",
        country: "Turquie",
        logoDomain: "memorial.com.tr",
        category: "Hôpital Privé",
        summary:
          "Le berceau de la qualité médicale turque. Spécialités chirurgicales lourdes et greffes.",
        facts: [
          "L'un des pionniers historiques (2000).",
          "Premier hôpital de Turquie certifié JCI.",
        ],
        website: "https://www.memorial.com.tr/en/hospitals/memorial-sisli-hospital",
        source: "https://www.memorial.com.tr/en/hospitals/memorial-sisli-hospital",
      },
      {
        name: "LIV Hospital Ulus",
        city: "Istanbul",
        country: "Turquie",
        logoDomain: "livhospital.com",
        category: "Hôpital Privé Premium",
        summary:
          "LIV (Leading International Vision) : la référence luxueuse et ultra-technologique de la médecine turque personnalisée.",
        facts: [
          "Label Center of Excellence dans de multiples spécialités.",
          "Approche sur-mesure pour patients internationaux.",
        ],
        website: "https://www.livhospital.com/en/liv-hospital-ulus",
        source: "https://www.livhospital.com/en/liv-hospital-ulus",
      },
    ],
  },
];

function CountryBlock({ section, index }: { section: CountrySection; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <section id={section.id} className="scroll-mt-32 w-full max-w-7xl mx-auto py-16">
      <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>

        {/* Immersive Image */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-5/12"
        >
          <div className="relative h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-blue-600/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <Image
              src={section.heroImage}
              alt={section.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />

            <div className="absolute bottom-8 left-8 z-20">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full font-bold shadow-lg w-fit">
                <Image src={`https://flagcdn.com/w40/${section.code}.png`} width={20} height={15} alt="flag" className="rounded-sm" />
                {section.name}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-7/12"
        >
          <div className="flex items-center gap-2 text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">
            <Award size={18} /> {section.subtitleEn}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            {section.title}
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-8">
            {section.context}
          </p>

          <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 font-semibold text-blue-800 border border-blue-100">
              <Building2 className="text-blue-500" size={18} /> {section.clinics.length} Premium Clinics
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 font-semibold text-emerald-800 border border-emerald-100">
              <ShieldCheck className="text-emerald-500" size={18} /> Verified Excellence
            </span>
          </div>
        </motion.div>
      </div>

      {/* Clinics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {section.clinics.map((clinic, idx) => (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            key={`${section.id}-${clinic.name}`}
            className="group relative flex flex-col rounded-[2rem] bg-white border border-slate-200/60 shadow-lg shadow-slate-200/30 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            {/* Top Banner & Logo */}
            <div className="h-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative p-6">
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-wider font-bold py-1 px-3 rounded-full">
                {clinic.category}
              </div>

              <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center p-2 border border-slate-100 z-10">
                <Image
                  src={`https://logo.clearbit.com/${clinic.logoDomain}`}
                  alt={`Logo ${clinic.name}`}
                  width={48}
                  height={48}
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/globe.svg'; // Fallback
                  }}
                />
              </div>
            </div>

            {/* Clinic Details */}
            <div className="flex-1 flex flex-col px-6 pt-12 pb-6 relative z-0">
              <h3 className="text-xl font-extrabold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                {clinic.name}
              </h3>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 mb-4">
                <MapPin size={14} className="text-blue-500" /> {clinic.city}, {clinic.country}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                {clinic.summary}
              </p>

              <div className="space-y-3 mb-8">
                {clinic.facts.map((fact, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">{fact}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                <a href={clinic.website} target="_blank" rel="noreferrer" className="w-full">
                  <Button className="w-full h-12 rounded-xl bg-slate-900 hover:bg-blue-600 text-white shadow-md transition-all group-hover:shadow-blue-500/25">
                    Visiter le site <ExternalLink size={16} className="ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default function ListePaysPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-hidden">
      <Navbar />

      {/* Stunning Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2500"
            alt="Medical Excellence"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-50" />

          {/* Glassmorphism Accents */}
          <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-blue-600/30 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-0 right-[-10%] w-[40vw] h-[40vw] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-7xl pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-blue-300 mb-8 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <Star size={14} className="text-yellow-400" />
              World-Class Healthcare Directory
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1] mb-8 drop-shadow-2xl">
              Réseau Médical <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200">
                d'Excellence.
              </span>
            </h1>

            <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-300 max-w-2xl mb-12 border-l-4 border-blue-500 pl-6">
              Découvrez notre sélection rigoureuse d'hôpitaux internationaux. Des infrastructures de classe mondiale certifiées JCI, à portée de main. <span className="text-blue-200 font-bold block mt-2">Certified. Premium. Ready for you.</span>
            </p>

            {/* Anchors / Filters */}
            <div className="flex flex-wrap gap-4">
              {countrySections.map((country, i) => (
                <motion.a
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  key={country.id}
                  href={`#${country.id}`}
                  className="group inline-flex items-center gap-3 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4 text-base font-bold text-white transition-all hover:bg-white hover:text-slate-900 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                  <Image
                    src={`https://flagcdn.com/w40/${country.code}.png`}
                    alt={`Drapeau ${country.name}`}
                    width={24}
                    height={18}
                    className="rounded-sm shadow-sm"
                  />
                  {country.name}
                  <ChevronRight size={18} className="text-blue-400 group-hover:text-blue-600 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="relative z-20 -mt-10 px-4">
        {countrySections.map((section, index) => (
          <CountryBlock key={section.id} section={section} index={index} />
        ))}
      </div>

      {/* Trust & Methodology Section */}
      <section className="container mx-auto max-w-7xl px-4 py-24">
        <div className="relative rounded-[3rem] bg-slate-900 overflow-hidden text-white shadow-2xl p-10 md:p-16 lg:p-20 border border-slate-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">
                <Globe2 size={16} /> 100% Transparent
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">Verified Methodology. <br /><span className="text-slate-400">Trusted Results.</span></h2>
              <p className="text-lg leading-relaxed text-slate-300 mb-8">
                Les établissements affichés sont rigoureusement sélectionnés. Nous recoupons leurs accréditations (JCI, HAS), leurs volumes d'intervention et leurs infrastructures avec les données publiques officielles. Votre santé mérite l'absolue vérité.
              </p>
              <Link href="/">
                <Button className="h-14 rounded-full bg-blue-600 px-8 text-base font-bold shadow-lg hover:bg-blue-500 hover:shadow-blue-500/25 hover:scale-105 transition-all">
                  Retour à l'accueil <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                <ShieldCheck size={32} className="text-blue-400 mb-4" />
                <div className="text-2xl font-black mb-1">JCI / HAS</div>
                <div className="text-sm text-slate-400 font-medium">Accreditations Checked</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                <Building2 size={32} className="text-cyan-400 mb-4" />
                <div className="text-2xl font-black mb-1">10+</div>
                <div className="text-sm text-slate-400 font-medium">Premium Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
