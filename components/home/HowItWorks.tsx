"use client";

import { motion } from "framer-motion";
import { Brain, Search, Target, HeartHandshake, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import doctorAnimation from '@/public/medical-audit.json';
import searchAnimation from '@/public/global-search.json';
import dataAnimation from '@/public/data-analytics.json';
import supportAnimation from '@/public/medical-support.json';

const steps = [
  {
    id: "01",
    title: "Analyse Expertisée",
    description: "Évaluation complète par notre comité médical. Nous analysons votre dossier clinique, vos besoins spécifiques et vos contraintes budgétaires pour définir le profil exact de l'établissement requis.",
    icon: Brain,
    features: ["Audit du dossier médical", "Étude de faisabilité", "Définition du cahier des charges"],
    lottieData: doctorAnimation, // New Medical audit
    lottieUrl: "",
    isDotLottie: false,
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "02",
    title: "Recherche Intelligente",
    description: "Nos algorithmes et nos experts scrutent un réseau de plus de 300 établissements certifiés (JCI, HAS) à travers le monde pour identifier les pôles d'excellence correspondant à votre pathologie.",
    icon: Search,
    features: ["Filtrage multi-critères", "Vérification des accréditations", "Analyse des taux de réussite"],
    lottieData: searchAnimation, // New Global search
    isDotLottie: false,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50"
  },
  {
    id: "03",
    title: "Décision Transparente",
    description: "Nous vous présentons une sélection d'options viables, documentées par des données objectives. Vous comparez les devis, les délais et les infrastructures en toute transparence, sans frais cachés.",
    icon: Target,
    features: ["Comparatif détaillé", "Transparence tarifaire", "Consultation pré-départ avec le chirurgien"],
    lottieData: dataAnimation, // New Data Analytics
    isDotLottie: false,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50"
  },
  {
    id: "04",
    title: "Accompagnement Suprême",
    description: "Déléguez la logistique. De la réservation des vols et de l'hôtel jusqu'aux transferts VIP et au suivi post-opératoire une fois rentré chez vous, notre équipe veille sur chaque étape.",
    icon: HeartHandshake,
    features: ["Conciergerie médicale", "Transferts privés", "Suivi post-opératoire continu"],
    lottieData: supportAnimation, // New Medical support
    isDotLottie: false,
    color: "from-purple-600 to-fuchsia-600",
    bgColor: "bg-purple-50"
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden selection:bg-blue-100 selection:text-blue-900">

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.03),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Header - Prestigious & Balanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-20 md:mb-32"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-sm font-bold tracking-[0.15em] uppercase text-slate-700">Méthodologie Certifiée</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-8">
            L'excellence médicale, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
              étape par étape.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Un processus rigoureux en 4 étapes, conçu pour éliminer l'incertitude du voyage médical. Zéro compromis sur la qualité, zéro stress logistique.
          </p>
        </motion.div>

        {/* Steps - Balanced Zigzag Layout */}
        <div className="space-y-24 md:space-y-32">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
              >

                {/* Visual / Lottie Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                  className="w-full lg:w-1/2 relative"
                >
                  <div className={`absolute inset-0 ${step.bgColor} rounded-[3rem] transform ${isEven ? '-rotate-3' : 'rotate-3'} scale-105 opacity-50 transition-transform duration-500 hover:rotate-0`} />
                  <div className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 aspect-square flex items-center justify-center group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent z-10 pointer-events-none" />

                    {/* Remote Lottie Animation */}
                    <div className="w-[85%] h-[85%] relative z-0 transform group-hover:scale-110 transition-transform duration-700">
                      {step.isDotLottie ? (
                        <DotLottieReact
                          src={step.lottieUrl}
                          loop
                          autoplay
                          className="w-full h-full drop-shadow-xl"
                        />
                      ) : (
                        <Lottie
                          animationData={step.lottieData}
                          loop={true}
                          className="w-full h-full drop-shadow-xl"
                        />
                      )}
                    </div>
                  </div>
                  {/* Floating Step Badge */}
                  <div className={`absolute ${isEven ? 'top-6 -left-6' : 'top-6 -right-6'} w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/20 z-20`}>
                    {step.id}
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.2, delay: 0.2 }}
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                  <div className="mb-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-6`}>
                      <step.icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="space-y-4 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Points clés</h4>
                    {step.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className={`mt-1 w-5 h-5 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 text-white`}>
                          <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                        <span className="text-base font-semibold text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 md:mt-32 text-center"
        >
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 shadow-sm border border-slate-100">
            <Link href="/notre-processus">
              <Button className="h-16 px-10 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-lg font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-xl group">
                Démarrer votre accompagnement
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
