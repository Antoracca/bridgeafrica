"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Video, Mic, MicOff, VideoOff, PhoneForwarded, Settings,
    MessageSquare, Users, ShieldCheck, X, Send, MonitorUp,
    Hand, Smile, Monitor, Upload, Clock, CalendarCheck, AlertTriangle
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TeleconsultationView() {
    const [micOn, setMicOn] = useState(true)
    const [cameraOn, setCameraOn] = useState(true)
    const [joined, setJoined] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [rejoinBlocked, setRejoinBlocked] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [elapsed, setElapsed] = useState(0)
    const [finalDuration, setFinalDuration] = useState(0)
    const [showChat, setShowChat] = useState(false)
    const [showParticipants, setShowParticipants] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [handRaised, setHandRaised] = useState(false)
    const [showEmojis, setShowEmojis] = useState(false)
    const [floatingEmoji, setFloatingEmoji] = useState<string | null>(null)
    const [videoQuality, setVideoQuality] = useState<'low' | 'hd' | 'fullhd'>('hd')
    const [isScreenSharing, setIsScreenSharing] = useState(false)
    const [screenStream, setScreenStream] = useState<MediaStream | null>(null)
    const [chatMessages, setChatMessages] = useState<{ id: number; sender: string; time: string; text: string; imageUrl?: string }[]>([
        { id: 1, sender: "Dr. Fatima El Amrani", time: "Maintenant", text: "Bonjour, je suis prête pour votre consultation. Comment vous sentez-vous aujourd'hui ?" },
    ])
    const [chatInput, setChatInput] = useState("")
    const videoRef = useRef<HTMLVideoElement>(null)
    const activeVideoRef = useRef<HTMLVideoElement>(null)
    const screenVideoRef = useRef<HTMLVideoElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const qualityConstraints = {
        low: { width: 640, height: 360 },
        hd: { width: 1280, height: 720 },
        fullhd: { width: 1920, height: 1080 },
    }

    // Format elapsed seconds into MM:SS
    const formatTime = useCallback((s: number) => {
        const m = Math.floor(s / 60)
        const sec = s % 60
        return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }, [])

    // Timer — starts when user joins
    useEffect(() => {
        if (joined) {
            timerRef.current = setInterval(() => setElapsed(p => p + 1), 1000)
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [joined])

    // Initialize media stream
    useEffect(() => {
        let localStream: MediaStream | null = null
        async function setupMedia() {
            try {
                localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                setStream(localStream)
            } catch (err) {
                console.error("Camera access denied or unavailable:", err)
            }
        }
        setupMedia()

        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop())
            }
        }
    }, [])

    // Bind video element when stream or view changes
    useEffect(() => {
        if (videoRef.current && stream) videoRef.current.srcObject = stream
        if (activeVideoRef.current && stream) activeVideoRef.current.srcObject = stream
    }, [stream, joined, cameraOn])

    // Bind screen share stream to its video element
    useEffect(() => {
        if (screenVideoRef.current && screenStream) {
            screenVideoRef.current.srcObject = screenStream
        }
    }, [screenStream])

    // Toggle tracks
    useEffect(() => {
        if (stream) {
            stream.getAudioTracks().forEach(t => { t.enabled = micOn })
            stream.getVideoTracks().forEach(t => { t.enabled = cameraOn })
        }
    }, [micOn, cameraOn, stream])

    const handleSendChat = () => {
        if (!chatInput.trim()) return
        setChatMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: "Vous",
            time: "À l'instant",
            text: chatInput.trim(),
        }])
        setChatInput("")
    }

    // Change video quality
    const changeQuality = async (q: 'low' | 'hd' | 'fullhd') => {
        setVideoQuality(q)
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0]
            if (videoTrack) {
                try {
                    await videoTrack.applyConstraints({ width: qualityConstraints[q].width, height: qualityConstraints[q].height })
                } catch (e) { console.warn('Quality change not supported:', e) }
            }
        }
    }

    // Screen sharing
    const toggleScreenShare = async () => {
        if (isScreenSharing && screenStream) {
            screenStream.getTracks().forEach(t => t.stop())
            setScreenStream(null)
            setIsScreenSharing(false)
        } else {
            try {
                const display = await navigator.mediaDevices.getDisplayMedia({ video: true })
                setScreenStream(display)
                setIsScreenSharing(true)
                display.getVideoTracks()[0].onended = () => { setScreenStream(null); setIsScreenSharing(false) }
            } catch (e) { console.warn('Screen share cancelled') }
        }
    }

    // Emoji reaction
    const sendEmoji = (emoji: string) => {
        setFloatingEmoji(emoji)
        setShowEmojis(false)
        setTimeout(() => setFloatingEmoji(null), 2500)
    }

    // Upload document
    const handleUpload = () => fileInputRef.current?.click()
    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const isImage = file.type.startsWith('image/')
        const imageUrl = isImage ? URL.createObjectURL(file) : undefined
        setChatMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: 'Vous',
            time: "À l'instant",
            text: `📎 ${file.name}`,
            imageUrl,
        }])
        setShowChat(true)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleLeave = () => {
        setFinalDuration(elapsed)
        setJoined(false)
        setCallEnded(true)
        setElapsed(0)
        if (stream) stream.getTracks().forEach(t => t.stop())
        setStream(null)
        if (screenStream) screenStream.getTracks().forEach(t => t.stop())
        setScreenStream(null)
    }

    const handleRejoin = () => {
        setRejoinBlocked(true)
    }

    // ──────────────────────────── REJOIN BLOCKED ────────────────────────────
    if (rejoinBlocked) {
        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col items-center justify-center relative z-0" style={{ minHeight: 'calc(100vh - 160px)' }}>
                <div className="w-full max-w-lg mx-auto px-4 text-center">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-10">
                        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6"><AlertTriangle className="w-8 h-8 text-amber-500" /></div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Salle non disponible</h2>
                        <p className="text-slate-500 leading-relaxed mb-8">Cette salle d'attente n'est plus disponible. Veuillez prendre un nouveau rendez-vous avec ce médecin dans l'espace prise de rendez-vous.</p>
                        <Button onClick={() => router.push('/patient?view=rdv')} className="h-12 px-8 rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold shadow-lg">Retour aux rendez-vous</Button>
                    </div>
                </div>
            </motion.div>
        )
    }

    // ──────────────────────────── CALL ENDED ────────────────────────────
    if (callEnded && !joined) {
        const now = new Date()
        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col items-center justify-center relative z-0" style={{ minHeight: 'calc(100vh - 160px)' }}>
                <div className="w-full max-w-lg mx-auto px-4 text-center">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-10">
                        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6"><PhoneForwarded className="w-8 h-8 text-rose-500 rotate-[135deg]" /></div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Appel terminé</h2>
                        <p className="text-slate-400 text-sm mb-8">Votre consultation est terminée.</p>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <Clock className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                                <p className="text-xs font-bold text-slate-400 uppercase">Durée</p>
                                <p className="font-bold text-slate-900">{formatTime(finalDuration)}</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <CalendarCheck className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                                <p className="text-xs font-bold text-slate-400 uppercase">Heure</p>
                                <p className="font-bold text-slate-900">{now.getHours().toString().padStart(2,'0')}:{now.getMinutes().toString().padStart(2,'0')}</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <Users className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                                <p className="text-xs font-bold text-slate-400 uppercase">Avec</p>
                                <p className="font-bold text-slate-900 text-xs">Dr. F. El Amrani</p>
                            </div>
                        </div>
                        <Button onClick={handleRejoin} className="h-12 px-8 rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold shadow-lg">Réintégrer l'appel</Button>
                    </div>
                </div>
            </motion.div>
        )
    }

    // ──────────────────────────── WAITING ROOM ────────────────────────────
    if (!joined) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center justify-center relative z-0"
                style={{ minHeight: 'calc(100vh - 160px)' }}
            >
                <div className="w-full max-w-3xl mx-auto px-4">
                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                        {/* Video preview */}
                        <div className="w-full aspect-[16/9] bg-slate-900 relative overflow-hidden">
                            {cameraOn && stream ? (
                                <video
                                    ref={videoRef}
                                    autoPlay playsInline muted
                                    className="w-full h-full object-cover scale-x-[-1]"
                                />
                            ) : cameraOn && !stream ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-slate-500 gap-3">
                                    <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center">
                                        <Video className="w-8 h-8 text-slate-500" />
                                    </div>
                                    <span className="text-sm font-medium">Autorisation caméra requise</span>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-600 gap-3">
                                    <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
                                        <VideoOff className="w-8 h-8" />
                                    </div>
                                    <span className="text-sm font-medium">Caméra désactivée</span>
                                </div>
                            )}

                            {/* Bottom controls overlay */}
                            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <div className="flex items-center justify-center gap-3">
                                    <Button
                                        variant="ghost" size="icon"
                                        onClick={() => setMicOn(!micOn)}
                                        className={`h-11 w-11 rounded-full transition-all ${micOn ? 'bg-slate-700/60 text-white hover:bg-slate-600/80 backdrop-blur-sm' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
                                    >
                                        {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                                    </Button>
                                    <Button
                                        variant="ghost" size="icon"
                                        onClick={() => setCameraOn(!cameraOn)}
                                        className={`h-11 w-11 rounded-full transition-all ${cameraOn ? 'bg-slate-700/60 text-white hover:bg-slate-600/80 backdrop-blur-sm' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
                                    >
                                        {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Info section below video */}
                        <div className="p-6 md:p-8 text-center">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Salle d'attente MediBridge</h2>
                            <p className="text-slate-500 mb-5">Consultation Pré-Opératoire — <strong className="text-slate-700">Dr. Fatima El Amrani</strong></p>

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-6">
                                <ShieldCheck className="w-3.5 h-3.5" /> Connexion chiffrée de bout-en-bout
                            </div>

                            <div>
                                <Button
                                    onClick={() => setJoined(true)}
                                    className="h-12 px-8 text-base rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold shadow-lg shadow-brand-teal/20 transition-all hover:shadow-xl hover:shadow-brand-teal/30"
                                >
                                    Rejoindre la consultation
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }

    // ──────────────────────────── ACTIVE CALL ────────────────────────────
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            className="w-full relative z-0 flex"
            style={{ height: 'calc(100vh - 80px)' }}
        >
            {/* Main video area */}
            <div className="flex-1 flex flex-col bg-slate-950 rounded-2xl overflow-hidden relative">
                {/* Top bar overlay */}
                <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-black/70 to-transparent z-10 flex items-center justify-between px-5">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-white/90 font-mono text-sm tracking-wider bg-black/40 px-3 py-1 rounded-md backdrop-blur-sm border border-white/10">
                            {formatTime(elapsed)}
                        </span>
                        <span className="text-white/50 text-sm font-medium hidden sm:block">• Consultation Pré-Opératoire</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost" size="icon"
                            onClick={() => { setShowParticipants(p => !p); setShowChat(false); setShowSettings(false) }}
                            className={`h-9 w-9 rounded-lg transition-all ${showParticipants ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                        >
                            <Users className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost" size="icon"
                            onClick={() => { setShowChat(p => !p); setShowParticipants(false); setShowSettings(false) }}
                            className={`h-9 w-9 rounded-lg transition-all ${showChat ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                        >
                            <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost" size="icon"
                            onClick={() => { setShowSettings(p => !p); setShowChat(false); setShowParticipants(false) }}
                            className={`h-9 w-9 rounded-lg transition-all ${showSettings ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                        >
                            <Settings className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Doctor main video / Screen share */}
                <div className="flex-1 relative flex items-center justify-center m-2 rounded-xl bg-slate-900 overflow-hidden">
                    {isScreenSharing && screenStream ? (
                        <>
                            <video ref={screenVideoRef} autoPlay playsInline className="w-full h-full object-contain" />
                            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm z-10">
                                <MonitorUp className="w-3.5 h-3.5 text-brand-teal" />
                                <span className="text-white text-xs font-semibold">Partage d'écran actif</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <Avatar className="w-28 h-28 sm:w-36 sm:h-36 shadow-2xl border-4 border-slate-800 mb-4">
                                <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-800 text-slate-300 font-bold text-4xl sm:text-5xl">FE</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-0 inset-x-0 text-center pb-20 sm:pb-6">
                                <h3 className="text-white font-bold text-lg sm:text-xl drop-shadow-lg">Dr. Fatima El Amrani</h3>
                                <p className="text-slate-400 text-sm font-medium">Chirurgien Orthopédiste</p>
                            </div>
                        </>
                    )}

                    {/* Patient PiP — bottom-left to avoid top-right buttons */}
                    <div className="absolute bottom-4 left-4 w-36 sm:w-48 aspect-video rounded-lg border-2 border-slate-700/60 shadow-xl overflow-hidden bg-black z-[5]">
                        {cameraOn && stream ? (
                            <video ref={activeVideoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                        ) : cameraOn ? (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Vous</span>
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                                <VideoOff className="w-5 h-5" />
                            </div>
                        )}
                        <div className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded backdrop-blur-sm">
                            Vous
                        </div>
                        {handRaised && <div className="absolute top-1.5 right-1.5 text-lg animate-bounce">✋</div>}
                    </div>

                    {/* Floating emoji reaction */}
                    <AnimatePresence>
                        {floatingEmoji && (
                            <motion.div initial={{ opacity: 1, y: 0, scale: 1 }} animate={{ opacity: 0, y: -120, scale: 2 }} exit={{ opacity: 0 }} transition={{ duration: 2.5 }} className="absolute bottom-32 left-20 text-5xl z-20 pointer-events-none">
                                {floatingEmoji}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Hidden file input */}
                    <input ref={fileInputRef} type="file" className="hidden" onChange={onFileSelected} accept=".pdf,.doc,.docx,.jpg,.png" />
                </div>

                {/* Bottom controls */}
                <div className="h-20 bg-slate-900 shrink-0 flex items-center justify-center gap-3 sm:gap-5 px-4 relative z-10">
                    <Button
                        variant="ghost" size="icon"
                        onClick={() => setMicOn(!micOn)}
                        className={`h-12 w-12 rounded-full transition-all ${micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
                    >
                        {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    </Button>
                    <Button
                        variant="ghost" size="icon"
                        onClick={() => setCameraOn(!cameraOn)}
                        className={`h-12 w-12 rounded-full transition-all ${cameraOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
                    >
                        {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={toggleScreenShare} className={`h-12 w-12 rounded-full transition-all hidden sm:flex ${isScreenSharing ? 'bg-brand-teal text-white hover:bg-brand-teal-dark' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                        <MonitorUp className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setHandRaised(p => !p)} className={`h-12 w-12 rounded-full transition-all hidden sm:flex ${handRaised ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                        <Hand className="w-5 h-5" />
                    </Button>
                    <div className="relative hidden sm:block">
                        <Button variant="ghost" size="icon" onClick={() => setShowEmojis(p => !p)} className="h-12 w-12 rounded-full bg-slate-800 text-white hover:bg-slate-700">
                            <Smile className="w-5 h-5" />
                        </Button>
                        {showEmojis && (
                            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 rounded-xl p-2 flex gap-1 shadow-xl z-30">
                                {['👍','👏','❤️','😂','🎉','🤔'].map(e => <button key={e} onClick={() => sendEmoji(e)} className="text-xl hover:scale-125 transition-transform p-1">{e}</button>)}
                            </div>
                        )}
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleUpload} className="h-12 w-12 rounded-full bg-slate-800 text-white hover:bg-slate-700 hidden sm:flex">
                        <Upload className="w-5 h-5" />
                    </Button>

                    <div className="w-px h-8 bg-slate-700 mx-1" />

                    <Button
                        onClick={handleLeave}
                        className="h-12 px-6 sm:px-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-lg shadow-rose-600/30 transition-all"
                    >
                        <PhoneForwarded className="w-5 h-5 mr-2 rotate-[135deg]" /> Quitter
                    </Button>
                </div>
            </div>

            {/* Right side panels */}
            <AnimatePresence>
                {(showChat || showParticipants || showSettings) && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 340, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="shrink-0 bg-slate-900 rounded-2xl ml-2 overflow-hidden flex flex-col border border-slate-800"
                    >
                        {/* ── Participants Panel ── */}
                        {showParticipants && (
                            <div className="flex flex-col h-full">
                                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                                    <h3 className="font-bold text-white text-sm">Participants (2)</h3>
                                    <Button variant="ghost" size="icon" onClick={() => setShowParticipants(false)} className="h-8 w-8 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><X className="w-4 h-4" /></Button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                        <Avatar className="w-9 h-9"><AvatarFallback className="bg-brand-teal text-white text-sm font-bold">FE</AvatarFallback></Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-semibold truncate">Dr. Fatima El Amrani</p>
                                            <p className="text-slate-500 text-xs">Organisateur</p>
                                        </div>
                                        <Mic className="w-4 h-4 text-emerald-500 shrink-0" />
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                        <Avatar className="w-9 h-9"><AvatarFallback className="bg-slate-600 text-white text-sm font-bold">VO</AvatarFallback></Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-semibold truncate">Vous (Patient)</p>
                                            <p className="text-slate-500 text-xs">Invité</p>
                                        </div>
                                        {micOn ? <Mic className="w-4 h-4 text-emerald-500 shrink-0" /> : <MicOff className="w-4 h-4 text-rose-400 shrink-0" />}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── Chat Panel ── */}
                        {showChat && (
                            <div className="flex flex-col h-full">
                                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                                    <h3 className="font-bold text-white text-sm">Messages de la consultation</h3>
                                    <Button variant="ghost" size="icon" onClick={() => setShowChat(false)} className="h-8 w-8 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><X className="w-4 h-4" /></Button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {chatMessages.map(msg => (
                                        <div key={msg.id} className={`flex flex-col ${msg.sender === 'Vous' ? 'items-end' : 'items-start'}`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-semibold text-slate-400">{msg.sender}</span>
                                                <span className="text-[10px] text-slate-600">{msg.time}</span>
                                            </div>
                                            <div className={`max-w-[85%] rounded-2xl text-sm leading-relaxed overflow-hidden ${msg.sender === 'Vous'
                                                ? 'bg-brand-teal text-white rounded-br-md'
                                                : 'bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700'
                                                }`}>
                                                {msg.imageUrl && (
                                                    <img
                                                        src={msg.imageUrl}
                                                        alt="Aperçu"
                                                        className="w-full max-w-[220px] block"
                                                    />
                                                )}
                                                <p className="px-3.5 py-2.5">{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={chatInput}
                                            onChange={e => setChatInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                                            placeholder="Écrivez un message..."
                                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-10 rounded-xl focus-visible:ring-brand-teal text-sm"
                                        />
                                        <Button onClick={handleSendChat} size="icon" className="h-10 w-10 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl shrink-0">
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── Settings Panel ── */}
                        {showSettings && (
                            <div className="flex flex-col h-full">
                                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                                    <h3 className="font-bold text-white text-sm">Paramètres</h3>
                                    <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)} className="h-8 w-8 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><X className="w-4 h-4" /></Button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {/* Audio */}
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Audio</p>
                                        <div className="space-y-2">
                                            <button onClick={() => setMicOn(!micOn)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors text-left">
                                                {micOn ? <Mic className="w-4 h-4 text-emerald-500" /> : <MicOff className="w-4 h-4 text-rose-400" />}
                                                <div className="flex-1">
                                                    <p className="text-white text-sm font-medium">Microphone</p>
                                                    <p className="text-slate-500 text-xs">{micOn ? 'Activé' : 'Désactivé'}</p>
                                                </div>
                                                <div className={`w-9 h-5 rounded-full transition-colors flex items-center ${micOn ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'}`}>
                                                    <div className="w-4 h-4 rounded-full bg-white mx-0.5 shadow-sm" />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Video */}
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Vidéo</p>
                                        <div className="space-y-2">
                                            <button onClick={() => setCameraOn(!cameraOn)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors text-left">
                                                {cameraOn ? <Video className="w-4 h-4 text-emerald-500" /> : <VideoOff className="w-4 h-4 text-rose-400" />}
                                                <div className="flex-1">
                                                    <p className="text-white text-sm font-medium">Caméra</p>
                                                    <p className="text-slate-500 text-xs">{cameraOn ? 'Activée' : 'Désactivée'}</p>
                                                </div>
                                                <div className={`w-9 h-5 rounded-full transition-colors flex items-center ${cameraOn ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'}`}>
                                                    <div className="w-4 h-4 rounded-full bg-white mx-0.5 shadow-sm" />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Video Quality */}
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Qualité vidéo</p>
                                        <div className="space-y-1.5">
                                            {([['low','Basse qualité','360p'],['hd','HD','720p'],['fullhd','Full HD','1080p']] as const).map(([key,label,res]) => (
                                                <button key={key} onClick={() => changeQuality(key as 'low'|'hd'|'fullhd')} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors text-left ${videoQuality === key ? 'bg-brand-teal/10 border-brand-teal/30' : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800'}`}>
                                                    <Monitor className={`w-4 h-4 ${videoQuality === key ? 'text-brand-teal' : 'text-slate-500'}`} />
                                                    <div className="flex-1">
                                                        <p className={`text-sm font-medium ${videoQuality === key ? 'text-brand-teal' : 'text-white'}`}>{label}</p>
                                                        <p className="text-slate-500 text-xs">{res}</p>
                                                    </div>
                                                    {videoQuality === key && <div className="w-2 h-2 rounded-full bg-brand-teal" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Connection Info */}
                                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                            <p className="text-emerald-400 text-sm font-bold">Connexion sécurisée</p>
                                        </div>
                                        <p className="text-emerald-500/80 text-xs leading-relaxed">
                                            Chiffrement de bout-en-bout actif (WebRTC). Aucun tiers ne peut accéder à votre consultation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
