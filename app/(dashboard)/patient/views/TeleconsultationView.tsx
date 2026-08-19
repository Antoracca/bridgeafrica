"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  InkPillButton, 
  OutlinedPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  ShieldCheck,
  Calendar,
  AlertCircle,
  Camera,
  Lock,
  ArrowUpRight
} from "lucide-react"

export function TeleconsultationView() {
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [permissionError, setPermissionError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let localStream: MediaStream | null = null

    async function startPreview() {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        setStream(localStream)
        setPermissionError(false)
      } catch (err) {
        console.warn("Accès caméra/micro non autorisé :", err)
        setPermissionError(true)
      }
    }

    startPreview()

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream, cameraOn])

  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach((t) => {
        t.enabled = micOn
      })
      stream.getVideoTracks().forEach((t) => {
        t.enabled = cameraOn
      })
    }
  }, [micOn, cameraOn, stream])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-10 w-full"
    >
      {/* En-tête Mastercard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-2">
        <div className="space-y-1">
          <EyebrowDot text="• SALLE DE VISIOCONSULTATION HDS • CHIFFREMENT WEBRTC DTLS-SRTP" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
            Téléconsultation Médicale
          </h1>
          <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Testez vos flux vidéo et audio avant votre entretien collégial avec le chirurgien ou le praticien hospitalier référent.
          </p>
        </div>

        <OutlinedPillButton href="/patient?view=rdv" className="shrink-0">
          <Calendar className="w-4 h-4" />
          <span>Mon Agenda Médical</span>
        </OutlinedPillButton>
      </div>

      {/* Carte principale de test matériel Stadium Frame (Rayon 40px) */}
      <div className="bg-[#FCFBFA] rounded-[40px] border border-[#E2DDD7] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* Cadre vidéo interactif */}
          <div className="lg:col-span-3 bg-[#141413] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px] relative">
            {cameraOn && stream ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full max-w-md aspect-video rounded-[24px] object-cover scale-x-[-1] border border-white/20 shadow-2xl"
              />
            ) : permissionError ? (
              <div className="flex flex-col items-center justify-center text-center p-6 text-[#D1CDC7] gap-3">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[#F37338]">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-white">Autorisation caméra/micro requise</p>
                <p className="text-xs text-[#D1CDC7] max-w-xs">
                  Veuillez autoriser l'accès à vos périphériques dans les paramètres de votre navigateur.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 text-[#D1CDC7] gap-3">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[#D1CDC7]">
                  <VideoOff className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-white">Caméra désactivée</p>
              </div>
            )}

            {/* Commandes rapides sous la vidéo */}
            <div className="flex items-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => setMicOn(!micOn)}
                className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${
                  micOn ? "bg-white/20 text-white hover:bg-white/30" : "bg-[#CF4500] text-white hover:bg-[#CF4500]/80"
                }`}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => setCameraOn(!cameraOn)}
                className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${
                  cameraOn ? "bg-white/20 text-white hover:bg-white/30" : "bg-[#CF4500] text-white hover:bg-[#CF4500]/80"
                }`}
              >
                {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Statuts techniques et consignes */}
          <div className="lg:col-span-2 p-8 sm:p-10 flex flex-col justify-between bg-[#FCFBFA] space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#696969] uppercase tracking-wider">État des périphériques</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white rounded-[20px] border border-[#E2DDD7]">
                  <div className="flex items-center gap-3">
                    <Camera className="w-4 h-4 text-[#141413]" />
                    <span className="text-xs font-medium text-[#141413]">Flux Caméra</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full ${
                    cameraOn && stream ? "bg-[#141413] text-[#F3F0EE]" : "bg-[#F3F0EE] text-[#696969]"
                  }`}>
                    {cameraOn && stream ? "OPÉRATIONNEL" : "DÉSACTIVÉ"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-[20px] border border-[#E2DDD7]">
                  <div className="flex items-center gap-3">
                    <Mic className="w-4 h-4 text-[#141413]" />
                    <span className="text-xs font-medium text-[#141413]">Microphone</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full ${
                    micOn && stream ? "bg-[#141413] text-[#F3F0EE]" : "bg-[#F3F0EE] text-[#696969]"
                  }`}>
                    {micOn && stream ? "ACTIF" : "COUPÉ"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-[20px] border border-[#E2DDD7]">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#CF4500]" />
                    <span className="text-xs font-medium text-[#141413]">Chiffrement WebRTC</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#141413] text-[#F3F0EE]">
                    DTLS-SRTP
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-[#141413] text-[#F3F0EE] space-y-2">
              <p className="font-medium text-xs tracking-tight text-white">Consignes d'accès à l'entretien</p>
              <p className="text-[11px] leading-relaxed text-[#D1CDC7]">
                Lorsque votre médecin référent démarrera votre créneau de téléconsultation, la salle s'ouvrira automatiquement et vous serez connecté sans avoir à installer d'application tierce.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


