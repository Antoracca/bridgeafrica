import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  Globe2,
  MapPin,
  ShieldCheck,
  Stethoscope,
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
  context: string;
  heroImage: string;
  clinics: Clinic[];
};

const countrySections: CountrySection[] = [
  {
    id: "maroc",
    name: "Maroc",
    code: "ma",
    title: "Maroc en priorite pour la presentation",
    context:
      "Selection de grands etablissements a Casablanca, Rabat, Marrakech et Fes. Les liens mènent vers les sites officiels pour verification immediate.",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Casablanca_%281%29.jpg",
    clinics: [
      {
        name: "Hopital Universitaire International Cheikh Khalifa",
        city: "Casablanca",
        country: "Maroc",
        logoDomain: "hck.ma",
        category: "Hopital universitaire",
        summary:
          "Etablissement pluridisciplinaire avec parcours patient local et international.",
        facts: [
          "Site officiel: poles de specialites et parcours de soins multidisciplinaire.",
          "Implante a Casablanca (Hay Hassani) avec plateforme de rendez-vous.",
        ],
        website: "https://www.hck.ma/fr/",
        source: "https://www.hck.ma/fr/",
      },
      {
        name: "Hopital Universitaire International Cheikh Zaid",
        city: "Rabat",
        country: "Maroc",
        logoDomain: "hcz.ma",
        category: "Hopital universitaire",
        summary:
          "Institution de reference a Rabat avec services medicaux et chirurgicaux.",
        facts: [
          "Site officiel: institution a but non lucratif inauguree en 1998.",
          "Coordonnees officielles: Madinat Al Irfane, Rabat.",
        ],
        website: "https://www.hcz.ma/hopital/",
        source: "https://www.hcz.ma/hopital/",
      },
      {
        name: "CHU Ibn Rochd",
        city: "Casablanca",
        country: "Maroc",
        logoDomain: "chuibnrochd.ma",
        category: "CHU public",
        summary:
          "Grand centre hospitalo-universitaire public couvrant plusieurs specialites.",
        facts: [
          "Site officiel: offre de soins et services hospitaliers universitaires.",
          "Adresse publiee: Rue Lahcen El Arjoun, Casablanca.",
        ],
        website: "https://www.chuibnrochd.ma/",
        source: "https://www.chuibnrochd.ma/",
      },
      {
        name: "CHU Mohammed VI",
        city: "Marrakech",
        country: "Maroc",
        logoDomain: "chumarrakech.ma",
        category: "CHU public",
        summary:
          "Etablissement public hospitalo-universitaire de la region Marrakech-Safi.",
        facts: [
          "Le site officiel indique 159865 consultations externes en 2024.",
          "Le site officiel indique 239256 passages aux urgences en 2024.",
        ],
        website: "https://www.chumarrakech.ma/",
        source: "https://www.chumarrakech.ma/",
      },
      {
        name: "CHU Hassan II",
        city: "Fes",
        country: "Maroc",
        logoDomain: "chu-fes.ma",
        category: "CHU public",
        summary:
          "Etablissement de reference avec urgences, oncologie et chirurgie specialisee.",
        facts: [
          "Le site officiel detaille urgences, reanimation, oncologie et specialites.",
          "Parcours patient et informations pratiques disponibles en ligne.",
        ],
        website: "https://www.chu-fes.ma/",
        source: "https://www.chu-fes.ma/",
      },
    ],
  },
  {
    id: "france",
    name: "France",
    code: "fr",
    title: "France: grands poles de reference",
    context:
      "Selection de centres de reference a Paris et Villejuif, avec infos officielles verifiables.",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Paris_-_Eiffelturm_und_Marsfeld2.jpg",
    clinics: [
      {
        name: "Hopital Europeen Georges-Pompidou (AP-HP)",
        city: "Paris",
        country: "France",
        logoDomain: "aphp.fr",
        category: "Hopital public universitaire",
        summary:
          "Etablissement AP-HP avec activites majeures cardio, trauma et cancer.",
        facts: [
          "AP-HP publie 726 lits et 83 places de jour pour HEGP.",
          "Site officiel AP-HP avec indicateurs qualite et securite des soins.",
        ],
        website:
          "https://www.aphp.fr/hopitaux/hopital-europeen-georges-pompidou-hegp",
        source:
          "https://www.aphp.fr/hopitaux/hopital-europeen-georges-pompidou-hegp",
      },
      {
        name: "Hopital Pitie-Salpetriere (AP-HP)",
        city: "Paris",
        country: "France",
        logoDomain: "aphp.fr",
        category: "Hopital public universitaire",
        summary:
          "Grand hopital AP-HP avec services medicaux, chirurgicaux et universitaires.",
        facts: [
          "Informations officielles AP-HP: indicateurs qualite et securite accessibles.",
          "Prise en charge multidisciplinaire au sein du reseau AP-HP.",
        ],
        website: "https://www.aphp.fr/en/hospitals/pitie-salpetriere",
        source: "https://www.aphp.fr/en/hospitals/pitie-salpetriere",
      },
      {
        name: "Gustave Roussy",
        city: "Villejuif",
        country: "France",
        logoDomain: "gustaveroussy.fr",
        category: "Centre de lutte contre le cancer",
        summary:
          "Centre europeen de reference en oncologie clinique et recherche.",
        facts: [
          "Le site officiel presente l'etablissement comme 1er centre europeen de cancer.",
          "Le groupe indique environ 3200 professionnels mobilises.",
        ],
        website: "https://www.gustaveroussy.fr/en",
        source: "https://www.gustaveroussy.fr/en",
      },
      {
        name: "American Hospital of Paris",
        city: "Neuilly-sur-Seine",
        country: "France",
        logoDomain: "american-hospital.org",
        category: "Hopital prive a but non lucratif",
        summary:
          "Institution internationale multi-specialites a proximite de Paris.",
        facts: [
          "Le site officiel indique une fondation en 1906.",
          "Le site officiel mentionne les accreditations Joint Commission et HAS.",
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
    title: "Turquie: hubs prives internationaux",
    context:
      "Selection de groupes hospitaliers d'Istanbul et de Kocaeli avec offres internationales documentees.",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/The_skyline_of_Istanbul.JPG",
    clinics: [
      {
        name: "Acibadem Maslak Hospital",
        city: "Istanbul",
        country: "Turquie",
        logoDomain: "acibadem.com.tr",
        category: "Hopital prive",
        summary:
          "Site majeur du groupe Acibadem pour patients nationaux et internationaux.",
        facts: [
          "Le site officiel indique une ouverture en 2009 et 106000 m2 de surface.",
          "Le site officiel indique 231 chambres, 51 lits de soins intensifs et JCI.",
        ],
        website:
          "https://www.acibademinternational.com/hospital/maslak/",
        source:
          "https://www.acibademinternational.com/hospital/maslak/",
      },
      {
        name: "Memorial Sisli Hospital",
        city: "Istanbul",
        country: "Turquie",
        logoDomain: "memorial.com.tr",
        category: "Hopital prive",
        summary:
          "Etablissement historique du groupe Memorial pour medecine specialisee.",
        facts: [
          "Le site officiel indique une ouverture en 2000.",
          "Memorial presente Sisli comme premier hopital en Turquie accredite JCI.",
        ],
        website:
          "https://www.memorial.com.tr/en/hospitals/memorial-sisli-hospital",
        source:
          "https://www.memorial.com.tr/en/hospitals/memorial-sisli-hospital",
      },
      {
        name: "Medipol Mega University Hospital",
        city: "Istanbul",
        country: "Turquie",
        logoDomain: "medipolglobal.com",
        category: "Hopital universitaire prive",
        summary:
          "Complexe universitaire avec programmes de soins et parcours international.",
        facts: [
          "Le centre international indique une accreditation JCI Academic Medical Center.",
          "Le groupe met en avant l'accompagnement dedie des patients internationaux.",
        ],
        website: "https://medipolglobal.com/en/",
        source: "https://medipolglobal.com/en/",
      },
      {
        name: "LIV Hospital Ulus",
        city: "Istanbul",
        country: "Turquie",
        logoDomain: "livhospital.com",
        category: "Hopital prive",
        summary:
          "Site premium du groupe LIV avec services medicaux de pointe.",
        facts: [
          "Le site officiel indique une ouverture en 2013.",
          "Le site officiel mentionne JCI et plusieurs labels Center of Excellence.",
        ],
        website: "https://www.livhospital.com/en/liv-hospital-ulus",
        source: "https://www.livhospital.com/en/liv-hospital-ulus",
      },
      {
        name: "Anadolu Medical Center",
        city: "Kocaeli",
        country: "Turquie",
        logoDomain: "anadolumedicalcenter.com",
        category: "Hopital prive",
        summary:
          "Centre medical regional avec unite internationale et coordination patient.",
        facts: [
          "Le site officiel detaille un service international multilingue.",
          "Le site officiel mentionne hotel patient et accompagnement logistique.",
        ],
        website:
          "https://www.anadolumedicalcenter.com/patientfacility/international-patient-services",
        source:
          "https://www.anadolumedicalcenter.com/patientfacility/international-patient-services",
      },
    ],
  },
];

function CountryBlock({ section, highlighted }: { section: CountrySection; highlighted?: boolean }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-28 rounded-[2rem] border border-slate-200 bg-white shadow-sm"
    >
      <div className="grid gap-8 border-b border-slate-100 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          {highlighted ? (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              <ShieldCheck size={14} /> Focus principal
            </div>
          ) : null}
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{section.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">{section.context}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-700">
              <Building2 size={14} /> {section.clinics.length} etablissements selectionnes
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-700">
              <Globe2 size={14} /> Donnees officielles verifiables
            </span>
          </div>
        </div>

        <div className="relative h-52 overflow-hidden rounded-2xl bg-slate-100 md:h-64">
          <Image
            src={section.heroImage}
            alt={`Vue ${section.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
            <MapPin size={12} /> {section.name}
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2 md:p-10 xl:grid-cols-3">
        {section.clinics.map((clinic) => (
          <article
            key={`${section.id}-${clinic.name}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-36 overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
              <div className="absolute right-3 top-3 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                {clinic.category}
              </div>
              <Image
                src={`https://logo.clearbit.com/${clinic.logoDomain}`}
                alt={`Logo ${clinic.name}`}
                width={140}
                height={140}
                className="absolute left-5 top-1/2 h-14 w-14 -translate-y-1/2 rounded-xl border border-white/20 bg-white object-contain p-2 shadow-lg"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div>
                <h3 className="text-lg font-bold leading-snug text-slate-900">{clinic.name}</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
                  <MapPin size={14} /> {clinic.city}, {clinic.country}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{clinic.summary}</p>
              </div>

              <ul className="mt-4 space-y-2">
                {clinic.facts.map((fact) => (
                  <li key={fact} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-blue-600" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                <a href={clinic.website} target="_blank" rel="noreferrer" className="inline-flex">
                  <Button className="h-9 rounded-full bg-blue-600 px-4 text-white hover:bg-blue-700">
                    Site officiel
                    <ExternalLink size={14} className="ml-2" />
                  </Button>
                </a>
                <a
                  href={clinic.source}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Source
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ListePaysPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 pt-32 text-white md:pt-36">
        <div className="absolute inset-0">
          <Image
            src={countrySections[0].heroImage}
            alt="Casablanca skyline"
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.35),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/85 to-slate-50" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              <Stethoscope size={14} /> Destinations medicales premium
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              Reseau de cliniques verifiees
              <span className="block text-blue-300">Maroc, France, Turquie</span>
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-200 md:text-lg">
              Cette page met le Maroc en avant, puis la France et la Turquie, avec des etablissements reels, des liens officiels et des informations
              directement verifiables.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {countrySections.map((country) => (
              <a
                key={country.id}
                href={`#${country.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-slate-900"
              >
                <Image
                  src={`https://flagcdn.com/w40/${country.code}.png`}
                  alt={`Drapeau ${country.name}`}
                  width={20}
                  height={15}
                  className="rounded-sm"
                />
                {country.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-10 px-4 py-10 md:space-y-12 md:py-14">
        {countrySections.map((section, index) => (
          <CountryBlock key={section.id} section={section} highlighted={index === 0} />
        ))}
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">Methodologie de verification</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                Les etablissements affiches sont selectionnes a partir de leurs pages officielles (hopitaux, groupes hospitaliers, centres internationaux).
                Les donnees presentees sont limites aux informations publiquement publiees et verifiables en ligne.
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-700">Derniere verification: 4 mars 2026.</p>
            </div>
            <Link href="/" className="inline-flex">
              <Button variant="outline" className="h-11 rounded-full border-slate-300 px-6 font-semibold text-slate-800">
                Retour accueil
                <ArrowRight size={15} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
