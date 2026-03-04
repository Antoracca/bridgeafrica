"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Video, Mic, MicOff, VideoOff, PhoneForwarded, Settings,
    MessageSquare, Users, AlertCircle, CheckCircle2, ShieldCheck
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TeleconsultationView() {
    const [micOn, setMicOn] = useState(true)
    const [cameraOn, setCameraOn] = useState(true)
    const [joined, setJoined] = useState(false)

    if (!joined) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto min-h-[calc(100vh-120px)] flex flex-col items-center justify-center p-4 md:p-8"
            >
                <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-blue-900/5 w-full max-w-2xl relative overflow-hidden">
                    {/* Header / Info */}
                    <div className="relative z-10 mb-8">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Video className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Salle d'attente sécurisée</h2>
                        <p className="text-slate-500 text-lg mb-6">Consultation Pré-Opératoire avec le <strong className="text-slate-800">Dr. Fatima El Amrani</strong></p>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold shadow-sm">
                            <ShieldCheck className="w-4 h-4" /> Connexion chiffrée de bout-en-bout (WebRTC)
                        </div>
                    </div>

                    {/* Mock Video Preview */}
                    <div className="w-full aspect-video bg-slate-900 rounded-2xl mb-8 relative overflow-hidden shadow-inner flex items-center justify-center">
                        {cameraOn ? (
                            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center flex-col gap-4 text-slate-500">
                                <Avatar className="w-24 h-24 border-4 border-slate-700 shadow-2xl">
                                    <AvatarFallback className="bg-slate-700 text-slate-400 font-bold text-2xl">VO</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium tracking-wide">Aperçu Caméra Active</span>
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-slate-600 gap-3">
                                <VideoOff className="w-12 h-12 mb-2" />
                                <span className="text-sm font-medium">Caméra désactivée</span>
                            </div>
                        )}

                        {/* Controls Overlay */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-700 shadow-lg">
                            <Button
                                variant="ghost" size="icon"
                                onClick={() => setMicOn(!micOn)}
                                className={`h-12 w-12 rounded-full transition-all ${micOn ? 'text-white hover:bg-slate-700' : 'bg-rose-500 text-white hover:bg-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.5)]'}`}
                            >
                                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                            </Button>
                            <Button
                                variant="ghost" size="icon"
                                onClick={() => setCameraOn(!cameraOn)}
                                className={`h-12 w-12 rounded-full transition-all ${cameraOn ? 'text-white hover:bg-slate-700' : 'bg-rose-500 text-white hover:bg-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.5)]'}`}
                            >
                                {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                            </Button>
                            <div className="w-px h-8 bg-slate-700 mx-2" />
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-300 hover:text-white hover:bg-slate-700">
                                <Settings className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Action */}
                    <Button
                        onClick={() => setJoined(true)}
                        className="w-full sm:w-auto h-14 px-10 text-lg rounded-full shadow-xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all hover:scale-105"
                    >
                        Rejoindre la consultation
                    </Button>
                </div>
            </motion.div>
        )
    }

    // Active call view
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            className="h-[calc(100vh-120px)] bg-slate-950 rounded-3xl overflow-hidden flex flex-col relative max-w-7xl mx-auto shadow-2xl"
        >
            {/* Top Bar */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                    <span className="text-white font-medium text-sm tracking-widest bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">04:12</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-white/70 hover:text-white hover:bg-white/10 rounded-full"><Users className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-white/70 hover:text-white hover:bg-white/10 rounded-full"><MessageSquare className="w-5 h-5" /></Button>
                </div>
            </div>

            {/* Main Video Area (Doctor) */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {/* Doctor Placeholder Image/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-800 m-2 rounded-2xl flex flex-col items-center justify-center">
                    <Avatar className="w-40 h-40 mb-6 shadow-2xl border-4 border-slate-700">
                        <AvatarFallback className="bg-slate-800 text-slate-400 font-bold text-4xl">FE</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h3 className="text-white font-bold text-2xl mb-1 drop-shadow-md">Dr. Fatima El Amrani</h3>
                        <p className="text-slate-400 font-medium">Chirurgien Orthopédiste</p>
                    </div>
                </div>

                {/* Patient Picture-in-Picture */}
                <div className="absolute bottom-6 right-6 w-56 aspect-video bg-black rounded-xl border-2 border-slate-700 shadow-2xl overflow-hidden z-20">
                    {cameraOn ? (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Vous</span>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center flex-col bg-slate-900 text-slate-600 gap-2">
                            <VideoOff className="w-6 h-6" />
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="h-24 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 shrink-0 z-20 flex items-center justify-center gap-6 px-6">
                <Button
                    variant="outline" size="icon"
                    onClick={() => setMicOn(!micOn)}
                    className={`h-14 w-14 rounded-full border-0 transition-all ${micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-900 hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]'}`}
                >
                    {micOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </Button>
                <Button
                    variant="outline" size="icon"
                    onClick={() => setCameraOn(!cameraOn)}
                    className={`h-14 w-14 rounded-full border-0 transition-all ${cameraOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-900 hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]'}`}
                >
                    {cameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </Button>

                <div className="w-px h-8 bg-slate-700 mx-2" />

                <Button
                    onClick={() => setJoined(false)}
                    className="h-14 px-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all hover:scale-105"
                >
                    <PhoneForwarded className="w-5 h-5 mr-3 rotate-[135deg]" /> Quitter
                </Button>
            </div>
        </motion.div>
    )
}
