'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight, Shield, Activity, Globe2, Stethoscope, Star, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const destinations = [
  {
    id: 1,
    country: 'Turkey',
    city: 'Istanbul',
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&q=80&w=1200',
    flag: 'tr',
    specialties: ['Hair Transplant', 'Aesthetic Surgery', 'Dentistry'],
    description: 'A global hub for high-quality, affordable cosmetic and dental care with state-of-the-art facilities.',
    patients: '2,500+',
    satisfaction: '99%'
  },
  {
    id: 2,
    country: 'France',
    city: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1200',
    flag: 'fr',
    specialties: ['Oncology', 'Neurology', 'Cardiology'],
    description: 'Renowned for advanced research, top-tier specialists, and comprehensive care in critical medical fields.',
    patients: '1,800+',
    satisfaction: '98%'
  },
  {
    id: 3,
    country: 'Germany',
    city: 'Berlin',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
    flag: 'de',
    specialties: ['Orthopedics', 'Neurosurgery', 'Rehabilitation'],
    description: 'Leading the world in precision medical engineering, orthopedic surgeries, and rigorous rehabilitation.',
    patients: '1,200+',
    satisfaction: '99%'
  },
  {
    id: 4,
    country: 'Morocco',
    city: 'Casablanca',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1200',
    flag: 'ma',
    specialties: ['General Surgery', 'Fertility', 'Ophthalmology'],
    description: 'Providing excellent medical expertise and modern clinics close to home for many African patients.',
    patients: '3,000+',
    satisfaction: '97%'
  }
]

const features = [
  { icon: Globe2, title: 'Global Network', desc: 'Partnered with 50+ JCI-accredited hospitals worldwide.' },
  { icon: Shield, title: 'Certified Care', desc: 'Rigorous vetting process for all our medical partners.' },
  { icon: Activity, title: 'End-to-End Support', desc: 'From visa assistance to post-operation follow-ups.' },
  { icon: Stethoscope, title: 'Expert Specialists', desc: 'Initial tele-consultations with top global specialists.' },
]

export function Destinations() {
  const [activeDest, setActiveDest] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDest((prev) => (prev + 1) % destinations.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen" />

      <div className="container mx-auto px-4 relative z-10 lg:max-w-7xl">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
              <Globe2 size={16} />
              Global Medical Excellence
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
              The Intercontinental <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Medical Bridge</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Seamless connections between Africa and world-class healthcare hubs. We bring the world&apos;s best medical expertise directly to you.
            </p>
          </motion.div>
        </div>

        {/* Main Interactive Map / Carousel Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24">

          {/* Left: Content & Selectors */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Top Medical Destinations</h3>

            <div className="flex flex-col gap-4">
              {destinations.map((dest, idx) => {
                const isActive = activeDest === idx
                return (
                  <motion.div
                    key={dest.id}
                    className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border overflow-hidden group ${isActive
                      ? 'bg-slate-900 border-blue-500/50 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]'
                      : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                    onClick={() => setActiveDest(idx)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {isActive && (
                      <>
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-l-2xl z-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none" />
                      </>
                    )}
                    <div className="flex items-center gap-4">
                      <Image
                        src={`https://flagcdn.com/w40/${dest.flag.toLowerCase()}.png`}
                        alt={dest.country}
                        width={40} height={30}
                        className="rounded shadow-md"
                      />
                      <div>
                        <h4 className="font-bold text-lg text-white">{dest.country}</h4>
                        <div className="flex items-center text-sm text-slate-400 gap-1.5 mt-0.5">
                          <MapPin size={14} className="text-cyan-400" />
                          {dest.city}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 block"
              >
                <Link href="/liste-pays" className="block">
                  <Button variant="outline" className="w-full bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-blue-600 hover:border-blue-500 hover:text-white h-16 rounded-2xl font-bold transition-all duration-300 group shadow-lg">
                    <span className="text-lg tracking-wide">Découvrir toutes les destinations</span>
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right: Rich Visual Showcase */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative h-[450px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDest}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {/* Background Image */}
                  <Image
                    src={destinations[activeDest].image}
                    alt={destinations[activeDest].city}
                    fill
                    className="object-cover transition-transform duration-10000 group-hover:scale-110"
                    priority
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

                  {/* Floating Content Box */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        {destinations[activeDest].specialties.map((spec, i) => (
                          <span key={i} className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full backdrop-blur-md">
                            {spec}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                        {destinations[activeDest].city}, <span className="text-blue-400">{destinations[activeDest].country}</span>
                      </h3>

                      <p className="text-slate-200 text-lg mb-8 max-w-xl leading-relaxed drop-shadow-md">
                        {destinations[activeDest].description}
                      </p>

                      <div className="flex items-center gap-8 mb-8 pb-8 border-b border-white/10">
                        <div>
                          <p className="text-slate-400 text-sm mb-1">Satisfied Patients</p>
                          <p className="text-3xl font-bold text-white flex items-center gap-2">
                            <Users size={24} className="text-blue-400" />
                            {destinations[activeDest].patients}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm mb-1">Success Rate</p>
                          <p className="text-3xl font-bold text-white flex items-center gap-2">
                            <Star size={24} className="text-amber-400" />
                            {destinations[activeDest].satisfaction}
                          </p>
                        </div>
                      </div>

                      <Link href="/liste-pays" className="inline-block">
                        <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 h-14 text-base font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
                          Explore medical packages
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-slate-800/50">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 border border-blue-500/20">
                <feature.icon className="text-blue-400 w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

      </div >
    </section >
  )
}